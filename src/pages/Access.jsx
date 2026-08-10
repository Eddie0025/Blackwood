import React, { useState } from "react";
import { Link } from "react-router-dom";

function Access() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0b0a09] min-h-screen text-white overflow-x-hidden">
      {/* Top Header Section */}
      <section className="px-6 sm:px-10 lg:px-20 pt-8 sm:pt-12 lg:pt-16 pb-12">
        {/* Category Label */}
        <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
          BLACKWOOD TECHNOLOGIES
        </p>

        {/* Large Stacked Title */}
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
      </section>

      {/* Subtle Full Width Divider Line */}
      <div className="w-full h-px bg-[#1c1a17] my-4"></div>

      {/* Form Section */}
      <section className="px-6 sm:px-10 lg:px-20 py-12 lg:py-16 max-w-3xl">
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
              <Link
                to="/"
                className="text-[#c6a96b] uppercase tracking-[0.3em] text-xs hover:text-white transition"
              >
                RETURN HOME —
              </Link>
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
      </section>
    </div>
  );
}

export default Access;
