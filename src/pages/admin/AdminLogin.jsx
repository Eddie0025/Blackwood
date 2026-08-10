import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Invalid credentials');
      setLoading(false);
    } else {
      toast.success('Login successful');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Blackwood" className="w-16 h-16 mx-auto mb-6 object-contain" />
          <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "Newsreader, serif" }}>Admin Access</h1>
          <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">Blackwood Technologies</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-sans">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c6a96b] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors"
                placeholder="admin@blackwoodtech.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2 font-sans">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c6a96b] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c6a96b] text-black font-semibold rounded-lg px-4 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300 mt-4 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8 font-sans">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
