import React from "react";
import { Link } from "react-router-dom";
import CareerValues from "../components/CareerValues";
import JobListings from "../components/JobListings";
import CareersAnimation from "../components/CareersAnimation";

function Careers() {
  return (
    <div className="bg-[#0b0a09] min-h-screen text-white overflow-x-hidden">

      {/* ================= Hero ================= */}
      <section className="px-6 sm:px-10 lg:px-20 pt-4 sm:pt-6 lg:pt-8 pb-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        <div>
          {/* Label */}
          <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm lg:text-base">
            JOIN BLACKWOOD
          </p>

          {/* Heading */}
          <h1
            className="mt-8 leading-none"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Build what
            </span>

            <span className="block italic text-[#c6a96b] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              doesn't exist yet.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 lg:mt-12 max-w-xl text-[#5f5f5f] text-base sm:text-lg lg:text-xl leading-8 lg:leading-10">
            Blackwood operates at the frontier of autonomous intelligence
            systems. We hire for depth, rigour, and the ability to work on
            problems that have no established playbook.
          </p>
        </div>

        {/* Animation */}
        <div className="hidden lg:flex items-center justify-center" style={{ minHeight: "550px" }}>
          <CareersAnimation />
        </div>

      </section>

      {/* ================= Values ================= */}
      <CareerValues />

      {/* ================= Jobs ================= */}
      <JobListings />

      {/* ================= CTA ================= */}
      <section className="border-t border-[#1b1b1b] px-6 sm:px-10 lg:px-20 py-16 lg:py-24">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

          {/* Left */}
          <div className="max-w-5xl">

            <p className="text-[#c6a96b] uppercase tracking-[0.35em] text-xs sm:text-sm lg:text-base mb-8">
              DON'T SEE YOUR ROLE?
            </p>

            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              If you're working at the frontier
              <br className="hidden md:block" />
              of intelligence systems, we want to hear from you.
            </h2>

          </div>

          {/* Right */}
          <div className="lg:shrink-0">

            <Link
              to="/"
              className="inline-flex items-center gap-3 text-[#c6a96b] uppercase tracking-[0.3em] text-xs sm:text-sm lg:text-base hover:text-white transition-colors duration-300"
            >
              GET IN TOUCH
              <span className="text-lg">—</span>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Careers;