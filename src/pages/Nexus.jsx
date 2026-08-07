import React from 'react'
import ThreeColumnSection from "../components/models/ThreeColumnSection";
import NexusAnimation from "../components/NexusAnimation.jsx";

function Nexus() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Custom Hero section with 2-column layout */}
      <section className="bg-black px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          {/* Top Label */}
          <div className="flex items-center gap-4 text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm">
            <span>02</span>
            <span className="text-[#6d5b36]">—</span>
            <span>CUSTOM AI MODEL DEVELOPMENT</span>
          </div>

          {/* Title */}
          <h1
            className="mt-10 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            NEXUS
          </h1>

          {/* Tagline */}
          <p
            className="mt-8 text-[#5f5f5f] italic text-xl sm:text-2xl lg:text-[36px]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            AI trained on your world.
          </p>

          {/* Gold Divider */}
          <div className="w-10 h-px bg-[#8a7343] mt-12"></div>
        </div>

        {/* Dynamic Nexus Logo Particle Assembly Animation */}
        <div className="flex justify-center lg:justify-end w-full">
          <NexusAnimation />
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
              Generic AI fails at the edges — where your actual operations
              live. Trained on public datasets, it has no understanding of
              your domain, your language, your risk profile, or your data
              topology.
            </p>

          </div>

          {/* Solution */}
          <div>

            <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-8">
              THE SOLUTION
            </h2>

            <p className="text-[#666] text-lg leading-10 max-w-xl">
              NEXUS builds custom models trained exclusively on your
              environment. Every weight calibrated to your operational
              reality — not approximated from the public internet.
            </p>

          </div>

        </div>

      </section>

      <ThreeColumnSection
        heading="CAPABILITIES"
        items={[
          {
            number: "01",
            title: "Language AI",
            description:
              "Domain-specific language models trained on your internal knowledge base, communications, and documentation.",
          },
          {
            number: "02",
            title: "Vision AI",
            description:
              "Computer vision systems calibrated to your specific operational environment and visual data streams.",
          },
          {
            number: "03",
            title: "Multimodal",
            description:
              "Unified models that reason across text, image, audio, and structured data simultaneously.",
          },
        ]}
      />

      {/* ================= Process ================= */}

      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-20 lg:py-24">

        {/* Heading */}
        <h2 className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm mb-10">
          PROCESS
        </h2>

        <div className="border-t border-[#1b1b1b]">

          {/* Step 01 */}
          <div className="grid grid-cols-1 md:grid-cols-[50px_180px_1fr] gap-6 md:gap-10 py-10 border-b border-[#1b1b1b]">

            <p className="text-[#c6a96b] tracking-[0.3em] text-sm">
              01
            </p>

            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Data Ingestion
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              We ingest, clean, and structure your proprietary data under strict
              confidentiality protocols.
            </p>

          </div>

          {/* Step 02 */}
          <div className="grid grid-cols-1 md:grid-cols-[50px_180px_1fr] gap-6 md:gap-10 py-10 border-b border-[#1b1b1b]">

            <p className="text-[#c6a96b] tracking-[0.3em] text-sm">
              02
            </p>

            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Training
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Foundational model training on your dataset with architecture
              selected to match your operational requirements.
            </p>

          </div>

          {/* Step 03 */}
          <div className="grid grid-cols-1 md:grid-cols-[50px_180px_1fr] gap-6 md:gap-10 py-10 border-b border-[#1b1b1b]">

            <p className="text-[#c6a96b] tracking-[0.3em] text-sm">
              03
            </p>

            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Fine-Tuning
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Iterative refinement cycles with your team until behavioral
              alignment, accuracy, and performance are fully validated.
            </p>

          </div>

          {/* Step 04 */}
          <div className="grid grid-cols-1 md:grid-cols-[50px_180px_1fr] gap-6 md:gap-10 py-10">

            <p className="text-[#c6a96b] tracking-[0.3em] text-sm">
              04
            </p>

            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Deployment
            </h3>

            <p className="text-[#666] text-lg leading-8 max-w-3xl">
              Models are delivered directly into your infrastructure—cloud,
              on-premise, private network, or fully air-gapped environments.
            </p>

          </div>

        </div>

      </section>
    </div>
  )
}

export default Nexus
