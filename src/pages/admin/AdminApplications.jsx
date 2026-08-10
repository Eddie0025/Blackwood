import React, { useState, useEffect } from 'react';
import { supabaseAdmin } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { FiDownload, FiTrash2, FiExternalLink } from 'react-icons/fi';

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('job_applications')
        .select(`
          id,
          name,
          email,
          number,
          location,
          experience,
          ctc,
          resume_url,
          created_at,
          jobs ( title, category )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    
    // The resume file in storage will remain unless explicitly deleted via storage API. 
    // For simplicity, we just delete the database record.
    const { error } = await supabaseAdmin.from('job_applications').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete application');
    } else {
      toast.success('Application deleted');
      fetchApplications();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "Newsreader, serif" }}>Job Applications</h1>
        <p className="text-gray-400 mt-1">Review candidates who have applied for open positions.</p>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#151515] border-b border-[#1f1f1f] text-[#c6a96b] uppercase tracking-widest text-[10px] font-semibold">
              <tr>
                <th className="px-6 py-5">Applicant Details</th>
                <th className="px-6 py-5">Position Applied For</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-12 text-[#c6a96b] uppercase tracking-widest text-xs animate-pulse">Initializing Data...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-12 text-gray-500 italic">No applications found in the database.</td></tr>
              ) : applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#131313] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-medium text-white text-base">{app.name}</div>
                    <div className="text-gray-400 text-xs mt-1">{app.email}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{app.number} • {app.location}</div>
                    <div className="text-gray-500 text-xs mt-0.5">Exp: {app.experience || 'N/A'} {app.ctc ? `• CTC: ${app.ctc}` : ''}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-gray-300 font-medium">{app.jobs?.title || 'Unknown Position'}</div>
                    <div className="text-[#c6a96b] text-[10px] uppercase tracking-widest mt-1">{app.jobs?.category || ''}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-gray-400 text-sm">
                      {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <a 
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] text-white hover:text-[#c6a96b] border border-[#333] hover:border-[#c6a96b] rounded transition-all text-xs font-medium"
                      >
                        <FiExternalLink /> Resume
                      </a>
                      <button 
                        onClick={() => handleDelete(app.id)} 
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all" title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminApplications;
