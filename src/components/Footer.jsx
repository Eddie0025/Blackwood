import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0b0a09] border-t border-[#1b1b1b] text-[#5f5e5c]">

      {/* Main Footer */}
      <div className="px-6 sm:px-10 lg:px-20 py-12 lg:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">

          {/* Logo */}
          <div>
            <img
              src="/logo.jpg"
              alt="Blackwood"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover mb-6"
            />

            <p className="text-sm leading-7 max-w-55">
              AI-native intelligence infrastructure
              <br />
              for enterprise and government.
            </p>
          </div>

          {/* Systems */}
          <div>
            <h3 className="text-[#c6a96b] uppercase tracking-[0.3em] text-sm mb-6">
              Systems
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/systems" className="hover:text-[#c6a96b] transition">
                SYSTEMS
              </Link>

              <Link to="/cerebx" className="hover:text-[#c6a96b] transition">
                CEREBX
              </Link>

              <Link to="/nexus" className="hover:text-[#c6a96b] transition">
                NEXUS
              </Link>

              <Link to="/athena" className="hover:text-[#c6a96b] transition">
                ATHENA
              </Link>

              <Link to="/platform" className="hover:text-[#c6a96b] transition">
                PLATFORM
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#c6a96b] uppercase tracking-[0.3em] text-sm mb-6">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/about" className="hover:text-[#c6a96b] transition">
                ABOUT
              </Link>

              <Link to="/research" className="hover:text-[#c6a96b] transition">
                RESEARCH
              </Link>

              <Link
                to="/case-studies"
                className="hover:text-[#c6a96b] transition"
              >
                CASE STUDIES
              </Link>

              <Link to="/careers" className="hover:text-[#c6a96b] transition">
                CAREERS
              </Link>

              <Link to="/partners" className="hover:text-[#c6a96b] transition">
                PARTNERS
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#c6a96b] uppercase tracking-[0.3em] text-sm mb-6">
              Connect
            </h3>

            <a
              href="mailto:contact@blackwoodtech.com"
              className="hover:text-[#c6a96b] transition"
            >
              CONTACT US- +91-9779433125
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-6">

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#444]">

          <p className="text-center sm:text-left">
            © 2026 Blackwood Technologies. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            All communications are confidential.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;