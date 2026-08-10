import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";
import toast from "react-hot-toast";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    location: "",
    experience: "",
    ctc: "",
    resume: null
  });

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("title, category")
        .eq("id", id)
        .single();
      
      if (error || !data) {
        toast.error("Job not found.");
        navigate("/careers");
      } else {
        setJob(data);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      toast.error("Please upload your resume.");
      return;
    }

    if (formData.resume.type !== "application/pdf") {
      toast.error("Only PDF resumes are accepted.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload Resume
      const fileExt = formData.resume.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${id}/${fileName}`; // Group by job ID in storage

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('resumes')
        .upload(filePath, formData.resume);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // 2. Insert Application
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert([{
          job_id: id,
          name: formData.name,
          email: formData.email,
          number: formData.number,
          location: formData.location,
          experience: formData.experience,
          ctc: formData.ctc,
          resume_url: publicUrl
        }]);

      if (insertError) throw insertError;

      toast.success("Application submitted successfully! We will be in touch.");
      navigate("/careers");

    } catch (err) {
      console.error("Application error:", err);
      toast.error(`Failed to submit application: ${err.message || 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0b0a09] min-h-screen flex items-center justify-center text-[#c6a96b] tracking-widest text-sm uppercase animate-pulse">
        Initializing...
      </div>
    );
  }

  return (
    <div className="bg-[#0b0a09] min-h-screen text-white pt-24 pb-20 px-6 sm:px-10 lg:px-20 relative">
      <SEO title={`Apply: ${job.title}`} description={`Apply for ${job.title} at Blackwood Technologies.`} />
      
      <div className="max-w-2xl mx-auto relative z-10">
        
        <div className="mb-12">
          <p className="text-[#c6a96b] uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-4">
            Application
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-2" style={{ fontFamily: "Newsreader, serif" }}>
            {job.title}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">{job.category} Department</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#111] border border-[#1f1f1f] p-8 sm:p-12 rounded-xl shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="number"
                required
                value={formData.number}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Location (City, Country) <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Years of Experience <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="experience"
                required
                placeholder="e.g. 3 years"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Current/Expected CTC (Optional)</label>
              <input 
                type="text" 
                name="ctc"
                placeholder="e.g. $120,000"
                value={formData.ctc}
                onChange={handleChange}
                className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Resume / CV (PDF Only) <span className="text-red-500">*</span></label>
            <div className="relative border-2 border-dashed border-[#2a2a2a] hover:border-[#c6a96b] transition-colors bg-[#151515] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer">
              <input 
                type="file" 
                name="resume"
                accept=".pdf,application/pdf"
                required
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <svg className="w-8 h-8 text-[#555] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="text-sm text-gray-400 font-medium">{formData.resume ? formData.resume.name : "Click or drag file to upload"}</p>
              <p className="text-xs text-gray-600 mt-1">Maximum file size 10MB</p>
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#c6a96b] text-black text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Apply;
