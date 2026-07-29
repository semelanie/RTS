import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  LogOut, Home, Info, BookOpen, Anchor, FolderOpen, Newspaper,
  Users, Image, Save, Upload, ChevronDown, ChevronUp, Check, AlertCircle
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PAGES = [
  { key: 'homepage', label: 'Homepage', icon: Home },
  { key: 'about', label: 'About Us', icon: Info },
  { key: 'history', label: 'History', icon: BookOpen },
  { key: 'regatta', label: 'Regatta', icon: Anchor },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'news', label: 'News', icon: Newspaper },
  { key: 'tablers', label: 'Tablers', icon: Users },
];

const PAGE_SECTIONS: Record<string, { key: string; label: string; type: 'text' | 'image' | 'banner' }[]> = {
  homepage: [
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'modern_innovations_title', label: 'Modern Innovations Title', type: 'text' },
    { key: 'modern_innovations_text', label: 'Modern Innovations Text', type: 'text' },
    { key: 'what_is_rt_text', label: 'What is Round Table Text', type: 'text' },
    { key: 'why_text', label: 'Why Text', type: 'text' },
    { key: 'stats_members', label: 'Stats — Active Members', type: 'text' },
    { key: 'stats_years', label: 'Stats — Years Active', type: 'text' },
    { key: 'stats_funds', label: 'Stats — Funds Raised', type: 'text' },
    { key: 'stats_events', label: 'Stats — Events Held', type: 'text' },
  ],
  about: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'about_paragraph_1', label: 'About Paragraph 1', type: 'text' },
    { key: 'about_paragraph_2', label: 'About Paragraph 2', type: 'text' },
    { key: 'about_paragraph_3', label: 'About Paragraph 3', type: 'text' },
    { key: 'vision_text', label: 'Vision Text', type: 'text' },
    { key: 'mission_text', label: 'Mission Text', type: 'text' },
    { key: 'values_text', label: 'Core Values Text', type: 'text' },
    { key: 'global_movement_text', label: 'Global Movement Text', type: 'text' },
  ],
  history: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'history_paragraph_1', label: 'History Paragraph 1', type: 'text' },
    { key: 'history_paragraph_2', label: 'History Paragraph 2', type: 'text' },
    { key: 'history_paragraph_3', label: 'History Paragraph 3', type: 'text' },
  ],
  regatta: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'background_text', label: 'Background Text', type: 'text' },
    { key: 'miss_regatta_name', label: 'Current Miss Regatta Name', type: 'text' },
    { key: 'miss_regatta_desc', label: 'Current Miss Regatta Description', type: 'text' },
    { key: 'regatta_date', label: 'Next Regatta Date (YYYY-MM-DD)', type: 'text' },
  ],
  projects: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'intro_text', label: 'Intro Text', type: 'text' },
    { key: 'impact_funds', label: 'Impact — Funds Raised', type: 'text' },
    { key: 'impact_people', label: 'Impact — People Helped', type: 'text' },
    { key: 'impact_trees', label: 'Impact — Trees Planted', type: 'text' },
    { key: 'impact_students', label: 'Impact — Students Supported', type: 'text' },
  ],
  news: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
  ],
  tablers: [
    { key: 'hero_image', label: 'Hero Banner Image', type: 'image' },
    { key: 'life_as_tabler_text', label: 'Life as a Tabler Text', type: 'text' },
  ],
};

type ContentMap = Record<string, string>;
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const AdminDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('homepage');
  const [content, setContent] = useState<ContentMap>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    loadContent(activePage);
  }, [activePage]);

  const loadContent = async (page: string) => {
    const { data } = await supabase
      .from('site_content')
      .select('key, value')
      .eq('page', page);
    if (data) {
      const map: ContentMap = {};
      data.forEach((row) => { map[row.key] = row.value || ''; });
      setContent(map);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    const sections = PAGE_SECTIONS[activePage] || [];
    const upserts = sections.map((s) => ({
      page: activePage,
      section: activePage,
      content_type: s.type,
      key: s.key,
      value: content[s.key] || '',
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('site_content').upsert(upserts, { onConflict: 'page,key' });
    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploading((prev) => ({ ...prev, [key]: true }));
    const ext = file.name.split('.').pop();
    const path = `admin/${activePage}/${key}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('assets').upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from('assets').getPublicUrl(path);
      handleChange(key, data.publicUrl);
    }
    setUploading((prev) => ({ ...prev, [key]: false }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = PAGE_SECTIONS[activePage] || [];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#08142C] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <img
            src="https://gaofwzgqiyehlsaupjrn.supabase.co/storage/v1/object/public/assets/1.png"
            alt="RTS Logo"
            className="h-12 w-auto object-contain mb-3"
          />
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePage(p.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activePage === p.key ? 'bg-[#F88C24] text-white' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <p.icon size={18} /> {p.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 text-sm font-semibold transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-[#08142C]">
                {PAGES.find((p) => p.key === activePage)?.label} — Editor
              </h1>
              <p className="text-slate-500 text-sm mt-1">Edit content for this page and click Save.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full transition-colors ${
                saveStatus === 'saved'
                  ? 'bg-emerald-500 text-white'
                  : saveStatus === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-[#F88C24] hover:bg-[#e07d18] text-white'
              }`}
            >
              {saveStatus === 'saving' && <><Save size={18} /> Saving…</>}
              {saveStatus === 'saved' && <><Check size={18} /> Saved!</>}
              {saveStatus === 'error' && <><AlertCircle size={18} /> Error</>}
              {saveStatus === 'idle' && <><Save size={18} /> Save Changes</>}
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((s) => (
              <div key={s.key} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(s.key)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    {s.type === 'image' ? (
                      <Image size={16} className="text-[#5998d3]" />
                    ) : (
                      <Save size={16} className="text-[#F88C24]" />
                    )}
                    <span className="font-semibold text-[#08142C]">{s.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      s.type === 'image' ? 'bg-blue-100 text-blue-600' :
                      s.type === 'banner' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>{s.type}</span>
                  </div>
                  {expandedSections[s.key] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>

                {expandedSections[s.key] && (
                  <div className="px-6 pb-6 border-t border-slate-50">
                    {s.type === 'image' ? (
                      <div className="mt-4 space-y-3">
                        {content[s.key] && (
                          <img src={content[s.key]} alt={s.label} className="w-full h-48 object-cover rounded-xl" />
                        )}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={content[s.key] || ''}
                            onChange={(e) => handleChange(s.key, e.target.value)}
                            placeholder="Paste image URL or upload below"
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F88C24]"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => { fileRefs.current[s.key] = el; }}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleImageUpload(s.key, e.target.files[0]);
                            }}
                          />
                          <button
                            onClick={() => fileRefs.current[s.key]?.click()}
                            disabled={uploading[s.key]}
                            className="inline-flex items-center gap-2 bg-[#5998d3] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#4884c0] transition-colors disabled:opacity-60 text-sm"
                          >
                            <Upload size={16} /> {uploading[s.key] ? 'Uploading…' : 'Upload'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        {content[s.key]?.length > 100 || s.key.includes('paragraph') || s.key.includes('text') ? (
                          <textarea
                            rows={5}
                            value={content[s.key] || ''}
                            onChange={(e) => handleChange(s.key, e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F88C24] resize-y"
                          />
                        ) : (
                          <input
                            type="text"
                            value={content[s.key] || ''}
                            onChange={(e) => handleChange(s.key, e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F88C24]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
