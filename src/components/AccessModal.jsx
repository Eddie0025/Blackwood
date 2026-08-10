import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

function AccessModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('access_requests')
        .insert([
          {
            full_name: formData.fullName,
            organization: formData.organization,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast.success("Request Submitted. We will be in touch.");
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({ fullName: "", organization: "", email: "", message: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0b0a09] text-white overflow-y-auto animate-fadeIn">
      {/* Top Bar with Close Button */}
      <div className="sticky top-0 bg-[#0b0a09]/90 backdrop-blur-md px-6 sm:px-10 lg:px-20 py-6 flex justify-between items-center z-10 border-b border-gray-900">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
          <span className="text-gray-300 text-xs sm:text-sm tracking-wider font-mono">
            BLACKWOOD TECHNOLOGIES
          </span>
        </div>

        <button
          onClick={handleResetAndClose}
          className="text-gray-400 hover:text-white text-3xl transition-colors cursor-pointer p-2"
          aria-label="Close Request Access"
        >
          <FiX />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="px-6 sm:px-10 lg:px-20 pt-8 sm:pt-12 lg:pt-16 pb-10">
          <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
            BLACKWOOD TECHNOLOGIES
          </p>

          <h1
            className="mt-6 leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            <span className="block text-white text-6xl sm:text-8xl lg:text-9xl">
              Request
            </span>
            <span className="block italic text-[#c6a96b] text-6xl sm:text-8xl lg:text-9xl mt-2">
              Access.
            </span>
          </h1>
        </div>

        {/* Subtle Horizontal Line */}
        <div className="w-full h-px bg-[#1c1a17]"></div>

        {/* Form Section */}
        <div className="px-6 sm:px-10 lg:px-20 py-12 lg:py-16 max-w-3xl">
          {submitted ? (
            <div className="py-12">
              <h2
                className="text-white text-4xl sm:text-5xl"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                Request Submitted.
              </h2>
              <p className="mt-4 text-[#888] text-base leading-relaxed max-w-md">
                Thank you. Your request for access has been logged. All communications are confidential and our team will be in touch shortly.
              </p>
              <div className="mt-10">
                <button
                  onClick={handleResetAndClose}
                  className="text-[#c6a96b] uppercase tracking-[0.3em] text-xs hover:text-white transition cursor-pointer bg-transparent border-none p-0"
                >
                  CLOSE —
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#888] mb-3 font-sans">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-transparent border-b border-[#22201c] focus:border-[#c6a96b] pb-3 text-white text-base sm:text-lg placeholder-[#444] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#888] mb-3 font-sans">
                  ORGANIZATION
                </label>
                <input
                  type="text"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Organization name"
                  className="w-full bg-transparent border-b border-[#22201c] focus:border-[#c6a96b] pb-3 text-white text-base sm:text-lg placeholder-[#444] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#888] mb-3 font-sans">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@organization.com"
                  className="w-full bg-transparent border-b border-[#22201c] focus:border-[#c6a96b] pb-3 text-white text-base sm:text-lg placeholder-[#444] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-[#888] mb-3 font-sans">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your operational context and requirements..."
                  className="w-full bg-transparent border-b border-[#22201c] focus:border-[#c6a96b] pb-3 text-white text-base sm:text-lg placeholder-[#444] focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Action Row */}
              <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <button
                  type="submit"
                  className="text-[#c6a96b] uppercase tracking-[0.3em] text-xs font-semibold hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
                >
                  SUBMIT REQUEST <span className="text-sm">—</span>
                </button>

                <span className="text-xs text-[#555] font-sans">
                  All communications are confidential
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccessModal;
