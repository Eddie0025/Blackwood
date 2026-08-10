import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

function AdminContact() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Michael Chen', email: 'm.chen@university.edu', subject: 'Research Collaboration', date: '2025-08-10', isRead: false, message: 'I am a researcher at MIT looking to collaborate on your latest findings regarding autonomous agent swarm behaviors.' },
    { id: 2, name: 'Sarah Jenkins', email: 's.jenkins@press.org', subject: 'Interview Request', date: '2025-08-09', isRead: true, message: 'Would someone from your leadership team be available for an interview next week on the state of AI safety?' },
  ]);

  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    if (expandedId !== id) {
      setMessages(messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
    }
  };

  const openReplyModal = (msg, e) => {
    if (e) e.stopPropagation();
    setReplyTo(msg);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "Newsreader, serif" }}>Contact Messages</h1>
        <p className="text-gray-400 mt-1">General inquiries from the contact form.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1f1f1f] text-gray-500 text-xs uppercase">
              <th className="px-6 py-4 font-normal">Sender</th>
              <th className="px-6 py-4 font-normal">Subject</th>
              <th className="px-6 py-4 font-normal">Date</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                <tr 
                  onClick={() => toggleExpand(msg.id)}
                  className={`hover:bg-[#151515] transition-colors cursor-pointer ${!msg.isRead ? 'bg-[#1a1510]' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className={`font-medium ${!msg.isRead ? 'text-[#c6a96b]' : 'text-white'}`}>
                      {msg.name}
                      {!msg.isRead && <span className="ml-2 inline-block w-2 h-2 bg-[#c6a96b] rounded-full"></span>}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{msg.subject}</td>
                  <td className="px-6 py-4 text-gray-400">{msg.date}</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={(e) => openReplyModal(msg, e)}
                        className="text-[#c6a96b] hover:text-white transition-colors text-sm font-medium"
                      >
                        Reply
                      </button>
                      <button className="text-red-500/70 hover:text-red-500 transition-colors" title="Delete">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === msg.id && (
                  <tr className="bg-[#131313]">
                    <td colSpan="4" className="px-6 py-6 border-l-2 border-[#c6a96b]">
                      <div>
                        <h4 className="text-[#c6a96b] text-xs uppercase tracking-wider mb-2">Message Body</h4>
                        <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                        <button 
                          onClick={(e) => openReplyModal(msg, e)}
                          className="mt-6 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded text-sm transition-colors text-white"
                        >
                          Reply via Email
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && replyTo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "Newsreader, serif" }}>
              Reply to {replyTo.name}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">To</label>
                <input type="text" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded p-2 text-gray-500 outline-none" value={replyTo.email} disabled />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">Subject</label>
                <input type="text" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded p-2 text-white outline-none" defaultValue={`Re: ${replyTo.subject}`} />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">Message</label>
                <textarea className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded p-2 text-white outline-none min-h-[150px]" placeholder="Type your reply..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#c6a96b] text-black font-semibold rounded hover:bg-white transition-colors"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContact;
