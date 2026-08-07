import React from 'react'
import ThreeColumnSection from "../components/models/ThreeColumnSection";
import AthenaAnimation from "../components/AthenaAnimation.jsx";

function Athena() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Custom Hero section with 2-column layout */}
      <section className="bg-black px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          {/* Top Label */}
          <div className="flex items-center gap-4 text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
            <span>03</span>
            <span className="text-[#6d5b36]">—</span>
            <span>DECISION-SUPPORT INTELLIGENCE</span>
          </div>

          {/* Title */}
          <h1
            className="mt-10 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Athena
          </h1>

          {/* Tagline */}
          <p
            className="mt-8 text-[#5f5f5f] italic text-xl sm:text-2xl lg:text-[36px]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Clarity in complexity.
          </p>

          {/* Gold Divider */}
          <div className="w-10 h-px bg-[#8a7343] mt-12"></div>
        </div>

        {/* Dynamic Athena Logo Particle Assembly Animation */}
        <div className="flex justify-center lg:justify-end w-full">
          <AthenaAnimation />
        </div>
      </section>

      {/* ================= Problem / Solution ================= */}

      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Problem */}
          <div>

            <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-8">
              THE PROBLEM
            </h2>

            <p className="text-[#666] text-lg leading-10 max-w-xl">
              High-stakes decisions made from fragmented data,
              conflicting signals, and cognitive limits under
              pressure. The cost of that gap is measurable and
              compounding.
            </p>

          </div>

          {/* Solution */}
          <div>

            <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-8">
              THE SOLUTION
            </h2>

            <p className="text-[#666] text-lg leading-10 max-w-xl">
              Athena deploys layered AI reasoning across your data
              landscape — synthesizing, scoring, and surfacing
              decisions with full confidence attribution.
            </p>

          </div>

        </div>

      </section>

      <ThreeColumnSection
        heading="FEATURES"
        items={[
          {
            number: "01",
            title: "Decision Modeling",
            description:
              "Structural AI models mapping your decision environment, weighting variables against your organizational priorities.",
          },
          {
            number: "02",
            title: "Confidence Scoring",
            description:
              "Every recommendation carries full confidence attribution — your team knows exactly how much to trust each output.",
          },
          {
            number: "03",
            title: "Predictive Intelligence",
            description:
              "Forward-projection modeling with scenario-branching analysis across your operational variables.",
          },
        ]}
      />

      {/* ================= Intelligence Dashboard ================= */}

      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-24">

        {/* Heading */}
        <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-10">
          INTELLIGENCE DASHBOARD
        </h2>

        <div className="border border-[#1b1b1b]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1b1b1b] px-6 py-5">

            <p className="text-[#666] uppercase tracking-[0.25em] text-xs">
              ATHENA — EXECUTIVE VIEW
            </p>

            <div className="flex items-center gap-2 text-[#c6a96b] text-xs">
              <div className="w-2 h-2 rounded-full bg-[#c6a96b]"></div>
              Live
            </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#1b1b1b]">

            <div className="p-8 border-b md:border-b-0 md:border-r border-[#1b1b1b]">
              <p className="text-[#555] text-sm mb-6">
                Active Scenarios
              </p>

              <h3
                className="text-[#c6a96b] text-5xl"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                12
              </h3>
            </div>

            <div className="p-8 border-b md:border-b-0 md:border-r border-[#1b1b1b]">
              <p className="text-[#555] text-sm mb-6">
                Confidence Avg
              </p>

              <h3
                className="text-[#c6a96b] text-5xl"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                94.2%
              </h3>
            </div>

            <div className="p-8">
              <p className="text-[#555] text-sm mb-6">
                Decisions Pending
              </p>

              <h3
                className="text-[#c6a96b] text-5xl"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                3
              </h3>
            </div>

          </div>

          {/* Decision List */}

          {[
            {
              title: "Market Entry — APAC Q3",
              score: "87%",
              status: "RECOMMENDED",
              width: "w-[87%]",
            },
            {
              title: "Infrastructure Expansion",
              score: "73%",
              status: "REVIEW",
              width: "w-[73%]",
            },
            {
              title: "Regulatory Posture Update",
              score: "95%",
              status: "RECOMMENDED",
              width: "w-[95%]",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center gap-8 px-6 py-6 border-b last:border-b-0 border-[#1b1b1b]"
            >
              <p className="text-[#777] text-base">
                {item.title}
              </p>

              <div className="flex items-center gap-5">

                {/* Progress */}
                <div className="flex-1 h-px bg-[#2d2d2d]">
                  <div
                    className={`h-px bg-[#c6a96b] ${item.width}`}
                  ></div>
                </div>

                <span className="text-[#c6a96b] text-sm w-10">
                  {item.score}
                </span>

                <span className="text-[#c6a96b] text-xs tracking-[0.2em] min-w-30 text-right">
                  {item.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </section>
    </div>
  )
}

export default Athena
