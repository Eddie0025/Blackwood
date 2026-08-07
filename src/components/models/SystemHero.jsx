import React from "react";

function SystemHero({
  number,
  category,
  title,
  tagline,
}) {
  return (
    <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-20">

      {/* Top Label */}
      <div className="flex items-center gap-4 text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
        <span>{number}</span>

        <span className="text-[#6d5b36]">—</span>

        <span>{category}</span>
      </div>

      {/* Title */}
      <h1
        className="mt-10 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-none"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        {title}
      </h1>

      {/* Tagline */}
      <p
        className="mt-8 text-[#5f5f5f] italic text-xl sm:text-2xl lg:text-[36px]"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        {tagline}
      </p>

      {/* Gold Divider */}
      <div className="w-10 h-px bg-[#8a7343] mt-12"></div>

    </section>
  );
}

export default SystemHero;