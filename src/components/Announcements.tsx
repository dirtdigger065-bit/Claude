import React, { useState, useEffect, useRef } from 'react';
import type { Announcement, SafetyTopic, User } from '../types';
import { getAnnouncements, saveAnnouncements, getSafetyTopics, saveSafetyTopics, genId, now } from '../utils/supabase';

interface Props {
  currentUser: User;
}

/* ── image helper ── */
function compressImage(file: File, maxW = 800): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/* ── PDF to images helper using pdf.js CDN ── */
async function pdfToImages(file: File, maxW = 1200): Promise<string[]> {
  // Load pdf.js from CDN
  const pdfjsSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  const workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  if (!(window as any).pdfjsLib) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = pdfjsSrc;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load pdf.js'));
      document.head.appendChild(script);
    });
  }

  const pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const scale = Math.min(maxW / viewport.width, 2); // Up to 2x for clarity
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const ctx = canvas.getContext('2d')!;

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    pages.push(canvas.toDataURL('image/jpeg', 0.85));
  }

  return pages;
}

export function Announcements({ currentUser }: Props) {
  const [tab, setTab] = useState<'announcements' | 'safety'>('announcements');

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📢 Shop TV Management</h2>

      {/* Tab bar */}
      <div className="tabs tabs-bordered mb-4">
        <button className={`tab ${tab === 'announcements' ? 'tab-active' : ''}`} onClick={() => setTab('announcements')}>
          📢 Announcements
        </button>
        <button className={`tab ${tab === 'safety' ? 'tab-active' : ''}`} onClick={() => setTab('safety')}>
          🦺 Toolbox Talks
        </button>
      </div>

      {tab === 'announcements' ? (
        <AnnouncementsTab currentUser={currentUser} />
      ) : (
        <SafetyTab currentUser={currentUser} />
      )}

      {/* TV URL info */}
      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h3 className="font-semibold text-sm mb-2">📺 Yodeck Setup</h3>
        <p className="text-xs text-base-content/60 mb-2">Add this URL as a Web Page widget in Yodeck:</p>
        <code className="text-xs bg-base-300 px-3 py-2 rounded block select-all">
          https://fieldops.rdmpe.com/?token=rdmpe2026
        </code>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ANNOUNCEMENTS TAB
   ════════════════════════════════════════ */
function AnnouncementsTab({ currentUser }: { currentUser: User }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [expiresIn, setExpiresIn] = useState('never');
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await getAnnouncements();
    setAnnouncements(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
    setLoading(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setImagePreview(compressed);
    e.target.value = '';
  };

  const handlePost = async () => {
    if (!message.trim() && !imagePreview) return;
    setSaving(true);

    let expires_at: string | undefined;
    if (expiresIn === '1d') { const d = new Date(); d.setDate(d.getDate() + 1); expires_at = d.toISOString(); }
    else if (expiresIn === '3d') { const d = new Date(); d.setDate(d.getDate() + 3); expires_at = d.toISOString(); }
    else if (expiresIn === '1w') { const d = new Date(); d.setDate(d.getDate() + 7); expires_at = d.toISOString(); }

    const newAnn: Announcement = {
      id: genId('ann'),
      message: message.trim(),
      priority,
      created_by: currentUser.name,
      created_at: now(),
      expires_at,
      active: true,
      image: imagePreview || undefined,
    };

    const all = await getAnnouncements();
    all.push(newAnn);
    await saveAnnouncements(all);
    setMessage('');
    setPriority('normal');
    setExpiresIn('never');
    setImagePreview('');
    setSaving(false);
    load();
  };

  const toggleActive = async (id: string) => {
    const all = await getAnnouncements();
    const idx = all.findIndex(a => a.id === id);
    if (idx >= 0) { all[idx].active = !all[idx].active; await saveAnnouncements(all); load(); }
  };

  const deleteAnn = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const all = await getAnnouncements();
    await saveAnnouncements(all.filter(a => a.id !== id));
    load();
  };

  const isExpired = (a: Announcement) => a.expires_at && new Date(a.expires_at) < new Date();

  return (
    <>
      <p className="text-sm text-base-content/60 mb-4">
        Post messages and images that show on the shop TV. Urgent messages are highlighted in red.
      </p>

      {/* New announcement form */}
      <div className="card bg-base-200 p-4 mb-6">
        <h3 className="font-semibold mb-3">Post New Announcement</h3>
        <textarea
          className="textarea textarea-bordered w-full mb-3"
          rows={3}
          placeholder="Type your announcement..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        {/* Image upload */}
        <div className="mb-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          <button className="btn btn-sm btn-outline gap-1" onClick={() => fileRef.current?.click()}>
            📷 {imagePreview ? 'Change Image' : 'Add Image'}
          </button>
          {imagePreview && (
            <div className="mt-2 relative inline-block">
              <img src={imagePreview} alt="preview" className="h-32 rounded border" />
              <button
                className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
                onClick={() => setImagePreview('')}
              >✕</button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="label label-text text-xs">Priority</label>
            <select className="select select-sm select-bordered" value={priority} onChange={e => setPriority(e.target.value as 'normal' | 'urgent')}>
              <option value="normal">Normal</option>
              <option value="urgent">🚨 Urgent</option>
            </select>
          </div>
          <div>
            <label className="label label-text text-xs">Expires</label>
            <select className="select select-sm select-bordered" value={expiresIn} onChange={e => setExpiresIn(e.target.value)}>
              <option value="never">Never</option>
              <option value="1d">After 1 day</option>
              <option value="3d">After 3 days</option>
              <option value="1w">After 1 week</option>
            </select>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handlePost} disabled={(!message.trim() && !imagePreview) || saving}>
            {saving ? 'Posting...' : '📢 Post'}
          </button>
        </div>
      </div>

      {/* Existing */}
      {loading ? (
        <div className="text-center py-8"><span className="loading loading-spinner" /></div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-8 text-base-content/50">No announcements yet</div>
      ) : (
        <div className="space-y-3">
          {announcements.map(a => (
            <div
              key={a.id}
              className={`card p-4 border ${
                !a.active ? 'bg-base-200 opacity-50 border-base-300' :
                a.priority === 'urgent' ? 'bg-error/10 border-error/30' : 'bg-base-200 border-base-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {a.priority === 'urgent' && a.active && <span className="badge badge-error badge-sm mr-2">URGENT</span>}
                  {!a.active && <span className="badge badge-ghost badge-sm mr-2">HIDDEN</span>}
                  {isExpired(a) && <span className="badge badge-warning badge-sm mr-2">EXPIRED</span>}
                  {a.message && <p className="text-base mt-1">{a.message}</p>}
                  {a.image && <img src={a.image} alt="" className="mt-2 h-24 rounded border" />}
                  <p className="text-xs text-base-content/50 mt-2">
                    by {a.created_by} • {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    {a.expires_at && ` • Expires ${new Date(a.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className={`btn btn-xs ${a.active ? 'btn-ghost' : 'btn-success'}`} onClick={() => toggleActive(a.id)}>
                    {a.active ? 'Hide' : 'Show'}
                  </button>
                  <button className="btn btn-xs btn-ghost text-error" onClick={() => deleteAnn(a.id)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════
   SAFETY / TOOLBOX TALK TAB
   ════════════════════════════════════════ */
function SafetyTab({ currentUser }: { currentUser: User }) {
  const [topics, setTopics] = useState<SafetyTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [pdfProcessing, setPdfProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await getSafetyTopics();
    setTopics(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
    setLoading(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setImagePreview(compressed);
    e.target.value = '';
  };

  const handlePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfProcessing(true);
    try {
      const pages = await pdfToImages(file, 1400);
      setPdfPages(pages);
      // Auto-fill title from filename if empty
      if (!title.trim()) {
        const name = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
        setTitle(name);
      }
    } catch (err) {
      alert('Failed to process PDF. Please try again or use an image instead.');
      console.error('PDF processing error:', err);
    }
    setPdfProcessing(false);
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    // Need either content, image, or PDF pages
    if (!content.trim() && !imagePreview && pdfPages.length === 0) return;
    setSaving(true);
    const all = await getSafetyTopics();

    if (editingId) {
      const idx = all.findIndex(t => t.id === editingId);
      if (idx >= 0) {
        all[idx].title = title.trim();
        all[idx].content = content.trim();
        if (imagePreview) all[idx].image = imagePreview;
        if (pdfPages.length > 0) all[idx].pdfPages = pdfPages;
        if (!imagePreview && pdfPages.length === 0) {
          // Clear if explicitly removed
          if (!all[idx].image) delete all[idx].image;
          if (!all[idx].pdfPages?.length) delete all[idx].pdfPages;
        }
      }
    } else {
      all.push({
        id: genId('safety'),
        title: title.trim(),
        content: content.trim(),
        image: imagePreview || undefined,
        pdfPages: pdfPages.length > 0 ? pdfPages : undefined,
        created_by: currentUser.name,
        created_at: now(),
        active: true,
      });
    }

    await saveSafetyTopics(all);
    setTitle('');
    setContent('');
    setImagePreview('');
    setPdfPages([]);
    setEditingId(null);
    setSaving(false);
    load();
  };

  const startEdit = (t: SafetyTopic) => {
    setEditingId(t.id);
    setTitle(t.title);
    setContent(t.content);
    setImagePreview(t.image || '');
    setPdfPages(t.pdfPages || []);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImagePreview('');
    setPdfPages([]);
  };

  const toggleActive = async (id: string) => {
    const all = await getSafetyTopics();
    const idx = all.findIndex(t => t.id === id);
    if (idx >= 0) { all[idx].active = !all[idx].active; await saveSafetyTopics(all); load(); }
  };

  const deleteTopic = async (id: string) => {
    if (!confirm('Delete this safety topic?')) return;
    const all = await getSafetyTopics();
    await saveSafetyTopics(all.filter(t => t.id !== id));
    load();
  };

  // Figure out which topic is "this week's"
  const currentWeek = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  const activeTopics = topics.filter(t => t.active);
  const currentTopicIdx = activeTopics.length > 0 ? currentWeek % activeTopics.length : -1;

  return (
    <>
      <p className="text-sm text-base-content/60 mb-4">
        Add safety topics / toolbox talks. One topic is automatically shown each week on the shop TV, rotating through all active topics.
        Upload a <strong>PDF</strong> (like a Secura Safety Talk) and each page will display full-screen on the TV!
      </p>

      {activeTopics.length > 0 && currentTopicIdx >= 0 && (
        <div className="alert alert-info mb-4">
          <span>🦺 <strong>This week's topic:</strong> {activeTopics[currentTopicIdx].title}</span>
          <span className="text-xs opacity-70 ml-2">({activeTopics.length} active topics in rotation)</span>
        </div>
      )}

      {/* Form */}
      <div className="card bg-base-200 p-4 mb-6">
        <h3 className="font-semibold mb-3">{editingId ? '✏️ Edit Topic' : '➕ Add Safety Topic'}</h3>
        <input
          className="input input-bordered w-full mb-3"
          placeholder="Topic title (e.g., Underground Utilities)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-3"
          rows={3}
          placeholder="Key talking points (optional if uploading a PDF)..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        {/* Upload buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          <input ref={pdfRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handlePdf} />

          <button className="btn btn-sm btn-outline gap-1" onClick={() => pdfRef.current?.click()} disabled={pdfProcessing}>
            {pdfProcessing ? (
              <><span className="loading loading-spinner loading-xs" /> Processing PDF...</>
            ) : (
              <>📄 {pdfPages.length > 0 ? `Change PDF (${pdfPages.length} pages)` : 'Upload PDF'}</>
            )}
          </button>

          <button className="btn btn-sm btn-outline gap-1" onClick={() => fileRef.current?.click()}>
            📷 {imagePreview ? 'Change Image' : 'Add Image'}
          </button>

          <span className="text-xs text-base-content/50 self-center">PDF pages show full-screen on the TV</span>
        </div>

        {/* PDF preview */}
        {pdfPages.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">📄 PDF Pages ({pdfPages.length})</span>
              <button className="btn btn-xs btn-error btn-outline" onClick={() => setPdfPages([])}>Remove PDF</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {pdfPages.map((page, i) => (
                <div key={i} className="flex-shrink-0 relative">
                  <img src={page} alt={`Page ${i + 1}`} className="h-32 rounded border" />
                  <span className="absolute bottom-1 right-1 badge badge-sm badge-neutral">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img src={imagePreview} alt="preview" className="h-32 rounded border" />
            <button className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2" onClick={() => setImagePreview('')}>✕</button>
          </div>
        )}

        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={!title.trim() || (!content.trim() && !imagePreview && pdfPages.length === 0) || saving || pdfProcessing}
          >
            {saving ? 'Saving...' : editingId ? '💾 Update' : '➕ Add Topic'}
          </button>
          {editingId && <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>

      {/* Topics list */}
      {loading ? (
        <div className="text-center py-8"><span className="loading loading-spinner" /></div>
      ) : topics.length === 0 ? (
        <div className="text-center py-8 text-base-content/50">
          <p className="text-lg mb-2">🦺</p>
          <p>No safety topics yet. Upload a toolbox talk PDF or add one above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map(t => {
            const isCurrentWeek = t.active && activeTopics[currentTopicIdx]?.id === t.id;
            return (
              <div
                key={t.id}
                className={`card p-4 border ${
                  !t.active ? 'bg-base-200 opacity-50 border-base-300' :
                  isCurrentWeek ? 'bg-success/10 border-success/40' : 'bg-base-200 border-base-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {isCurrentWeek && <span className="badge badge-success badge-sm mr-2">THIS WEEK</span>}
                    {!t.active && <span className="badge badge-ghost badge-sm mr-2">INACTIVE</span>}
                    <h4 className="font-semibold">{t.title}</h4>
                    {t.pdfPages && t.pdfPages.length > 0 && (
                      <span className="badge badge-outline badge-sm mt-1">📄 {t.pdfPages.length}-page PDF</span>
                    )}
                    {t.content && (
                      <p className="text-sm text-base-content/70 mt-1 whitespace-pre-wrap">
                        {t.content.length > 200 ? t.content.slice(0, 200) + '...' : t.content}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {t.image && <img src={t.image} alt="" className="h-20 rounded border" />}
                      {t.pdfPages && t.pdfPages.length > 0 && (
                        <div className="flex gap-1">
                          {t.pdfPages.slice(0, 3).map((p, i) => (
                            <img key={i} src={p} alt={`p${i+1}`} className="h-20 rounded border" />
                          ))}
                          {t.pdfPages.length > 3 && (
                            <div className="h-20 w-16 bg-base-300 rounded border flex items-center justify-center text-xs">
                              +{t.pdfPages.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-base-content/50 mt-2">
                      by {t.created_by} • {new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="btn btn-xs btn-ghost" onClick={() => startEdit(t)}>✏️</button>
                    <button className={`btn btn-xs ${t.active ? 'btn-ghost' : 'btn-success'}`} onClick={() => toggleActive(t.id)}>
                      {t.active ? 'Hide' : 'Show'}
                    </button>
                    <button className="btn btn-xs btn-ghost text-error" onClick={() => deleteTopic(t.id)}>✕</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
