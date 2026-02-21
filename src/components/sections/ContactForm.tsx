"use client";

import { useState, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Script from "next/script";

const COOLDOWN_KEY = "contact_form_cooldown";
const COOLDOWN_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
// reCAPTCHA v3 invisible
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LfgIAwsAAAAAIk-l02jLlOszSIJ7Pv2XpWoyK65";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    budget: "",
    timeline: "",
    // Honeypot field - should remain empty
    website: "",
  });
  const [formStartTime] = useState(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "cooldown">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Check cooldown on mount - only runs on client
  useEffect(() => {
    const cooldownTimestamp = localStorage.getItem(COOLDOWN_KEY);
    if (cooldownTimestamp) {
      const timeSinceSubmission = Date.now() - parseInt(cooldownTimestamp, 10);
      if (timeSinceSubmission < COOLDOWN_DURATION) {
        setIsOnCooldown(true);
        setStatus("cooldown");
        const remainingTime = COOLDOWN_DURATION - timeSinceSubmission;
        const timeoutId = setTimeout(() => {
          setIsOnCooldown(false);
          setStatus("idle");
          localStorage.removeItem(COOLDOWN_KEY);
        }, remainingTime);
        return () => clearTimeout(timeoutId);
      } else {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }
  }, []);

  const getRecaptchaToken = useCallback(async (): Promise<string> => {
    if (!recaptchaLoaded || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded");
      return "";
    }
    
    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      return "";
    }
  }, [recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isOnCooldown) {
      setStatus("cooldown");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Get reCAPTCHA v3 token
    let recaptchaToken = "";
    if (recaptchaLoaded) {
      recaptchaToken = await getRecaptchaToken();
    }

    try {
      // Calculate time spent on form (bot protection)
      const timeSpent = Date.now() - formStartTime;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language, recaptchaToken, timeSpent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to send message");
      }

      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setIsOnCooldown(true);

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
        budget: "",
        timeline: "",
        website: "",
      });

      const timeoutId = setTimeout(() => {
        setIsOnCooldown(false);
        localStorage.removeItem(COOLDOWN_KEY);
      }, COOLDOWN_DURATION);

      setTimeout(() => {
        if (!isOnCooldown) {
          setStatus("idle");
        }
      }, 10000);
      
      return () => clearTimeout(timeoutId);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t.contact.formError);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Load reCAPTCHA v3 invisible with proper onLoad handler */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
          onLoad={() => setRecaptchaLoaded(true)}
          onError={() => {
            console.error("Failed to load reCAPTCHA");
            setRecaptchaLoaded(false);
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          {t.contact.formName} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          {t.contact.formEmail} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors"
        />
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          {t.contact.formProjectType}
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
        >
          <option value="">{t.contact.selectType}</option>
          <option value="product-design">{t.contact.projectTypes.productDesign}</option>
          <option value="ux-ui">{t.contact.projectTypes.uxUi}</option>
          <option value="branding">{t.contact.projectTypes.branding}</option>
          <option value="strategy">{t.contact.projectTypes.strategy}</option>
          <option value="other">{t.contact.projectTypes.other}</option>
        </select>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-display uppercase tracking-wider mb-2"
          >
            {t.contact.formBudget}
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
          >
            <option value="">{t.contact.selectRange}</option>
            <option value="<5k">{t.contact.budgetRanges.under5k}</option>
            <option value="5k-15k">{t.contact.budgetRanges.range5to15}</option>
            <option value="15k-50k">{t.contact.budgetRanges.range15to50}</option>
            <option value="50k+">{t.contact.budgetRanges.over50k}</option>
            <option value="discuss">{t.contact.budgetRanges.discuss}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="timeline"
            className="block text-sm font-display uppercase tracking-wider mb-2"
          >
            {t.contact.formTimeline}
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
          >
            <option value="">{t.contact.selectTimeline}</option>
            <option value="urgent">{t.contact.timelines.urgent}</option>
            <option value="1-3months">{t.contact.timelines.oneToThree}</option>
            <option value="3-6months">{t.contact.timelines.threeToSix}</option>
            <option value="exploring">{t.contact.timelines.exploring}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          {t.contact.formMessage} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors resize-none"
          placeholder={t.contact.formPlaceholder}
        />
      </div>

      {/* Honeypot field - hidden from users, bots will fill it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending" || isOnCooldown}
        className="w-full px-8 py-4 bg-gold text-charcoal font-display uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {status === "sending" ? (
          <>
            <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
            {t.contact.formSending}
          </>
        ) : (
          <>
            <Send size={20} />
            {t.contact.formSubmit}
          </>
        )}
      </button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-6 bg-sage/20 border-2 border-sage text-charcoal animate-fade-in-up">
          <p className="text-base leading-relaxed">
            {t.contact.formSuccess}
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-terracotta/20 border-2 border-terracotta text-charcoal">
          <p className="font-display">{errorMessage || t.contact.formError}</p>
        </div>
      )}

      {status === "cooldown" && (
        <div className="p-6 bg-gold/20 border-2 border-gold text-charcoal animate-fade-in-up">
          <p className="text-base leading-relaxed">
            {t.contact.formCooldown}
          </p>
        </div>
      )}
    </form>
    </>
  );
}