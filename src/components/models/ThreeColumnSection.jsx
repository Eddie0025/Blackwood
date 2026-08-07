import React from "react";

function ThreeColumnSection({ heading, items }) {
  return (
    <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-24">

      {/* Heading */}
      <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-14">
        {heading}
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">

        {items.map((item) => (
          <div key={item.number}>

            {/* Number */}
            <p className="text-[#c6a96b] text-xs tracking-[0.3em]">
              {item.number}
            </p>

            {/* Title */}
            <h3
              className="mt-5 text-white text-3xl lg:text-[42px] leading-tight"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-6 text-[#666] text-base lg:text-lg leading-8">
              {item.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default ThreeColumnSection;