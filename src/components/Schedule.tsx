import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, GripVertical, Clock, Calendar, Users, ArrowRight } from 'lucide-react';
import { type Job, type ScheduleEntry, type User, type LaborItem, type TimeEntry } from '../types';
import { SCHEDULE_COLORS, normalizeStatus } from '../types';
import { genId, now, getSchedule, saveSchedule, getAllTimeEntries, getTimeOffRequests, centralDate } from '../utils/supabase';
import { TimeOffRequest } from '../types';

interface Props {
  jobs: Job[];
  users: User[];
  currentUser: User;
  onSelectJob: (jobId: string) => void;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS_PER_DAY = 8;

function getWeekStart(d: Date): Date {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatShortDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function dateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

function addDays(date: string, days: number): string {
  const d = new Date(date + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return dateStr(d);
}

function getEstimatedHours(job: Job): number {
  if (job.estimated_hours) return job.estimated_hours;
  try {
    const labor: LaborItem[] = JSON.parse(job.labor_json || '[]');
    return labor.reduce((sum, l) => sum + (l.hours || 0), 0);
  } catch { return 0; }
}

function sortByJobNumber(a: Job, b: Job): number {
  return (a.job_number || '').localeCompare(b.job_number || '', undefined, { numeric: true });
}

export const Schedule: React.FC<Props> = ({ jobs, users, currentUser, onSelectJob }) => {
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [_loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalDate, setModalDate] = useState('');
  const [modalJobId, setModalJobId] = useState('');
  const [modalCrew, setModalCrew] = useState('');
  const [modalHours, setModalHours] = useState(HOURS_PER_DAY);
  const [modalNotes, setModalNotes] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rollover, setRollover] = useState(true);
  const [dragJobId, setDragJobId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState(centralDate());
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(false);
    // getTimeEntries() reads the old global time-entries.json, which stays
    // permanently empty once per-user time-entry files are in use — see
    // migrateTimeEntries() in utils/supabase.ts. Bid-vs-actual needs the real data.
    const [s, t, tor] = await Promise.all([getSchedule(), getAllTimeEntries(users), getTimeOffRequests()]);
    setEntries(s);
    setTimeEntries(t);
    setTimeOffRequests(tor.filter(r => r.status === 'approved'));
  };

  // Get approved time off for a specific date
  const getTimeOffForDate = (date: string): { userName: string; type: string; hours: number }[] => {
    const d = new Date(date + 'T12:00:00');
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return []; // skip weekends
    return timeOffRequests
      .filter(r => date >= r.startDate && date <= r.endDate)
      .map(r => {
        const user = users.find(u => u.id === r.userId);
        const typeLabels: Record<string, string> = { pto: 'PTO', sick: 'Sick', personal: 'Personal', unpaid: 'Unpaid', bereavement: 'Bereavement', jury_duty: 'Jury Duty' };
        return { userName: user?.name || 'Unknown', type: typeLabels[r.type] || r.type, hours: r.hoursPerDay };
      });
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const todayStr = centralDate();

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const goToday = () => setWeekStart(getWeekStart(new Date()));

  const entriesForDate = (date: string) => entries.filter(e => e.date === date);

  // Scheduled hours for a job (across all dates)
  const getScheduledHours = (jobId: string, excludeEntryId?: string): number => {
    return entries
      .filter(e => e.job_id === jobId && e.id !== excludeEntryId)
      .reduce((sum, e) => sum + e.estimated_hours, 0);
  };

  // Active jobs sorted by job number
  const sortedActiveJobs = jobs.filter(j => j.status === 'active').sort(sortByJobNumber);

  // Unscheduled sidebar: active jobs not fully scheduled
  const weekDateStrs = weekDays.map(d => dateStr(d));
  const scheduledJobIds = new Set(
    entries.filter(e => weekDateStrs.includes(e.date)).map(e => e.job_id)
  );
  const unscheduledJobs = sortedActiveJobs.filter(j => !scheduledJobIds.has(j.id));

  // Bid hours vs actual for a job
  const getActualHours = (jobId: string): number => {
    return timeEntries
      .filter(t => t.job_id === jobId && normalizeStatus(t.status) === 'admin-approved')
      .reduce((sum, t) => sum + t.hours, 0);
  };

  // Get remaining unscheduled hours for a job
  const getRemainingHours = (jobId: string, excludeEntryId?: string): number => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return HOURS_PER_DAY;
    const est = getEstimatedHours(job);
    if (est <= 0) return HOURS_PER_DAY;
    const scheduled = getScheduledHours(jobId, excludeEntryId);
    return Math.max(0, est - scheduled);
  };

  // Calculate day total hours
  const getDayTotalHours = (date: string): number => {
    return entriesForDate(date).reduce((sum, e) => sum + e.estimated_hours, 0);
  };

  const openAddModal = (date: string) => {
    setModalDate(date);
    setModalJobId('');
    setModalCrew('');
    setModalHours(HOURS_PER_DAY);
    setModalNotes('');
    setEditingId(null);
    setRollover(true);
    setShowModal(true);
  };

  const openEditModal = (entry: ScheduleEntry) => {
    setModalDate(entry.date);
    setModalJobId(entry.job_id);
    setModalCrew(entry.crew_name || '');
    setModalHours(entry.estimated_hours);
    setModalNotes(entry.notes);
    setEditingId(entry.id);
    setRollover(false);
    setShowModal(true);
  };

  // When job selection changes in modal, update hours based on remaining
  const handleJobChange = (jobId: string) => {
    setModalJobId(jobId);
    if (jobId) {
      const remaining = getRemainingHours(jobId, editingId || undefined);
      if (remaining > 0) {
        setModalHours(Math.min(HOURS_PER_DAY, remaining));
      } else {
        setModalHours(HOURS_PER_DAY);
      }
    }
  };

  const handleSaveEntry = async () => {
    if (!modalJobId || !modalDate) return;
    const job = jobs.find(j => j.id === modalJobId);
    if (!job) return;

    let updated = [...entries];

    if (editingId) {
      const oldEntry = updated.find(e => e.id === editingId);
      const color = oldEntry?.color || SCHEDULE_COLORS[0];

      // Check if this edit would overflow the day (considering other entries)
      const otherDayHours = updated
        .filter(e => e.date === modalDate && e.id !== editingId)
        .reduce((sum, e) => sum + e.estimated_hours, 0);
      const wouldOverflow = otherDayHours + modalHours > HOURS_PER_DAY;

      if (rollover && (modalHours > HOURS_PER_DAY || wouldOverflow)) {
        // Remove old entry, create split entries respecting day capacity
        updated = updated.filter(e => e.id !== editingId);
        let remaining = modalHours;
        let currentDate = modalDate;
        let dayIndex = 0;

        while (remaining > 0) {
          const existingHours = updated
            .filter(e => e.date === currentDate)
            .reduce((sum, e) => sum + e.estimated_hours, 0);
          const dayCapacity = Math.max(0, HOURS_PER_DAY - existingHours);

          if (dayCapacity <= 0) {
            currentDate = addDays(currentDate, 1);
            continue;
          }

          const dayHours = Math.min(dayCapacity, remaining);
          updated.push({
            id: dayIndex === 0 ? editingId : genId('sched'),
            job_id: modalJobId,
            job_number: job.job_number,
            client_name: job.client_name,
            date: currentDate,
            assigned_user_ids: oldEntry?.assigned_user_ids || [],
            foreman_id: oldEntry?.foreman_id || '',
            crew_name: modalCrew,
            estimated_hours: dayHours,
            notes: dayIndex === 0 ? modalNotes : `(Continued) ${modalNotes}`.trim(),
            color,
            created_at: oldEntry?.created_at || now(),
            updated_at: now(),
          });
          remaining -= dayHours;
          dayIndex++;
          currentDate = addDays(currentDate, 1);
        }
      } else {
        const idx = updated.findIndex(e => e.id === editingId);
        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            job_id: modalJobId,
            job_number: job.job_number,
            client_name: job.client_name,
            date: modalDate,
            crew_name: modalCrew,
            estimated_hours: modalHours,
            notes: modalNotes,
            updated_at: now(),
          };
        }
      }
    } else {
      // Create new entry(s)
      const colorIdx = entries.filter(e => e.job_id === modalJobId).length;
      const color = SCHEDULE_COLORS[colorIdx % SCHEDULE_COLORS.length];

      if (rollover) {
        // Smart rollover: respect 8h day capacity across ALL jobs on each day
        let remaining = modalHours;
        let currentDate = modalDate;
        let dayIndex = 0;

        while (remaining > 0) {
          // How much capacity is left on this day from other jobs?
          const existingDayHours = updated
            .filter(e => e.date === currentDate)
            .reduce((sum, e) => sum + e.estimated_hours, 0);
          const dayCapacity = Math.max(0, HOURS_PER_DAY - existingDayHours);

          if (dayCapacity <= 0) {
            // Day is full, skip to next day
            currentDate = addDays(currentDate, 1);
            continue;
          }

          const dayHours = Math.min(dayCapacity, remaining);
          updated.push({
            id: genId('sched'),
            job_id: modalJobId,
            job_number: job.job_number,
            client_name: job.client_name,
            date: currentDate,
            assigned_user_ids: [],
            foreman_id: '',
            crew_name: modalCrew,
            estimated_hours: dayHours,
            notes: dayIndex === 0 ? modalNotes : `(Continued) ${modalNotes}`.trim(),
            color,
            created_at: now(),
            updated_at: now(),
          });
          remaining -= dayHours;
          dayIndex++;
          currentDate = addDays(currentDate, 1);
        }
      } else {
        // Single entry (partial or full day) — no rollover
        updated.push({
          id: genId('sched'),
          job_id: modalJobId,
          job_number: job.job_number,
          client_name: job.client_name,
          date: modalDate,
          assigned_user_ids: [],
          foreman_id: '',
          crew_name: modalCrew,
          estimated_hours: modalHours,
          notes: modalNotes,
          color,
          created_at: now(),
          updated_at: now(),
        });
      }
    }

    setEntries(updated);
    await saveSchedule(updated);
    setShowModal(false);
  };

  const handleDeleteEntry = async (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    await saveSchedule(updated);
  };

  // Drag & drop
  const handleDragStart = (jobId: string) => setDragJobId(jobId);

  const handleDrop = (date: string) => {
    if (!dragJobId) return;
    const job = jobs.find(j => j.id === dragJobId);
    setDragJobId(null);
    setModalJobId(dragJobId);
    setModalDate(date);
    setModalCrew('');
    setEditingId(null);
    setRollover(true);

    // Default to remaining hours for this job
    if (job) {
      const remaining = getRemainingHours(dragJobId);
      setModalHours(remaining > 0 ? remaining : HOURS_PER_DAY);
    } else {
      setModalHours(HOURS_PER_DAY);
    }
    setModalNotes('');
    setShowModal(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const canEdit = currentUser.role === 'admin' || currentUser.role === 'foreman';

  // Compute rollover preview — accounts for existing jobs on each day
  const rolloverDays = (() => {
    if (!rollover || !modalJobId) return [];
    const currentEntries = editingId ? entries.filter(e => e.id !== editingId) : entries;
    const days: { date: string; hours: number; existing: number }[] = [];
    let remaining = modalHours;
    let currentDate = modalDate;
    let safety = 0;
    while (remaining > 0 && safety < 60) {
      safety++;
      const existingHours = currentEntries
        .filter(e => e.date === currentDate)
        .reduce((sum, e) => sum + e.estimated_hours, 0);
      const dayCapacity = Math.max(0, HOURS_PER_DAY - existingHours);
      if (dayCapacity <= 0) {
        currentDate = addDays(currentDate, 1);
        continue;
      }
      const h = Math.min(dayCapacity, remaining);
      days.push({ date: currentDate, hours: h, existing: existingHours });
      remaining -= h;
      currentDate = addDays(currentDate, 1);
    }
    return days;
  })();

  // Quick schedule remaining hours
  const handleQuickScheduleRemaining = (jobId: string, startDate: string) => {
    const remaining = getRemainingHours(jobId);
    if (remaining <= 0) return;
    setModalJobId(jobId);
    setModalDate(startDate);
    setModalCrew('');
    setModalHours(remaining);
    setModalNotes('');
    setEditingId(null);
    setRollover(true);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-base-200 gap-2">
        <div className="flex items-center gap-1">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={prevWeek}>
            <ChevronLeft size={18} />
          </button>
          <button className="btn btn-ghost btn-xs" onClick={goToday}>Today</button>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={nextWeek}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="text-sm font-semibold">
          {formatShortDate(weekDays[0])} - {formatShortDate(weekDays[6])}
        </div>
        <div className="join">
          <button className={`join-item btn btn-xs ${viewMode === 'week' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setViewMode('week')}>Week</button>
          <button className={`join-item btn btn-xs ${viewMode === 'day' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setViewMode('day')}>Day</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === 'week' ? (
          <div className="flex h-full">
            {/* Calendar columns */}
            <div className="flex-1 flex overflow-x-auto">
              {weekDays.map((day, i) => {
                const ds = dateStr(day);
                const isToday = ds === todayStr;
                const dayEntries = entriesForDate(ds);
                const dayTotal = getDayTotalHours(ds);

                return (
                  <div
                    key={ds}
                    className={`flex-1 min-w-[120px] border-r border-base-300 flex flex-col ${isToday ? 'bg-primary/5' : ''}`}
                    onDragOver={canEdit ? handleDragOver : undefined}
                    onDrop={canEdit ? () => handleDrop(ds) : undefined}
                  >
                    {/* Day header */}
                    <div className={`text-center py-1 text-xs font-semibold border-b border-base-300 ${isToday ? 'bg-primary text-primary-content' : 'bg-base-200'}`}>
                      <div>{DAY_NAMES[i]}</div>
                      <div className="text-lg">{day.getDate()}</div>
                      {dayTotal > 0 && (
                        <div className={`text-[10px] font-normal ${dayTotal > HOURS_PER_DAY ? (isToday ? 'text-primary-content font-bold' : 'text-error font-bold') : isToday ? 'text-primary-content/70' : 'opacity-60'}`}>
                          {dayTotal}h / {HOURS_PER_DAY}h
                        </div>
                      )}
                    </div>

                    {/* Entries */}
                    <div className="flex-1 p-1 space-y-1 overflow-y-auto">
                      {dayEntries.map(entry => {
                        const job = jobs.find(j => j.id === entry.job_id);
                        const est = job ? getEstimatedHours(job) : 0;
                        const actual = getActualHours(entry.job_id);
                        const heightPct = Math.max(40, (entry.estimated_hours / HOURS_PER_DAY) * 100);
                        return (
                          <div
                            key={entry.id}
                            className="rounded p-1.5 text-xs cursor-pointer hover:opacity-80 relative group"
                            style={{
                              backgroundColor: entry.color + '22',
                              borderLeft: `3px solid ${entry.color}`,
                              minHeight: `${Math.min(heightPct, 120)}px`,
                            }}
                            onClick={() => canEdit ? openEditModal(entry) : onSelectJob(entry.job_id)}
                          >
                            <div className="font-bold truncate">{entry.job_number}</div>
                            <div className="truncate opacity-70">{entry.client_name}</div>
                            {job?.project_address && (
                              <div className="truncate text-[10px] opacity-50 italic">{job.project_address}</div>
                            )}
                            <div className="text-[10px] opacity-60 mt-0.5">
                              <Clock size={8} className="inline" /> {entry.estimated_hours}h
                            </div>
                            {entry.crew_name && (
                              <div className="flex items-center gap-0.5 mt-0.5 opacity-60">
                                <Users size={10} /> {entry.crew_name}
                              </div>
                            )}
                            {entry.notes && entry.notes.startsWith('(Continued)') && (
                              <div className="text-[10px] opacity-50 italic mt-0.5">↳ continued</div>
                            )}
                            {/* Bid vs actual progress */}
                            {est > 0 && (
                              <div className="mt-1">
                                <div className="flex justify-between text-[10px]">
                                  <span>{actual}h / {est}h</span>
                                  <span>{Math.round((actual / est) * 100)}%</span>
                                </div>
                                <div className="w-full bg-base-300 rounded-full h-1 mt-0.5">
                                  <div
                                    className={`h-1 rounded-full ${actual > est ? 'bg-error' : actual > est * 0.8 ? 'bg-warning' : 'bg-success'}`}
                                    style={{ width: `${Math.min(100, (actual / est) * 100)}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {canEdit && (
                              <button
                                className="absolute top-0.5 right-0.5 btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100"
                                onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                              >
                                <X size={10} />
                              </button>
                            )}
                          </div>
                        );
                      })}

                      {/* Time Off blocks */}
                      {getTimeOffForDate(ds).map((to, idx) => (
                        <div key={`to-${idx}`} className="rounded p-1.5 text-xs" style={{ backgroundColor: '#a78bfa33', borderLeft: '3px solid #8b5cf6' }}>
                          <div className="font-bold truncate" style={{ color: '#7c3aed' }}>🏖️ {to.userName}</div>
                          <div className="truncate opacity-70">{to.type}</div>
                          <div className="text-[10px] opacity-60">{to.hours}h</div>
                        </div>
                      ))}

                      {canEdit && (
                        <button
                          className="btn btn-ghost btn-xs w-full opacity-40 hover:opacity-100"
                          onClick={() => openAddModal(ds)}
                        >
                          <Plus size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Unscheduled sidebar */}
            {canEdit && (
              <div className="w-52 bg-base-200 border-l border-base-300 flex flex-col">
                <div className="p-2 text-xs font-semibold border-b border-base-300">
                  Unscheduled ({unscheduledJobs.length})
                </div>
                <div className="flex-1 overflow-y-auto p-1 space-y-1">
                  {unscheduledJobs.map(job => {
                    const est = getEstimatedHours(job);
                    const scheduled = getScheduledHours(job.id);
                    const remaining = Math.max(0, est - scheduled);
                    const actual = getActualHours(job.id);
                    const daysNeeded = est > 0 ? Math.ceil(remaining / HOURS_PER_DAY) : 0;
                    return (
                      <div
                        key={job.id}
                        draggable
                        onDragStart={() => handleDragStart(job.id)}
                        className="bg-base-100 rounded p-1.5 text-xs cursor-grab active:cursor-grabbing hover:bg-base-300 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          <GripVertical size={10} className="opacity-40 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate">{job.job_number}</div>
                            <div className="truncate opacity-60">{job.client_name}</div>
                            {job.project_address && (
                              <div className="truncate text-[10px] opacity-40 italic">{job.project_address}</div>
                            )}
                            {est > 0 && (
                              <div className="mt-1 space-y-0.5">
                                <div className="text-[10px] opacity-50 flex items-center gap-0.5">
                                  <Clock size={8} />
                                  {est}h est · {daysNeeded} day{daysNeeded !== 1 ? 's' : ''}
                                </div>
                                {actual > 0 && (
                                  <div className="text-[10px] opacity-50">
                                    {actual}h actual ({Math.round((actual / est) * 100)}%)
                                  </div>
                                )}
                                {scheduled > 0 && (
                                  <div className="text-[10px] text-info">
                                    {scheduled}h scheduled · {remaining}h left
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {unscheduledJobs.length === 0 && (
                    <div className="text-center py-4 text-xs opacity-40">All jobs scheduled</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Day view */
          <div className="p-4 space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {weekDays.map(day => {
                const ds = dateStr(day);
                const dayTotal = getDayTotalHours(ds);
                return (
                  <button
                    key={ds}
                    className={`btn btn-sm ${selectedDay === ds ? 'btn-primary' : 'btn-ghost'} flex-col h-auto py-1`}
                    onClick={() => setSelectedDay(ds)}
                  >
                    <span>{DAY_NAMES[weekDays.indexOf(day)]} {day.getDate()}</span>
                    {dayTotal > 0 && (
                      <span className={`text-[10px] ${dayTotal > HOURS_PER_DAY ? 'text-error' : 'opacity-60'}`}>
                        {dayTotal}h
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Day capacity bar */}
            {(() => {
              const dayTotal = getDayTotalHours(selectedDay);
              return dayTotal > 0 ? (
                <div className="bg-base-200 rounded-lg p-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Day Capacity</span>
                    <span className={dayTotal > HOURS_PER_DAY ? 'text-error font-bold' : ''}>
                      {dayTotal}h / {HOURS_PER_DAY}h
                      {dayTotal > HOURS_PER_DAY && ' (overtime)'}
                    </span>
                  </div>
                  <progress
                    className={`progress w-full ${dayTotal > HOURS_PER_DAY ? 'progress-error' : dayTotal === HOURS_PER_DAY ? 'progress-success' : 'progress-info'}`}
                    value={dayTotal}
                    max={HOURS_PER_DAY}
                  />
                </div>
              ) : null;
            })()}

            {entriesForDate(selectedDay).length === 0 ? (
              <div className="text-center py-8 text-base-content/40">
                <Calendar size={32} className="mx-auto mb-2" />
                <p>Nothing scheduled</p>
                {canEdit && (
                  <button className="btn btn-primary btn-sm mt-2" onClick={() => openAddModal(selectedDay)}>
                    <Plus size={16} /> Schedule a Job
                  </button>
                )}
              </div>
            ) : (
              entriesForDate(selectedDay).map(entry => {
                const job = jobs.find(j => j.id === entry.job_id);
                const est = job ? getEstimatedHours(job) : 0;
                const actual = getActualHours(entry.job_id);
                const totalScheduled = getScheduledHours(entry.job_id);
                const remaining = Math.max(0, est - totalScheduled);
                return (
                  <div key={entry.id} className="card bg-base-200 p-4" style={{ borderLeft: `4px solid ${entry.color}` }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold">{entry.job_number} — {entry.client_name}</div>
                        {job?.project_address && (
                          <div className="text-sm opacity-50 italic">{job.project_address}</div>
                        )}
                        {entry.crew_name && <div className="text-sm opacity-60"><Users size={12} className="inline" /> {entry.crew_name}</div>}
                        <div className="text-sm opacity-60">
                          <Clock size={12} className="inline" /> {entry.estimated_hours}h today
                          {est > 0 && ` · ${totalScheduled}h of ${est}h scheduled`}
                        </div>
                        {remaining > 0 && est > 0 && (
                          <div className="text-xs text-warning mt-1 flex items-center gap-1">
                            <ArrowRight size={10} /> {remaining}h remaining to schedule
                            {canEdit && (
                              <button
                                className="btn btn-xs btn-outline btn-warning ml-1"
                                onClick={() => handleQuickScheduleRemaining(entry.job_id, addDays(selectedDay, 1))}
                              >
                                Schedule rest
                              </button>
                            )}
                          </div>
                        )}
                        {entry.notes && <div className="text-sm mt-1 opacity-70">{entry.notes}</div>}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="btn btn-ghost btn-xs" onClick={() => onSelectJob(entry.job_id)}>View</button>
                        {canEdit && <button className="btn btn-ghost btn-xs" onClick={() => openEditModal(entry)}>Edit</button>}
                        {canEdit && <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDeleteEntry(entry.id)}>
                          <X size={14} />
                        </button>}
                      </div>
                    </div>
                    {/* Progress bar */}
                    {est > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Bid: {est}h</span>
                          <span>Actual: {actual}h ({Math.round((actual / est) * 100)}%)</span>
                        </div>
                        <progress
                          className={`progress w-full ${actual > est ? 'progress-error' : actual > est * 0.8 ? 'progress-warning' : 'progress-success'}`}
                          value={actual}
                          max={est}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Time Off blocks in day view */}
            {getTimeOffForDate(selectedDay).map((to, idx) => (
              <div key={`to-${idx}`} className="rounded-lg p-3 flex items-center gap-3" style={{ backgroundColor: '#a78bfa22', borderLeft: '4px solid #8b5cf6' }}>
                <div style={{ fontSize: 24 }}>🏖️</div>
                <div>
                  <div className="font-bold" style={{ color: '#7c3aed' }}>{to.userName}</div>
                  <div className="text-sm opacity-70">{to.type} — {to.hours}h</div>
                </div>
              </div>
            ))}

            {canEdit && entriesForDate(selectedDay).length > 0 && (
              <button className="btn btn-outline btn-sm w-full" onClick={() => openAddModal(selectedDay)}>
                <Plus size={16} /> Add Job to This Day
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (() => {
        const selectedJob = jobs.find(j => j.id === modalJobId);
        const est = selectedJob ? getEstimatedHours(selectedJob) : 0;
        const scheduled = modalJobId ? getScheduledHours(modalJobId, editingId || undefined) : 0;
        const remaining = Math.max(0, est - scheduled);
        const daysNeeded = remaining > 0 ? Math.ceil(remaining / HOURS_PER_DAY) : 0;

        return (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{editingId ? 'Edit' : 'Schedule'} Job</h3>
              <div className="space-y-3 mt-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Job</span></label>
                  <select className="select select-bordered w-full" value={modalJobId} onChange={e => handleJobChange(e.target.value)}>
                    <option value="">Select job...</option>
                    {sortedActiveJobs.map(j => (
                      <option key={j.id} value={j.id}>{j.job_number} — {j.client_name}{j.project_address ? ` (${j.project_address})` : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Hours summary for selected job */}
                {modalJobId && est > 0 && (
                  <div className="bg-base-200 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="opacity-60">Bid estimate:</span>
                      <span className="font-semibold">{est}h ({Math.ceil(est / HOURS_PER_DAY)} days)</span>
                    </div>
                    {scheduled > 0 && (
                      <div className="flex justify-between">
                        <span className="opacity-60">Already scheduled:</span>
                        <span>{scheduled}h</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold">
                      <span>Remaining:</span>
                      <span className={remaining > 0 ? 'text-warning' : 'text-success'}>
                        {remaining > 0 ? `${remaining}h (${daysNeeded} day${daysNeeded !== 1 ? 's' : ''})` : 'Fully scheduled ✓'}
                      </span>
                    </div>
                    <progress
                      className="progress progress-info w-full mt-1"
                      value={scheduled}
                      max={est}
                    />
                  </div>
                )}

                <div className="form-control">
                  <label className="label"><span className="label-text">Start Date</span></label>
                  <input type="date" className="input input-bordered" value={modalDate} onChange={e => setModalDate(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Crew / Team</span></label>
                  <input className="input input-bordered" placeholder="e.g. Crew A, Ryan's crew" value={modalCrew} onChange={e => setModalCrew(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Total Hours</span>
                    <span className="label-text-alt opacity-60">{HOURS_PER_DAY}h = 1 day</span>
                  </label>
                  <input type="number" className="input input-bordered" value={modalHours} min={1} max={999}
                    onChange={e => setModalHours(parseInt(e.target.value) || HOURS_PER_DAY)}
                  />
                  {/* Quick hour buttons */}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {[4, 8, 12, 16, 24, 32, 40].map(h => (
                      <button
                        key={h}
                        className={`btn btn-xs ${modalHours === h ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setModalHours(h)}
                      >
                        {h}h {h >= HOURS_PER_DAY && `(${h / HOURS_PER_DAY}d)`}
                      </button>
                    ))}
                    {remaining > 0 && !([4, 8, 12, 16, 24, 32, 40].includes(remaining)) && (
                      <button
                        className={`btn btn-xs ${modalHours === remaining ? 'btn-warning' : 'btn-outline btn-warning'}`}
                        onClick={() => setModalHours(remaining)}
                      >
                        {remaining}h (remaining)
                      </button>
                    )}
                  </div>
                </div>

                {/* Rollover toggle */}
                {(() => {
                  const existingOnDay = entries
                    .filter(e => e.date === modalDate && e.id !== editingId)
                    .reduce((sum, e) => sum + e.estimated_hours, 0);
                  const wouldOverflow = existingOnDay + modalHours > HOURS_PER_DAY;
                  return (
                    <div className="form-control">
                      {existingOnDay > 0 && (
                        <div className="bg-info/10 text-info rounded-lg p-2 text-xs mb-1">
                          📋 This day already has <strong>{existingOnDay}h</strong> scheduled — <strong>{Math.max(0, HOURS_PER_DAY - existingOnDay)}h</strong> capacity remaining
                        </div>
                      )}
                      {(wouldOverflow || modalHours > HOURS_PER_DAY || (editingId && existingOnDay + modalHours > HOURS_PER_DAY)) && (
                        <label className="label cursor-pointer">
                          <span className="label-text">
                            Auto-fill days (respect 8h capacity)
                            <span className="text-xs opacity-60 block">
                              {wouldOverflow && existingOnDay > 0
                                ? `Only ${Math.max(0, HOURS_PER_DAY - existingOnDay)}h fits today — overflow goes to next day(s)`
                                : `Split ${modalHours}h into ${HOURS_PER_DAY}h/day blocks`}
                            </span>
                          </span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={rollover}
                            onChange={e => setRollover(e.target.checked)}
                          />
                        </label>
                      )}
                      {/* Rollover preview */}
                      {rollover && rolloverDays.length > 0 && (wouldOverflow || modalHours > HOURS_PER_DAY || (editingId && existingOnDay + modalHours > HOURS_PER_DAY)) && (
                        <div className="bg-base-200 rounded p-2 mt-1 text-xs space-y-1">
                          <div className="font-semibold opacity-60 mb-1">Schedule preview:</div>
                          {rolloverDays.map((d, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>
                                {new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                {d.existing > 0 && <span className="opacity-50 ml-1">({d.existing}h existing)</span>}
                              </span>
                              <span className="font-semibold">{d.hours}h</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="form-control">
                  <label className="label"><span className="label-text">Notes</span></label>
                  <textarea className="textarea textarea-bordered" value={modalNotes} onChange={e => setModalNotes(e.target.value)} />
                </div>
              </div>
              <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveEntry} disabled={!modalJobId}>
                  {editingId
                    ? (rollover && rolloverDays.length > 1 ? `Update (${rolloverDays.length} Days)` : 'Update')
                    : rollover && rolloverDays.length > 1
                    ? `Schedule ${rolloverDays.length} Days`
                    : 'Schedule'
                  }
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setShowModal(false)} />
          </div>
        );
      })()}
    </div>
  );
};
