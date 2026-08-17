import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Job, DailyLog, MaterialEntry, User, Photo, TimeEntry } from '../types';
import { getDailyLogs, saveDailyLogs, getMaterials, saveMaterials, getPhotos, savePhotos, getAllTimeEntries, genId, now, today, fetchWeather, getCurrentPosition } from '../utils/supabase';

interface Props {
  jobs: Job[];
  currentUser: User;
  users: User[];
  preselectedJobId: string | null;
  editLogId?: string | null;
  onBack: () => void;
  onSaved: () => void;
}

const MATERIAL_TYPES = ['Rock', 'Sand', 'Gravel', 'Topsoil', 'Fill Dirt', 'Concrete', 'Asphalt', 'Pipe', 'Aggregate', 'Other'];
const PHOTO_TAGS = ['Progress', 'Issue', 'Before', 'After', 'Material Ticket', 'Trucking Ticket', 'Receipt', 'Site Conditions', 'Other'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: 12, borderRadius: 10, border: '1px solid #d1d5db',
  fontSize: 15, boxSizing: 'border-box' as const, color: '#111827', background: '#fff',
  minHeight: 48,
};
const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: 'vertical' as const, minHeight: 80, fontFamily: 'inherit',
};
const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'auto' as const,
};
const labelStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4, color: '#374151',
};

export const DailyLogForm: React.FC<Props> = ({ jobs, currentUser, users, preselectedJobId, editLogId, onBack, onSaved }) => {
  // Job picker
  const [jobId, setJobId] = useState(preselectedJobId || '');
  const [showJobPicker, setShowJobPicker] = useState(false);
  const [jobSearch, setJobSearch] = useState('');
  const jobSearchRef = useRef<HTMLInputElement>(null);

  // Core fields
  const [date, setDate] = useState(today());
  const [crewSize, setCrewSize] = useState(2);
  const [weather, setWeather] = useState('');
  const [weatherTemp, setWeatherTemp] = useState<number | undefined>();
  const [weatherAuto, setWeatherAuto] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [workPerformed, setWorkPerformed] = useState('');
  const [hasIssues, setHasIssues] = useState(false);
  const [issues, setIssues] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [gpsLat, setGpsLat] = useState<number | undefined>();
  const [gpsLng, setGpsLng] = useState<number | undefined>();
  const [gpsStatus, setGpsStatus] = useState('');

  // Materials
  const [materials, setMaterials] = useState<Array<{
    material_type: string; description: string; quantity: number; unit: string;
    source: string; hauler: string; ticket_number: string; ticket_photo: string;
  }>>([]);

  // Photos
  const [photos, setPhotos] = useState<Array<{
    dataUrl: string; caption: string; tag: string;
  }>>([]);

  // Equipment used (for T&M billing)
  const [equipment, setEquipment] = useState<Array<{ name: string; hours: number; note: string }>>([]);

  // Labor summary — auto-pulled from time entries for this job + date (read-only, for billing)
  const [laborRows, setLaborRows] = useState<Array<{ name: string; hours: number }>>([]);

  // Manual labor — foreman-entered backup for when timecards aren't used (for billing)
  const [manualLabor, setManualLabor] = useState<Array<{ name: string; hours: number; note: string }>>([]);

  // Editing an existing log (vs. creating new)
  const [existingLogId, setExistingLogId] = useState<string | null>(null);
  const existingLogIdRef = useRef<string | null>(null);
  const createdAtRef = useRef<string>('');
  const didInitRef = useRef(false);

  // Sections expanded
  const [showMaterials, setShowMaterials] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [activeTicketIdx, setActiveTicketIdx] = useState(-1);

  const activeJobs = useMemo(() =>
    jobs.filter(j => j.status === 'active' || j.status === 'on_hold')
      .sort((a, b) => (b.job_number || '').localeCompare(a.job_number || '')),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    if (!jobSearch.trim()) return activeJobs;
    const q = jobSearch.toLowerCase();
    return activeJobs.filter(j =>
      (j.job_number || '').toLowerCase().includes(q) ||
      (j.client_name || '').toLowerCase().includes(q) ||
      (j.project_address || '').toLowerCase().includes(q) ||
      (j.project_description || '').toLowerCase().includes(q)
    );
  }, [activeJobs, jobSearch]);

  const selectedJob = jobs.find(j => j.id === jobId);

  const setExisting = (id: string | null) => { existingLogIdRef.current = id; setExistingLogId(id); };

  // Populate the whole form from an existing log (+ its materials & photos)
  const loadLog = async (log: DailyLog) => {
    setExisting(log.id);
    createdAtRef.current = log.created_at || now();
    setJobId(log.job_id);
    setDate(log.date);
    setCrewSize(log.crew_size || 1);
    setWeather(log.weather || '');
    setWeatherTemp(log.weather_temp);
    setWeatherAuto(!!log.weather_auto);
    setWorkPerformed(log.work_performed || '');
    setHasIssues(!!log.issues);
    setIssues(log.issues || '');
    setNotes(log.notes || '');
    setGpsLat(log.gps_lat);
    setGpsLng(log.gps_lng);
    setEquipment(Array.isArray(log.equipment_list) ? log.equipment_list : []);
    if (Array.isArray(log.equipment_list) && log.equipment_list.length > 0) setShowEquipment(true);
    setManualLabor(Array.isArray(log.manual_labor) ? log.manual_labor : []);
    try {
      const [allMats, allPhotos] = await Promise.all([getMaterials(), getPhotos()]);
      const mats = allMats.filter(m => m.daily_log_id === log.id);
      setMaterials(mats.map(m => ({
        material_type: m.material_type, description: m.description, quantity: m.quantity,
        unit: m.unit, source: m.source, hauler: m.hauler,
        ticket_number: m.ticket_number, ticket_photo: m.ticket_photo,
      })));
      if (mats.length > 0) setShowMaterials(true);
      const phts = allPhotos.filter(p => p.daily_log_id === log.id);
      setPhotos(phts.map(p => ({ dataUrl: p.full_image || p.thumbnail, caption: p.caption || '', tag: p.photo_type || 'Progress' })));
      if (phts.length > 0) setShowPhotos(true);
    } catch { /* ignore */ }
  };

  // Reset to a blank NEW log (keeps current job & date)
  const resetToNew = () => {
    setExisting(null);
    createdAtRef.current = '';
    setCrewSize(2); setWorkPerformed(''); setHasIssues(false); setIssues('');
    setNotes(''); setMaterials([]); setEquipment([]); setPhotos([]); setManualLabor([]);
  };

  // Load the labor summary (who logged time on this job/date) for billing
  const loadLabor = async (jid: string, d: string) => {
    if (!jid || !d) { setLaborRows([]); return; }
    try {
      const all = await getAllTimeEntries(users || []);
      const rows: Record<string, number> = {};
      all.filter(e => e.job_id === jid && e.date === d && (e.category || 'job') === 'job')
        .forEach(e => { rows[e.user_name || 'Unknown'] = (rows[e.user_name || 'Unknown'] || 0) + (e.hours || 0); });
      setLaborRows(Object.entries(rows).map(([name, hours]) => ({ name, hours })).sort((a, b) => b.hours - a.hours));
    } catch { setLaborRows([]); }
  };

  // Init + keep in sync with job/date: load existing log (edit or dedupe) or start fresh
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const logs = await getDailyLogs();
      let target: DailyLog | undefined;
      if (!didInitRef.current && editLogId) target = logs.find(l => l.id === editLogId);
      if (!target && jobId && date) target = logs.find(l => l.job_id === jobId && l.date === date);
      if (cancelled) return;
      if (target) {
        if (target.id !== existingLogIdRef.current) await loadLog(target);
      } else {
        if (existingLogIdRef.current) resetToNew();
        if (!didInitRef.current) await autoFetchWeatherAndGps();
      }
      didInitRef.current = true;
      loadLabor(jobId, date);
    })();
    return () => { cancelled = true; };
  }, [jobId, date]);

  useEffect(() => {
    if (showJobPicker) setTimeout(() => jobSearchRef.current?.focus(), 100);
  }, [showJobPicker]);

  const autoFetchWeatherAndGps = async () => {
    setGpsStatus('📍 Getting location...');
    setWeatherLoading(true);
    try {
      const pos = await getCurrentPosition();
      if (pos) {
        setGpsLat(pos.lat);
        setGpsLng(pos.lng);
        setGpsStatus(`📍 ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`);
        const w = await fetchWeather(pos.lat, pos.lng);
        if (w) {
          setWeather(`${w.description}, ${w.temp}°F`);
          setWeatherTemp(w.temp);
          setWeatherAuto(true);
        }
      } else {
        setGpsStatus('📍 Using Adel, IA');
        const w = await fetchWeather(41.611, -94.018);
        if (w) {
          setWeather(`${w.description}, ${w.temp}°F`);
          setWeatherTemp(w.temp);
          setWeatherAuto(true);
        }
      }
    } catch {
      setGpsStatus('📍 GPS unavailable');
    }
    setWeatherLoading(false);
  };

  // Materials helpers
  const addMaterial = () => {
    setMaterials(prev => [...prev, {
      material_type: 'Rock', description: '', quantity: 0, unit: 'tons',
      source: '', hauler: '', ticket_number: '', ticket_photo: '',
    }]);
    setShowMaterials(true);
  };

  const updateMaterial = (idx: number, field: string, value: string | number) => {
    setMaterials(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const removeMaterial = (idx: number) => {
    setMaterials(prev => prev.filter((_, i) => i !== idx));
  };

  // Equipment helpers
  const addEquipment = () => {
    setEquipment(prev => [...prev, { name: '', hours: 0, note: '' }]);
    setShowEquipment(true);
  };
  const updateEquipment = (idx: number, field: string, value: string | number) => {
    setEquipment(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };
  const removeEquipment = (idx: number) => {
    setEquipment(prev => prev.filter((_, i) => i !== idx));
  };

  const addManualLabor = () => {
    setManualLabor(prev => [...prev, { name: '', hours: 0, note: '' }]);
  };
  const updateManualLabor = (idx: number, field: string, value: string | number) => {
    setManualLabor(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };
  const removeManualLabor = (idx: number) => {
    setManualLabor(prev => prev.filter((_, i) => i !== idx));
  };

  const handleTicketPhoto = (idx: number) => {
    setActiveTicketIdx(idx);
    fileInputRef.current?.click();
  };

  const handleTicketFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeTicketIdx < 0) return;
    compressImage(file, (dataUrl) => {
      updateMaterial(activeTicketIdx, 'ticket_photo', dataUrl);
    });
    e.target.value = '';
  };

  // Photo helpers
  const handleTakePhoto = () => photoInputRef.current?.click();
  const handlePickFromGallery = () => galleryInputRef.current?.click();

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      compressImage(file, (dataUrl) => {
        setPhotos(prev => [...prev, { dataUrl, caption: '', tag: 'Progress' }]);
        setShowPhotos(true);
      });
    });
    e.target.value = '';
  };

  const updatePhoto = (idx: number, field: string, value: string) => {
    setPhotos(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  function compressImage(file: File, callback: (dataUrl: string) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.onload = () => {
        const maxW = 1200;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Completion status
  const completionItems = [
    { done: !!jobId, label: 'Job' },
    { done: !!workPerformed.trim(), label: 'Work performed' },
    { done: !!weather, label: 'Weather' },
  ];
  const completedCount = completionItems.filter(i => i.done).length;
  const canSave = !!jobId && !!workPerformed.trim();

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    setSaveError('');
    try {
      const isEdit = !!existingLogIdRef.current;
      const logId = existingLogIdRef.current || genId('log');
      const cleanEquip = equipment.filter(e => e.name.trim());
      const logEntry: DailyLog = {
        id: logId, job_id: jobId, job_number: selectedJob?.job_number || '', date,
        user_id: currentUser.id, foreman_name: currentUser.name, crew_size: crewSize,
        weather, weather_temp: weatherTemp, weather_auto: weatherAuto,
        work_performed: workPerformed, issues: hasIssues ? issues : '',
        materials_used: materials.length > 0 ? materials.map(m => `${m.quantity} ${m.unit} ${m.material_type}`).join(', ') : '',
        equipment_used: cleanEquip.length > 0 ? cleanEquip.map(e => `${e.name}${e.hours ? ` (${e.hours}h)` : ''}`).join(', ') : '',
        equipment_list: cleanEquip,
        manual_labor: manualLabor.filter(l => l.name.trim()),
        notes, gps_lat: gpsLat, gps_lng: gpsLng,
        created_at: createdAtRef.current || now(), updated_at: now(),
      };

      const logs = await getDailyLogs();
      const idx = logs.findIndex(l => l.id === logId);
      if (idx >= 0) logs[idx] = logEntry; else logs.push(logEntry);
      await saveDailyLogs(logs);

      // Save materials — replace this log's materials with the current list
      const existingMats = await getMaterials();
      const otherMats = existingMats.filter(m => m.daily_log_id !== logId);
      const newMats: MaterialEntry[] = materials.map(m => ({
        id: genId('mat'), daily_log_id: logId, job_id: jobId,
        job_number: selectedJob?.job_number || '', date,
        material_type: m.material_type, description: m.description,
        quantity: m.quantity, unit: m.unit, source: m.source,
        hauler: m.hauler, ticket_number: m.ticket_number,
        ticket_photo: m.ticket_photo, notes: '', created_at: now(),
      }));
      await saveMaterials([...otherMats, ...newMats]);

      // Save photos — replace this log's photos with the current list
      const existingPhotos = await getPhotos();
      const otherPhotos = existingPhotos.filter(p => p.daily_log_id !== logId);
      const newPhotos: Photo[] = photos.map(p => ({
        id: genId('pht'), job_id: jobId,
        daily_log_id: logId, caption: p.caption,
        photo_type: p.tag, thumbnail: p.dataUrl, full_image: p.dataUrl,
        gps_lat: gpsLat, gps_lng: gpsLng, created_at: now(),
      }));
      await savePhotos([...otherPhotos, ...newPhotos]);

      void isEdit;
      onSaved();
      onBack();
    } catch (err: any) {
      console.error('Save failed:', err);
      setSaveError(err?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ============ RENDER ============
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#ffffff', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 24, cursor: 'pointer', padding: 8 }}>
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#111827' }}>{existingLogId ? '✏️ Edit Daily Log' : '📋 Daily Log'}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            {completedCount}/{completionItems.length} required fields
          </div>
        </div>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 4 }}>
          {completionItems.map((item, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: item.done ? '#059669' : '#d1d5db',
              transition: 'background 0.3s',
            }} title={item.label} />
          ))}
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ====== EDIT BANNER ====== */}
        {existingLogId && (
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 600 }}>
            ✏️ Editing the existing log for this job &amp; date. Changes and additions will update it — no duplicate is created.
          </div>
        )}

        {/* ====== JOB SELECTION ====== */}
        <div>
          <label style={labelStyle}>Job <span style={{ color: '#ef4444' }}>*</span></label>
          <div
            onClick={() => setShowJobPicker(true)}
            style={{
              ...inputStyle,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              border: jobId ? '2px solid #059669' : '2px solid #d1d5db',
              background: jobId ? '#f0fdf4' : '#fff',
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>
            {selectedJob ? (
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{selectedJob.job_number}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{selectedJob.client_name} — {selectedJob.project_address}</div>
              </div>
            ) : (
              <span style={{ color: '#9ca3af', flex: 1 }}>Tap to select job...</span>
            )}
            {jobId && <span style={{ color: '#059669', fontSize: 18 }}>✓</span>}
          </div>
        </div>

        {/* ====== DATE ====== */}
        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ ...inputStyle, border: date !== today() ? '2px solid #f59e0b' : '1px solid #d1d5db' }} />
          {date !== today() && (
            <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 4 }}>
              ⚠️ Logging for a different date — {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          )}
        </div>

        {/* ====== WEATHER ====== */}
        <div>
          <label style={labelStyle}>
            🌤️ Weather
            {weatherAuto && <span style={{ marginLeft: 6, background: '#d1fae5', color: '#065f46', padding: '2px 6px', borderRadius: 8, fontSize: 11 }}>Auto</span>}
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="text" value={weather}
              onChange={e => { setWeather(e.target.value); setWeatherAuto(false); }}
              placeholder={weatherLoading ? 'Fetching...' : 'e.g. Sunny, 75°F'}
              style={{ ...inputStyle, flex: 1 }} />
            <button onClick={autoFetchWeatherAndGps} disabled={weatherLoading}
              style={{ minWidth: 48, minHeight: 48, border: 'none', borderRadius: 10, background: '#dbeafe', cursor: 'pointer', fontSize: 20 }}>
              {weatherLoading ? '⏳' : '🔄'}
            </button>
          </div>
          {gpsStatus && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{gpsStatus}</div>}
        </div>

        {/* ====== CREW SIZE ====== */}
        <div>
          <label style={labelStyle}>👷 Crew Size</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setCrewSize(Math.max(1, crewSize - 1))}
              style={{ width: 48, height: 48, border: '1px solid #d1d5db', borderRadius: 10, background: '#fff', fontSize: 22, cursor: 'pointer', color: '#111827' }}>
              −
            </button>
            <div style={{ fontSize: 28, fontWeight: 700, minWidth: 40, textAlign: 'center', color: '#111827' }}>
              {crewSize}
            </div>
            <button onClick={() => setCrewSize(crewSize + 1)}
              style={{ width: 48, height: 48, border: '1px solid #d1d5db', borderRadius: 10, background: '#fff', fontSize: 22, cursor: 'pointer', color: '#111827' }}>
              +
            </button>
          </div>
        </div>

        {/* ====== WORK PERFORMED ====== */}
        <div>
          <label style={labelStyle}>🔨 Work Performed <span style={{ color: '#ef4444' }}>*</span></label>
          <textarea value={workPerformed} onChange={e => setWorkPerformed(e.target.value)}
            placeholder="What was accomplished today? Be specific..."
            style={{
              ...textareaStyle, minHeight: 100,
              border: workPerformed.trim() ? '2px solid #059669' : '2px solid #d1d5db',
              background: workPerformed.trim() ? '#f0fdf4' : '#fff',
            }} />
        </div>

        {/* ====== LABOR SUMMARY (auto from timecards + manual backup, for billing) ====== */}
        {jobId && (
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              👷 Labor on this job {date !== today() ? '(this date)' : '(today)'}
            </div>

            {/* Auto-pulled from timecards */}
            {laborRows.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 }}>From timecards</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {laborRows.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#111827' }}>
                      <span>{r.name}</span>
                      <span style={{ fontWeight: 700 }}>{r.hours.toFixed(1)}h</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manual labor entry (backup for when timecards aren't used) */}
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6 }}>
              Manual entry {laborRows.length > 0 ? '(extra / backup)' : '(who was here & how long)'}
            </div>
            {manualLabor.length === 0 ? (
              <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>
                Add crew by hand if their time isn't in the timecards — name, hours, and what they did.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
                {manualLabor.map((l, idx) => (
                  <div key={idx} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input list="crew-names" placeholder="Name" value={l.name}
                        onChange={e => updateManualLabor(idx, 'name', e.target.value)}
                        style={{ ...inputStyle, minHeight: 44, padding: 10, flex: 1 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 110 }}>
                        <input type="number" step="0.5" placeholder="Hrs" value={l.hours || ''}
                          onChange={e => updateManualLabor(idx, 'hours', parseFloat(e.target.value) || 0)}
                          style={{ ...inputStyle, minHeight: 44, padding: 8, width: 70 }} />
                        <span style={{ fontSize: 13, color: '#6b7280' }}>hrs</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input placeholder="What they did (optional)" value={l.note}
                        onChange={e => updateManualLabor(idx, 'note', e.target.value)}
                        style={{ ...inputStyle, minHeight: 44, padding: 10, flex: 1 }} />
                      <button onClick={() => removeManualLabor(idx)}
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, width: 40, height: 44, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <datalist id="crew-names">
              {(users || []).map(u => <option key={u.id} value={u.name} />)}
            </datalist>
            <button onClick={addManualLabor}
              style={{ width: '100%', padding: 12, background: '#f3f4f6', color: '#2563eb', border: '1px dashed #d1d5db', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 48 }}>
              + Add Person
            </button>

            {/* Combined total */}
            {(laborRows.length > 0 || manualLabor.some(l => l.name.trim())) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: '#065f46', borderTop: '1px solid #e5e7eb', marginTop: 12, paddingTop: 10 }}>
                <span>Total labor</span>
                <span>{(laborRows.reduce((s, r) => s + r.hours, 0) + manualLabor.filter(l => l.name.trim()).reduce((s, l) => s + (l.hours || 0), 0)).toFixed(1)}h</span>
              </div>
            )}
          </div>
        )}

        {/* ====== ISSUES ====== */}
        <div style={{
          background: hasIssues ? '#fef2f2' : '#f0fdf4',
          borderRadius: 12, padding: 16,
          border: hasIssues ? '2px solid #ef4444' : '2px solid #059669',
          transition: 'all 0.3s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: hasIssues ? 12 : 0 }}>
            <label style={{ fontSize: 15, fontWeight: 700, color: hasIssues ? '#991b1b' : '#065f46' }}>
              {hasIssues ? '⚠️ Issues / Delays' : '✅ No Issues'}
            </label>
            <button
              onClick={() => setHasIssues(!hasIssues)}
              style={{
                padding: '8px 16px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: hasIssues ? '#fee2e2' : '#dcfce7',
                color: hasIssues ? '#991b1b' : '#166534',
                minHeight: 40,
              }}
            >
              {hasIssues ? 'Clear Issues' : 'Report Issue'}
            </button>
          </div>
          {hasIssues && (
            <textarea value={issues} onChange={e => setIssues(e.target.value)}
              placeholder="Describe the issue, delay, or concern..."
              autoFocus
              style={{ ...textareaStyle, border: '1px solid #fca5a5', background: '#fff' }} />
          )}
        </div>

        {/* ====== MATERIALS SECTION ====== */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <button
            onClick={() => materials.length > 0 ? setShowMaterials(!showMaterials) : addMaterial()}
            style={{
              width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', color: '#111827',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              🚛 Materials {materials.length > 0 && <span style={{ background: '#2563eb', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, marginLeft: 4 }}>{materials.length}</span>}
            </span>
            <span style={{ fontSize: 14, color: '#2563eb' }}>
              {materials.length === 0 ? '+ Add Material' : (showMaterials ? '▲' : '▼')}
            </span>
          </button>

          {showMaterials && materials.length > 0 && (
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {materials.map((m, idx) => (
                <div key={idx} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>Material #{idx + 1}</span>
                    <button onClick={() => removeMaterial(idx)}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>✕</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                    <select value={m.material_type} onChange={e => updateMaterial(idx, 'material_type', e.target.value)}
                      style={{ ...selectStyle, minHeight: 44, padding: 8 }}>
                      {MATERIAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <input type="number" placeholder="Qty" value={m.quantity || ''}
                        onChange={e => updateMaterial(idx, 'quantity', parseFloat(e.target.value) || 0)}
                        style={{ ...inputStyle, minHeight: 44, padding: 8, flex: 1 }} />
                      <select value={m.unit} onChange={e => updateMaterial(idx, 'unit', e.target.value)}
                        style={{ ...selectStyle, minHeight: 44, padding: 8, width: 80 }}>
                        <option value="tons">Tons</option>
                        <option value="yards">CY</option>
                        <option value="loads">Loads</option>
                        <option value="each">Each</option>
                        <option value="lf">LF</option>
                      </select>
                    </div>
                  </div>

                  <input placeholder="Source (pit, supplier, etc.)" value={m.source}
                    onChange={e => updateMaterial(idx, 'source', e.target.value)}
                    style={{ ...inputStyle, marginBottom: 8, minHeight: 44, padding: 10 }} />
                  <input placeholder="Hauler / Trucking Co." value={m.hauler}
                    onChange={e => updateMaterial(idx, 'hauler', e.target.value)}
                    style={{ ...inputStyle, marginBottom: 8, minHeight: 44, padding: 10 }} />
                  <input placeholder="Ticket #" value={m.ticket_number}
                    onChange={e => updateMaterial(idx, 'ticket_number', e.target.value)}
                    style={{ ...inputStyle, marginBottom: 8, minHeight: 44, padding: 10 }} />

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => handleTicketPhoto(idx)}
                      style={{ padding: '10px 16px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>
                      📸 {m.ticket_photo ? 'Replace' : 'Ticket Photo'}
                    </button>
                    {m.ticket_photo && (
                      <img src={m.ticket_photo} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} alt="ticket" />
                    )}
                  </div>
                </div>
              ))}

              <button onClick={addMaterial}
                style={{ width: '100%', padding: 12, background: '#f3f4f6', color: '#2563eb', border: '1px dashed #d1d5db', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 48 }}>
                + Add Another Material
              </button>
            </div>
          )}
        </div>

        {/* ====== EQUIPMENT SECTION ====== */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <button
            onClick={() => equipment.length > 0 ? setShowEquipment(!showEquipment) : addEquipment()}
            style={{
              width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', color: '#111827',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              🚜 Equipment Used {equipment.length > 0 && <span style={{ background: '#2563eb', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, marginLeft: 4 }}>{equipment.length}</span>}
            </span>
            <span style={{ fontSize: 14, color: '#2563eb' }}>
              {equipment.length === 0 ? '+ Add Equipment' : (showEquipment ? '▲' : '▼')}
            </span>
          </button>

          {showEquipment && equipment.length > 0 && (
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {equipment.map((eq, idx) => (
                <div key={idx} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input placeholder="Equipment (e.g. Excavator, Skid Steer)" value={eq.name}
                      onChange={e => updateEquipment(idx, 'name', e.target.value)}
                      style={{ ...inputStyle, minHeight: 44, padding: 10, flex: 1 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 110 }}>
                      <input type="number" placeholder="Hrs" value={eq.hours || ''}
                        onChange={e => updateEquipment(idx, 'hours', parseFloat(e.target.value) || 0)}
                        style={{ ...inputStyle, minHeight: 44, padding: 8, width: 70 }} />
                      <span style={{ fontSize: 13, color: '#6b7280' }}>hrs</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input placeholder="Note (optional)" value={eq.note}
                      onChange={e => updateEquipment(idx, 'note', e.target.value)}
                      style={{ ...inputStyle, minHeight: 44, padding: 10, flex: 1 }} />
                    <button onClick={() => removeEquipment(idx)}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, width: 40, height: 44, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>✕</button>
                  </div>
                </div>
              ))}
              <button onClick={addEquipment}
                style={{ width: '100%', padding: 12, background: '#f3f4f6', color: '#2563eb', border: '1px dashed #d1d5db', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 48 }}>
                + Add Another Equipment
              </button>
            </div>
          )}
        </div>

        {/* ====== PHOTOS SECTION ====== */}
        <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <button
            onClick={() => setShowPhotos(!showPhotos)}
            style={{
              width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', color: '#111827',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              📷 Photos {photos.length > 0 && <span style={{ background: '#2563eb', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, marginLeft: 4 }}>{photos.length}</span>}
            </span>
            <span style={{ fontSize: 14, color: '#2563eb' }}>{showPhotos ? '▲' : '▼'}</span>
          </button>

          {showPhotos && (
            <div style={{ padding: '0 16px 16px' }}>
              {/* Photo action buttons */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button onClick={handleTakePhoto}
                  style={{ flex: 1, padding: 14, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', minHeight: 52 }}>
                  📸 Take Photo
                </button>
                <button onClick={handlePickFromGallery}
                  style={{ flex: 1, padding: 14, background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', minHeight: 52 }}>
                  🖼️ From Gallery
                </button>
              </div>

              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12, textAlign: 'center' }}>
                Pick from gallery to upload photos taken earlier — yesterday, last week, etc.
              </div>

              {/* Photo grid */}
              {photos.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {photos.map((p, idx) => (
                    <div key={idx} style={{ background: '#f9fafb', borderRadius: 10, padding: 10, border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <img src={p.dataUrl} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} alt="" />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <select value={p.tag} onChange={e => updatePhoto(idx, 'tag', e.target.value)}
                            style={{ ...selectStyle, minHeight: 36, padding: '4px 8px', fontSize: 13 }}>
                            {PHOTO_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <input placeholder="Caption (optional)" value={p.caption}
                            onChange={e => updatePhoto(idx, 'caption', e.target.value)}
                            style={{ ...inputStyle, minHeight: 36, padding: '4px 8px', fontSize: 13 }} />
                        </div>
                        <button onClick={() => removePhoto(idx)}
                          style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, flexShrink: 0, alignSelf: 'flex-start' }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {photos.length === 0 && (
                <div style={{ textAlign: 'center', padding: 20, color: '#6b7280', fontSize: 14 }}>
                  No photos yet — take one or pick from your gallery
                </div>
              )}
            </div>
          )}
        </div>

        {/* ====== NOTES ====== */}
        <div>
          <label style={labelStyle}>📝 Additional Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Anything else to note..."
            style={textareaStyle} />
        </div>

        {/* Error */}
        {saveError && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10, fontSize: 14 }}>
            ⚠️ {saveError}
          </div>
        )}
      </div>

      {/* ====== FLOATING SAVE BUTTON ====== */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, padding: 16,
        background: 'linear-gradient(transparent, #f9fafb 30%)', zIndex: 50,
      }}>
        <button onClick={handleSave} disabled={!canSave || saving}
          style={{
            width: '100%', padding: 16, border: 'none', borderRadius: 12,
            fontSize: 17, fontWeight: 700, cursor: canSave ? 'pointer' : 'default',
            background: !canSave ? '#d1d5db' : '#059669', color: '#fff',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            minHeight: 56,
          }}>
          {saving ? '💾 Saving...' : `💾 ${existingLogId ? 'Update' : 'Save'} Daily Log${photos.length > 0 ? ` (${photos.length} photo${photos.length > 1 ? 's' : ''})` : ''}${materials.length > 0 ? ` (${materials.length} material${materials.length > 1 ? 's' : ''})` : ''}`}
        </button>
      </div>

      {/* ====== JOB PICKER MODAL ====== */}
      {showJobPicker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#ffffff', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <button onClick={() => setShowJobPicker(false)}
                style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 24, cursor: 'pointer', padding: 8 }}>✕</button>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#111827' }}>Select Job</div>
            </div>
            <input ref={jobSearchRef} type="text" value={jobSearch}
              onChange={e => setJobSearch(e.target.value)}
              placeholder={`Search ${activeJobs.length} jobs — number, client, address...`}
              style={inputStyle} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            {filteredJobs.map(j => (
              <button key={j.id}
                onClick={() => { setJobId(j.id); setShowJobPicker(false); setJobSearch(''); }}
                style={{
                  width: '100%', padding: 14, display: 'flex', flexDirection: 'column', gap: 2,
                  background: j.id === jobId ? '#eff6ff' : 'transparent',
                  border: j.id === jobId ? '2px solid #2563eb' : '1px solid transparent',
                  borderRadius: 10, cursor: 'pointer', textAlign: 'left', marginBottom: 4,
                  minHeight: 56,
                }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{j.job_number}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{j.client_name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{j.project_address}</div>
              </button>
            ))}
            {filteredJobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>No matching jobs</div>
            )}
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleTicketFileChange} />
      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handlePhotoCapture} />
      <input ref={galleryInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotoCapture} />
    </div>
  );
};
