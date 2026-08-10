import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle } from 'react-icons/fi';
import { supabaseAdmin } from '../../lib/supabase';
import toast from 'react-hot-toast';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedId, setExpandedId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentJob, setCurrentJob] = useState({ id: null, title: '', category: '', location: '', type: 'Full-time', experience: '', ctc: '', description: '', isActive: true });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openPanel = (mode, job = null, e = null) => {
    if (e) e.stopPropagation();
    setModalMode(mode);
    if (job) {
      setCurrentJob({
        id: job.id,
        title: job.title,
        category: job.category,
        location: job.location,
        type: job.type,
        experience: job.experience || '',
        ctc: job.ctc || '',
        description: job.description,
        isActive: job.is_active
      });
    } else {
      setCurrentJob({ id: null, title: '', category: '', location: '', type: 'Full-time', experience: '', ctc: '', description: '', isActive: true });
    }
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const toggleActive = async (job, e) => {
    // Legacy function, kept for backward compatibility if needed, but not exposed in UI
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;
    
    const { error } = await supabaseAdmin.from('jobs').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete job');
    } else {
      toast.success('Job deleted successfully');
      fetchJobs();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentJob.title || !currentJob.category || !currentJob.location || !currentJob.type || !currentJob.experience || !currentJob.description) {
      toast.error('All required fields must be filled');
      return;
    }

    setIsSaving(true);
    try {
      if (modalMode === 'add') {
        const { error } = await supabaseAdmin.from('jobs').insert([{
          title: currentJob.title,
          category: currentJob.category,
          location: currentJob.location,
          type: currentJob.type,
          experience: currentJob.experience,
          ctc: currentJob.ctc,
          description: currentJob.description,
          is_active: true
        }]);
        if (error) throw error;
        toast.success('Job published successfully');
      } else {
        const { error } = await supabaseAdmin.from('jobs').update({
          title: currentJob.title,
          category: currentJob.category,
          location: currentJob.location,
          type: currentJob.type,
          experience: currentJob.experience,
          ctc: currentJob.ctc,
          description: currentJob.description,
          is_active: true
        }).eq('id', currentJob.id);
        if (error) throw error;
        toast.success('Job updated successfully');
      }
      closePanel();
      fetchJobs();
    } catch (err) {
      console.error("Error saving job:", err);
      toast.error(`Failed to ${modalMode} job: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: "Newsreader, serif" }}>Job Listings</h1>
          <p className="text-gray-400 mt-1">Manage open positions on the careers page.</p>
        </div>
        <button 
          onClick={(e) => openPanel('add', null, e)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#c6a96b] text-black font-semibold rounded-lg text-sm transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(198,169,107,0.4)]"
        >
          <FiPlus /> Create New Listing
        </button>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#151515] border-b border-[#1f1f1f] text-[#c6a96b] uppercase tracking-widest text-[10px] font-semibold">
               <tr>
                <th className="px-6 py-5">Position Title</th>
                <th className="px-6 py-5">Department & Location</th>
                <th className="px-6 py-5 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {loading ? (
                <tr><td colSpan="3" className="text-center py-12 text-[#c6a96b] uppercase tracking-widest text-xs animate-pulse">Initializing Data...</td></tr>
              ) : jobs.length === 0 ? (
                <tr><td colSpan="3" className="text-center py-12 text-gray-500 italic">No job listings found in the database.</td></tr>
              ) : jobs.map((job) => (
                <React.Fragment key={job.id}>
                  <tr 
                    onClick={() => toggleExpand(job.id)}
                    className="hover:bg-[#131313] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium text-white group-hover:text-[#c6a96b] transition-colors text-base">{job.title}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-gray-300 font-medium">{job.category}</div>
                      <div className="text-gray-500 text-xs mt-1">{job.location} • {job.type}</div>
                    </td>
                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={(e) => openPanel('edit', job, e)}
                          className="p-2 text-gray-400 hover:text-[#c6a96b] hover:bg-[#c6a96b]/10 rounded transition-all" title="Edit Listing"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(job.id, e)} 
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all" title="Permanently Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === job.id && (
                    <tr className="bg-black">
                      <td colSpan="3" className="px-6 py-8 border-l-4 border-[#c6a96b]">
                        <div className="max-w-4xl">
                          <h4 className="text-[#c6a96b] text-xs uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2">
                            <FiCheckCircle /> Internal Description Preview
                          </h4>
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm bg-[#111] p-4 rounded-lg border border-[#1f1f1f]">
                            {job.description || <span className="italic text-gray-600">No description provided.</span>}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Slide-Over Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closePanel}
          />
          
          {/* Panel */}
          <div className="relative w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-slideInRight">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f1f1f] bg-[#111]">
              <h2 className="text-xl font-semibold text-white tracking-wide">
                {modalMode === 'add' ? 'Create New Listing' : 'Edit Listing'}
              </h2>
              <button 
                onClick={closePanel}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#1f1f1f] rounded-full"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <form id="job-form" onSubmit={handleSave} className="space-y-6">

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Position Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={currentJob.title} 
                      onChange={e => setCurrentJob({...currentJob, title: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                      placeholder="e.g. Senior Research Scientist" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Department / Category <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={currentJob.category} 
                      onChange={e => setCurrentJob({...currentJob, category: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                      placeholder="e.g. AI RESEARCH" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Location <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={currentJob.location} 
                        onChange={e => setCurrentJob({...currentJob, location: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                        placeholder="e.g. Remote" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Job Type <span className="text-red-500">*</span></label>
                      <select 
                        required
                        value={currentJob.type} 
                        onChange={e => setCurrentJob({...currentJob, type: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm appearance-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Experience Required <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={currentJob.experience} 
                        onChange={e => setCurrentJob({...currentJob, experience: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                        placeholder="e.g. 5+ Years" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">CTC / Salary (Optional)</label>
                      <input 
                        type="text" 
                        value={currentJob.ctc} 
                        onChange={e => setCurrentJob({...currentJob, ctc: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                        placeholder="e.g. $150,000 - $180,000" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Detailed Description <span className="text-red-500">*</span></label>
                    <textarea 
                      required
                      value={currentJob.description} 
                      onChange={e => setCurrentJob({...currentJob, description: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm min-h-[200px] resize-y" 
                      placeholder="Enter the full job description, requirements, and responsibilities here..."
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-[#1f1f1f] bg-[#111] flex gap-3">
              <button 
                type="button"
                onClick={closePanel}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-transparent border border-[#333] rounded-lg hover:bg-[#1a1a1a] hover:border-[#444] transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="job-form"
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-black bg-[#c6a96b] rounded-lg hover:bg-white hover:shadow-[0_0_15px_rgba(198,169,107,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  <span>Save Listing</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJobs;
