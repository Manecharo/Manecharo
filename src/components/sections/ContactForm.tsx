"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
        budget: "",
        timeline: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try emailing directly.");
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          Name *
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
          Email *
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
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
        >
          <option value="">Select a type</option>
          <option value="product-design">Product Design</option>
          <option value="ux-ui">UX/UI Design</option>
          <option value="branding">Branding & Identity</option>
          <option value="strategy">Strategy & Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-display uppercase tracking-wider mb-2"
          >
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
          >
            <option value="">Select range</option>
            <option value="<5k">&lt;$5K</option>
            <option value="5k-15k">$5K-$15K</option>
            <option value="15k-50k">$15K-$50K</option>
            <option value="50k+">$50K+</option>
            <option value="discuss">Let&apos;s discuss</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="timeline"
            className="block text-sm font-display uppercase tracking-wider mb-2"
          >
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors bg-pure-white"
          >
            <option value="">Select timeline</option>
            <option value="urgent">Urgent</option>
            <option value="1-3months">1-3 months</option>
            <option value="3-6months">3-6 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-display uppercase tracking-wider mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-8 py-4 bg-gold text-charcoal font-display uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {status === "sending" ? (
          <>
            <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-sage/20 border-2 border-sage text-charcoal">
          <p className="font-display">
            ✓ Message sent successfully! I'll get back to you within 48 hours.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-terracotta/20 border-2 border-terracotta text-charcoal">
          <p className="font-display">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
