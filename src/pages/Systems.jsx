import React from "react";
import SystemSection from "../components/SystemsSections";
function Systems() {
  return (
    <div className="bg-[#0b0a09] min-h-screen text-white overflow-x-hidden">

      {/* ================= Hero ================= */}
      <section className="px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-20">

        {/* Label */}
        <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm lg:text-base">
          BLACKWOOD TECHNOLOGIES
        </p>

        {/* Heading */}
        <h1
          className="mt-8 leading-none"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Core
          </span>

          <span className="block italic text-[#c6a96b] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Systems.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 lg:mt-12 max-w-xl text-justify text-[#7f7f7f] text-base sm:text-lg lg:text-xl leading-8 lg:leading-10">
          Three autonomous intelligence systems. Distinct domains,
          unified architecture, designed to operate independently or
          as a single integrated framework.
        </p>

      </section>

      <SystemSection
        number="01"
        subtitle="AI-NATIVE CYBERSECURITY"
        title="CerebX"
        description="A hierarchical multi-agent architecture that detects, analyzes, and autonomously responds to threats in real time—without waiting for human escalation."
        deployText="DEPLOY CEREBX"
        link="/cerebx"
        features={[
          "Autonomous threat detection",
          "Multi-agent response orchestration",
          "Zero-day pattern recognition",
          "Air-gapped deployment support",
        ]}
      />

      <SystemSection
        number="02"
        subtitle="CUSTOM AI MODEL DEVELOPMENT"
        title="NEXUS"
        description="AI models built and trained exclusively on your environment. Every weight, every parameter calibrated to your domain—not approximated from public datasets."
        deployText="DEPLOY NEXUS"
        link="/nexus"
        features={[
          "Domain-specific language models",
          "Custom vision AI pipelines",
          "Multimodal reasoning systems",
          "On-premise and cloud deployment",
        ]}
      />

      <SystemSection
        number="03"
        subtitle="DECISION-SUPPORT INTELLIGENCE"
        title="Athena"
        description="Layered AI reasoning that transforms fragmented, high-stakes data into clear, confidence-scored, defensible decisions for executive and operational teams."
        deployText="DEPLOY ATHENA"
        link="/athena"
        features={[
          "Decision modeling & scenario branching",
          "Confidence scoring & attribution",
          "Predictive intelligence layers",
          "Executive dashboard interface",
        ]}
      />
    </div>
  );
}

export default Systems;