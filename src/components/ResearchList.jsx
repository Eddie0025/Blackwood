import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function ResearchList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
      } else if (data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="bg-black px-6 sm:px-10 lg:px-20 py-20 flex justify-center">
        <span className="text-[#c6a96b] text-sm tracking-widest uppercase animate-pulse">Loading intelligence reports...</span>
      </section>
    );
  }

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

                  <span className="text-[#c6a96b] text-[11px] uppercase tracking-[0.3em]">
                    {article.category}
                  </span>

                  <span className="text-[#5d5d5d] text-xs">
                    {article.date}
                  </span>

                  <span className="text-[#5d5d5d] text-xs border border-[#2a2a2a] px-2 py-0.5">
                    {article.read_time}
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