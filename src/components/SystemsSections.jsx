import React from "react";
import { Link } from "react-router-dom";

function SystemSection({
  number,
  subtitle,
  title,
  description,
  features,
  link,
  deployText,
}) {
  return (
    <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-28">

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">

        {/* Left */}
        <div>

          <div className="flex items-center gap-8 mb-8">

            <span className="text-[#c6a96b] text-sm tracking-[0.3em]">
              {number}
            </span>

            <span className="text-[#c6a96b] uppercase tracking-[0.3em] text-xs sm:text-sm">
              {subtitle}
            </span>

          </div>

          <h2
            className="text-white text-5xl lg:text-[64px] leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            <Link to={link} className="hover:text-[#c6a96b] transition-colors duration-300">
              {title}
            </Link>
          </h2>

          <p className="mt-8 text-[#666] text-lg leading-9 max-w-md">
            {description}
          </p>

          <Link
            to={link}
            className="inline-flex items-center gap-3 mt-12 uppercase tracking-[0.3em] text-[#c6a96b] text-xs sm:text-sm hover:text-white transition-colors"
          >
            {deployText}
            <span>—</span>
          </Link>

        </div>

        {/* Right */}
        <div className="space-y-0">

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-5 border-b border-[#1b1b1b] py-6"
            >
              <div className="w-1.5 h-1.5 bg-[#c6a96b] rounded-full shrink-0"></div>

              <p className="text-[#666] text-base sm:text-lg">
                {feature}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default SystemSection;