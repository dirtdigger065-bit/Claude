import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, ClipboardList, AlertTriangle, TrendingUp, FileText, DollarSign } from 'lucide-react';
import { Job, DailyLog, TimeEntry, MaterialEntry, User, LaborItem } from '../types';
import { normalizeStatus, isNonJobEntry, getPayPeriodStart, getPayPeriodDates } from '../types';
import { getDailyLogs, getAllTimeEntries, getMaterials, getActiveClockSessions, today } from '../utils/supabase';

interface Props {
  jobs: Job[];
  users: User[];
  currentUser: User;
  onSelectJob: (jobId: string) => void;
  onRefresh: () => void;
}

function getEstimatedHours(job: Job): number {
  if (job.estimated_hours) return job.estimated_hours;
  try {
    const labor: LaborItem[] = JSON.parse(job.labor_json || '[]');
    return labor.reduce((sum, l) => sum + (l.hours || 0), 0);
  } catch { return 0; }
}

export const Dashboard: React.FC<Props> = ({ jobs, users, currentUser, onSelectJob, onRefresh }) => {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [materials, setMaterials] = useState<MaterialEntry[]>([]);
  const [activeSessions, setActiveSessions] = useState<TimeEntry[]>([]);
  const [sessionElapsed, setSessionElapsed] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'hours' | 'issues' | 'payroll'>('overview');

  useEffect(() => { loadData(); }, []);

  // Timer for active sessions
  useEffect(() => {
    if (activeSessions.length === 0) return;
    const interval = setInterval(() => {
      const elapsed: Record<string, number> = {};
      activeSessions.forEach(s => {
        if (s.clock_in_time) {
          elapsed[s.id] = Math.floor((Date.now() - new Date(s.clock_in_time).getTime()) / 1000);
        }
      });
      setSessionElapsed(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSessions]);

  const loadData = async () => {
    // Per-user files are the real source of truth (see utils/supabase.ts) — the
    // old global time-entries.json is only ever a one-time migration snapshot
    // and stays empty afterward, so every stat here needs getAllTimeEntries.
    const [l, t, m, active] = await Promise.all([getDailyLogs(), getAllTimeEntries(users), getMaterials(), getActiveClockSessions(users)]);
    setLogs(l);
    setTimeEntries(t);
    setMaterials(m);
    setActiveSessions(active);
    setLoading(false);
  };

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const activeJobs = jobs.filter(j => j.status === 'active');
  const readyToBillJobs = jobs.filter(j => j.status === 'ready_to_bill');
  const todayStr = today();
  const todayLogs = logs.filter(l => l.date === todayStr);
  const pendingApprovals = timeEntries.filter(t => {
    const s = normalizeStatus(t.status);
    return s === 'pending' || s === 'foreman-approved';
  });
  const recentIssues = logs.filter(l => l.issues && l.issues.trim()).slice(-10).reverse();

  const allApprovedEntries = timeEntries.filter(t => normalizeStatus(t.status) === 'admin-approved');
  const totalApprovedHours = allApprovedEntries.reduce((s, t) => s + t.hours, 0);
  const totalEstimatedHours = jobs.filter(j => j.status !== 'archived').reduce((s, j) => s + getEstimatedHours(j), 0);

  // Non-job hours
  const nonJobEntries = timeEntries.filter(e => isNonJobEntry(e));
  const nonJobHours = nonJobEntries.reduce((s, e) => s + (Number(e.hours) || 0), 0);

  // Live "this week" hours — includes elapsed time from anyone still clocked in,
  // not just finalized entries, so it matches the Hub's running stats.
  const weekDates = getPayPeriodDates(getPayPeriodStart(new Date()));
  const activeElapsedByEntry: Record<string, number> = {};
  activeSessions.forEach(s => { activeElapsedByEntry[s.id] = (sessionElapsed[s.id] || 0) / 3600; });
  const hoursTodayLive = timeEntries.filter(e => e.date === todayStr).reduce((s, e) => s + (Number(e.hours) || 0), 0)
    + activeSessions.filter(s => s.date === todayStr).reduce((s, e) => s + (activeElapsedByEntry[e.id] || 0), 0);
  const hoursWeekLive = timeEntries.filter(e => weekDates.includes(e.date)).reduce((s, e) => s + (Number(e.hours) || 0), 0)
    + activeSessions.filter(s => weekDates.includes(s.date)).reduce((s, e) => s + (activeElapsedByEntry[e.id] || 0), 0);
  const weekHoursByUser: Record<string, number> = {};
  timeEntries.filter(e => weekDates.includes(e.date) && new Date(e.date + 'T12:00:00').getDay() !== 0).forEach(e => {
    weekHoursByUser[e.user_id] = (weekHoursByUser[e.user_id] || 0) + (Number(e.hours) || 0);
  });
  activeSessions.filter(s => weekDates.includes(s.date) && new Date(s.date + 'T12:00:00').getDay() !== 0).forEach(s => {
    weekHoursByUser[s.user_id] = (weekHoursByUser[s.user_id] || 0) + (activeElapsedByEntry[s.id] || 0);
  });
  const overtimeThisWeek = Object.values(weekHoursByUser).reduce((s, h) => s + Math.max(0, h - 40), 0);

  // Hours by job for top consumers
  const hoursByJob: Record<string, { approved: number; estimated: number; jobNumber: string; client: string }> = {};
  jobs.filter(j => j.status !== 'archived').forEach(j => {
    hoursByJob[j.id] = { approved: 0, estimated: getEstimatedHours(j), jobNumber: j.job_number, client: j.client_name };
  });
  timeEntries.filter(t => normalizeStatus(t.status) === 'admin-approved' && !isNonJobEntry(t)).forEach(t => {
    if (hoursByJob[t.job_id]) hoursByJob[t.job_id].approved += t.hours;
  });
  const jobHoursList = Object.entries(hoursByJob)
    .filter(([_, v]) => v.approved > 0 || v.estimated > 0)
    .sort((a, b) => b[1].approved - a[1].approved)
    .slice(0, 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-base-200 flex items-center gap-2">
        <h2 className="font-bold text-lg flex-1">Dashboard</h2>
        <button className="btn btn-ghost btn-xs" onClick={() => { onRefresh(); loadData(); }}>Refresh</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-primary"><Briefcase size={24} /></div>
            <div className="stat-title text-xs">Active Jobs</div>
            <div className="stat-value text-2xl">{activeJobs.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-info"><ClipboardList size={24} /></div>
            <div className="stat-title text-xs">Today's Logs</div>
            <div className="stat-value text-2xl">{todayLogs.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-warning"><Clock size={24} /></div>
            <div className="stat-title text-xs">Pending Approval</div>
            <div className="stat-value text-2xl">{pendingApprovals.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-primary"><Clock size={24} /></div>
            <div className="stat-title text-xs">Hours Today</div>
            <div className="stat-value text-2xl">{hoursTodayLive.toFixed(1)}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-info"><TrendingUp size={24} /></div>
            <div className="stat-title text-xs">Hours This Week</div>
            <div className="stat-value text-2xl">{hoursWeekLive.toFixed(1)}</div>
          </div>
          {overtimeThisWeek > 0 && (
            <div className="stat bg-error/10 rounded-lg p-3">
              <div className="stat-figure text-error"><AlertTriangle size={24} /></div>
              <div className="stat-title text-xs">Overtime This Week</div>
              <div className="stat-value text-2xl text-error">{overtimeThisWeek.toFixed(1)}</div>
            </div>
          )}
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-figure text-success"><TrendingUp size={24} /></div>
            <div className="stat-title text-xs">Total Hours (All-Time, Approved)</div>
            <div className="stat-value text-2xl">{totalApprovedHours.toFixed(0)}</div>
            {totalEstimatedHours > 0 && (
              <div className="stat-desc text-xs">of {totalEstimatedHours}h estimated</div>
            )}
          </div>
        </div>

        {/* 👷 WHO'S WORKING NOW */}
        {activeSessions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
              <h3 className="font-bold text-sm">Who's Working Now ({activeSessions.length})</h3>
            </div>
            {activeSessions.map(session => {
              const user = users.find(u => u.id === session.user_id);
              const job = jobs.find(j => j.id === session.job_id);
              const elapsed = sessionElapsed[session.id] || 0;
              return (
                <div key={session.id} className="card bg-success/10 border border-success/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-sm font-bold">
                        {(user?.name || '?')[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{user?.name || session.user_name}</div>
                        <div className="text-xs text-base-content/60">
                          {job ? (
                            <span className="cursor-pointer hover:underline" onClick={() => onSelectJob(job.id)}>
                              📍 {job.job_number} — {job.client_name}
                            </span>
                          ) : session.job_id ? 'Unassigned' : 'No project selected'}
                          {session.equipment_name && <span className="ml-1">· 🚜 {session.equipment_name}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-success tabular-nums">{formatTimer(elapsed)}</div>
                      <div className="text-[10px] text-base-content/40">
                        {session.clock_in_time && `since ${new Date(session.clock_in_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                        {session.clock_in_location && ' 📍'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Not clocked in */}
        {activeSessions.length > 0 && (() => {
          const clockedInUserIds = new Set(activeSessions.map(s => s.user_id));
          const notClockedIn = users.filter(u => u.active && !clockedInUserIds.has(u.id) && (u.role === 'crew' || u.role === 'foreman'));
          if (notClockedIn.length === 0) return null;
          return (
            <div className="flex items-center gap-2 text-xs text-base-content/40 px-1">
              <span>Not clocked in:</span>
              {notClockedIn.map(u => (
                <span key={u.id} className="badge badge-ghost badge-xs">{u.name}</span>
              ))}
            </div>
          );
        })()}

        {/* Ready to Bill Alert */}
        {readyToBillJobs.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-accent" />
              <h3 className="font-bold text-sm">💰 Ready to Bill ({readyToBillJobs.length})</h3>
            </div>
            {readyToBillJobs.map(job => {
              const cl = job.completion_checklist;
              const checkCount = cl ? [cl.time_entries_complete, cl.trucking_tickets_entered, cl.rock_tickets_submitted, cl.material_receipts_submitted, cl.final_photos_uploaded, cl.daily_logs_complete].filter(Boolean).length : 0;
              return (
                <div key={job.id} className="card bg-accent/10 border border-accent/30 p-3 cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => onSelectJob(job.id)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-sm">{job.job_number} — {job.client_name}</div>
                      {job.project_address && <div className="text-xs opacity-60">📍 {job.project_address}</div>}
                    </div>
                    <span className="badge badge-accent badge-sm">💰 Bill</span>
                  </div>
                  {cl && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={checkCount === 6 ? 'text-success font-bold' : 'text-warning'}>{checkCount}/6 checklist items ✓</span>
                        {cl.completed_by && <span className="opacity-50">· Submitted by {cl.completed_by}</span>}
                      </div>
                      {cl.billing_notes && <p className="text-xs mt-1 bg-base-100 p-1.5 rounded">📝 {cl.billing_notes}</p>}
                      {checkCount < 6 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {!cl.time_entries_complete && <span className="badge badge-error badge-xs">⏱️ Time</span>}
                          {!cl.trucking_tickets_entered && <span className="badge badge-error badge-xs">🚛 Trucking</span>}
                          {!cl.rock_tickets_submitted && <span className="badge badge-error badge-xs">🪨 Rock</span>}
                          {!cl.material_receipts_submitted && <span className="badge badge-error badge-xs">🧾 Materials</span>}
                          {!cl.final_photos_uploaded && <span className="badge badge-error badge-xs">📸 Photos</span>}
                          {!cl.daily_logs_complete && <span className="badge badge-error badge-xs">📋 Logs</span>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bid vs Actual Summary */}
        {totalEstimatedHours > 0 && (
          <div className="card bg-base-200 p-3">
            <div className="text-sm font-semibold mb-2 flex items-center gap-1">
              <TrendingUp size={14} /> Overall: Bid vs Actual Hours
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span>Bid: {totalEstimatedHours}h</span>
              <span>Actual: {totalApprovedHours.toFixed(0)}h ({totalEstimatedHours > 0 ? Math.round((totalApprovedHours / totalEstimatedHours) * 100) : 0}%)</span>
            </div>
            <progress
              className={`progress w-full ${totalApprovedHours > totalEstimatedHours ? 'progress-error' : totalApprovedHours > totalEstimatedHours * 0.8 ? 'progress-warning' : 'progress-success'}`}
              value={totalApprovedHours}
              max={totalEstimatedHours}
            />
          </div>
        )}

        {/* Tabs */}
        <div className="tabs tabs-boxed">
          <button className={`tab ${tab === 'overview' ? 'tab-active' : ''}`} onClick={() => setTab('overview')}>Jobs</button>
          <button className={`tab ${tab === 'hours' ? 'tab-active' : ''}`} onClick={() => setTab('hours')}>Hours</button>
          <button className={`tab ${tab === 'payroll' ? 'tab-active' : ''}`} onClick={() => setTab('payroll')}>
            <FileText size={12} className="mr-1" /> Payroll
          </button>
          <button className={`tab ${tab === 'issues' ? 'tab-active' : ''}`} onClick={() => setTab('issues')}>
            Issues {recentIssues.length > 0 && <span className="badge badge-error badge-xs ml-1">{recentIssues.length}</span>}
          </button>
        </div>

        {tab === 'overview' && (
          <div className="space-y-2">
            {activeJobs.slice(0, 15).map(job => {
              const est = getEstimatedHours(job);
              const actual = timeEntries.filter(t => t.job_id === job.id && normalizeStatus(t.status) === 'admin-approved').reduce((s, t) => s + t.hours, 0);
              const jobLogs = logs.filter(l => l.job_id === job.id).length;
              return (
                <div key={job.id} className="card bg-base-200 p-3 cursor-pointer hover:bg-base-300" onClick={() => onSelectJob(job.id)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm">{job.job_number} — {job.client_name}</div>
                      <div className="text-xs opacity-60">{jobLogs} logs · {actual.toFixed(1)}h logged</div>
                    </div>
                    {est > 0 && (
                      <div className="text-right">
                        <div className="text-xs">{Math.round((actual / est) * 100)}%</div>
                        <div className="w-16 bg-base-300 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${actual > est ? 'bg-error' : 'bg-success'}`}
                            style={{ width: `${Math.min(100, (actual / est) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'hours' && (
          <div className="space-y-2">
            {jobHoursList.map(([jobId, data]) => (
              <div key={jobId} className="card bg-base-200 p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-semibold text-sm">{data.jobNumber} — {data.client}</div>
                  <div className="text-xs">
                    {data.approved.toFixed(1)}h {data.estimated > 0 && `/ ${data.estimated}h`}
                  </div>
                </div>
                {data.estimated > 0 && (
                  <progress
                    className={`progress w-full ${data.approved > data.estimated ? 'progress-error' : 'progress-success'}`}
                    value={data.approved}
                    max={data.estimated}
                  />
                )}
              </div>
            ))}
            {nonJobHours > 0 && (
              <div className="card bg-base-200 p-3 border-l-4 border-warning">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">🔧 Non-Job Hours</span>
                  <span className="text-xs font-bold">{nonJobHours.toFixed(1)}h</span>
                </div>
              </div>
            )}
            {jobHoursList.length === 0 && nonJobHours === 0 && (
              <div className="text-center py-4 text-base-content/40">No time entries yet</div>
            )}
          </div>
        )}

        {tab === 'payroll' && (
          <div className="space-y-3">
            <div className="card bg-base-200 p-3">
              <h3 className="font-bold text-sm mb-2">Approval Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs flex items-center gap-1">⏳ Needs Approval</span>
                  <span className="badge badge-warning badge-sm">{pendingApprovals.length} entries · {pendingApprovals.reduce((s, e) => s + Number(e.hours), 0).toFixed(1)}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs flex items-center gap-1">✅ Approved</span>
                  <span className="badge badge-success badge-sm">{allApprovedEntries.length} entries · {totalApprovedHours.toFixed(1)}h</span>
                </div>
              </div>
            </div>

            {/* Per-employee summary */}
            <h3 className="font-bold text-sm">Employee Hours (All Time)</h3>
            {(() => {
              const empHours: Record<string, { name: string; total: number; approved: number; pending: number }> = {};
              timeEntries.forEach(e => {
                if (!empHours[e.user_id]) empHours[e.user_id] = { name: e.user_name, total: 0, approved: 0, pending: 0 };
                const hrs = Number(e.hours) || 0;
                empHours[e.user_id].total += hrs;
                const st = normalizeStatus(e.status);
                if (st === 'admin-approved') empHours[e.user_id].approved += hrs;
                if (st === 'pending' || st === 'foreman-approved') empHours[e.user_id].pending += hrs;
              });
              return Object.entries(empHours)
                .sort((a, b) => b[1].total - a[1].total)
                .map(([uid, data]) => (
                  <div key={uid} className="card bg-base-200 p-3 flex-row items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{data.name}</div>
                      <div className="text-xs opacity-60">{data.approved.toFixed(1)}h approved, {data.pending.toFixed(1)}h pending</div>
                    </div>
                    <span className="badge badge-primary">{data.total.toFixed(1)}h</span>
                  </div>
                ));
            })()}
          </div>
        )}

        {tab === 'issues' && (
          <div className="space-y-2">
            {recentIssues.map(log => (
              <div key={log.id} className="card bg-base-200 p-3 border-l-4 border-warning">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">{log.job_number}</span>
                  <span className="text-xs opacity-60">{log.date}</span>
                </div>
                <p className="text-sm mt-1">{log.issues}</p>
                <div className="text-xs opacity-40 mt-1">by {log.foreman_name}</div>
              </div>
            ))}
            {recentIssues.length === 0 && (
              <div className="text-center py-4 text-base-content/40">
                <AlertTriangle size={24} className="mx-auto mb-2 opacity-30" />
                No issues reported 👍
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
