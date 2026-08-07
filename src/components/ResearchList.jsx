import React from "react";

const articles = [
  {
    category: "THREAT INTELLIGENCE",
    date: "June 2025",
    read: "16 min read",
    title: "The Autonomous Threat Landscape: 2025 Edition",
  },
  {
    category: "AI RESEARCH",
    date: "April 2025",
    read: "12 min read",
    title: "Domain-Specific Fine-Tuning: Why General Models Fail at the Edges",
  },
  {
    category: "DECISION INTELLIGENCE",
    date: "March 2025",
    read: "14 min read",
    title: "Confidence Attribution in High-Stakes AI Recommendations",
  },
  {
    category: "SYSTEMS ARCHITECTURE",
    date: "February 2025",
    read: "22 min read",
    title: "Air-Gapped Intelligence: Deploying Autonomous Systems in Classified Environments",
  },
  {
    category: "THREAT INTELLIGENCE",
    date: "January 2025",
    read: "16 min read",
    title: "Multi-Agent Coordination Under Adversarial Conditions",
  },
];

function ResearchList() {
  return (
    <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 pb-24">
      <div className="border-t border-[#1f1f1f]"></div>

      <div className="mt-16">
        {articles.map((article, index) => (
          <div
            key={index}
            className="group border-b border-[#1f1f1f] py-10 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-8">

              <div className="flex-1">

                {/* Top Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm mb-5">

                  <span className="uppercase tracking-[0.25em] text-[#c6a96b]">
                    {article.category}
                  </span>

                  <span className="text-[#555]">
                    {article.date}
                  </span>

                  <span className="text-[#555]">
                    {article.read}
                  </span>

                </div>

                {/* Title */}
                <h2
                  className="text-white text-2xl sm:text-3xl lg:text-[42px] leading-tight transition group-hover:text-[#c6a96b]"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  {article.title}
                </h2>

              </div>

              {/* Plus */}
              <div className="text-[#444] text-2xl transition group-hover:text-[#c6a96b]">
                +
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResearchList;