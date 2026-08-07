import React from "react";

const jobs = [
  {
    category: "AI RESEARCH",
    location: "Remote / Washington D.C.",
    type: "Full-time",
    title: "Senior Research Scientist — Autonomous Systems",
  },
  {
    category: "AI RESEARCH",
    location: "Remote",
    type: "Full-time",
    title: "Machine Learning Engineer — Custom Model Training",
  },
  {
    category: "CYBERSECURITY",
    location: "Washington D.C. / On-site",
    type: "Full-time",
    title: "Principal Threat Intelligence Analyst",
  },
  {
    category: "ENGINEERING",
    location: "Remote",
    type: "Full-time",
    title: "Platform Engineer — AI Infrastructure",
  },
  {
    category: "ENGINEERING",
    location: "Remote",
    type: "Full-time",
    title: "Full-Stack Engineer — Intelligence Interfaces",
  },
  {
    category: "SOLUTIONS",
    location: "Remote / Travel Required",
    type: "Full-time",
    title: "Enterprise Solutions Architect",
  },
];

function JobListings() {
  return (
    <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 py-20">
      <div className="space-y-0">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="group border-b border-[#1a1a1a] py-8 cursor-pointer transition-all duration-300"
          >
            <div className="flex justify-between items-start gap-8">

              {/* Left */}
              <div className="flex-1">

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-5">

                  <span className="text-[#c6a96b] text-[11px] uppercase tracking-[0.3em]">
                    {job.category}
                  </span>

                  <span className="text-[#5d5d5d] text-xs">
                    {job.location}
                  </span>

                  <span className="text-[#5d5d5d] text-xs border border-[#2a2a2a] px-2 py-0.5">
                    {job.type}
                  </span>

                </div>

                {/* Title */}
                <h2
                  className="text-white text-2xl sm:text-3xl lg:text-[38px] leading-tight transition group-hover:text-[#c6a96b]"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  {job.title}
                </h2>

              </div>

              {/* Plus */}
              <div className="text-[#404040] text-2xl transition duration-300 group-hover:text-[#c6a96b] group-hover:rotate-90">
                +
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobListings;