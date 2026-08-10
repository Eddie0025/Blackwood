import React from "react";
import SEO from "../components/SEO";
import ThreeColumnSection from "../components/models/ThreeColumnSection";
import CerebxAnimation from "../components/CerebxAnimation.jsx";

function Cerebx() {
  return (
    <div className="bg-black min-h-screen text-white">
      <SEO title="CerebX" description="CerebX is Blackwood's foundational decision intelligence engine. Capable of processing disparate data streams to form actionable strategic insights." path="/cerebx" />
      {/* Custom Hero section with 2-column layout */}
      <section className="bg-black px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          {/* Top Label */}
          <div className="flex items-center gap-4 text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
            <span>01</span>
            <span className="text-[#6d5b36]">—</span>
            <span>AI-NATIVE CYBERSECURITY</span>
          </div>

          {/* Title */}
          <h1
            className="mt-10 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            CerebX
          </h1>

          {/* Tagline */}
          <p
            className="mt-8 text-[#5f5f5f] italic text-xl sm:text-2xl lg:text-[36px]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Security that doesn't wait.
          </p>

          {/* Gold Divider */}
          <div className="w-10 h-px bg-[#8a7343] mt-12"></div>
        </div>

        {/* Dynamic Wolf Mask Particle Assembly Animation */}
        <div className="flex justify-center lg:justify-end w-full">
          <CerebxAnimation />
        </div>
      </section>

      {/* ================= System Overview ================= */}

      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-10">
              SYSTEM OVERVIEW
            </h2>

            <p className="text-[#666] text-lg lg:text-[20px] leading-10 max-w-xl">
              CerebX operates as a hierarchical multi-agent architecture — each
              tier escalates decisions upward while autonomous agents handle
              execution. Detection is continuous. Analysis is immediate.
              Response is autonomous.
            </p>
          </div>

          {/* Right */}
          <div>
            <div className="space-y-0">
              <div className="flex items-center gap-6 border-b border-[#1b1b1b] py-6">
                <div className="w-1.5 h-1.5 bg-[#c6a96b] rounded-full"></div>

                <p className="text-[#666] text-lg">
                  Continuous environmental scanning across all surfaces
                </p>
              </div>

              <div className="flex items-center gap-6 border-b border-[#1b1b1b] py-6">
                <div className="w-1.5 h-1.5 bg-[#c6a96b] rounded-full"></div>

                <p className="text-[#666] text-lg">
                  Multi-agent reasoning with zero-day pattern recognition
                </p>
              </div>

              <div className="flex items-center gap-6 border-b border-[#1b1b1b] py-6">
                <div className="w-1.5 h-1.5 bg-[#c6a96b] rounded-full"></div>

                <p className="text-[#666] text-lg">
                  Autonomous containment calibrated to your threat threshold
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ThreeColumnSection
        heading="HOW IT WORKS"
        items={[
          {
            number: "01",
            title: "Detect",
            description:
              "Continuous scanning across all network surfaces. Anomaly identification with zero-day pattern recognition at machine speed.",
          },
          {
            number: "02",
            title: "Analyze",
            description:
              "Multi-agent reasoning evaluates threat signatures, attack vectors, and blast radius in milliseconds—not minutes.",
          },
          {
            number: "03",
            title: "Respond",
            description:
              "Autonomous containment, remediation, and escalation calibrated precisely to your organizational threat threshold.",
          },
        ]}
      />

      {/* ================= Deployment Tiers ================= */}

      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-24">

        {/* Heading */}
        <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-10">
          DEPLOYMENT TIERS
        </h2>

        <div className="border-t border-[#1b1b1b]">

          {/* Lite */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12 py-10 border-b border-[#1b1b1b]">

            <h3
              className="italic text-[#c6a96b] text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Lite
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Foundational threat detection for mid-market organizations.
              Real-time monitoring, alert systems, monthly intelligence
              reporting.
            </p>

          </div>

          {/* Enterprise */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12 py-10 border-b border-[#1b1b1b]">

            <h3
              className="italic text-[#c6a96b] text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Enterprise
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Full multi-agent deployment with autonomous response.
              Dedicated system configuration and integration engineering.
            </p>

          </div>

          {/* Apex */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12 py-10">

            <h3
              className="italic text-[#c6a96b] text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Apex
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Complete intelligence infrastructure. Custom agent
              hierarchies, classified threat feeds, direct engineering
              access.
            </p>

          </div>

        </div>

      </section>
    </div>
  );
}

export default Cerebx;
