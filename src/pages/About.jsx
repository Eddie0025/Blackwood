import React from "react";

const sections = [
  {
    heading: "PHILOSOPHY",
    title: "AI-First Systems Thinking",
    description:
      "Intelligence systems are not products you install. They are architectures you deploy, calibrate, and evolve. Blackwood was founded on the premise that the organizations that will define the next decade are those that embed intelligence at the infrastructure level — not as an add-on, but as a core operating function.",
  },
  {
    heading: "VISION",
    title: "Autonomous Intelligence Infrastructure",
    description:
      "We envision a near future where every consequential organization operates with a fully autonomous intelligence layer — systems that detect, decide, and respond faster than any human team. Not to replace judgment, but to elevate it to the level the environment demands.",
  },
  {
    heading: "POSITIONING",
    title: "Enterprise & Government Grade",
    description:
      "Blackwood operates exclusively at the enterprise and government tier. Our systems are built to the exacting standards of organizations where failure is not an inconvenience — it is a consequence. We do not pursue volume. We pursue fidelity.",
  },
];

function About() {
  return (
    <div className="bg-[#0b0a09] min-h-screen text-white">

      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-12">

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.15]"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          We don't build tools.
          <br />

          <span className="italic text-[#c6a96b]">
            We deploy intelligence.
          </span>
        </h1>

        <p className="mt-12 lg:mt-20 text-[#c6a96b] uppercase tracking-[0.35em] text-sm sm:text-base lg:text-2xl">
          About Blackwood
        </p>

      </section>

      {/* Content */}
      {sections.map((item, index) => (
        <section
          key={index}
          className="border-t border-[#1f1f1f] px-6 sm:px-10 lg:px-20 py-10 lg:py-16"
        >
          <p className="text-[#c6a96b] text-sm sm:text-lg lg:text-3xl tracking-[0.35em] uppercase mb-8 lg:mb-12">
            {item.heading}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 lg:gap-40 xl:gap-80">

            {/* Title */}
            <div>
              <h2
                className="text-2xl sm:text-3xl leading-tight text-white"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {item.title}
              </h2>
            </div>

            {/* Description */}
            <div>
              <p className="text-[#666] text-base sm:text-lg lg:text-2xl leading-8 lg:leading-10 max-w-4xl text-justify">
                {item.description}
              </p>
            </div>

          </div>
        </section>
      ))}

    </div>
  );
}

export default About;