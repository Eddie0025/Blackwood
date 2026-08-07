import React from "react";
import { Link } from "react-router-dom";

function SystemCard({
  number,
  title,
  subtitle,
  description,
  tags,
  link,
}) {
  return (
    <Link to={link || "/"} className="flex flex-col w-full lg:w-90 min-h-125 lg:h-130 group cursor-pointer" style={{ textDecoration: "none" }}>

      {/* Number */}
      <p className="text-[#6f654d] tracking-[0.25em] text-sm lg:text-xl">
        {number}
      </p>

      {/* Title */}
      <h2
        className="text-4xl sm:text-5xl lg:text-[52px] text-white leading-none mt-6 lg:mt-8 group-hover:text-[#c6a96b] transition-colors duration-300"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p className="uppercase tracking-[0.22em] text-[#9d8250] text-xs lg:text-sm mt-3">
        {subtitle}
      </p>

      {/* Divider */}
      <div className="w-10 h-px bg-[#8a7343] mt-8 lg:mt-10"></div>

      {/* Description */}
      <p className="text-[#6f6f6f] text-base text-justify lg:text-[18px] leading-8 lg:leading-10 mt-8 lg:mt-10 max-w-full">
        {description}
      </p>

      {/* Tags */}
      <p className="mt-auto uppercase tracking-[0.18em] text-[#8b7442] text-xs lg:text-sm leading-7 lg:leading-8 pt-4">
        {tags}
      </p>

    </Link>
  );
}

export default SystemCard;