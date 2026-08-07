import React from "react";
import { Link } from "react-router-dom";
import SystemsMarquee from "../components/SystemsMarquee.jsx";
import SystemCard from "../components/SystemCard";
import Principles from "../components/Principles.jsx";

function Homepage() {
  return (
    <div className="bg-[#0b0a09] min-h-screen text-white overflow-x-hidden">
      {/* First section */}
      <section className="px-6 sm:px-10 lg:px-20 pt-12 sm:pt-16 lg:pt-20">
        <h2 className="text-[#c6a96b] text-xs sm:text-sm lg:text-xl tracking-[0.25em] lg:tracking-[0.3em] uppercase font-sans">
          AI-NATIVE INTELLIGENCE INFRASTRUCTURE
        </h2>

        <h1
          className="text-white text-5xl sm:text-7xl lg:text-9xl leading-none mt-8 lg:mt-10"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Intelligence,
        </h1>

        <h1
          className="text-[#c6a96b] text-5xl sm:text-7xl lg:text-9xl italic leading-none"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Deployed.
        </h1>

        <p className="text-gray-300 text-base sm:text-lg lg:text-xl mt-8 lg:mt-10 max-w-xl lg:max-w-2xl leading-relaxed">
          AI-native systems built to secure, decide, and evolve —
          <br />
          calibrated to your environment, not the public internet.
        </p>

        <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-5 sm:gap-8">
          <Link
            to="/systems"
            className="text-[#c6a96b] text-sm sm:text-base lg:text-xl tracking-[0.25em] lg:tracking-[0.3em] uppercase font-sans hover:text-white transition"
          >
            Explore Systems —
          </Link>

          <Link
            to="/access"
            className="text-[#c6a96b] text-sm sm:text-base lg:text-xl tracking-[0.25em] lg:tracking-[0.3em] uppercase font-sans hover:text-white transition"
          >
            Request Access —
          </Link>
        </div>
      </section>

      <div className="mt-16 lg:mt-20">
        <SystemsMarquee />
      </div>

      {/* Second section */}
      <section className="px-6 sm:px-10 lg:px-20 pt-10 lg:pt-8">
        <h1
          className="text-white text-4xl sm:text-5xl lg:text-7xl leading-none mt-6 lg:mt-10"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Three Systems.{" "}
          <span
            className="text-[#c6a96b] text-4xl sm:text-5xl lg:text-7xl leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            One
          </span>
        </h1>

        <h1
          className="text-[#c6a96b] text-5xl sm:text-6xl lg:text-8xl italic leading-none"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          framework
        </h1>
      </section>

      {/* Third section */}
      <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 py-16 lg:py-28">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          <SystemCard
            number="01"
            title="CerebX"
            subtitle="AI-NATIVE CYBERSECURITY"
            description="A hierarchical multi-agent system that detects, analyzes, and responds to threats in real time. Learns the contours of your environment continuously."
            tags="Threat Detection • Response Automation • Behavioral Analysis"
          />

          <SystemCard
            number="02"
            title="NEXUS"
            subtitle="CUSTOM AI MODEL DEVELOPMENT"
            description="AI models built and trained on your environment, not generic datasets. Domain-specific intelligence that understands your data, your risk, your context."
            tags="Custom Training • Private Infrastructure • Zero Data Leakage"
          />

          <SystemCard
            number="03"
            title="Athena"
            subtitle="DECISION-SUPPORT INTELLIGENCE"
            description="Transform complex, fragmented data into clear, defensible decisions. Designed for operators who cannot afford ambiguity."
            tags="Signal Fusion • Confidence Scoring • Audit Trails"
          />
        </div>
      </section>

      <hr className="border-[#5f5e5c]" />

      {/* Fourth section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/constellation.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10">
          <div className="px-6 sm:px-10 lg:px-20 py-12 lg:py-20">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-3 h-3 border border-[#c6a96b] rotate-45"></div>

              <h2 className="text-[#c6a96b] text-xs sm:text-sm lg:text-xl tracking-[0.25em] lg:tracking-[0.3em] uppercase">
                WHY BLACKWOOD
              </h2>
            </div>

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-7xl mt-8 lg:mt-10 leading-none max-w-5xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Built on principles
              <br />
              that{" "}
              <span className="text-[#c6a96b] italic">
                most vendors
                <br />
                avoid.
              </span>
            </h1>
          </div>

          <Principles />
        </div>
      </section>

      {/* Fifth section */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 lg:py-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-3 h-3 border border-[#c6a96b] rotate-45"></div>

          <h2 className="text-[#c6a96b] text-xs sm:text-sm lg:text-xl tracking-[0.25em] lg:tracking-[0.3em] uppercase">
            WHY BLACKWOOD
          </h2>
        </div>

        <h1
          className="text-gray-300 text-2xl sm:text-4xl lg:text-5xl mt-8 lg:mt-10 leading-[1.35] max-w-6xl"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          "The organisations that will define the
          <br />
          next decade are those that embed
          <br />
          intelligence at the infrastructure level —
          <br />
          not as an add-on, but as a{" "}
          <span className="text-[#c6a96b] italic">core operating function.</span>
          "
        </h1>

        <div className="flex items-center gap-4 sm:gap-8 mt-10">
          <div className="w-10 h-px bg-[#8a7343]"></div>
          <div
            className="text-gray-500 text-sm sm:text-base lg:text-2xl leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Blackwood Technologies - Founding Principle
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="border-t border-[#2c2c2c] bg-[#0b0a09] px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <h2 className="text-[#c6a96b] uppercase tracking-[0.25em] lg:tracking-[0.3em] text-xs sm:text-sm mb-6 lg:mb-8">
              SECTORS
            </h2>

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl leading-tight"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Built for sectors
              <br />
              that{" "}
              <span className="italic text-[#c6a96b]">cannot fail.</span>
            </h1>

            <p className="text-[#5f5e5c] text-base sm:text-lg mt-8 lg:mt-10 max-w-md leading-8">
              Every deployment is calibrated to the risk tolerance and
              operational reality of the sector it serves.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col">
            {[
              "Enterprise",
              "Government",
              "Financial Systems",
              "Infrastructure",
            ].map((item) => (
              <div
                key={item}
                className="group flex items-center justify-between py-5 sm:py-6 lg:py-7 border-b border-[#222] cursor-pointer"
              >
                <span className="text-gray-300 text-base sm:text-lg lg:text-xl transition group-hover:text-[#c6a96b]">
                  {item}
                </span>

                <div className="w-2.5 h-2.5 border border-[#c6a96b] rotate-45 transition group-hover:scale-125"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;