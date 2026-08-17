import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowLeft, Save, Trash2, Pencil, Copy, Search, X, AlertTriangle, ChevronLeft, ChevronRight, Star, Users, MapPin, Wrench, Play, Square, ArrowRightLeft, Check, ClipboardList } from 'lucide-react';
import type { Job, TimeEntry, User, Equipment } from '../types';
import {
  NON_JOB_CATEGORIES, getEntryLabel, isNonJobEntry, normalizeStatus,
  getCategoryLabel, getPayPeriodStart, getPayPeriodDates,
} from '../types';
import { genId, now, today, getTimeEntriesForUser, saveTimeEntriesForUser, getCurrentPosition, getEquipment } from '../utils/supabase';

interface Props {
  jobs: Job[];
  currentUser: User;
  users?: User[];
  preselectedJobId?: string | null;
  onBack: () => void;
  onSaved: () => void;
  embedded?: boolean;
}

// Format elapsed seconds to H:MM:SS
function formatElapsed(seconds: number): string {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Format elapsed to decimal hours
function elapsedToHours(seconds: number): number {
  return Math.round((seconds / 3600) * 100) / 100;
}

export const TimeEntryForm: React.FC<Props> = ({ jobs, currentUser, users, preselectedJobId, onBack, onSaved, embedded }) => {
  // ━━━ State ━━━
  const [date, setDate] = useState(today());
  const [allEntries, setAllEntries] = useState<TimeEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const stateVersion = useRef(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [entryUserId, setEntryUserId] = useState(currentUser.id);
  const [lunchDeduct, setLunchDeduct] = useState(false);
  const [notes, setNotes] = useState('');
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  // Clock state
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Modals
  const [clockInPicker, setClockInPicker] = useState(false);
  const [switchPicker, setSwitchPicker] = useState(false);
  const [clockOutConfirm, setClockOutConfirm] = useState(false);
  const [equipmentPicker, setEquipmentPicker] = useState(false);
  const [batchModal, setBatchModal] = useState(false);

  // Add/Edit
  const [showAddForm, setShowAddForm] = useState(false);
  const [addType, setAddType] = useState<'job' | 'non-job'>('job');
  const [addJobId, setAddJobId] = useState(preselectedJobId || '');
  const [addCategory, setAddCategory] = useState('shop');
  const [addHours, setAddHours] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHours, setEditHours] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editJobId, setEditJobId] = useState('');
  const [editType, setEditType] = useState<'job' | 'non-job'>('job');
  const [editCategory, setEditCategory] = useState('shop');

  // Job picker (shared)
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerTarget, setPickerTarget] = useState<'add' | 'edit'>('add');
  const pickerInputRef = useRef<HTMLInputElement>(null);

  // Batch clock-in
  const [batchJobId, setBatchJobId] = useState('');
  const [batchCategory, setBatchCategory] = useState('');
  const [batchSelectedUsers, setBatchSelectedUsers] = useState<string[]>([]);
  const [batchEquipmentId, setBatchEquipmentId] = useState('');
  const [batchJobPicker, setBatchJobPicker] = useState(false);
  const [batchSearchQuery, setBatchSearchQuery] = useState('');

  // Crew Timesheet (bulk retroactive entry)
  const [timesheetOpen, setTimesheetOpen] = useState(false);
  const [tsDate, setTsDate] = useState(today());
  const [tsJobId, setTsJobId] = useState('');
  const [tsCategory, setTsCategory] = useState('');
  const [tsJobPicker, setTsJobPicker] = useState(false);
  const [tsJobSearch, setTsJobSearch] = useState('');
  const [tsHours, setTsHours] = useState<Record<string, string>>({});
  const [tsNotes, setTsNotes] = useState<Record<string, string>>({});
  const [tsLunch, setTsLunch] = useState<Record<string, boolean>>({});
  const [tsSaving, setTsSaving] = useState(false);
  const [tsSaved, setTsSaved] = useState<string[]>([]); // saved rows this session
  const [tsMode, setTsMode] = useState<'job' | 'non-job'>('job');

  const canEnterForOthers = currentUser.role === 'foreman' || currentUser.role === 'admin';
  const entryUser = users?.find(u => u.id === entryUserId) || currentUser;
  const crewMembers = useMemo(() =>
    (users || []).filter(u => u.active && (u.role === 'crew' || u.role === 'foreman')),
    [users]
  );
  const allActiveUsers = useMemo(() =>
    (users || []).filter(u => u.active && u.role !== 'payroll'),
    [users]
  );

  const activeJobs = useMemo(() =>
    jobs.filter(j => j.status === 'active').sort((a, b) => (b.job_number || '').localeCompare(a.job_number || '')),
    [jobs]
  );

  const filterJobs = (query: string) => {
    if (!query.trim()) return activeJobs;
    const q = query.toLowerCase();
    return activeJobs.filter(j =>
      (j.job_number || '').toLowerCase().includes(q) ||
      (j.client_name || '').toLowerCase().includes(q) ||
      (j.project_address || '').toLowerCase().includes(q) ||
      (j.project_description || '').toLowerCase().includes(q)
    );
  };

  // ━━━ Load data ━━━
  useEffect(() => { loadEntries(); loadEquipment(); }, []);
  useEffect(() => { loadEntries(); }, [date, entryUserId]);

  const loadEntries = async () => {
    const loadVersion = stateVersion.current;
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      
      const now = Date.now();
      let modified = false;
      const processed = entries.map(e => {
        if (e.is_active && e.clock_in_time) {
          const elapsed = (now - new Date(e.clock_in_time).getTime()) / (1000 * 60 * 60);
          if (elapsed >= 14) {
            const clockOutTime = new Date(new Date(e.clock_in_time).getTime() + 14 * 60 * 60 * 1000);
            modified = true;
            return {
              ...e,
              is_active: false,
              clock_out_time: clockOutTime.toISOString(),
              hours: 14,
              notes: (e.notes ? e.notes + ' | ' : '') + '⚠️ Auto-clocked out after 14h — please verify hours',
              status: 'pending' as const,
            };
          }
        }
        return e;
      });
      
      // SAFETY: ensure only ONE active entry. If multiple exist, keep newest and close the rest.
      const activeEntries = processed.filter(e => e.is_active);
      if (activeEntries.length > 1) {
        activeEntries.sort((a, b) => (b.clock_in_time || '').localeCompare(a.clock_in_time || ''));
        const newest = activeEntries[0];
        for (let i = 1; i < activeEntries.length; i++) {
          const stale = activeEntries[i];
          const idx = processed.findIndex(e => e.id === stale.id);
          if (idx >= 0) {
            const clockIn = new Date(stale.clock_in_time!);
            const closeAt = new Date(newest.clock_in_time!);
            const hrs = Math.max(0.25, Math.round(((closeAt.getTime() - clockIn.getTime()) / 3600000) * 100) / 100);
            processed[idx] = {
              ...processed[idx],
              is_active: false,
              clock_out_time: closeAt.toISOString(),
              clock_out: closeAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              hours: hrs,
              notes: (processed[idx].notes ? processed[idx].notes + ' | ' : '') + 'auto-closed (duplicate)',
            };
            modified = true;
          }
        }
      }
      
      if (modified) {
        await saveTimeEntriesForUser(entryUserId, processed);
      }
      
      // If a handler updated state while we were loading, don't overwrite it
      if (stateVersion.current !== loadVersion) {
        return;
      }
      setAllEntries(processed);
      // Pick the single active entry (newest if somehow multiple survived)
      const activeOnes = processed.filter(e => e.is_active);
      const active = activeOnes.length > 0
        ? activeOnes.reduce((a, b) => (b.clock_in_time || '') > (a.clock_in_time || '') ? b : a)
        : null;
      setActiveEntry(active);
    } catch {}
  };

  const loadEquipment = async () => {
    try { const eq = await getEquipment(); setEquipment(eq); } catch {}
  };

  // ━━━ Timer ━━━
  useEffect(() => {
    if (!activeEntry?.is_active || !activeEntry?.clock_in_time) {
      setElapsedTime(0);
      return;
    }
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - new Date(activeEntry.clock_in_time!).getTime()) / 1000);
      setElapsedTime(elapsed);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeEntry?.id, activeEntry?.is_active, activeEntry?.clock_in_time]);

  // ━━━ Computed ━━━
  const todaysEntries = useMemo(() =>
    allEntries.filter(e => e.date === date && !e.is_active).sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [allEntries, date]
  );
  const totalToday = todaysEntries.reduce((s, t) => s + (Number(t.hours) || 0), 0) +
    (activeEntry?.is_active && activeEntry.date === date ? elapsedToHours(elapsedTime) : 0);

  const weekStart = useMemo(() => getPayPeriodStart(new Date(date + 'T12:00:00')), [date]);
  const weekDates = useMemo(() => getPayPeriodDates(weekStart), [weekStart]);
  const weekEntries = useMemo(() => allEntries.filter(e => weekDates.includes(e.date) && !e.is_active), [allEntries, weekDates]);
  const weekTotal = weekEntries.reduce((s, e) => s + (Number(e.hours) || 0), 0) +
    (activeEntry?.is_active && weekDates.includes(activeEntry.date) ? elapsedToHours(elapsedTime) : 0);
  // OT applies to Mon–Sat hours over 40 only; Sunday is a separate 1.5x premium, so exclude it here.
  const weekSundayHrs = weekEntries.filter(e => e.date === weekDates[0]).reduce((s, e) => s + (Number(e.hours) || 0), 0);
  const weekMonSatTotal = weekTotal - weekSundayHrs;
  const isOT = weekMonSatTotal > 40;
  const otHours = Math.max(0, weekMonSatTotal - 40);

  // ━━━ Paycheck preview (visible to all for their OWN entries) ━━━
  const paycheckPreview = useMemo(() => {
    const user = currentUser.id === entryUserId ? currentUser : users?.find(u => u.id === entryUserId);
    if (!user?.payRate || currentUser.role !== 'crew') return null; // Only show to crew for their own
    const rate = user.payRate;
    const isSalary = user.employeeType === 'salary';
    
    // Calculate Sunday hours
    const sundayDate = weekDates[0]; // First day is Sunday
    const sundayHrs = weekEntries.filter(e => e.date === sundayDate).reduce((s, e) => s + Number(e.hours), 0);
    const monSatHrs = weekTotal - sundayHrs;
    
    const regularHrs = Math.min(monSatHrs, 40);
    const otHrs = Math.max(0, monSatHrs - 40);
    
    const regularPay = regularHrs * rate;
    const otPay = isSalary ? otHrs * rate : otHrs * rate * 1.5;
    const sundayPay = isSalary ? sundayHrs * rate : sundayHrs * rate * 1.5;
    const totalPay = regularPay + otPay + sundayPay;
    
    return { regularHrs, otHrs, sundayHrs, regularPay, otPay, sundayPay, totalPay, rate, isSalary };
  }, [weekTotal, weekEntries, weekDates, currentUser, entryUserId, users]);

  const recentJobIds = useMemo(() => {
    const jobEntries = allEntries.filter(e => e.job_id && e.category !== 'non-job' && !e.is_active);
    const seen = new Set<string>();
    const recent: string[] = [];
    const sorted = [...jobEntries].sort((a, b) => b.date.localeCompare(a.date) || b.created_at.localeCompare(a.created_at));
    for (const e of sorted) {
      if (!seen.has(e.job_id)) { seen.add(e.job_id); recent.push(e.job_id); if (recent.length >= 5) break; }
    }
    return recent;
  }, [allEntries]);

  const recentJobs = useMemo(() =>
    recentJobIds.map(id => jobs.find(j => j.id === id)).filter((j): j is Job => !!j && j.status === 'active'),
    [recentJobIds, jobs]
  );

  const yesterday = useMemo(() => {
    const d = new Date(date + 'T12:00:00'); d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }, [date]);
  const yesterdayEntries = useMemo(() =>
    allEntries.filter(e => e.date === yesterday && Number(e.hours) > 0 && !e.is_active),
    [allEntries, yesterday]
  );
  const canCopyYesterday = yesterdayEntries.length > 0 && todaysEntries.length === 0;

  const rejectedEntries = useMemo(() =>
    allEntries.filter(e => normalizeStatus(e.status) === 'rejected').sort((a, b) => b.date.localeCompare(a.date)),
    [allEntries]
  );

  const dateObj = new Date(date + 'T12:00:00');
  const isToday = date === today();
  const dayLabel = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const isSunday = dateObj.getDay() === 0;
  const isHourly = (entryUser.employeeType || 'hourly') === 'hourly';

  // ━━━ CLOCK IN ━━━
  const handleClockIn = async (jobId: string, equipId?: string, nonJobCategory?: string) => {
    setSaving(true);
    try {
      const gpsPromise = getCurrentPosition().catch(() => null);
      const entries = await getTimeEntriesForUser(entryUserId);
      
      // SAFETY: Close any stale active entries before starting a new one
      const clockInTime = new Date();
      entries.forEach((e, i) => {
        if (e.is_active) {
          const elapsed = e.clock_in_time ? Math.max(0.25, Math.round(((clockInTime.getTime() - new Date(e.clock_in_time).getTime()) / 3600000) * 100) / 100) : 0.25;
          entries[i] = { ...e, is_active: false, clock_out_time: clockInTime.toISOString(),
            clock_out: clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            hours: elapsed, notes: (e.notes ? e.notes + ' | ' : '') + 'auto-closed' };
        }
      });
      
      const gps = await gpsPromise;
      const isOnBehalf = entryUserId !== currentUser.id;
      const selectedJob = jobs.find(j => j.id === jobId);
      const selectedEquip = equipment.find(e => e.id === equipId);
      const catInfo = nonJobCategory ? NON_JOB_CATEGORIES.find(c => c.id === nonJobCategory) : null;
      const entry: TimeEntry = {
        id: genId('time'),
        job_id: nonJobCategory ? '' : jobId, job_number: nonJobCategory ? '' : (selectedJob?.job_number || ''),
        category: nonJobCategory || (jobId ? 'job' : undefined),
        date: today(),
        user_id: entryUserId, user_name: entryUser.name,
        clock_in: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        clock_out: '', hours: 0, notes: '', lunch_deducted: false,
        status: 'pending', approved_by: '', approved_at: '',
        is_active: true,
        clock_in_time: new Date().toISOString(),
        clock_in_location: gps ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy } : undefined,
        equipment_id: equipId || undefined,
        equipment_name: selectedEquip?.name || undefined,
        ...(isOnBehalf ? { entered_by: currentUser.id, entered_by_name: currentUser.name } : {}),
        created_at: now(),
      };
      entries.push(entry);
      await saveTimeEntriesForUser(entryUserId, entries);
      // Update state immediately from local data — bump version to prevent stale loadEntries overwrite
      stateVersion.current++;
      setAllEntries([...entries]);
      setActiveEntry(entry);
      setClockInPicker(false);
      setDate(today());
      showSuccess(catInfo ? `⏱️ Clocked in — ${catInfo.icon} ${catInfo.label}` : '⏱️ Clocked in!');
      onSaved();
    } catch (err) {
      console.error('Clock in failed:', err);
      setSuccessMsg(''); // clear any success
      alert('Clock in failed — please check your connection and try again.');
    }
    setSaving(false);
  };

  // ━━━ CLOCK OUT ━━━
  const handleClockOut = async () => {
    if (!activeEntry) return;
    setSaving(true);
    try {
      const gpsPromise = getCurrentPosition().catch(() => null);
      const entries = await getTimeEntriesForUser(entryUserId);
      const gps = await gpsPromise;
      const clockOutTime = new Date();
      
      // Close ALL active entries (prevents orphan duplicates)
      entries.forEach((e, i) => {
        if (e.is_active) {
          const clockIn = e.clock_in_time ? new Date(e.clock_in_time) : clockOutTime;
          const hours = Math.max(0.25, Math.round(((clockOutTime.getTime() - clockIn.getTime()) / 3600000) * 100) / 100);
          entries[i] = {
            ...entries[i],
            is_active: false,
            clock_out: clockOutTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            clock_out_time: clockOutTime.toISOString(),
            clock_out_location: gps ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy } : undefined,
            hours,
          };
        }
      });
      await saveTimeEntriesForUser(entryUserId, entries);
      stateVersion.current++;
      setAllEntries([...entries]);
      setActiveEntry(null);
      setClockOutConfirm(false);
      showSuccess('✅ Clocked out — ' + elapsedToHours(elapsedTime).toFixed(1) + 'h');
      onSaved();
    } catch (err) {
      console.error('Clock out failed:', err);
      alert('Clock out failed — please check your connection and try again.');
    }
    setSaving(false);
  };

  // ━━━ SWITCH PROJECT ━━━
  const handleSwitchProject = async (newJobId: string, nonJobCategory?: string) => {
    if (!activeEntry) return;
    setSaving(true);
    try {
      const gpsPromise = getCurrentPosition().catch(() => null);
      const entries = await getTimeEntriesForUser(entryUserId);
      const gps = await gpsPromise;
      const switchTime = new Date();
      
      // Close ALL active entries (not just the tracked one — prevents duplicates)
      entries.forEach((e, i) => {
        if (e.is_active) {
          const clockIn = e.clock_in_time ? new Date(e.clock_in_time) : switchTime;
          const hours = Math.max(0.25, Math.round(((switchTime.getTime() - clockIn.getTime()) / 3600000) * 100) / 100);
          entries[i] = {
            ...entries[i],
            is_active: false,
            clock_out: switchTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            clock_out_time: switchTime.toISOString(),
            clock_out_location: gps ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy } : undefined,
            hours,
          };
        }
      });
      // Open new entry
      const isOnBehalf = entryUserId !== currentUser.id;
      const selectedJob = jobs.find(j => j.id === newJobId);
      const catInfo = nonJobCategory ? NON_JOB_CATEGORIES.find(c => c.id === nonJobCategory) : null;
      const newEntry: TimeEntry = {
        id: genId('time'),
        job_id: nonJobCategory ? '' : newJobId, job_number: nonJobCategory ? '' : (selectedJob?.job_number || ''),
        category: nonJobCategory || (newJobId ? 'job' : undefined),
        date: today(),
        user_id: entryUserId, user_name: entryUser.name,
        clock_in: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        clock_out: '', hours: 0, notes: '', lunch_deducted: false,
        status: 'pending', approved_by: '', approved_at: '',
        is_active: true,
        clock_in_time: new Date().toISOString(),
        clock_in_location: gps ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy } : undefined,
        equipment_id: activeEntry.equipment_id,
        equipment_name: activeEntry.equipment_name,
        ...(isOnBehalf ? { entered_by: currentUser.id, entered_by_name: currentUser.name } : {}),
        created_at: now(),
      };
      entries.push(newEntry);
      await saveTimeEntriesForUser(entryUserId, entries);
      // Update state immediately from local data — bump version to prevent stale loadEntries overwrite
      stateVersion.current++;
      setAllEntries([...entries]);
      setActiveEntry(newEntry);
      setSwitchPicker(false);
      showSuccess(catInfo ? `🔄 Switched to ${catInfo.icon} ${catInfo.label}` : '🔄 Switched to ' + (selectedJob?.job_number || 'new project'));
      onSaved();
    } catch (err) {
      console.error('Switch failed:', err);
      alert('Switch failed — please check your connection and try again.');
    }
    setSaving(false);
  };

  // ━━━ CHANGE EQUIPMENT ━━━
  const handleEquipmentChange = async (equipId: string) => {
    if (!activeEntry) return;
    const selectedEquip = equipment.find(e => e.id === equipId);
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      const idx = entries.findIndex(e => e.id === activeEntry.id);
      if (idx >= 0) {
        entries[idx] = {
          ...entries[idx],
          equipment_id: equipId || undefined,
          equipment_name: selectedEquip?.name || undefined,
        };
      }
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      if (idx >= 0) setActiveEntry(entries[idx]);
      setEquipmentPicker(false);
      showSuccess('🚜 Equipment updated');
    } catch {}
  };

  // ━━━ BATCH CLOCK IN ━━━
  const handleBatchClockIn = async () => {
    if (batchSelectedUsers.length === 0) return;
    setSaving(true);
    try {
      const gpsPromise = getCurrentPosition().catch(() => null);
      const selectedJob = jobs.find(j => j.id === batchJobId);
      const selectedEquip = equipment.find(e => e.id === batchEquipmentId);
      const catInfo = batchCategory ? NON_JOB_CATEGORIES.find(c => c.id === batchCategory) : null;
      const gps = await gpsPromise;
      const clockInTime = new Date();

      for (const userId of batchSelectedUsers) {
        const user = allActiveUsers.find(u => u.id === userId);
        if (!user) continue;
        const entries = await getTimeEntriesForUser(userId);
        // Skip if already clocked in
        if (entries.some(e => e.is_active)) continue;
        const entry: TimeEntry = {
          id: genId('time'),
          job_id: batchCategory ? '' : batchJobId, job_number: batchCategory ? '' : (selectedJob?.job_number || ''),
          category: batchCategory || (batchJobId ? 'job' : undefined),
          date: today(),
          user_id: userId, user_name: user.name,
          clock_in: clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          clock_out: '', hours: 0, notes: '', lunch_deducted: false,
          status: 'pending', approved_by: '', approved_at: '',
          is_active: true,
          clock_in_time: clockInTime.toISOString(),
          clock_in_location: gps ? { lat: gps.lat, lng: gps.lng, accuracy: gps.accuracy } : undefined,
          equipment_id: batchEquipmentId || undefined,
          equipment_name: selectedEquip?.name || undefined,
          entered_by: currentUser.id,
          entered_by_name: currentUser.name,
          created_at: now(),
        };
        entries.push(entry);
        await saveTimeEntriesForUser(userId, entries);
      }
      setBatchModal(false);
      setBatchSelectedUsers([]);
      setBatchJobId('');
      setBatchCategory('');
      showSuccess(
        catInfo
          ? `👥 Clocked in ${batchSelectedUsers.length} crew members — ${catInfo.icon} ${catInfo.label}`
          : `👥 Clocked in ${batchSelectedUsers.length} crew members!`
      );
      await loadEntries();
      onSaved();
    } catch (err) {
      console.error('Batch clock in failed:', err);
      alert('Batch clock in failed — please try again.');
    }
    setSaving(false);
  };

  // ━━━ MANUAL ADD ━━━
  const handleAddSave = async () => {
    const hrs = parseFloat(addHours) || 0;
    if (hrs <= 0) return;
    // Don't silently save a "Job" entry with no job picked — open the picker so
    // the user consciously chooses a job (or taps "Skip (assign later)").
    if (addType === 'job' && !addJobId) { openPicker('add'); return; }
    const actualHrs = lunchDeduct ? Math.max(0, hrs - 0.5) : hrs;
    setSaving(true);
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      const isOnBehalf = entryUserId !== currentUser.id;
      const selectedJob = addType === 'job' ? jobs.find(j => j.id === addJobId) : null;
      const entry: TimeEntry = {
        id: genId('time'),
        job_id: addType === 'job' ? addJobId : '',
        job_number: selectedJob?.job_number || '',
        category: addType === 'job' ? 'job' : addCategory,
        date,
        user_id: entryUserId, user_name: entryUser.name,
        clock_in: '', clock_out: '',
        hours: Math.round(actualHrs * 100) / 100,
        notes, lunch_deducted: lunchDeduct,
        status: 'pending', approved_by: '', approved_at: '',
        ...(isOnBehalf ? { entered_by: currentUser.id, entered_by_name: currentUser.name } : {}),
        created_at: now(),
      };
      entries.push(entry);
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      // Keep the form open and reset the fields so multiple jobs can be logged
      // for the same day back-to-back without re-finding the button.
      setAddJobId(''); setAddHours('');
      setNotes(''); setLunchDeduct(false);
      const savedLabel = addType === 'job'
        ? (selectedJob?.job_number || 'job')
        : (NON_JOB_CATEGORIES.find(c => c.id === addCategory)?.label || 'entry');
      showSuccess(`Saved ${actualHrs.toFixed(1)}h to ${savedLabel} — add another or close`);
      onSaved();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed — please check your connection and try again.');
    }
    setSaving(false);
  };

  // Quick add
  const quickAdd = async (jobId: string, hours: number) => {
    setSaving(true);
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      const isOnBehalf = entryUserId !== currentUser.id;
      const selectedJob = jobs.find(j => j.id === jobId);
      const entry: TimeEntry = {
        id: genId('time'), job_id: jobId, job_number: selectedJob?.job_number || '',
        category: 'job', date, user_id: entryUserId, user_name: entryUser.name,
        clock_in: '', clock_out: '', hours, notes: '', lunch_deducted: false,
        status: 'pending', approved_by: '', approved_at: '',
        ...(isOnBehalf ? { entered_by: currentUser.id, entered_by_name: currentUser.name } : {}),
        created_at: now(),
      };
      entries.push(entry);
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      showSuccess('Added!');
      onSaved();
    } catch (err) {
      console.error('Quick add failed:', err);
      alert('Save failed — please try again.');
    }
    setSaving(false);
  };

  // Save edit
  const handleEditSave = async () => {
    if (!editingId) return;
    const hrs = parseFloat(editHours) || 0;
    if (hrs <= 0) return;
    if (editType === 'job' && !editJobId) { openPicker('edit'); return; }
    setSaving(true);
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      const idx = entries.findIndex(e => e.id === editingId);
      if (idx >= 0) {
        const selectedJob = editType === 'job' ? jobs.find(j => j.id === editJobId) : null;
        entries[idx] = {
          ...entries[idx],
          job_id: editType === 'job' ? editJobId : '',
          job_number: selectedJob?.job_number || '',
          category: editType === 'job' ? 'job' : editCategory,
          hours: Math.round(hrs * 100) / 100, notes: editNotes,
          status: 'pending', approved_by: '', approved_at: '', rejection_reason: undefined,
        };
      }
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      setEditingId(null);
      showSuccess('Updated!');
      onSaved();
    } catch (err) {
      console.error('Edit failed:', err);
      alert('Update failed — please try again.');
    }
    setSaving(false);
  };

  const deleteEntry = async (entryId: string) => {
    try {
      let entries = await getTimeEntriesForUser(entryUserId);
      entries = entries.filter(e => e.id !== entryId);
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      if (entryId === editingId) setEditingId(null);
      if (activeEntry?.id === entryId) setActiveEntry(null);
    } catch {}
  };

  const startEdit = (entry: TimeEntry) => {
    setEditingId(entry.id);
    setEditHours(String(entry.hours));
    setEditNotes(entry.notes || '');
    if (isNonJobEntry(entry)) { setEditType('non-job'); setEditCategory(entry.category || 'shop'); setEditJobId(''); }
    else { setEditType('job'); setEditJobId(entry.job_id); setEditCategory('shop'); }
    if (entry.date !== date) setDate(entry.date);
  };

  const copyYesterday = async () => {
    if (yesterdayEntries.length === 0) return;
    setSaving(true);
    try {
      const entries = await getTimeEntriesForUser(entryUserId);
      const ts = now();
      yesterdayEntries.forEach(old => {
        entries.push({
          ...old, id: genId('time'), date,
          status: 'pending', approved_by: '', approved_at: '',
          admin_approved_by: undefined, admin_approved_at: undefined,
          rejection_reason: undefined, is_active: undefined, clock_in_time: undefined,
          clock_out_time: undefined, created_at: ts,
        });
      });
      await saveTimeEntriesForUser(entryUserId, entries);
      setAllEntries([...entries]);
      showSuccess('Copied ' + yesterdayEntries.length + ' entries!');
      onSaved();
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Copy failed — please try again.');
    }
    setSaving(false);
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // ━━━ CREW TIMESHEET SAVE ━━━
  const handleTimesheetSave = async () => {
    const usersToSave = allActiveUsers.filter(u => {
      const hrs = parseFloat(tsHours[u.id] || '');
      return hrs > 0;
    });
    if (usersToSave.length === 0) return;
    setTsSaving(true);
    try {
      const selectedJob = tsMode === 'job' ? jobs.find(j => j.id === tsJobId) : null;
      const catInfo = tsMode === 'non-job' ? NON_JOB_CATEGORIES.find(c => c.id === tsCategory) : null;
      const savedIds: string[] = [];
      for (const user of usersToSave) {
        const rawHrs = parseFloat(tsHours[user.id] || '0');
        const lunch = tsLunch[user.id] || false;
        const hrs = Math.round((lunch ? Math.max(0, rawHrs - 0.5) : rawHrs) * 100) / 100;
        const entries = await getTimeEntriesForUser(user.id);
        const entry: TimeEntry = {
          id: genId('time'),
          job_id: tsMode === 'job' ? tsJobId : '',
          job_number: selectedJob?.job_number || '',
          category: tsMode === 'job' ? 'job' : tsCategory,
          date: tsDate,
          user_id: user.id, user_name: user.name,
          clock_in: '', clock_out: '',
          hours: hrs,
          notes: tsNotes[user.id] || '',
          lunch_deducted: lunch,
          status: 'pending', approved_by: '', approved_at: '',
          entered_by: currentUser.id, entered_by_name: currentUser.name,
          created_at: now(),
        };
        entries.push(entry);
        await saveTimeEntriesForUser(user.id, entries);
        savedIds.push(user.id);
      }
      setTsSaved(prev => [...prev, ...savedIds]);
      showSuccess(
        catInfo
          ? `✅ Saved ${usersToSave.length} entries — ${catInfo.icon} ${catInfo.label}`
          : `✅ Saved ${usersToSave.length} entries!`
      );
      // Clear hours for saved users but keep the form open for more
      const clearedHours = { ...tsHours };
      const clearedNotes = { ...tsNotes };
      const clearedLunch = { ...tsLunch };
      usersToSave.forEach(u => { clearedHours[u.id] = ''; clearedNotes[u.id] = ''; clearedLunch[u.id] = false; });
      setTsHours(clearedHours);
      setTsNotes(clearedNotes);
      setTsLunch(clearedLunch);
      await loadEntries();
      onSaved();
    } catch (err) {
      console.error('Timesheet save failed:', err);
      alert('Save failed — please try again.');
    }
    setTsSaving(false);
  };

  const openTimesheet = () => {
    setTimesheetOpen(true);
    setTsDate(date); // start on the currently selected day
    setTsJobId('');
    setTsCategory('shop');
    setTsMode('job');
    setTsHours({});
    setTsNotes({});
    setTsLunch({});
    setTsSaved([]);
  };

  const fillAllHours = (hrs: string) => {
    const filled: Record<string, string> = {};
    allActiveUsers.forEach(u => { filled[u.id] = hrs; });
    setTsHours(filled);
  };

  const openPicker = (target: 'add' | 'edit') => {
    setPickerTarget(target); setPickerSearch(''); setPickerOpen(true);
  };

  useEffect(() => {
    if (pickerOpen && pickerInputRef.current) setTimeout(() => pickerInputRef.current?.focus(), 100);
  }, [pickerOpen]);

  const prevDay = () => {
    const d = new Date(date + 'T12:00:00'); d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split('T')[0]);
  };
  const nextDay = () => {
    const d = new Date(date + 'T12:00:00'); d.setDate(d.getDate() + 1);
    const next = d.toISOString().split('T')[0];
    if (next <= today()) setDate(next);
  };

  const jobDisplay = (jobId: string) => {
    const j = jobs.find(j => j.id === jobId);
    return j ? j.job_number : (jobId ? 'Unknown' : 'No Job');
  };
  const statusBadge = (status: string) => {
    const s = normalizeStatus(status);
    if (s === 'admin-approved') return <span className="badge badge-success badge-xs">✓</span>;
    if (s === 'rejected') return <span className="badge badge-error badge-xs">✗</span>;
    return <span className="badge badge-warning badge-xs">⏳</span>;
  };

  // Active entry job info
  const activeJob = activeEntry ? jobs.find(j => j.id === activeEntry.job_id) : null;
  const isClockedIn = activeEntry?.is_active === true;

  return (
    <div className={`flex flex-col ${embedded ? '' : 'h-full'}`}>
      {/* Header */}
      {!embedded && (
        <div className="p-3 bg-base-200 flex items-center gap-2">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onBack}><ArrowLeft size={18} /></button>
          <h2 className="text-lg font-bold flex-1">Log Time</h2>
          <span className={'badge badge-lg ' + (isOT ? 'badge-error' : 'badge-primary')}>{weekTotal.toFixed(1)}h/wk</span>
        </div>
      )}

      <div className={(embedded ? '' : 'flex-1 overflow-y-auto') + ' p-3 pb-32 space-y-3'}>
        {successMsg && <div className="alert alert-success py-2 text-sm shadow-lg">{successMsg}</div>}

        {/* Person picker */}
        {canEnterForOthers && crewMembers.length > 0 && (
          <select className="select select-bordered select-sm w-full"
            value={entryUserId}
            onChange={e => { setEntryUserId(e.target.value); setEditingId(null); }}>
            <option value={currentUser.id}>⏱️ Logging for: {currentUser.name} (Me)</option>
            {crewMembers.filter(u => u.id !== currentUser.id).map(u => (
              <option key={u.id} value={u.id}>⏱️ Logging for: {u.name} ({u.role})</option>
            ))}
          </select>
        )}

        {/* ━━━ CLOCK STATUS CARD ━━━ */}
        <div className={`rounded-2xl p-4 ${isClockedIn
          ? 'bg-gradient-to-br from-success/20 to-success/5 border-2 border-success/40'
          : 'bg-base-200 border border-base-300'
        }`}>
          {isClockedIn ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="font-bold text-success text-sm uppercase tracking-wide">Clocked In</span>
              </div>
              <div className="text-4xl font-mono font-bold text-center my-3 tabular-nums">
                {formatElapsed(elapsedTime)}
              </div>
              <div className="flex flex-wrap gap-2 justify-center text-sm">
                {activeJob ? (
                  <span className="badge badge-lg gap-1">
                    📍 {activeJob.job_number} — {activeJob.client_name}
                  </span>
                ) : activeEntry?.category && activeEntry.category !== 'job' ? (
                  <span className="badge badge-lg badge-info gap-1">
                    {NON_JOB_CATEGORIES.find(c => c.id === activeEntry.category)?.icon || '📝'} {getCategoryLabel(activeEntry.category)}
                  </span>
                ) : activeEntry?.job_id ? (
                  <span className="badge badge-lg badge-warning gap-1">⚠️ Unassigned</span>
                ) : (
                  <span className="badge badge-lg badge-ghost gap-1">No project selected</span>
                )}
                {activeEntry?.equipment_name && (
                  <span className="badge badge-lg badge-ghost gap-1">🚜 {activeEntry.equipment_name}</span>
                )}
              </div>
              {activeEntry?.clock_in_location && (
                <div className="text-[10px] text-center mt-2 text-base-content/30 flex items-center justify-center gap-1">
                  <MapPin size={10} /> GPS recorded at clock-in
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-2">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-base-content/20" />
                <span className="font-semibold text-base-content/50 text-sm">Not Clocked In</span>
              </div>
              <p className="text-xs text-base-content/30">Tap the button below to start your day</p>
            </div>
          )}
        </div>

        {/* ━━━ CLOCK IN/OUT BUTTON ━━━ */}
        {isClockedIn ? (
          <div className="space-y-2">
            <button
              className="btn w-full min-h-[60px] text-lg rounded-2xl shadow-lg bg-error hover:bg-error/90 text-error-content border-0 gap-2"
              onClick={() => setClockOutConfirm(true)} disabled={saving}>
              <Square size={22} fill="currentColor" /> CLOCK OUT
            </button>
            <div className="flex gap-2">
              <button className="btn btn-outline flex-1 min-h-[48px] gap-1 rounded-xl"
                onClick={() => { setPickerSearch(''); setSwitchPicker(true); }}>
                <ArrowRightLeft size={16} /> Switch Project
              </button>
              <button className="btn btn-outline min-h-[48px] gap-1 rounded-xl px-4"
                onClick={() => setEquipmentPicker(true)}>
                <Wrench size={16} /> {activeEntry?.equipment_name ? '🚜' : 'Equip'}
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn w-full min-h-[64px] text-xl rounded-2xl shadow-lg bg-success hover:bg-success/90 text-success-content border-0 gap-3"
            onClick={() => { setPickerSearch(''); setClockInPicker(true); }} disabled={saving}>
            <Play size={24} fill="currentColor" /> CLOCK IN
          </button>
        )}

        {/* ━━━ BATCH CLOCK IN + CREW TIMESHEET (foreman/admin) ━━━ */}
        {canEnterForOthers && !isClockedIn && (
          <div className="flex gap-2">
            <button className="btn btn-outline flex-1 min-h-[48px] gap-2 rounded-xl"
              onClick={() => { setBatchModal(true); setBatchSelectedUsers([]); setBatchJobId(''); setBatchCategory(''); }}>
              <Users size={18} /> Clock In Crew
            </button>
            <button className="btn btn-primary flex-1 min-h-[48px] gap-2 rounded-xl"
              onClick={openTimesheet}>
              <ClipboardList size={18} /> Crew Timesheet
            </button>
          </div>
        )}
        {canEnterForOthers && isClockedIn && (
          <button className="btn btn-outline w-full min-h-[44px] gap-2 rounded-xl text-sm"
            onClick={openTimesheet}>
            <ClipboardList size={16} /> Crew Timesheet (backfill hours)
          </button>
        )}

        {/* ━━━ WEEK BAR ━━━ */}
        <div className="bg-base-200 rounded-xl p-2.5">
          <div className="grid grid-cols-7 gap-1">
            {weekDates.map(d => {
              const dayHrs = allEntries.filter(e => e.date === d && !e.is_active).reduce((s, e) => s + Number(e.hours), 0);
              const isSelected = d === date;
              const isTdy = d === today();
              const dayDate = new Date(d + 'T12:00:00');
              const dayLbl = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayDate.getDay()];
              const isFuture = d > today();
              return (
                <button key={d}
                  className={`text-center p-1.5 rounded-lg transition-all min-h-[52px] flex flex-col items-center justify-center ${
                    isSelected ? 'bg-primary text-primary-content ring-2 ring-primary ring-offset-1 ring-offset-base-200' :
                    isFuture ? 'opacity-30' : isTdy ? 'bg-primary/15' : 'hover:bg-base-300'
                  }`}
                  onClick={() => !isFuture && setDate(d)} disabled={isFuture}>
                  <span className="text-[10px] font-medium opacity-70">{dayLbl}</span>
                  <span className={`text-sm font-bold ${dayHrs > 0 ? '' : 'opacity-25'}`}>
                    {dayHrs > 0 ? dayHrs.toFixed(1) : '—'}
                  </span>
                  {dayHrs > 8 && !isSelected && <div className="w-1 h-1 rounded-full bg-warning mt-0.5" />}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-base-300/50 text-xs">
            <span className="font-medium">Week Total</span>
            <div className="flex gap-2 items-center">
              {isOT && <span className="badge badge-error badge-xs">{otHours.toFixed(1)}h OT</span>}
              <span className={'font-bold text-sm ' + (isOT ? 'text-error' : 'text-primary')}>{weekTotal.toFixed(1)}h</span>
            </div>
          </div>
        </div>

        {/* ━━━ PAYCHECK PREVIEW (crew only) ━━━ */}
        {paycheckPreview && paycheckPreview.totalPay > 0 && (
          <details className="bg-green-50 border border-green-200 rounded-xl">
            <summary className="p-3 cursor-pointer flex items-center justify-between">
              <span className="text-sm font-semibold text-green-800">💰 Est. Paycheck</span>
              <span className="text-lg font-bold text-green-700">${paycheckPreview.totalPay.toFixed(2)}</span>
            </summary>
            <div className="px-3 pb-3 space-y-1 text-xs text-green-700">
              <div className="flex justify-between">
                <span>Regular ({paycheckPreview.regularHrs.toFixed(1)}h × ${paycheckPreview.rate.toFixed(2)})</span>
                <span className="font-medium">${paycheckPreview.regularPay.toFixed(2)}</span>
              </div>
              {paycheckPreview.otHrs > 0 && (
                <div className="flex justify-between">
                  <span>Overtime ({paycheckPreview.otHrs.toFixed(1)}h × ${(paycheckPreview.isSalary ? paycheckPreview.rate : paycheckPreview.rate * 1.5).toFixed(2)})</span>
                  <span className="font-medium">${paycheckPreview.otPay.toFixed(2)}</span>
                </div>
              )}
              {paycheckPreview.sundayHrs > 0 && (
                <div className="flex justify-between">
                  <span>Sunday ({paycheckPreview.sundayHrs.toFixed(1)}h × ${(paycheckPreview.isSalary ? paycheckPreview.rate : paycheckPreview.rate * 1.5).toFixed(2)})</span>
                  <span className="font-medium">${paycheckPreview.sundayPay.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-green-300 pt-1 flex justify-between font-bold">
                <span>Estimated Gross</span>
                <span>${paycheckPreview.totalPay.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-green-500 mt-1">*Estimate only — before taxes/deductions. Based on approved + pending hours.</p>
            </div>
          </details>
        )}

        {/* ━━━ DAY NAVIGATION ━━━ */}
        <div className="flex items-center justify-between bg-base-200 rounded-xl px-2">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={prevDay}>
            <ChevronLeft size={22} />
          </button>
          <div className="text-center py-2">
            <div className="font-bold text-base">{dayLabel}</div>
            <div className="text-xs text-base-content/50">
              {dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {isSunday && isHourly && <span className="text-warning ml-1">⚡ 1.5×</span>}
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={nextDay} disabled={isToday}>
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ━━━ TODAY'S ENTRIES ━━━ */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-base-content/70">
              {todaysEntries.length === 0 ? 'No entries' : `${todaysEntries.length} ${todaysEntries.length === 1 ? 'entry' : 'entries'}`}
            </span>
            <span className={'text-lg font-bold ' + (totalToday > 0 ? 'text-primary' : 'text-base-content/30')}>
              {totalToday.toFixed(1)}h
            </span>
          </div>

          {todaysEntries.map(entry => {
            const label = getEntryLabel(entry);
            const status = normalizeStatus(entry.status);
            const isEditing = editingId === entry.id;
            const canEdit = status === 'pending' || status === 'rejected';

            if (isEditing) {
              return (
                <div key={entry.id} className="card bg-info/10 border-2 border-info rounded-xl mb-2">
                  <div className="card-body p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-info">Editing</span>
                      <button className="btn btn-ghost btn-xs" onClick={() => setEditingId(null)}><X size={14} /></button>
                    </div>
                    <div className="flex gap-1">
                      <button className={`btn btn-sm flex-1 ${editType === 'job' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setEditType('job')}>Job</button>
                      <button className={`btn btn-sm flex-1 ${editType === 'non-job' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setEditType('non-job')}>Non-Job</button>
                    </div>
                    {editType === 'job' ? (
                      <div className="p-3 bg-base-200 rounded-lg cursor-pointer min-h-[44px] flex items-center justify-between"
                        onClick={() => openPicker('edit')}>
                        {editJobId ? (
                          <div className="min-w-0 flex-1">
                            <span className="font-bold">{jobDisplay(editJobId)}</span>
                            <span className="text-sm text-base-content/60 ml-2">{jobs.find(j => j.id === editJobId)?.client_name}</span>
                          </div>
                        ) : (<span className="text-base-content/40">Tap to pick job...</span>)}
                        <Search size={16} className="text-base-content/40" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1">
                        {NON_JOB_CATEGORIES.map(cat => (
                          <button key={cat.id}
                            className={`btn btn-sm min-h-[40px] justify-start gap-1 ${editCategory === cat.id ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
                            onClick={() => setEditCategory(cat.id)}>{cat.icon} <span className="text-xs">{cat.label}</span></button>
                        ))}
                      </div>
                    )}
                    <input type="number" step="0.25" min="0" max="24"
                      className="input input-bordered flex-1 min-h-[48px] text-xl font-bold text-center"
                      value={editHours} onChange={e => setEditHours(e.target.value)} placeholder="Hours" />
                    <input className="input input-bordered input-sm w-full" value={editNotes}
                      onChange={e => setEditNotes(e.target.value)} placeholder="Notes (optional)" />
                    <div className="flex gap-2">
                      <button className="btn btn-info flex-1 min-h-[44px] gap-1" onClick={handleEditSave} disabled={saving}>
                        {saving ? <span className="loading loading-spinner loading-sm" /> : <Save size={16} />} Update
                      </button>
                      <button className="btn btn-error btn-outline min-h-[44px]" onClick={() => deleteEntry(entry.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={entry.id} className={`flex items-center gap-2 p-2.5 rounded-xl mb-1.5 ${
                status === 'rejected' ? 'bg-error/10 border border-error/30' : 'bg-base-200'
              }`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {statusBadge(entry.status)}
                    <span className="font-semibold text-sm truncate">{label}</span>
                    {!isNonJobEntry(entry) && !entry.job_id && <span className="text-[10px] text-warning">⚠️</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {entry.clock_in && entry.clock_out && (
                      <span className="text-[10px] text-base-content/40">{entry.clock_in} → {entry.clock_out}</span>
                    )}
                    {entry.equipment_name && (
                      <span className="text-[10px] text-base-content/40">🚜 {entry.equipment_name}</span>
                    )}
                    {entry.clock_in_location && (
                      <span className="text-[10px] text-base-content/30">📍</span>
                    )}
                  </div>
                  {entry.notes && <p className="text-[11px] text-base-content/50 truncate mt-0.5">{entry.notes}</p>}
                  {status === 'rejected' && entry.rejection_reason && (
                    <p className="text-[11px] text-error truncate mt-0.5">Rejected: {entry.rejection_reason}</p>
                  )}
                  {entry.entered_by_name && <p className="text-[10px] text-base-content/30">by {entry.entered_by_name}</p>}
                </div>
                <span className="font-bold text-base tabular-nums">{Number(entry.hours).toFixed(1)}h</span>
                {canEdit && (
                  <button className="btn btn-ghost btn-xs btn-circle min-h-[32px] min-w-[32px]"
                    onClick={() => startEdit(entry)}><Pencil size={14} /></button>
                )}
              </div>
            );
          })}
        </div>

        {/* ━━━ REJECTED ENTRIES (other days) ━━━ */}
        {rejectedEntries.filter(e => e.date !== date).length > 0 && (
          <div className="alert alert-error py-2 text-sm cursor-pointer"
            onClick={() => { const e = rejectedEntries.find(e => e.date !== date); if (e) { setDate(e.date); startEdit(e); } }}>
            <AlertTriangle size={14} />
            <span><strong>{rejectedEntries.filter(e => e.date !== date).length}</strong> rejected entries need fixing — tap to view</span>
          </div>
        )}

        {/* ━━━ COPY YESTERDAY ━━━ */}
        {canCopyYesterday && (
          <button className="btn btn-ghost w-full gap-2 border border-dashed border-base-300 min-h-[44px] rounded-xl text-sm"
            onClick={copyYesterday} disabled={saving}>
            <Copy size={14} /> Copy yesterday ({yesterdayEntries.length} entries, {yesterdayEntries.reduce((s, e) => s + Number(e.hours), 0).toFixed(1)}h)
          </button>
        )}

        {/* ━━━ QUICK ADD (recent jobs) ━━━ */}
        {recentJobs.length > 0 && !showAddForm && (
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Star size={12} className="text-warning" />
              <span className="text-xs font-semibold text-base-content/50">Quick Add — tap a recent job</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentJobs.map(j => (
                <QuickAddChip key={j.id} job={j} onAdd={(hrs) => quickAdd(j.id, hrs)} saving={saving} />
              ))}
            </div>
          </div>
        )}

        {/* ━━━ MANUAL ADD FORM ━━━ */}
        {showAddForm ? (
          <div className="card bg-base-200 rounded-xl">
            <div className="card-body p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">✏️ Manual Entry</span>
                <button className="btn btn-ghost btn-xs btn-circle" onClick={() => setShowAddForm(false)}><X size={14} /></button>
              </div>
              <div className="flex gap-1">
                <button className={`btn btn-sm flex-1 ${addType === 'job' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setAddType('job')}>Job</button>
                <button className={`btn btn-sm flex-1 ${addType === 'non-job' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setAddType('non-job')}>Non-Job</button>
              </div>
              {addType === 'job' ? (
                <div className={`p-3 rounded-lg cursor-pointer min-h-[48px] flex items-center justify-between ${addJobId ? 'bg-white border border-base-300' : 'bg-primary/5 border-2 border-primary/50'}`}
                  onClick={() => openPicker('add')}>
                  {addJobId ? (
                    <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-bold">{jobDisplay(addJobId)}</span>
                        <span className="text-sm text-base-content/60 ml-2">{jobs.find(j => j.id === addJobId)?.client_name}</span>
                      </div>
                      <span className="text-xs text-primary font-semibold whitespace-nowrap">Change</span>
                    </div>
                  ) : (
                    <span className="text-primary font-semibold flex items-center gap-2"><Search size={16} /> Tap to choose a job</span>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {NON_JOB_CATEGORIES.map(cat => (
                    <button key={cat.id}
                      className={`btn btn-sm min-h-[40px] justify-start gap-1 ${addCategory === cat.id ? 'btn-primary' : 'btn-ghost bg-white'}`}
                      onClick={() => setAddCategory(cat.id)}>{cat.icon} <span className="text-xs">{cat.label}</span></button>
                  ))}
                </div>
              )}
              <input type="number" step="0.25" min="0" max="24"
                className="input input-bordered w-full min-h-[52px] text-2xl font-bold text-center"
                value={addHours} onChange={e => setAddHours(e.target.value)} placeholder="Hours" />
              <input className="input input-bordered input-sm w-full" value={notes}
                onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" />
              <label className="flex items-center gap-2 cursor-pointer min-h-[40px]">
                <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={lunchDeduct}
                  onChange={e => setLunchDeduct(e.target.checked)} />
                <span className="text-sm">Deduct 30 min lunch</span>
                {lunchDeduct && <span className="badge badge-ghost badge-xs">-0.5h</span>}
              </label>
              <button className="btn btn-primary w-full min-h-[52px] gap-2 text-lg rounded-xl"
                onClick={handleAddSave} disabled={saving || (parseFloat(addHours) || 0) <= 0}>
                {saving ? <span className="loading loading-spinner" /> : <Save size={20} />}
                Save {(parseFloat(addHours) || 0) > 0 ? `(${lunchDeduct ? Math.max(0, (parseFloat(addHours) || 0) - 0.5).toFixed(1) : parseFloat(addHours).toFixed(1)}h)` : ''}
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-outline btn-primary w-full min-h-[52px] gap-2 rounded-xl text-base font-bold"
            onClick={() => setShowAddForm(true)}>
            <Pencil size={18} /> Enter Hours (add a job or activity)
          </button>
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━ MODALS ━━━━━━━━━━━━━━━━━━━ */}

      {/* CLOCK IN JOB PICKER */}
      {clockInPicker && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="p-3 bg-success/10 flex items-center gap-2 border-b border-success/30">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setClockInPicker(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg text-success flex-1">🟢 Clock In — Select Activity</h3>
          </div>
          <div className="p-3 bg-base-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input ref={pickerInputRef} type="text" inputMode="search"
                className="input input-bordered w-full pl-10 min-h-[48px] text-base"
                placeholder="Search job #, client, address..."
                value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} autoFocus />
              {pickerSearch && <button className="absolute right-3 top-3.5" onClick={() => setPickerSearch('')}><X size={18} /></button>}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Non-job categories at top */}
            {!pickerSearch && (
              <>
                <div className="px-3 py-2 bg-base-200/50">
                  <span className="text-xs font-bold text-base-content/40">🔧 Shop / Non-Job Work</span>
                </div>
                {NON_JOB_CATEGORIES.filter(c => c.id !== 'pto').map(cat => (
                  <button key={cat.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-success/10 border-b border-base-200 min-h-[52px]"
                    onClick={() => handleClockIn('', undefined, cat.id)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-semibold text-base">{cat.label}</span>
                    </div>
                  </button>
                ))}
              </>
            )}
            <button className="w-full text-left p-4 hover:bg-base-200 active:bg-base-300 text-base-content/50 border-b border-base-200 min-h-[52px]"
              onClick={() => handleClockIn('')}>
              — Skip (assign later) —
            </button>
            {/* Recent jobs */}
            {!pickerSearch && recentJobs.length > 0 && (
              <div className="px-3 py-2 bg-warning/5">
                <span className="text-xs font-bold text-base-content/40 flex items-center gap-1"><Star size={10} /> Recent Jobs</span>
              </div>
            )}
            {!pickerSearch && recentJobs.map(j => (
              <button key={'r-' + j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-success/10 border-b border-base-200 min-h-[52px]"
                onClick={() => handleClockIn(j.id)}>
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-warning" />
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5 ml-5">{j.project_address}</div>}
              </button>
            ))}
            {!pickerSearch && (
              <div className="px-3 py-2 bg-base-200/50">
                <span className="text-xs font-bold text-base-content/40">All Jobs</span>
              </div>
            )}
            {filterJobs(pickerSearch).map(j => (
              <button key={j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-success/10 border-b border-base-200 min-h-[52px]"
                onClick={() => handleClockIn(j.id)}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5">{j.project_address}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SWITCH PROJECT PICKER */}
      {switchPicker && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="p-3 bg-info/10 flex items-center gap-2 border-b border-info/30">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setSwitchPicker(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg text-info flex-1">🔄 Switch To</h3>
          </div>
          <div className="p-3 bg-base-200 text-xs text-base-content/50">
            Currently on: <strong>{activeJob?.job_number || (activeEntry?.category ? getCategoryLabel(activeEntry.category) : 'No project')}</strong> ({elapsedToHours(elapsedTime).toFixed(1)}h will be saved)
          </div>
          <div className="p-3 bg-base-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input type="text" inputMode="search"
                className="input input-bordered w-full pl-10 min-h-[48px] text-base"
                placeholder="Search job #, client, address..."
                value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} autoFocus />
              {pickerSearch && <button className="absolute right-3 top-3.5" onClick={() => setPickerSearch('')}><X size={18} /></button>}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Non-job categories */}
            {!pickerSearch && (
              <>
                <div className="px-3 py-2 bg-base-200/50">
                  <span className="text-xs font-bold text-base-content/40">🔧 Shop / Non-Job Work</span>
                </div>
                {NON_JOB_CATEGORIES.filter(c => c.id !== 'pto' && c.id !== activeEntry?.category).map(cat => (
                  <button key={cat.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-info/10 border-b border-base-200 min-h-[52px]"
                    onClick={() => handleSwitchProject('', cat.id)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-semibold text-base">{cat.label}</span>
                    </div>
                  </button>
                ))}
              </>
            )}
            <button className="w-full text-left p-4 hover:bg-base-200 border-b border-base-200 min-h-[52px] text-base-content/50"
              onClick={() => handleSwitchProject('')}>
              — No project (assign later) —
            </button>
            {!pickerSearch && (
              <div className="px-3 py-2 bg-base-200/50">
                <span className="text-xs font-bold text-base-content/40">Jobs</span>
              </div>
            )}
            {filterJobs(pickerSearch).filter(j => j.id !== activeEntry?.job_id).map(j => (
              <button key={j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-info/10 border-b border-base-200 min-h-[52px]"
                onClick={() => handleSwitchProject(j.id)}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5">{j.project_address}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CLOCK OUT CONFIRMATION */}
      {clockOutConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-base-200">
              <h3 className="text-xl font-bold text-center">✅ End of Day Summary</h3>
              <p className="text-sm text-center text-base-content/50 mt-1">Review your time before clocking out</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Active session */}
              {activeEntry && (
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-xl border border-success/30">
                  <div className="flex-1">
                    <div className="font-bold text-sm">{activeJob?.job_number || (activeEntry?.category && activeEntry.category !== 'job' ? getCategoryLabel(activeEntry.category) : 'Unassigned')}</div>
                    {activeJob && <div className="text-xs text-base-content/60">{activeJob.client_name}</div>}
                    <div className="text-xs text-base-content/40 mt-0.5">
                      {activeEntry.clock_in} → Now
                      {activeEntry.equipment_name && <span> · 🚜 {activeEntry.equipment_name}</span>}
                    </div>
                  </div>
                  <span className="font-bold text-lg text-success">{elapsedToHours(elapsedTime).toFixed(1)}h</span>
                </div>
              )}
              {/* Completed entries today */}
              {todaysEntries.map(entry => (
                <div key={entry.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                  <div className="flex-1">
                    <div className="font-bold text-sm">{getEntryLabel(entry)}</div>
                    {entry.clock_in && entry.clock_out && (
                      <div className="text-xs text-base-content/40">{entry.clock_in} → {entry.clock_out}</div>
                    )}
                  </div>
                  <span className="font-bold text-lg">{Number(entry.hours).toFixed(1)}h</span>
                </div>
              ))}
              {/* Total */}
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
                <span className="font-bold text-lg">Total Today</span>
                <span className="font-bold text-2xl text-primary">{totalToday.toFixed(1)}h</span>
              </div>
            </div>
            <div className="p-4 border-t border-base-200 space-y-2">
              <button className="btn w-full min-h-[52px] text-lg rounded-xl bg-error hover:bg-error/90 text-error-content border-0 gap-2"
                onClick={handleClockOut} disabled={saving}>
                {saving ? <span className="loading loading-spinner" /> : <Square size={20} fill="currentColor" />}
                Confirm — Clock Out
              </button>
              <button className="btn btn-ghost w-full" onClick={() => setClockOutConfirm(false)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT PICKER */}
      {equipmentPicker && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[70vh] flex flex-col">
            <div className="p-4 border-b border-base-200 flex items-center justify-between">
              <h3 className="text-lg font-bold">🚜 Select Equipment</h3>
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setEquipmentPicker(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <button className="w-full text-left p-4 hover:bg-base-200 border-b border-base-200 text-base-content/50"
                onClick={() => handleEquipmentChange('')}>
                — No equipment —
              </button>
              {equipment.filter(e => e.status !== 'retired').map(eq => (
                <button key={eq.id}
                  className={`w-full text-left p-4 hover:bg-base-200 border-b border-base-200 min-h-[52px] ${activeEntry?.equipment_id === eq.id ? 'bg-primary/10' : ''}`}
                  onClick={() => handleEquipmentChange(eq.id)}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{eq.name}</span>
                    {eq.number && <span className="badge badge-ghost badge-sm">#{eq.number}</span>}
                    {activeEntry?.equipment_id === eq.id && <Check size={16} className="text-primary" />}
                  </div>
                  <div className="text-xs text-base-content/50">{eq.type}
                    {eq.status === 'maintenance' && <span className="text-warning ml-1">⚠️ Maintenance</span>}
                  </div>
                </button>
              ))}
              {equipment.filter(e => e.status !== 'retired').length === 0 && (
                <div className="p-8 text-center text-base-content/40">
                  <Wrench size={32} className="mx-auto mb-2 opacity-30" />
                  <p>No equipment added yet</p>
                  <p className="text-xs mt-1">Add equipment in User Management</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BATCH CLOCK IN MODAL */}
      {batchModal && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="p-3 bg-primary/10 flex items-center gap-2 border-b border-primary/30">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setBatchModal(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg flex-1">👥 Clock In Crew</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Activity selection */}
            <div>
              <label className="text-sm font-bold mb-1 block">Select Activity</label>
              <div className="p-3 bg-base-200 rounded-lg cursor-pointer min-h-[48px] flex items-center justify-between"
                onClick={() => { setBatchSearchQuery(''); setBatchJobPicker(true); }}>
                {batchCategory ? (
                  <div className="min-w-0 flex-1">
                    <span className="text-lg mr-2">{NON_JOB_CATEGORIES.find(c => c.id === batchCategory)?.icon}</span>
                    <span className="font-bold">{NON_JOB_CATEGORIES.find(c => c.id === batchCategory)?.label}</span>
                  </div>
                ) : batchJobId ? (
                  <div className="min-w-0 flex-1">
                    <span className="font-bold">{jobDisplay(batchJobId)}</span>
                    <span className="text-sm text-base-content/60 ml-2">{jobs.find(j => j.id === batchJobId)?.client_name}</span>
                  </div>
                ) : (
                  <span className="text-base-content/40 flex items-center gap-2"><Search size={16} /> Tap to pick job or activity...</span>
                )}
              </div>
            </div>

            {/* Equipment (optional) */}
            {equipment.filter(e => e.status !== 'retired').length > 0 && (
              <div>
                <label className="text-sm font-bold mb-1 block">Equipment (optional)</label>
                <select className="select select-bordered w-full" value={batchEquipmentId}
                  onChange={e => setBatchEquipmentId(e.target.value)}>
                  <option value="">— None —</option>
                  {equipment.filter(e => e.status !== 'retired').map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name} {eq.number ? `#${eq.number}` : ''}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Crew selection */}
            <div>
              <label className="text-sm font-bold mb-2 block">Select Crew Members</label>
              <div className="space-y-1.5">
                {allActiveUsers.filter(u => u.id !== currentUser.id).map(user => {
                  const isSelected = batchSelectedUsers.includes(user.id);
                  // Check if already clocked in (we'd need to load their entries)
                  return (
                    <button key={user.id}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl min-h-[52px] transition-all ${
                        isSelected ? 'bg-primary/15 border-2 border-primary' : 'bg-base-200 border-2 border-transparent'
                      }`}
                      onClick={() => {
                        setBatchSelectedUsers(prev =>
                          prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id]
                        );
                      }}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-primary bg-primary text-primary-content' : 'border-base-300'
                      }`}>
                        {isSelected && <Check size={14} />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-base-content/50 capitalize">{user.role}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-base-200">
            <button
              className="btn btn-success w-full min-h-[56px] text-lg rounded-xl gap-2"
              onClick={handleBatchClockIn}
              disabled={saving || batchSelectedUsers.length === 0}>
              {saving ? <span className="loading loading-spinner" /> : <Play size={20} fill="currentColor" />}
              Clock In {batchSelectedUsers.length > 0 ? `(${batchSelectedUsers.length} people)` : 'Selected'}
            </button>
          </div>
        </div>
      )}

      {/* BATCH JOB PICKER (nested) */}
      {batchJobPicker && (
        <div className="fixed inset-0 bg-white z-[110] flex flex-col">
          <div className="p-3 bg-base-200 flex items-center gap-2 border-b border-base-300">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setBatchJobPicker(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg">Select Activity</h3>
          </div>
          <div className="p-3 bg-base-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input type="text" inputMode="search"
                className="input input-bordered w-full pl-10 min-h-[48px] text-base"
                placeholder="Search job #, client, address..."
                value={batchSearchQuery} onChange={e => setBatchSearchQuery(e.target.value)} autoFocus />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Non-job categories */}
            {!batchSearchQuery && (
              <>
                <div className="px-3 py-2 bg-base-200/50">
                  <span className="text-xs font-bold text-base-content/40">🔧 Shop / Non-Job Work</span>
                </div>
                {NON_JOB_CATEGORIES.filter(c => c.id !== 'pto').map(cat => (
                  <button key={cat.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-primary/10 border-b border-base-200 min-h-[52px]"
                    onClick={() => { setBatchCategory(cat.id); setBatchJobId(''); setBatchJobPicker(false); }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-semibold text-base">{cat.label}</span>
                    </div>
                  </button>
                ))}
              </>
            )}
            <button className="w-full text-left p-4 hover:bg-base-200 border-b border-base-200 min-h-[52px] text-base-content/50"
              onClick={() => { setBatchJobId(''); setBatchCategory(''); setBatchJobPicker(false); }}>
              — Skip (assign later) —
            </button>
            {!batchSearchQuery && (
              <div className="px-3 py-2 bg-base-200/50">
                <span className="text-xs font-bold text-base-content/40">Jobs</span>
              </div>
            )}
            {filterJobs(batchSearchQuery).map(j => (
              <button key={j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-primary/10 border-b border-base-200 min-h-[52px]"
                onClick={() => { setBatchJobId(j.id); setBatchCategory(''); setBatchJobPicker(false); }}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5">{j.project_address}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━ CREW TIMESHEET MODAL ━━━━━━ */}
      {timesheetOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          {/* Header */}
          <div className="p-3 bg-primary text-primary-content flex items-center gap-2">
            <button className="btn btn-ghost btn-sm btn-circle text-primary-content" onClick={() => setTimesheetOpen(false)}>
              <X size={20} />
            </button>
            <ClipboardList size={20} />
            <h3 className="font-bold text-lg flex-1">Crew Timesheet</h3>
            {tsSaved.length > 0 && (
              <span className="badge badge-success badge-sm">{tsSaved.length} saved</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-32">
            {/* Date Picker */}
            <div className="bg-base-200 rounded-xl p-3">
              <label className="text-xs font-bold text-base-content/60 mb-1 block">📅 Date</label>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-ghost"
                  onClick={() => {
                    const d = new Date(tsDate + 'T12:00:00'); d.setDate(d.getDate() - 1);
                    setTsDate(d.toISOString().split('T')[0]);
                  }}>
                  <ChevronLeft size={16} />
                </button>
                <div className="flex-1 text-center">
                  <div className="font-bold">{
                    new Date(tsDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  }</div>
                  <div className="text-xs text-base-content/50">{tsDate === today() ? 'Today' : tsDate}</div>
                </div>
                <button className="btn btn-sm btn-ghost" disabled={tsDate >= today()}
                  onClick={() => {
                    const d = new Date(tsDate + 'T12:00:00'); d.setDate(d.getDate() + 1);
                    const next = d.toISOString().split('T')[0];
                    if (next <= today()) setTsDate(next);
                  }}>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex gap-1 mt-2 justify-center">
                {(() => {
                  const y = new Date(today() + 'T12:00:00'); y.setDate(y.getDate() - 1);
                  const yStr = y.toISOString().split('T')[0];
                  return (
                    <>
                      <button className={`btn btn-xs ${tsDate === yStr ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setTsDate(yStr)}>Yesterday</button>
                      <button className={`btn btn-xs ${tsDate === today() ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setTsDate(today())}>Today</button>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Job/Category Picker */}
            <div className="bg-base-200 rounded-xl p-3">
              <label className="text-xs font-bold text-base-content/60 mb-1 block">📋 What they worked on</label>
              <div className="flex gap-1 mb-2">
                <button className={`btn btn-sm flex-1 ${tsMode === 'job' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setTsMode('job')}>Job</button>
                <button className={`btn btn-sm flex-1 ${tsMode === 'non-job' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setTsMode('non-job')}>Non-Job</button>
              </div>
              {tsMode === 'job' ? (
                <div className="p-3 bg-white rounded-lg cursor-pointer min-h-[48px] flex items-center justify-between border border-base-300"
                  onClick={() => { setTsJobSearch(''); setTsJobPicker(true); }}>
                  {tsJobId ? (
                    <div className="min-w-0 flex-1">
                      <span className="font-bold">{jobs.find(j => j.id === tsJobId)?.job_number}</span>
                      <span className="text-sm text-base-content/60 ml-2">{jobs.find(j => j.id === tsJobId)?.client_name}</span>
                    </div>
                  ) : (<span className="text-base-content/40">Tap to pick job...</span>)}
                  <Search size={16} className="text-base-content/40" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {NON_JOB_CATEGORIES.map(cat => (
                    <button key={cat.id}
                      className={`btn btn-sm min-h-[40px] justify-start gap-1 ${tsCategory === cat.id ? 'btn-primary' : 'btn-ghost bg-white'}`}
                      onClick={() => setTsCategory(cat.id)}>
                      {cat.icon} <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fill All shortcut */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-base-content/60">Fill all:</span>
              {[8, 10, 4].map(h => (
                <button key={h} className="btn btn-xs btn-ghost bg-base-200" onClick={() => fillAllHours(String(h))}>
                  {h}h
                </button>
              ))}
              <button className="btn btn-xs btn-ghost bg-base-200" onClick={() => fillAllHours('')}>Clear</button>
            </div>

            {/* Crew list */}
            <div className="space-y-2">
              {allActiveUsers.map(user => {
                const hrs = tsHours[user.id] || '';
                const wasSaved = tsSaved.includes(user.id);
                return (
                  <div key={user.id} className={`rounded-xl p-3 border ${wasSaved && !hrs ? 'bg-success/10 border-success/30' : 'bg-base-200 border-base-300'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{user.name}</div>
                          <div className="text-[10px] text-base-content/40 capitalize">{user.role}</div>
                        </div>
                      </div>
                      {wasSaved && !hrs && (
                        <span className="text-xs text-success font-semibold">✅ Saved</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input type="number" step="0.25" min="0" max="24" inputMode="decimal"
                          className="input input-bordered w-full min-h-[48px] text-xl font-bold text-center pr-8"
                          placeholder="0"
                          value={hrs}
                          onChange={e => setTsHours(prev => ({ ...prev, [user.id]: e.target.value }))} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 font-bold">h</span>
                      </div>
                      <button
                        className={`btn btn-sm min-h-[48px] px-2 ${tsLunch[user.id] ? 'btn-warning' : 'btn-ghost bg-base-300'}`}
                        title="Lunch deduction (-0.5h)"
                        onClick={() => setTsLunch(prev => ({ ...prev, [user.id]: !prev[user.id] }))}>
                        🍔
                      </button>
                    </div>
                    <input className="input input-bordered input-sm w-full mt-1.5"
                      placeholder="Notes (optional)"
                      value={tsNotes[user.id] || ''}
                      onChange={e => setTsNotes(prev => ({ ...prev, [user.id]: e.target.value }))} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary p-3 z-[101] safe-bottom">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-base-content/60">
                {allActiveUsers.filter(u => parseFloat(tsHours[u.id] || '') > 0).length} of {allActiveUsers.length} crew
              </span>
              <span className="text-sm font-bold">
                {allActiveUsers.reduce((sum, u) => {
                  const h = parseFloat(tsHours[u.id] || '') || 0;
                  const lunch = tsLunch[u.id] ? 0.5 : 0;
                  return sum + Math.max(0, h - lunch);
                }, 0).toFixed(1)}h total
              </span>
            </div>
            <button className="btn btn-primary w-full min-h-[52px] text-lg gap-2 rounded-xl"
              onClick={handleTimesheetSave}
              disabled={tsSaving || allActiveUsers.filter(u => parseFloat(tsHours[u.id] || '') > 0).length === 0}>
              {tsSaving ? (
                <><span className="loading loading-spinner" /> Saving...</>
              ) : (
                <><Save size={20} /> Save All Entries</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ━━━ TIMESHEET JOB PICKER ━━━ */}
      {tsJobPicker && (
        <div className="fixed inset-0 bg-white z-[110] flex flex-col">
          <div className="p-3 bg-base-200 flex items-center gap-2 border-b border-base-300">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setTsJobPicker(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg">Select Job</h3>
          </div>
          <div className="p-3 bg-base-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input type="text" inputMode="search"
                className="input input-bordered w-full pl-10 min-h-[48px] text-base"
                placeholder="Search job #, client, address..."
                value={tsJobSearch} onChange={e => setTsJobSearch(e.target.value)} autoFocus />
              {tsJobSearch && <button className="absolute right-3 top-3.5" onClick={() => setTsJobSearch('')}><X size={18} /></button>}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <button className="w-full text-left p-4 hover:bg-base-200 active:bg-base-300 text-base-content/50 border-b border-base-200 min-h-[52px]"
              onClick={() => { setTsJobId(''); setTsJobPicker(false); }}>
              — Skip (assign later) —
            </button>
            {filterJobs(tsJobSearch).map(j => (
              <button key={j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-primary/10 border-b border-base-200 min-h-[52px]"
                onClick={() => { setTsJobId(j.id); setTsJobPicker(false); }}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5">{j.project_address}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SHARED JOB PICKER (add/edit) */}
      {pickerOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="p-3 bg-base-200 flex items-center gap-2 border-b border-base-300">
            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setPickerOpen(false)}>
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg">Select Job</h3>
          </div>
          <div className="p-3 bg-base-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input ref={pickerInputRef} type="text" inputMode="search"
                className="input input-bordered w-full pl-10 min-h-[48px] text-base"
                placeholder="Search job #, client, address..."
                value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} autoFocus />
              {pickerSearch && <button className="absolute right-3 top-3.5" onClick={() => setPickerSearch('')}><X size={18} /></button>}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <button className="w-full text-left p-4 hover:bg-base-200 active:bg-base-300 text-base-content/50 border-b border-base-200 min-h-[52px]"
              onClick={() => {
                if (pickerTarget === 'add') setAddJobId(''); else setEditJobId('');
                setPickerOpen(false);
              }}>— Skip (assign later) —</button>
            {filterJobs(pickerSearch).map(j => (
              <button key={j.id} className="w-full text-left p-4 hover:bg-base-200 active:bg-primary/10 border-b border-base-200 min-h-[52px]"
                onClick={() => {
                  if (pickerTarget === 'add') setAddJobId(j.id); else setEditJobId(j.id);
                  setPickerOpen(false);
                }}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{j.job_number}</span>
                  <span className="text-sm text-base-content/60">{j.client_name}</span>
                </div>
                {j.project_address && <div className="text-xs text-base-content/40 mt-0.5">{j.project_address}</div>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Quick-add chip component
const QuickAddChip: React.FC<{ job: Job; onAdd: (hrs: number) => void; saving: boolean }> = ({ job, onAdd, saving }) => {
  const [showHours, setShowHours] = useState(false);
  const [hrs, setHrs] = useState('8');

  if (showHours) {
    return (
      <div className="flex items-center gap-1 bg-primary/10 border border-primary/30 rounded-xl px-2 py-1">
        <span className="text-xs font-bold">{job.job_number}</span>
        <input type="number" step="0.5" min="0.5" max="24"
          className="input input-bordered input-xs w-16 text-center font-bold"
          value={hrs} onChange={e => setHrs(e.target.value)} autoFocus
          onKeyDown={e => { if (e.key === 'Enter') { onAdd(parseFloat(hrs) || 8); setShowHours(false); } }} />
        <span className="text-[10px]">h</span>
        <button className="btn btn-primary btn-xs min-h-[28px] px-2"
          onClick={() => { onAdd(parseFloat(hrs) || 8); setShowHours(false); }}
          disabled={saving}>
          {saving ? <span className="loading loading-spinner loading-xs" /> : '✓'}
        </button>
        <button className="btn btn-ghost btn-xs min-h-[28px] px-1" onClick={() => setShowHours(false)}>
          <X size={12} />
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-sm btn-ghost bg-base-200 gap-1 min-h-[36px] rounded-lg"
      onClick={() => setShowHours(true)}>
      <span className="font-bold">{job.job_number}</span>
      <span className="text-xs text-base-content/50 max-w-[80px] truncate">{job.client_name}</span>
    </button>
  );
};

export default TimeEntryForm;
