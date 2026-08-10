import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  
  const filters = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
      } else if (data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 py-20 flex justify-center">
        <span className="text-[#c6a96b] text-sm tracking-widest uppercase animate-pulse">Loading positions...</span>
      </section>
    );
  }

  const filteredJobs = filterType === 'All' ? jobs : jobs.filter(job => job.type === filterType);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-[#0b0a09] px-6 sm:px-10 lg:px-20 py-20">
      {/* Filter Section */}
      <div className="mb-12 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterType(filter)}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
              filterType === filter 
                ? 'bg-[#c6a96b] text-black shadow-[0_0_15px_rgba(198,169,107,0.3)]' 
                : 'bg-[#151515] text-gray-400 border border-[#2a2a2a] hover:text-white hover:border-[#444]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-0">
        {filteredJobs.length === 0 ? (
          <div className="text-gray-500 py-8 italic text-sm">No {filterType !== 'All' ? filterType.toLowerCase() : ''} positions available at the moment.</div>
        ) : filteredJobs.map((job, index) => (
          <div key={job.id} className="border-b border-[#1a1a1a]">
            <div
              onClick={() => toggleExpand(job.id)}
              className="group py-8 cursor-pointer transition-all duration-300"
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

                {/* Plus / Minus */}
                <div className="text-[#404040] text-2xl transition duration-300 group-hover:text-[#c6a96b]">
                  {expandedId === job.id ? '−' : '+'}
                </div>
              </div>
            </div>

            {/* Expandable Content */}
            {expandedId === job.id && (
              <div className="pb-10 pt-2 animate-fadeIn">
                <div className="max-w-4xl text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </div>
                <div className="mt-8">
                  <Link
                    to={`/apply/${job.id}`}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#c6a96b] text-black text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                  >
                    Apply for this position
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobListings;