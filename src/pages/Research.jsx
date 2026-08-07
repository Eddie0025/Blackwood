import React from "react";
import ResearchList from "../components/ResearchList";
import ResearchAnimation from "../components/ResearchAnimation";

function Research() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ================= Hero ================= */}
      <section className="px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          {/* Label */}
          <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm lg:text-base">
            INTELLIGENCE BRIEFINGS
          </p>

          {/* Heading */}
          <h1
            className="mt-8 lg:mt-10 leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Research &
            </span>

            <span className="block text-[#c6a96b] italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Analysis.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 lg:mt-12 max-w-xl text-[#5f5f5f] text-base sm:text-lg lg:text-xl leading-8 lg:leading-10">
            Published intelligence on autonomous AI systems,
            adversarial threat landscapes, and the architecture of
            enterprise-grade intelligence infrastructure.
          </p>
        </div>

        {/* Dynamic Atomic Research Animation */}
        <div className="flex justify-center lg:justify-end w-full">
          <ResearchAnimation />
        </div>
      </section>

      {/* ================= Research Articles ================= */}
      <ResearchList />

      {/* ================= CTA ================= */}
      <section className="border-t border-[#1f1f1f] px-6 sm:px-10 lg:px-20 py-16 lg:py-24">

        {/* Label */}
        <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm lg:text-base mb-8 lg:mb-10">
          INTELLIGENCE BRIEFINGS
        </p>

        {/* Heading */}
        <h2
          className="max-w-6xl text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.2]"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Classified reports,{" "}
          <span className="italic text-[#c6a96b]">
            delivered directly
          </span>
          <br className="hidden sm:block" />
          <span className="block sm:inline">
            {" "}to qualified organizations.
          </span>
        </h2>

      </section>

    </div>
  );
}

export default Research;