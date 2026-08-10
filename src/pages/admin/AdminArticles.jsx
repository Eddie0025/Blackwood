import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle } from 'react-icons/fi';
import { supabaseAdmin } from '../../lib/supabase';
import toast from 'react-hot-toast';

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentArticle, setCurrentArticle] = useState({ id: null, title: '', category: '', date: '', read_time: '', content: '', isPublished: true });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openPanel = (mode, article = null, e = null) => {
    if (e) e.stopPropagation();
    setModalMode(mode);
    if (article) {
      setCurrentArticle({
        id: article.id,
        title: article.title,
        category: article.category,
        date: article.date,
        read_time: article.read_time,
        content: article.content,
        isPublished: article.is_published
      });
    } else {
      setCurrentArticle({ id: null, title: '', category: '', date: '', read_time: '', content: '', isPublished: true });
    }
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const togglePublished = async (article, e) => {
    e.stopPropagation();
    const { error } = await supabaseAdmin
      .from('articles')
      .update({ is_published: !article.is_published })
      .eq('id', article.id);
      
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(article.is_published ? 'Article hidden' : 'Article published');
      fetchArticles();
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete article');
    } else {
      toast.success('Article deleted successfully');
      fetchArticles();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentArticle.title || !currentArticle.category) {
      toast.error('Title and Category are required');
      return;
    }

    setIsSaving(true);
    const payload = {
      title: currentArticle.title,
      category: currentArticle.category,
      date: currentArticle.date,
      read_time: currentArticle.read_time,
      content: currentArticle.content,
      is_published: currentArticle.isPublished
    };

    try {
      if (modalMode === 'add') {
        const { error } = await supabaseAdmin.from('articles').insert([payload]);
        if (error) throw error;
        toast.success('Article published successfully');
      } else {
        const { error } = await supabaseAdmin.from('articles').update(payload).eq('id', currentArticle.id);
        if (error) throw error;
        toast.success('Article updated successfully');
      }
      closePanel();
      fetchArticles();
    } catch (err) {
      console.error("Error saving article:", err);
      toast.error(`Failed to ${modalMode} article`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: "Newsreader, serif" }}>Research Articles</h1>
          <p className="text-gray-400 mt-1">Manage articles on the research page.</p>
        </div>
        <button 
          onClick={(e) => openPanel('add', null, e)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#c6a96b] text-black font-semibold rounded-lg text-sm transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(198,169,107,0.4)]"
        >
          <FiPlus /> Create New Article
        </button>
      </div>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#151515] border-b border-[#1f1f1f] text-[#c6a96b] uppercase tracking-widest text-[10px] font-semibold">
              <tr>
                <th className="px-6 py-5">Article Title</th>
                <th className="px-6 py-5">Category & Date</th>
                <th className="px-6 py-5">Visibility Status</th>
                <th className="px-6 py-5 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-12 text-[#c6a96b] uppercase tracking-widest text-xs animate-pulse">Initializing Data...</td></tr>
              ) : articles.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-12 text-gray-500 italic">No research articles found in the database.</td></tr>
              ) : articles.map((article) => (
                <React.Fragment key={article.id}>
                  <tr 
                    onClick={() => toggleExpand(article.id)}
                    className="hover:bg-[#131313] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium text-white group-hover:text-[#c6a96b] transition-colors text-base">{article.title}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-gray-300 font-medium">{article.category}</div>
                      <div className="text-gray-500 text-xs mt-1">{article.date}</div>
                    </td>
                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={(e) => togglePublished(article, e)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                          article.is_published 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20'
                        }`}
                      >
                        {article.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={(e) => openPanel('edit', article, e)}
                          className="p-2 text-gray-400 hover:text-[#c6a96b] hover:bg-[#c6a96b]/10 rounded transition-all" title="Edit Article"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(article.id, e)} 
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all" title="Permanently Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === article.id && (
                    <tr className="bg-black">
                      <td colSpan="4" className="px-6 py-8 border-l-4 border-[#c6a96b]">
                        <div className="max-w-4xl">
                          <h4 className="text-[#c6a96b] text-xs uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2">
                            <FiCheckCircle /> Article Content Preview
                          </h4>
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm bg-[#111] p-4 rounded-lg border border-[#1f1f1f]">
                            {article.content || <span className="italic text-gray-600">No content provided.</span>}
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
                {modalMode === 'add' ? 'Create New Article' : 'Edit Article'}
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
              <form id="article-form" onSubmit={handleSave} className="space-y-6">
                
                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#111] rounded-lg border border-[#1f1f1f]">
                  <div>
                    <h3 className="text-sm font-medium text-white">Public Visibility</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Publish this article to the public research page.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={currentArticle.isPublished}
                      onChange={e => setCurrentArticle({...currentArticle, isPublished: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-[#222] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c6a96b]"></div>
                  </label>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Article Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={currentArticle.title} 
                      onChange={e => setCurrentArticle({...currentArticle, title: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                      placeholder="e.g. The Zero-Trust Paradox" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Research Category <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={currentArticle.category} 
                      onChange={e => setCurrentArticle({...currentArticle, category: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                      placeholder="e.g. THREAT INTELLIGENCE" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Publish Date</label>
                      <input 
                        type="text" 
                        value={currentArticle.date} 
                        onChange={e => setCurrentArticle({...currentArticle, date: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                        placeholder="e.g. MARCH 12, 2025" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Read Time</label>
                      <input 
                        type="text" 
                        value={currentArticle.read_time} 
                        onChange={e => setCurrentArticle({...currentArticle, read_time: e.target.value})} 
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm" 
                        placeholder="e.g. 5 MIN READ" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-[#c6a96b] font-semibold">Article Content</label>
                    <textarea 
                      value={currentArticle.content} 
                      onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})} 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white outline-none focus:border-[#c6a96b] focus:ring-1 focus:ring-[#c6a96b] transition-all text-sm min-h-[250px] resize-y" 
                      placeholder="Enter the full article content here..."
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
                form="article-form"
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-black bg-[#c6a96b] rounded-lg hover:bg-white hover:shadow-[0_0_15px_rgba(198,169,107,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  <span>Save Article</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminArticles;
