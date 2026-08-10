import React from "react";

const principles = [
  {
    title: "Systems, Not Tools",
    description:
      "We don't build plugins or add-ons. Every Blackwood deployment is a fully integrated operational system — designed around your environment, not adapted to fit it.",
  },
  {
    title: "Adaptive Intelligence",
    description:
      "Our systems don't just run — they learn. Continuous behavioral modeling means each deployment improves over time, calibrating to threats and patterns unique to your context.",
  },
  {
    title: "Environment-Specific AI",
    description:
      "No shared models. No generic training data. Every AI component is trained on your infrastructure, your documents, your adversarial landscape. Privacy is architectural.",
  },
];

function Principles() {
  return (
    <section className="bg-[#0b0a09] pt-4 px-6 sm:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        {principles.map((item, index) => (
          <div key={index}>

            {/* Diamond + Line */}
            <div className="flex items-center mb-8 lg:mb-10">
              <div className="w-3 h-3 border border-[#b89d61] rotate-45"></div>

              <div className="flex-1 h-px bg-[#4c4028] ml-6 lg:ml-8"></div>
            </div>

            {/* Heading */}
            <h2
              className="text-white text-3xl sm:text-4xl lg:text-[38px] leading-tight"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {item.title}
            </h2>

            {/* Description */}
            <p className="mt-6 lg:mt-8 text-[#7b7b7b] text-base lg:text-[18px] leading-8 lg:leading-10 max-w-md">
              {item.description}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}

export default Principles;