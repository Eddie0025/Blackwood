import React from "react";

const items = [
  "CEREBX",
  "NEXUS",
  "ATHENA",
  "CYBERSECURITY",
  "CUSTOM AI",
  "DECISION INTELLIGENCE",
  "AUTONOMOUS SYSTEMS",
  "ENTERPRISE GRADE",
];

function SystemsMarquee() {
  return (
    <div className="overflow-hidden border-y border-[#262626] bg-[#0b0a09] py-4 lg:py-5">
      <div className="flex w-max animate-marquee">

        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center px-6 lg:px-10 whitespace-nowrap"
          >
            <span
              className={`uppercase tracking-[0.25em] lg:tracking-[0.3em] text-sm sm:text-base lg:text-xl ${
                item === "NEXUS" ||
                item === "CYBERSECURITY" ||
                item === "ENTERPRISE GRADE" ||
                item === "DECISION INTELLIGENCE"
                  ? "text-[#c6a96b]"
                  : "text-[#5c5c5c]"
              }`}
            >
              {item}
            </span>

            <div className="w-2 h-2 border border-[#c6a96b] rotate-45 ml-6 lg:ml-10"></div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default SystemsMarquee;