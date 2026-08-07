import React from "react";

const values = [
  {
    title: "Depth over breadth",
    description:
      "We are not a fast-moving generalist shop. Every person at Blackwood is deeply expert in their domain and expected to go further.",
  },
  {
    title: "No playbook",
    description:
      "The problems we work on don't have established solutions. You will be expected to research, hypothesize, build, and be wrong — then iterate.",
  },
  {
    title: "Consequence matters",
    description:
      "Our systems operate in environments where failure has real consequences. We work with that weight consciously, not in spite of it.",
  },
];

function CareerValues() {
  return (
    <section
      className="border-y border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20"
      style={{
        background:
          "linear-gradient(180deg, #0f0f0e 0%, #131311 50%, #0f0f0e 100%)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        {values.map((value, index) => (
          <div
            key={index}
            className="group transition-all duration-300"
          >
            {/* Diamond */}
            <div className="w-2.5 h-2.5 border border-[#b89d61] rotate-45 mb-10 transition group-hover:scale-125"></div>

            {/* Title */}
            <h2
              className="text-white text-3xl lg:text-[38px] leading-tight transition group-hover:text-[#c6a96b]"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {value.title}
            </h2>

            {/* Description */}
            <p className="mt-6 text-[#6b6b6b] text-base lg:text-lg leading-8 max-w-sm">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CareerValues;