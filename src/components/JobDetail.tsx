import React, { useState, useEffect } from 'react';
import { ArrowLeft, ClipboardList, Clock, Camera, MapPin, Package, Wrench, Edit2, Check, Users, CheckCircle2, FileCheck } from 'lucide-react';
import { Job, DailyLog, TimeEntry, Photo, ScopeItem, LaborItem, User, CompletionChecklist } from '../types';
import { getDailyLogs, getAllTimeEntries, getPhotos, savePhotos, getJobs, saveJobs, now as nowFn, centralDate } from '../utils/supabase';

interface Props {
  job: Job;
  currentUser: User;
  users: User[];
  onBack: () => void;
  onNavigateDailyLog: (jobId: string, logId?: string) => void;
  onNavigateTimeEntry: (jobId: string) => void;
  onNavigatePhotos: (jobId: string) => void;
  onRefresh: () => void;
}

export const JobDetail: React.FC<Props> = ({ job, currentUser, users, onBack, onNavigateDailyLog, onNavigateTimeEntry, onNavigatePhotos, onRefresh }) => {
  const [tab, setTab] = useState<'info' | 'logs' | 'time' | 'photos'>('info');
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editing, setEditing] = useState(false);
  const [editClientName, setEditClientName] = useState(job.client_name);
  const [editAddress, setEditAddress] = useState(job.project_address || '');
  const [editDesc, setEditDesc] = useState(job.project_description);
  const [editStatus, setEditStatus] = useState(job.status);
  const [editAssigned, setEditAssigned] = useState<string[]>(job.assigned_user_ids || []);
  const [editLocateDate, setEditLocateDate] = useState(job.locate_date || '');
  const [editLocateNumber, setEditLocateNumber] = useState(job.locate_number || '');
  const [editJobNumber, setEditJobNumber] = useState(job.job_number);
  const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null);
  const [editingCaption, setEditingCaption] = useState('');
  const [editingPhotoType, setEditingPhotoType] = useState('');
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [checklist, setChecklist] = useState<CompletionChecklist>({
    time_entries_complete: false, trucking_tickets_entered: false,
    rock_tickets_submitted: false, material_receipts_submitted: false,
    final_photos_uploaded: false, daily_logs_complete: false,
    billing_notes: '', completed_by: '', completed_at: ''
  });

  const items: ScopeItem[] = (() => { try { return JSON.parse(job.items_json || '[]'); } catch { return []; } })();
  const labor: LaborItem[] = (() => { try { return JSON.parse(job.labor_json || '[]'); } catch { return []; } })();
  const canEdit = ['admin', 'office', 'foreman'].includes(currentUser.role);

  useEffect(() => { loadRelated(); }, [job.id]);

  const loadRelated = async () => {
    try {
      const [allLogs, allTime, allPhotos] = await Promise.all([getDailyLogs(), getAllTimeEntries(users), getPhotos()]);
      setLogs(allLogs.filter(l => l.job_id === job.id).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10));
      setTimeEntries(allTime.filter(t => t.job_id === job.id).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20));
      setPhotos(allPhotos.filter(p => p.job_id === job.id).sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 20));
    } catch (err) { console.error('Failed to load related:', err); }
  };

  const saveEdits = async () => {
    try {
      const allJobs = await getJobs();
      const idx = allJobs.findIndex(j => j.id === job.id);
      if (idx >= 0) {
        allJobs[idx] = { ...allJobs[idx], job_number: editJobNumber, client_name: editClientName, project_address: editAddress, project_description: editDesc, status: editStatus, assigned_user_ids: editAssigned, locate_date: editLocateDate || '', locate_number: editLocateNumber || '', updated_at: nowFn() };
        await saveJobs(allJobs);
      }
      setEditing(false);
      onRefresh();
    } catch (err) { console.error('Save failed:', err); }
  };

  const deleteJob = async () => {
    const hasData = logs.length > 0 || timeEntries.length > 0 || photos.length > 0;
    const warning = hasData
      ? `\n\n⚠️ This job has ${logs.length} daily log(s), ${timeEntries.length} time entr(y/ies), and ${photos.length} photo(s) attached. It will be removed from all lists.`
      : '';
    if (!confirm(`Permanently delete job ${job.job_number} — ${job.client_name}?${warning}\n\nThis cannot be undone.`)) return;
    setDeleting(true);
    try {
      const allJobs = await getJobs();
      const ok = await saveJobs(allJobs.filter(j => j.id !== job.id));
      if (!ok) { alert('Could not delete the job. Please check your connection and try again.'); setDeleting(false); return; }
      onBack();
      onRefresh();
    } catch (err) {
      console.error('Delete job failed:', err);
      alert('Something went wrong deleting the job. Please try again.');
    }
    setDeleting(false);
  };

  const toggleAssign = (uid: string) => {
    setEditAssigned(prev => prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]);
  };

  // Convert base64 data URL to a File object
  const dataUrlToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], filename, { type: mime });
  };

  // Download a single photo
  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.full_image || photo.thumbnail;
    const dateStr = centralDate(new Date(photo.taken_at || photo.created_at));
    const caption = (photo.caption || photo.photo_type || 'photo').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
    link.download = `${job.job_number}_${caption}_${dateStr}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share a single photo using native share API
  const sharePhoto = async (photo: Photo) => {
    const dateStr = centralDate(new Date(photo.taken_at || photo.created_at));
    const caption = photo.caption || photo.photo_type || 'Photo';
    const filename = `${job.job_number}_${caption.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}.jpg`;
    
    try {
      const file = dataUrlToFile(photo.full_image || photo.thumbnail, filename);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${job.job_number} - ${caption}`,
          text: `Photo from ${job.job_number} - ${job.project_address || job.project_description || ''}\n${caption} (${dateStr})`,
          files: [file],
        });
      } else if (navigator.share) {
        // Fallback: share without file
        await navigator.share({
          title: `${job.job_number} - ${caption}`,
          text: `Photo from ${job.job_number} - ${job.project_address || job.project_description || ''}\n${caption} (${dateStr})`,
        });
      } else {
        // No share API - just download
        downloadPhoto(photo);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        downloadPhoto(photo); // Fallback to download
      }
    }
  };

  // Share/download multiple selected photos
  const shareSelectedPhotos = async () => {
    const selected = photos.filter(p => selectedPhotos.has(p.id));
    if (selected.length === 0) return;

    const files = selected.map(photo => {
      const dateStr = centralDate(new Date(photo.taken_at || photo.created_at));
      const caption = (photo.caption || photo.photo_type || 'photo').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
      return dataUrlToFile(photo.full_image || photo.thumbnail, `${job.job_number}_${caption}_${dateStr}.jpg`);
    });

    try {
      if (navigator.canShare && navigator.canShare({ files })) {
        await navigator.share({
          title: `${job.job_number} - ${selected.length} Photos`,
          text: `${selected.length} photos from ${job.job_number} - ${job.project_address || ''}`,
          files,
        });
        setSelectMode(false);
        setSelectedPhotos(new Set());
      } else {
        // Fallback: download all individually
        selected.forEach(p => downloadPhoto(p));
        setSelectMode(false);
        setSelectedPhotos(new Set());
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        selected.forEach(p => downloadPhoto(p));
        setSelectMode(false);
        setSelectedPhotos(new Set());
      }
    }
  };

  const downloadSelectedPhotos = () => {
    const selected = photos.filter(p => selectedPhotos.has(p.id));
    selected.forEach((p, i) => {
      setTimeout(() => downloadPhoto(p), i * 300); // Stagger downloads
    });
    setSelectMode(false);
    setSelectedPhotos(new Set());
  };

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
  };

  const openPhotoViewer = (photo: Photo) => {
    setViewingPhoto(photo);
    setEditingCaption(photo.caption || '');
    setEditingPhotoType(photo.photo_type || 'Progress');
  };

  const savePhotoEdit = async () => {
    if (!viewingPhoto) return;
    setSavingPhoto(true);
    try {
      const allPhotos = await getPhotos();
      const idx = allPhotos.findIndex(p => p.id === viewingPhoto.id);
      if (idx >= 0) {
        allPhotos[idx] = { ...allPhotos[idx], caption: editingCaption, photo_type: editingPhotoType };
        await savePhotos(allPhotos);
        setViewingPhoto({ ...viewingPhoto, caption: editingCaption, photo_type: editingPhotoType });
        loadRelated();
      }
    } catch (err) { console.error('Save photo failed:', err); }
    setSavingPhoto(false);
  };

  const deletePhoto = async () => {
    if (!viewingPhoto || !confirm('Delete this photo?')) return;
    setSavingPhoto(true);
    try {
      const allPhotos = await getPhotos();
      const filtered = allPhotos.filter(p => p.id !== viewingPhoto.id);
      await savePhotos(filtered);
      setViewingPhoto(null);
      loadRelated();
    } catch (err) { console.error('Delete photo failed:', err); }
    setSavingPhoto(false);
  };

  const submitCompletion = async () => {
    try {
      const allJobs = await getJobs();
      const idx = allJobs.findIndex(j => j.id === job.id);
      if (idx >= 0) {
        const completedChecklist: CompletionChecklist = {
          ...checklist,
          completed_by: currentUser.name,
          completed_at: nowFn()
        };
        allJobs[idx] = { ...allJobs[idx], status: 'ready_to_bill', completion_checklist: completedChecklist, updated_at: nowFn() };
        await saveJobs(allJobs);
      }
      setShowCompletionModal(false);
      onRefresh();
    } catch (err) { console.error('Submit completion failed:', err); }
  };

  const allChecked = checklist.time_entries_complete && checklist.trucking_tickets_entered &&
    checklist.rock_tickets_submitted && checklist.material_receipts_submitted &&
    checklist.final_photos_uploaded && checklist.daily_logs_complete;

  const PHOTO_TYPES = ['Progress', 'Issue', 'Before', 'After', 'Material Ticket', 'Trucking Ticket', 'Receipt', 'Other'];

  const totalHours = timeEntries.reduce((s, t) => s + (Number(t.hours) || 0), 0);
  const estimatedHours = labor.reduce((s, l) => s + (Number(l.hours) || 0), 0);
  const assignedUsers = users.filter(u => (job.assigned_user_ids || []).includes(u.id));
  const crewUsers = users.filter(u => u.active && (u.role === 'crew' || u.role === 'foreman'));

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-base-200">
        <div className="flex items-center gap-2 mb-2">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onBack}><ArrowLeft size={18} /></button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {editing && currentUser.role === 'admin' ? (
                <input className="input input-bordered input-sm font-bold w-28" value={editJobNumber} onChange={e => setEditJobNumber(e.target.value)} placeholder="Job #" />
              ) : (
                <span className="font-bold">{job.job_number}</span>
              )}
              {job.status === 'active' && <span className="badge badge-success badge-xs">Active</span>}
              {job.status === 'ready_to_bill' && <span className="badge badge-accent badge-xs">💰 Ready to Bill</span>}
              {job.status === 'completed' && <span className="badge badge-info badge-xs">Done</span>}
              {job.status === 'on_hold' && <span className="badge badge-warning badge-xs">Hold</span>}
              {job.status === 'billed' && <span className="badge badge-secondary badge-xs">Billed</span>}
              {job.status === 'archived' && <span className="badge badge-ghost badge-xs">📦 Archived</span>}
            </div>
            {editing ? (
              <input className="input input-bordered input-sm w-full" value={editClientName} onChange={e => setEditClientName(e.target.value)} placeholder="Client name" />
            ) : (
              <p className="text-sm truncate">{job.client_name}</p>
            )}
          </div>
          {canEdit && (
            editing ? (
              <div className="flex gap-1">
                <button className="btn btn-success btn-sm btn-circle" onClick={saveEdits}><Check size={16} /></button>
                <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setEditing(false)}>✕</button>
              </div>
            ) : (
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setEditing(true)}><Edit2 size={16} /></button>
            )
          )}
        </div>
        {editing ? (
          <div className="ml-10"><input className="input input-bordered input-xs w-full" value={editAddress} onChange={e => setEditAddress(e.target.value)} placeholder="Project address" /></div>
        ) : (
          job.project_address && <p className="text-xs text-base-content/60 flex items-center gap-1 ml-10"><MapPin size={10} /> {job.project_address}</p>
        )}
        {!editing && (job.project_description || job.notes) && (
          <div className="ml-10 mt-2 space-y-1.5">
            {job.project_description && (
              <p className="text-xs text-base-content/80"><span className="font-semibold">Description:</span> {job.project_description}</p>
            )}
            {job.notes && (
              <div className="rounded-lg bg-base-200 p-2">
                <p className="text-[11px] font-semibold text-base-content/70 mb-0.5">📋 Notes</p>
                <p className="text-xs whitespace-pre-wrap">{job.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 p-3">
        <button className="btn btn-outline btn-sm gap-1" onClick={() => onNavigateDailyLog(job.id)}><ClipboardList size={14} /> Log</button>
        <button className="btn btn-outline btn-sm gap-1" onClick={() => onNavigateTimeEntry(job.id)}><Clock size={14} /> Time</button>
        <button className="btn btn-outline btn-sm gap-1" onClick={() => onNavigatePhotos(job.id)}><Camera size={14} /> Photo</button>
      </div>
      {/* Mark Complete button - visible to foreman/admin when active */}
      {canEdit && job.status === 'active' && (
        <div className="px-3 pb-1">
          <button className="btn btn-success btn-sm w-full gap-2" onClick={() => setShowCompletionModal(true)}>
            <CheckCircle2 size={16} /> Mark Job Complete — Submit for Billing
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs tabs-boxed tabs-xs mx-3">
        {(['info', 'logs', 'time', 'photos'] as const).map(t => (
          <button key={t} className={`tab tab-xs ${tab === t ? 'tab-active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === 'logs' && logs.length > 0 && <span className="badge badge-xs ml-1">{logs.length}</span>}
            {t === 'time' && <span className="badge badge-xs ml-1">{totalHours.toFixed(1)}h</span>}
            {t === 'photos' && photos.length > 0 && <span className="badge badge-xs ml-1">{photos.length}</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 pb-4 space-y-3">
        {tab === 'info' && (
          <>
            {editing && (
              <div className="form-control">
                <label className="label py-1"><span className="label-text text-xs">Status</span></label>
                <select className="select select-bordered select-sm" value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  <option value="ready_to_bill">Ready to Bill</option>
                  <option value="completed">Completed</option>
                  <option value="billed">Billed</option>
                  <option value="archived">📦 Archived</option>
                </select>
              </div>
            )}

            {editing ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label py-1"><span className="label-text text-xs">Locate Date</span></label>
                  <input type="date" className="input input-bordered input-sm" value={editLocateDate} onChange={e => setEditLocateDate(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text text-xs">Locate Number</span></label>
                  <input className="input input-bordered input-sm" value={editLocateNumber} onChange={e => setEditLocateNumber(e.target.value)} placeholder="Locate #" />
                </div>
              </div>
            ) : (job.locate_date || job.locate_number) ? (
              <div className="flex gap-3 text-xs text-base-content/60">
                {job.locate_date && <span>📋 Locate: {job.locate_date}</span>}
                {job.locate_number && <span>#{job.locate_number}</span>}
              </div>
            ) : null}

            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs">Description</span></label>
              {editing ? (
                <textarea className="textarea textarea-bordered textarea-sm" value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={3} />
              ) : (
                <p className="text-sm bg-base-200 p-2 rounded-lg">{job.project_description || 'No description'}</p>
              )}
            </div>

            {/* Crew assignment removed — single crew setup */}

            {/* Completion checklist summary - shown when ready_to_bill or billed */}
            {job.completion_checklist && (
              <div className={`rounded-xl p-3 space-y-2 ${job.status === 'ready_to_bill' ? 'bg-accent/10 border border-accent/30' : 'bg-base-200'}`}>
                <h3 className="text-xs font-bold flex items-center gap-1">
                  <FileCheck size={14} />
                  {job.status === 'ready_to_bill' ? '💰 Billing Checklist — Ready for Review' : '✅ Billing Checklist'}
                </h3>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  {[
                    { key: 'time_entries_complete', label: 'All time entries submitted & approved' },
                    { key: 'trucking_tickets_entered', label: 'Trucking time / tickets entered' },
                    { key: 'rock_tickets_submitted', label: 'Rock tickets / tonnage submitted' },
                    { key: 'material_receipts_submitted', label: 'Material receipts submitted' },
                    { key: 'final_photos_uploaded', label: 'Final photos uploaded' },
                    { key: 'daily_logs_complete', label: 'Daily logs complete' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center gap-2">
                      {(job.completion_checklist as any)[item.key]
                        ? <span className="text-success">✅</span>
                        : <span className="text-error">❌</span>}
                      <span className={(job.completion_checklist as any)[item.key] ? '' : 'text-error font-medium'}>{item.label}</span>
                    </div>
                  ))}
                </div>
                {job.completion_checklist.billing_notes && (
                  <div className="bg-base-100 rounded-lg p-2 mt-1">
                    <span className="text-xs font-semibold">📝 Billing Notes:</span>
                    <p className="text-sm mt-0.5">{job.completion_checklist.billing_notes}</p>
                  </div>
                )}
                <p className="text-xs text-base-content/50">
                  Submitted by {job.completion_checklist.completed_by} on {new Date(job.completion_checklist.completed_at).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="stats stats-horizontal bg-base-200 w-full">
              <div className="stat py-2 px-3">
                <div className="stat-title text-xs">Logs</div>
                <div className="stat-value text-lg">{logs.length}</div>
              </div>
              <div className="stat py-2 px-3">
                <div className="stat-title text-xs">Hours</div>
                <div className="stat-value text-lg">{totalHours.toFixed(1)}</div>
                {estimatedHours > 0 && <div className="stat-desc text-xs">of {estimatedHours}h est.</div>}
              </div>
              <div className="stat py-2 px-3">
                <div className="stat-title text-xs">Photos</div>
                <div className="stat-value text-lg">{photos.length}</div>
              </div>
            </div>

            {items.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold flex items-center gap-1 mb-1"><Package size={12} /> Scope Items</h3>
                <div className="bg-base-200 rounded-lg divide-y divide-base-300">
                  {items.map((item, i) => (
                    <div key={item.id || i} className="p-2 flex justify-between text-sm">
                      <span>{item.description}</span>
                      <span className="text-base-content/60 text-xs">{item.qty} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {labor.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold flex items-center gap-1 mb-1"><Wrench size={12} /> Labor / Equipment</h3>
                <div className="bg-base-200 rounded-lg divide-y divide-base-300">
                  {labor.map((item, i) => (
                    <div key={item.id || i} className="p-2 flex justify-between text-sm">
                      <span>{item.description}</span>
                      <span className="text-base-content/60 text-xs">{item.hours}h est.</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Admin-only: permanently delete this job */}
            {currentUser.role === 'admin' && (
              <div className="border-t border-error/20 pt-3 mt-4">
                <p className="text-xs text-base-content/50 mb-1">Danger zone</p>
                <button className="btn btn-error btn-outline btn-sm w-full gap-1" onClick={deleteJob} disabled={deleting}>
                  {deleting ? <span className="loading loading-spinner loading-xs" /> : <>🗑️ Delete Job Permanently</>}
                </button>
              </div>
            )}
          </>
        )}

        {tab === 'logs' && (
          <>
            <button className="btn btn-primary btn-sm w-full gap-1" onClick={() => onNavigateDailyLog(job.id)}><ClipboardList size={14} /> New Daily Log</button>
            {logs.length === 0 ? <p className="text-center text-sm text-base-content/50 py-4">No daily logs yet</p> : logs.map(log => (
              <div key={log.id} className="card bg-base-200">
                <div className="card-body p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{log.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-base-content/60">{log.foreman_name}</span>
                      {canEdit && (
                        <button className="btn btn-ghost btn-xs" onClick={() => onNavigateDailyLog(job.id, log.id)}>✏️ Edit</button>
                      )}
                    </div>
                  </div>
                  {log.weather && <p className="text-xs">🌤 {log.weather}</p>}
                  {log.work_performed && <p className="text-sm mt-1">{log.work_performed}</p>}
                  {log.issues && <div className="alert alert-warning py-1 mt-1"><span className="text-xs">⚠️ {log.issues}</span></div>}
                  {(() => {
                    const dayEntries = timeEntries.filter(t => t.date === log.date && (t.category || 'job') === 'job');
                    const tcHours = dayEntries.reduce((s, t) => s + (Number(t.hours) || 0), 0);
                    const manual = (log.manual_labor || []).filter(l => (l.name || '').trim());
                    const manualHours = manual.reduce((s, l) => s + (Number(l.hours) || 0), 0);
                    const totalHours = tcHours + manualHours;
                    if (totalHours <= 0) return null;
                    return (
                      <div className="text-xs text-base-content/70">
                        <p>👷 Labor: {totalHours.toFixed(1)}h{tcHours > 0 && manualHours > 0 ? ` (${tcHours.toFixed(1)}h timecards + ${manualHours.toFixed(1)}h manual)` : (dayEntries.length > 0 ? ` (${dayEntries.length} ${dayEntries.length === 1 ? 'entry' : 'entries'})` : ' (manual)')}</p>
                        {manual.length > 0 && (
                          <p className="text-base-content/60">{manual.map(l => `${l.name}${l.hours ? ` ${Number(l.hours).toFixed(1)}h` : ''}${l.note ? ` — ${l.note}` : ''}`).join('; ')}</p>
                        )}
                      </div>
                    );
                  })()}
                  {log.materials_used && <p className="text-xs text-base-content/70">🚛 {log.materials_used}</p>}
                  {log.equipment_used && <p className="text-xs text-base-content/70">🚜 {log.equipment_used}</p>}
                  {log.crew_size > 0 && <p className="text-xs text-base-content/60">Crew: {log.crew_size}</p>}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'time' && (
          <>
            <button className="btn btn-primary btn-sm w-full gap-1" onClick={() => onNavigateTimeEntry(job.id)}><Clock size={14} /> New Time Entry</button>
            <div className="alert alert-info py-2"><span className="text-sm">Total: {totalHours.toFixed(1)} hours{estimatedHours > 0 ? ` / ${estimatedHours}h estimated` : ''}</span></div>
            {timeEntries.length === 0 ? <p className="text-center text-sm text-base-content/50 py-4">No time entries yet</p> : timeEntries.map(entry => (
              <div key={entry.id} className="card bg-base-200">
                <div className="card-body p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{entry.date}</span>
                    <div className="flex items-center gap-1">
                      <span className="badge badge-primary badge-sm">{Number(entry.hours).toFixed(1)}h</span>
                      {entry.status === 'pending' && <span className="badge badge-warning badge-xs">Pending</span>}
                      {entry.status === 'approved' && <span className="badge badge-success badge-xs">✓</span>}
                    </div>
                  </div>
                  <p className="text-sm">{entry.user_name || 'Unnamed'}</p>
                  {entry.clock_in && <p className="text-xs text-base-content/60">{entry.clock_in} → {entry.clock_out || 'active'}</p>}
                  {entry.notes && <p className="text-xs mt-1">{entry.notes}</p>}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'photos' && (
          <>
            <div className="flex gap-2">
              <button className="btn btn-primary btn-sm flex-1 gap-1" onClick={() => onNavigatePhotos(job.id)}><Camera size={14} /> Add Photo</button>
              {photos.length > 0 && (
                <button 
                  className={`btn btn-sm gap-1 ${selectMode ? 'btn-warning' : 'btn-outline'}`}
                  onClick={() => { setSelectMode(!selectMode); setSelectedPhotos(new Set()); }}
                >
                  {selectMode ? '✕ Cancel' : '☑️ Select'}
                </button>
              )}
            </div>

            {/* Select mode toolbar */}
            {selectMode && (
              <div className="bg-base-200 rounded-lg p-3 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium flex-1">
                  {selectedPhotos.size === 0 ? 'Tap photos to select' : `${selectedPhotos.size} selected`}
                </span>
                <button 
                  className="btn btn-xs btn-ghost"
                  onClick={() => setSelectedPhotos(new Set(photos.map(p => p.id)))}
                >Select All</button>
                {selectedPhotos.size > 0 && (
                  <>
                    <button 
                      className="btn btn-sm btn-primary gap-1"
                      onClick={shareSelectedPhotos}
                    >📤 Share</button>
                    <button 
                      className="btn btn-sm btn-outline gap-1"
                      onClick={downloadSelectedPhotos}
                    >📥 Download</button>
                  </>
                )}
              </div>
            )}

            {photos.length === 0 ? <p className="text-center text-sm text-base-content/50 py-4">No photos yet</p> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {photos.map(photo => (
                  <div 
                    key={photo.id} 
                    className={`cursor-pointer group relative ${selectMode && selectedPhotos.has(photo.id) ? 'ring-3 ring-primary rounded-lg' : ''}`}
                    onClick={() => selectMode ? togglePhotoSelection(photo.id) : openPhotoViewer(photo)}
                  >
                    {/* Selection checkbox overlay */}
                    {selectMode && (
                      <div className={`absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow ${
                        selectedPhotos.has(photo.id) ? 'bg-primary text-primary-content' : 'bg-black/40 text-white border border-white/50'
                      }`}>
                        {selectedPhotos.has(photo.id) ? '✓' : ''}
                      </div>
                    )}
                    <div className="bg-base-200 rounded-lg overflow-hidden">
                      <img
                        src={photo.thumbnail || photo.full_image}
                        alt={photo.caption}
                        className={`w-full h-28 sm:h-36 object-cover transition-opacity ${selectMode && selectedPhotos.has(photo.id) ? 'opacity-80' : 'group-hover:opacity-80'}`}
                      />
                      <div className="p-1.5">
                        <p className="text-xs truncate font-medium">{photo.caption || 'No caption'}</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="badge badge-xs">{photo.photo_type}</span>
                          <span className="text-[10px] opacity-40">{new Date(photo.taken_at || photo.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Photo viewer/editor modal */}
            {viewingPhoto && (
              <div className="fixed inset-0 bg-black/80 z-50 flex flex-col" onClick={() => setViewingPhoto(null)}>
                {/* Fixed close button - always visible */}
                <button 
                  className="btn btn-circle btn-sm fixed top-3 right-3 z-[60] bg-black/70 border-2 border-white text-white hover:bg-red-600 shadow-lg"
                  style={{ minWidth: '44px', minHeight: '44px', fontSize: '20px' }}
                  onClick={() => setViewingPhoto(null)}
                >✕</button>
                
                <div className="flex-1 overflow-y-auto p-2 pt-14" onClick={e => e.stopPropagation()}>
                <div className="bg-white rounded-xl max-w-2xl mx-auto w-full">
                  {/* Full-size image */}
                  <div className="relative">
                    <img
                      src={viewingPhoto.full_image || viewingPhoto.thumbnail}
                      alt={viewingPhoto.caption}
                      className="w-full rounded-t-xl max-h-[60vh] object-contain bg-black"
                    />
                  </div>

                  {/* Photo details & edit */}
                  <div className="p-4 space-y-3">
                    {/* GPS & timestamp */}
                    <div className="flex flex-wrap gap-2 text-xs opacity-50">
                      <span>📅 {new Date(viewingPhoto.taken_at || viewingPhoto.created_at).toLocaleString()}</span>
                      {viewingPhoto.gps_lat && (
                        <span>📍 {viewingPhoto.gps_lat.toFixed(4)}, {viewingPhoto.gps_lng?.toFixed(4)}</span>
                      )}
                    </div>

                    {/* Editable type */}
                    <div className="form-control">
                      <label className="label py-0"><span className="label-text text-xs font-semibold">Type</span></label>
                      <select
                        className="select select-bordered select-sm w-full"
                        value={editingPhotoType}
                        onChange={e => setEditingPhotoType(e.target.value)}
                      >
                        {PHOTO_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* Editable caption */}
                    <div className="form-control">
                      <label className="label py-0"><span className="label-text text-xs font-semibold">Caption</span></label>
                      <input
                        className="input input-bordered input-sm w-full"
                        value={editingCaption}
                        onChange={e => setEditingCaption(e.target.value)}
                        placeholder="Add a caption..."
                      />
                    </div>

                    {/* Share & Download */}
                    <div className="flex gap-2">
                      <button
                        className="btn btn-info btn-sm flex-1 gap-1"
                        onClick={() => sharePhoto(viewingPhoto)}
                      >
                        📤 Share / Email
                      </button>
                      <button
                        className="btn btn-outline btn-sm flex-1 gap-1"
                        onClick={() => downloadPhoto(viewingPhoto)}
                      >
                        📥 Download
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary btn-sm flex-1 gap-1"
                        onClick={savePhotoEdit}
                        disabled={savingPhoto || (editingCaption === (viewingPhoto.caption || '') && editingPhotoType === viewingPhoto.photo_type)}
                      >
                        {savingPhoto ? <span className="loading loading-spinner loading-xs" /> : <Check size={14} />}
                        Save Changes
                      </button>
                      <button
                        className="btn btn-error btn-sm btn-outline gap-1"
                        onClick={deletePhoto}
                        disabled={savingPhoto}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    {/* Bottom close button - easy to reach on mobile */}
                    <button 
                      className="btn btn-ghost btn-block mt-2 text-base-content/60"
                      onClick={() => setViewingPhoto(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Completion / Billing Checklist Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3" onClick={() => setShowCompletionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 bg-success/10 border-b border-success/20 rounded-t-2xl">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle2 size={22} className="text-success" />
                Mark Job Complete
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                {job.job_number} — {job.client_name}
              </p>
              <p className="text-xs text-base-content/50 mt-1">
                Confirm everything is submitted so Ryan can bill this project.
              </p>
            </div>

            <div className="p-4 space-y-3">
              {[
                { key: 'time_entries_complete', label: 'All time entries submitted & approved', icon: '⏱️' },
                { key: 'trucking_tickets_entered', label: 'Trucking time / tickets entered', icon: '🚛' },
                { key: 'rock_tickets_submitted', label: 'Rock tickets / tonnage submitted', icon: '🪨' },
                { key: 'material_receipts_submitted', label: 'Material receipts submitted', icon: '🧾' },
                { key: 'final_photos_uploaded', label: 'Final photos uploaded', icon: '📸' },
                { key: 'daily_logs_complete', label: 'Daily logs complete', icon: '📋' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-base-200 active:bg-base-300 transition-colors">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success checkbox-md"
                    checked={(checklist as any)[item.key]}
                    onChange={e => setChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))}
                  />
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                </label>
              ))}

              <div className="divider my-1" />

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">📝 Billing Notes (optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered text-sm"
                  rows={3}
                  placeholder="Any notes for billing... e.g., extra T&M work, change orders, special billing instructions"
                  value={checklist.billing_notes}
                  onChange={e => setChecklist(prev => ({ ...prev, billing_notes: e.target.value }))}
                />
              </div>

              {!allChecked && (
                <div className="alert alert-warning py-2">
                  <span className="text-xs">⚠️ Not all items are checked. You can still submit, but unchecked items will show as incomplete for billing review.</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex gap-2">
              <button className="btn btn-ghost btn-sm flex-1" onClick={() => setShowCompletionModal(false)}>Cancel</button>
              <button className="btn btn-success btn-sm flex-1 gap-1" onClick={submitCompletion}>
                <CheckCircle2 size={16} />
                {allChecked ? 'Submit for Billing' : 'Submit Anyway'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};