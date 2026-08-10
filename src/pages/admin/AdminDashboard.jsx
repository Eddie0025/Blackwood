import React, { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiFileText, FiArrowRight, FiActivity, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { supabaseAdmin } from '../../lib/supabase';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ requests: 0, jobs: 0, articles: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counts
        const [reqRes, jobRes, artRes] = await Promise.all([
          supabaseAdmin.from('access_requests').select('*', { count: 'exact', head: true }),
          supabaseAdmin.from('jobs').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabaseAdmin.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', true)
        ]);

        setStats({
          requests: reqRes.count || 0,
          jobs: jobRes.count || 0,
          articles: artRes.count || 0
        });

        // Fetch recent requests
        const { data: recent } = await supabaseAdmin
          .from('access_requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        setRecentRequests(recent || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { name: 'Total Access Requests', value: stats.requests, trend: 'All Time', icon: <FiUsers className="text-[#c6a96b]" size={24} />, path: '/admin/requests' },
    { name: 'Active Jobs', value: stats.jobs, trend: 'Currently Public', icon: <FiBriefcase className="text-[#c6a96b]" size={24} />, path: '/admin/jobs' },
    { name: 'Published Articles', value: stats.articles, trend: 'Currently Public', icon: <FiFileText className="text-[#c6a96b]" size={24} />, path: '/admin/articles' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1510] to-[#0b0a09] border border-[#2a2215] p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <FiShield size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-green-500 text-xs font-mono uppercase tracking-widest">Network Secure • All Systems Operational</span>
            </div>
            <h1 className="text-4xl font-semibold text-white mb-2" style={{ fontFamily: "Newsreader, serif" }}>
              Welcome back, Administrator.
            </h1>
            <p className="text-gray-400 max-w-xl">
              Monitor incoming access requests, manage open positions, and oversee research publications across the Blackwood intelligence network.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button 
              onClick={() => navigate('/admin/requests')}
              className="px-6 py-3 bg-[#c6a96b] text-black font-semibold rounded-lg text-sm transition-colors hover:bg-white flex items-center justify-center gap-2"
            >
              Review Requests <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div 
            key={stat.name} 
            onClick={() => navigate(stat.path)}
            className="group relative bg-[#111] border border-[#1f1f1f] rounded-xl p-6 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#c6a96b]/30 hover:shadow-[0_0_30px_rgba(198,169,107,0.05)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c6a96b]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="p-3 bg-[#1a1510] rounded-lg border border-[#2a2215]">
                {stat.icon}
              </div>
              <span className="text-4xl font-light text-white tracking-tight">{stat.value}</span>
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-300 uppercase tracking-wider font-medium mb-1">{stat.name}</p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Access Requests (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-[#111] border border-[#1f1f1f] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2">
              <FiUsers className="text-[#c6a96b]" /> Priority Access Requests
            </h2>
            <button onClick={() => navigate('/admin/requests')} className="text-xs uppercase tracking-widest text-[#c6a96b] hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentRequests.map((req, i) => (
              <div key={req.id} className="group flex items-center justify-between p-4 bg-[#151515] border border-[#1f1f1f] rounded-lg hover:border-[#333] transition-colors cursor-pointer" onClick={() => navigate('/admin/requests')}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#c6a96b] font-semibold text-sm border border-[#2a2a2a]">
                    {req.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{req.full_name}</p>
                    <p className="text-xs text-gray-500">{req.organization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className="text-xs text-gray-500 hidden sm:inline-block">{new Date(req.created_at).toLocaleDateString()}</span>
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-wider rounded font-medium ${
                    req.status === 'new' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
            {recentRequests.length === 0 && !loading && (
              <div className="text-gray-500 text-sm py-4">No access requests found.</div>
            )}
          </div>
        </div>

        {/* System Activity Log */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2">
              <FiActivity className="text-[#c6a96b]" /> Activity Log
            </h2>
          </div>
          
          <div className="relative border-l border-[#1f1f1f] ml-3 pl-6 space-y-6 flex-1">
            {[
              { event: 'Database Backup Completed', time: '04:00 AM', type: 'system' },
              { event: 'New Job Posted: ML Engineer', time: 'Yesterday, 14:30', type: 'user' },
              { event: 'Security Audit Passed', time: 'Yesterday, 09:00', type: 'system' },
              { event: 'Article Published: Threat Landscape', time: 'Aug 8, 2025', type: 'user' },
            ].map((log, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#111] border-2 border-[#333]"></span>
                <p className="text-sm text-gray-300">{log.event}</p>
                <p className="text-xs text-gray-500 mt-1">{log.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
