"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Script from "next/script";

const COOLDOWN_KEY = "contact_form_cooldown";
const COOLDOWN_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
// reCAPTCHA v2 "I'm not a robot" checkbox key
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeUQxAsAAAAANjBdRmgZ2R187PmujnaVxjpWXXD";

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export default function ContactForm() {
  const { t, language } = useLanguage();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "cooldown">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  // Check cooldown on mount
  useEffect(() => {
    const checkCooldown = () => {
      const cooldownTimestamp = localStorage.getItem(COOLDOWN_KEY);
      if (cooldownTimestamp) {
        const timeSinceSubmission = Date.now() - parseInt(cooldownTimestamp, 10);
        if (timeSinceSubmission < COOLDOWN_DURATION) {
          setIsOnCooldown(true);
          setStatus("cooldown");
          // Set timeout to remove cooldown after remaining time
          const remainingTime = COOLDOWN_DURATION - timeSinceSubmission;
          setTimeout(() => {
            setIsOnCooldown(false);
            setStatus("idle");
            localStorage.removeItem(COOLDOWN_KEY);
          }, remainingTime);
        } else {
          // Cooldown expired
          localStorage.removeItem(COOLDOWN_KEY);
        }
      }
    };
    checkCooldown();
  }, []);

  // Render reCAPTCHA v2 checkbox when script is loaded
  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current && window.grecaptcha && recaptchaWidgetId === null) {
      try {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token: string) => {
            setRecaptchaToken(token);
          },
          "expired-callback": () => {
            setRecaptchaToken("");
          },
          "error-callback": () => {
            setRecaptchaToken("");
            console.error("reCAPTCHA error");
          },
        });
        setRecaptchaWidgetId(widgetId);
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
      }
    }
  }, [recaptchaLoaded, recaptchaWidgetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check cooldown before submitting
    if (isOnCooldown) {
      setStatus("cooldown");
      return;
    }

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setStatus("error");
      setErrorMessage(t.contact.formRecaptchaRequired || "Please complete the reCAPTCHA verification");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language, recaptchaToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Set cooldown timestamp
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
      });

      // Reset reCAPTCHA for next submission
      if (window.grecaptcha && recaptchaWidgetId !== null) {
        window.grecaptcha.reset(recaptchaWidgetId);
        setRecaptchaToken("");
      }

      // Set timeout to remove cooldown after 1 hour
      setTimeout(() => {
        setIsOnCooldown(false);
        localStorage.removeItem(COOLDOWN_KEY);
      }, COOLDOWN_DURATION);

      // Keep success message visible for 10 seconds
      setTimeout(() => {
        if (!isOnCooldown) {
          setStatus("idle");
        }
      }, 10000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(t.contact.formError);
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
      {/* Load reCAPTCHA v2 checkbox */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
          onLoad={() => {
            // Define the callback for when grecaptcha is ready
            window.onRecaptchaLoad = () => {
              setRecaptchaLoaded(true);
            };
            // If grecaptcha is already ready, call immediately
            if (window.grecaptcha && window.grecaptcha.render) {
              setRecaptchaLoaded(true);
            }
          }}
          onError={(e) => {
            console.error("Failed to load reCAPTCHA script:", e);
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

      {/* reCAPTCHA v2 Checkbox */}
      {RECAPTCHA_SITE_KEY && (
        <div className="flex flex-col items-center gap-3">
          <div ref={recaptchaRef} className="flex justify-center"></div>
          {!recaptchaToken && status !== "sending" && (
            <p className="text-xs text-charcoal/60">
              {t.contact.formRecaptchaHint || "Please verify you're not a robot"}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending" || isOnCooldown || !recaptchaToken}
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
          <p className="font-display">{errorMessage}</p>
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
