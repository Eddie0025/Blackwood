import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import { supabaseAdmin } from '../../lib/supabase';
import toast from 'react-hot-toast';

function AdminAccessRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabaseAdmin
      .from('access_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } else {
      setRequests(data);
    }
    setLoading(false);
  };

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const updateStatus = async (id, newStatus, e) => {
    e.stopPropagation();
    const { error } = await supabaseAdmin
      .from('access_requests')
      .update({ status: newStatus.toLowerCase() })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchRequests();
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'new': return 'bg-yellow-500/10 text-yellow-500';
      case 'reviewed': return 'bg-blue-500/10 text-blue-500';
      case 'contacted': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: "Newsreader, serif" }}>Access Requests</h1>
          <p className="text-gray-400 mt-1">Manage platform access requests from organizations.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-md text-sm transition-colors">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a1a] border-b border-[#1f1f1f] text-gray-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Email</th>
                <th className="px-6 py-4 font-medium">Organization / Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {requests.map((req) => (
                <React.Fragment key={req.id}>
                  <tr 
                    onClick={() => toggleExpand(req.id)}
                    className="hover:bg-[#151515] transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{req.full_name}</div>
                      <div className="text-gray-500 text-xs mt-1">{req.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{req.organization}</div>
                      <div className="text-gray-500 text-xs mt-1">{new Date(req.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => updateStatus(req.id, 'New', e)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            req.status.toLowerCase() === 'new' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          New
                        </button>
                        <button 
                          onClick={(e) => updateStatus(req.id, 'Reviewed', e)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            req.status.toLowerCase() === 'reviewed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          Reviewed
                        </button>
                        <button 
                          onClick={(e) => updateStatus(req.id, 'Contacted', e)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            req.status.toLowerCase() === 'contacted' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          Contacted
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === req.id && (
                    <tr className="bg-[#131313]">
                      <td colSpan="3" className="px-6 py-6 border-l-2 border-[#c6a96b]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-[#c6a96b] text-xs uppercase tracking-wider mb-2">Message</h4>
                            <p className="text-gray-300 whitespace-pre-wrap">{req.message}</p>
                          </div>
                          <div>
                            <h4 className="text-[#c6a96b] text-xs uppercase tracking-wider mb-2">Quick Actions</h4>
                            <div className="flex gap-3">
                              <a 
                                href={`mailto:${req.email}`}
                                className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded text-sm transition-colors text-white"
                              >
                                Reply via Email
                              </a>
                            </div>
                          </div>
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
    </div>
  );
}

export default AdminAccessRequests;
