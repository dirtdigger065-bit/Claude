import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, RefreshCw, Users, AlertTriangle, DollarSign, TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import type { Job, TimeEntry, User, Holiday } from '../types';
import {
  normalizeStatus, getEntryLabel, isNonJobEntry, getCategoryLabel,
  getPayPeriodStart, getPayPeriodDates, formatDateShort, getDayName,
} from '../types';
import { getAllTimeEntries, getTimeEntriesForUser, saveTimeEntriesForUser, getHolidays, now, today } from '../utils/supabase';
import { TimeEntryForm } from './TimeEntryForm';

interface Props {
  jobs: Job[];
  users: User[];
  currentUser: User;
  onSaved: () => void;
}

type SubTab = 'dashboard' | 'approve' | 'mytime';

interface EmployeeWeek {
  userId: string;
  userName: string;
  role: string;
  employeeType: 'hourly' | 'salary';
  payRate: number;
  dailyHours: Record<string, number>;
  dailyEntries: Record<string, TimeEntry[]>;
  totalHours: number;
  sundayHours: number;
  monSatHours: number;
  regularHours: number;
  overtimeHours: number;
  pendingCount: number;
  approvedCount: number;
  totalCount: number;
  pendingHours: number;
  approvedHours: number;
  grossPay: number;
  worstStatus: 'pending' | 'approved' | 'mixed';
  unassignedCount: number;
}

interface JobHoursSummary {
  jobId: string;
  jobNumber: string;
  client: string;
  address: string;
  hours: number;
  cost: number;
  entryCount: number;
  employeeCount: number;
}

interface NonJobSummary {
  category: string;
  label: string;
  hours: number;
  cost: number;
  entryCount: number;
}

export const Timecards: React.FC<Props> = ({ jobs, users, currentUser, onSaved }) => {
  // Crew & foreman land on "My Time" so they can clock in / enter hours right away.
  const [tab, setTab] = useState<SubTab>(
    currentUser.role === 'crew' || currentUser.role === 'foreman' ? 'mytime' : 'dashboard'
  );
  const [weekStart, setWeekStart] = useState(() => getPayPeriodStart(new Date()));
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);
  const [rejectModalEntry, setRejectModalEntry] = useState<TimeEntry | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [assignJobEntry, setAssignJobEntry] = useState<TimeEntry | null>(null);
  const [assignJobSearch, setAssignJobSearch] = useState('');
  const [dashSection, setDashSection] = useState<'grid' | 'jobs' | 'nonjob'>('grid');
  const activeJobs = useMemo(() =>
    jobs.filter(j => j.status === 'active' || j.status === 'ready_to_bill').sort((a, b) => (b.job_number || '').localeCompare(a.job_number || '')),
    [jobs]
  );

  const isAdmin = currentUser.role === 'admin';
  const isForeman = currentUser.role === 'foreman';
  const isPayroll = currentUser.role === 'payroll';
  const canApprove = isAdmin || isForeman;
  const canSeePay = isAdmin; // Only Ryan sees pay rates

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const [all, h] = await Promise.all([getAllTimeEntries(users), getHolidays()]);
      setEntries(all);
      setHolidays(h);
    } catch {}
    setLoading(false);
  };

  const weekDates = getPayPeriodDates(weekStart);
  const weekLabel = formatDateShort(weekDates[0]) + ' – ' + formatDateShort(weekDates[6]);

  // Previous week for comparison
  const prevWeekStartDate = new Date(weekStart);
  prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
  const prevWeekDates = getPayPeriodDates(prevWeekStartDate);

  const prevWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); setExpandedUser(null); };
  const nextWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); setExpandedUser(null); };
  const thisWeek = () => { setWeekStart(getPayPeriodStart(new Date())); setExpandedUser(null); };

  const weekEntries = useMemo(() => entries.filter(e => weekDates.includes(e.date)), [entries, weekDates]);
  const prevWeekEntries = useMemo(() => entries.filter(e => prevWeekDates.includes(e.date)), [entries, prevWeekDates]);

  // Holiday dates in this week
  const holidayDates = useMemo(() => {
    return new Set(holidays.filter(h => weekDates.includes(h.date)).map(h => h.date));
  }, [holidays, weekDates]);

  const calcGrossPay = (ew: { regularHours: number; overtimeHours: number; sundayHours: number; payRate: number; employeeType: string }) => {
    const rate = ew.payRate;
    if (!rate) return 0;
    const isSalary = ew.employeeType === 'salary';
    return (ew.regularHours * rate) + 
           (ew.overtimeHours * rate * (isSalary ? 1 : 1.5)) + 
           (ew.sundayHours * rate * (isSalary ? 1 : 1.5));
  };

  const employeeWeeks: EmployeeWeek[] = useMemo(() => {
    const map: Record<string, EmployeeWeek> = {};
    const activeUsers = users.filter(u => u.active && u.role !== 'payroll');

    const makeEW = (id: string, name: string, role: string, empType: 'hourly' | 'salary', rate: number): EmployeeWeek => {
      const ew: EmployeeWeek = {
        userId: id, userName: name, role, employeeType: empType, payRate: rate,
        dailyHours: {}, dailyEntries: {},
        totalHours: 0, sundayHours: 0, monSatHours: 0, regularHours: 0, overtimeHours: 0,
        pendingCount: 0, approvedCount: 0, totalCount: 0,
        pendingHours: 0, approvedHours: 0, grossPay: 0,
        worstStatus: 'approved', unassignedCount: 0,
      };
      weekDates.forEach(d => { ew.dailyHours[d] = 0; ew.dailyEntries[d] = []; });
      return ew;
    };

    activeUsers.forEach(u => {
      map[u.id] = makeEW(u.id, u.name, u.role, u.employeeType || 'hourly', u.payRate || 0);
    });

    weekEntries.forEach(entry => {
      let ew = map[entry.user_id];
      if (!ew) {
        ew = makeEW(entry.user_id, entry.user_name, 'crew', 'hourly', 0);
        map[entry.user_id] = ew;
      }
      const hrs = Number(entry.hours) || 0;
      if (entry.date && ew.dailyHours[entry.date] !== undefined) {
        ew.dailyHours[entry.date] += hrs;
        ew.dailyEntries[entry.date].push(entry);
      }
      const dayOfWeek = new Date(entry.date + 'T12:00:00').getDay();
      if (dayOfWeek === 0) ew.sundayHours += hrs;
      else ew.monSatHours += hrs;
      ew.totalHours += hrs;
      ew.totalCount++;
      const st = normalizeStatus(entry.status);
      if (st === 'pending' || st === 'foreman-approved') { ew.pendingCount++; ew.pendingHours += hrs; }
      if (st === 'admin-approved') { ew.approvedCount++; ew.approvedHours += hrs; }
      if (!isNonJobEntry(entry) && !entry.job_id) ew.unassignedCount++;
    });

    Object.values(map).forEach(ew => {
      ew.regularHours = Math.min(ew.monSatHours, 40);
      ew.overtimeHours = Math.max(0, ew.monSatHours - 40);
      ew.grossPay = calcGrossPay(ew);
      if (ew.totalCount === 0) { ew.worstStatus = 'approved'; return; }
      if (ew.pendingCount > 0 && ew.approvedCount > 0) ew.worstStatus = 'mixed';
      else if (ew.pendingCount > 0) ew.worstStatus = 'pending';
      else ew.worstStatus = 'approved';
    });

    return Object.values(map).sort((a, b) => b.totalHours - a.totalHours);
  }, [weekEntries, users, weekDates]);

  const employeesWithHours = employeeWeeks.filter(ew => ew.totalHours > 0);
  const employeesNoHours = employeeWeeks.filter(ew => ew.totalHours === 0);

  // Totals
  const grandTotal = employeesWithHours.reduce((s, ew) => s + ew.totalHours, 0);
  const grandOT = employeesWithHours.reduce((s, ew) => s + ew.overtimeHours, 0);
  const grandSunday = employeesWithHours.reduce((s, ew) => s + ew.sundayHours, 0);
  const grandRegular = employeesWithHours.reduce((s, ew) => s + ew.regularHours, 0);
  const grandCost = employeesWithHours.reduce((s, ew) => s + ew.grossPay, 0);
  const approvedTotal = employeesWithHours.reduce((s, ew) => s + ew.approvedCount, 0);
  const entryTotal = employeesWithHours.reduce((s, ew) => s + ew.totalCount, 0);
  const unassignedTotal = employeesWithHours.reduce((s, ew) => s + ew.unassignedCount, 0);
  const approvalPct = entryTotal > 0 ? Math.round((approvedTotal / entryTotal) * 100) : 100;

  // Previous week totals for comparison
  const prevWeekTotal = prevWeekEntries.reduce((s, e) => s + (Number(e.hours) || 0), 0);
  const hoursDelta = grandTotal - prevWeekTotal;

  // Day totals
  const dayTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    weekDates.forEach(d => {
      totals[d] = employeesWithHours.reduce((s, ew) => s + (ew.dailyHours[d] || 0), 0);
    });
    return totals;
  }, [employeesWithHours, weekDates]);

  // Job hours summary
  const jobHoursSummary: JobHoursSummary[] = useMemo(() => {
    const map: Record<string, JobHoursSummary> = {};
    const employeeSet: Record<string, Set<string>> = {};
    weekEntries.filter(e => !isNonJobEntry(e) && e.job_id).forEach(e => {
      const jid = e.job_id;
      if (!map[jid]) {
        const job = jobs.find(j => j.id === jid);
        map[jid] = {
          jobId: jid, jobNumber: e.job_number || job?.job_number || '?',
          client: job?.client_name || '', address: job?.project_address || '',
          hours: 0, cost: 0, entryCount: 0, employeeCount: 0,
        };
        employeeSet[jid] = new Set();
      }
      const hrs = Number(e.hours) || 0;
      map[jid].hours += hrs;
      map[jid].entryCount++;
      employeeSet[jid].add(e.user_id);
      // Estimate cost using user's rate
      const user = users.find(u => u.id === e.user_id);
      if (user?.payRate) map[jid].cost += hrs * user.payRate;
    });
    Object.keys(map).forEach(k => {
      map[k].employeeCount = employeeSet[k]?.size || 0;
    });
    return Object.values(map).sort((a, b) => b.hours - a.hours);
  }, [weekEntries, jobs, users]);

  // Non-job summary
  const nonJobSummary: NonJobSummary[] = useMemo(() => {
    const map: Record<string, NonJobSummary> = {};
    weekEntries.filter(e => isNonJobEntry(e)).forEach(e => {
      const cat = e.category || 'other';
      if (!map[cat]) {
        map[cat] = { category: cat, label: getCategoryLabel(cat), hours: 0, cost: 0, entryCount: 0 };
      }
      const hrs = Number(e.hours) || 0;
      map[cat].hours += hrs;
      map[cat].entryCount++;
      const user = users.find(u => u.id === e.user_id);
      if (user?.payRate) map[cat].cost += hrs * user.payRate;
    });
    return Object.values(map).sort((a, b) => b.hours - a.hours);
  }, [weekEntries, users]);

  const totalNonJobHours = nonJobSummary.reduce((s, n) => s + n.hours, 0);
  const totalJobHours = jobHoursSummary.reduce((s, j) => s + j.hours, 0);

  // --- Two-step Approval actions ---
  // Foreman: pending → foreman-approved
  // Admin:   pending|foreman-approved → admin-approved (final)
  const approveEntry = async (entryId: string, userId: string) => {
    setApproving(true);
    try {
      const userEntries = await getTimeEntriesForUser(userId);
      const entry = userEntries.find(e => e.id === entryId);
      if (entry) {
        if (isAdmin) {
          // Admin does final approval
          entry.status = 'admin-approved';
          entry.admin_approved_by = currentUser.id;
          entry.admin_approved_at = now();
          if (!entry.approved_by) {
            entry.approved_by = currentUser.id;
            entry.approved_at = now();
          }
        } else if (isForeman) {
          // Foreman does step 1
          entry.status = 'foreman-approved';
          entry.approved_by = currentUser.id;
          entry.approved_at = now();
        }
        await saveTimeEntriesForUser(userId, userEntries);
        setEntries(prev => prev.map(e => e.id === entryId ? entry : e));
      }
    } catch (err) { console.error('Approve failed:', err); }
    setApproving(false);
  };

  const confirmReject = async () => {
    if (!rejectModalEntry) return;
    setApproving(true);
    try {
      const userId = rejectModalEntry.user_id;
      const userEntries = await getTimeEntriesForUser(userId);
      const entry = userEntries.find(e => e.id === rejectModalEntry.id);
      if (entry) {
        entry.status = 'rejected';
        entry.approved_by = currentUser.id;
        entry.approved_at = now();
        entry.rejection_reason = rejectReason || 'No reason given';
        await saveTimeEntriesForUser(userId, userEntries);
        setEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
      }
    } catch (err) { console.error('Reject failed:', err); }
    setRejectModalEntry(null);
    setRejectReason('');
    setApproving(false);
  };

  const batchApprove = async () => {
    setApproving(true);
    try {
      const ts = now();
      // Foreman: approve only pending entries (step 1)
      // Admin: approve pending + foreman-approved entries (final)
      const affected = weekEntries.filter(e => {
        const s = normalizeStatus(e.status);
        if (isAdmin) return s === 'pending' || s === 'foreman-approved';
        if (isForeman) return s === 'pending';
        return false;
      });
      const byUser: Record<string, string[]> = {};
      affected.forEach(e => {
        if (!byUser[e.user_id]) byUser[e.user_id] = [];
        byUser[e.user_id].push(e.id);
      });
      for (const [userId, entryIds] of Object.entries(byUser)) {
        const userEntries = await getTimeEntriesForUser(userId);
        userEntries.forEach(e => {
          if (entryIds.includes(e.id)) {
            if (isAdmin) {
              e.status = 'admin-approved';
              e.admin_approved_by = currentUser.id;
              e.admin_approved_at = ts;
              if (!e.approved_by) { e.approved_by = currentUser.id; e.approved_at = ts; }
            } else if (isForeman) {
              e.status = 'foreman-approved';
              e.approved_by = currentUser.id;
              e.approved_at = ts;
            }
          }
        });
        await saveTimeEntriesForUser(userId, userEntries);
      }
      await loadEntries();
    } catch (err) { console.error('Batch approve failed:', err); }
    setApproving(false);
  };

  const batchApproveUser = async (userId: string) => {
    setApproving(true);
    try {
      const ts = now();
      const userEntries = await getTimeEntriesForUser(userId);
      userEntries.forEach(e => {
        if (weekDates.includes(e.date)) {
          const s = normalizeStatus(e.status);
          if (isAdmin && (s === 'pending' || s === 'foreman-approved')) {
            e.status = 'admin-approved';
            e.admin_approved_by = currentUser.id;
            e.admin_approved_at = ts;
            if (!e.approved_by) { e.approved_by = currentUser.id; e.approved_at = ts; }
          } else if (isForeman && s === 'pending') {
            e.status = 'foreman-approved';
            e.approved_by = currentUser.id;
            e.approved_at = ts;
          }
        }
      });
      await saveTimeEntriesForUser(userId, userEntries);
      await loadEntries();
    } catch (err) { console.error('Batch approve user failed:', err); }
    setApproving(false);
  };

  const assignJobToEntry = async (entry: TimeEntry, job: Job) => {
    setApproving(true);
    try {
      const userEntries = await getTimeEntriesForUser(entry.user_id);
      const idx = userEntries.findIndex(e => e.id === entry.id);
      if (idx >= 0) {
        userEntries[idx].job_id = job.id;
        userEntries[idx].job_number = job.job_number;
        await saveTimeEntriesForUser(entry.user_id, userEntries);
        setEntries(prev => prev.map(e => e.id === entry.id ? { ...e, job_id: job.id, job_number: job.job_number } : e));
      }
    } catch (err) { console.error('Assign job failed:', err); }
    setAssignJobEntry(null);
    setAssignJobSearch('');
    setApproving(false);
  };

  // Entries needing action from current user
  const unapprovedEntries = entries.filter(e => {
    const s = normalizeStatus(e.status);
    if (isAdmin) return s === 'pending' || s === 'foreman-approved';
    if (isForeman) return s === 'pending'; // Foreman only sees pending (not already foreman-approved)
    return false;
  }).sort((a, b) => b.date.localeCompare(a.date) || b.created_at.localeCompare(a.created_at));

  const unapprovedWeekCount = unapprovedEntries.filter(e => weekDates.includes(e.date)).length;

  const getStatusBadge = (status: string) => {
    const s = normalizeStatus(status);
    switch (s) {
      case 'pending': return <span className="badge badge-warning badge-xs">Pending</span>;
      case 'foreman-approved': return <span className="badge badge-info badge-xs">Cody ✓</span>;
      case 'admin-approved': return <span className="badge badge-success badge-xs">Approved</span>;
      case 'rejected': return <span className="badge badge-error badge-xs">Rejected</span>;
      default: return null;
    }
  };

  // Today indicator
  const todayStr = today();
  const isCurrentWeek = weekDates.includes(todayStr);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-base-200 flex items-center gap-2">
        <BarChart3 size={20} className="text-primary" />
        <h2 className="text-lg font-bold flex-1">Timecards</h2>
        <button className="btn btn-ghost btn-sm btn-circle" onClick={loadEntries}><RefreshCw size={16} /></button>
      </div>

      <div className="tabs tabs-boxed mx-3 mt-2">
        <button className={'tab tab-sm flex-1 ' + (tab === 'dashboard' ? 'tab-active' : '')} onClick={() => setTab('dashboard')}>
          <BarChart3 size={14} className="mr-1" /> {isAdmin ? 'Dashboard' : isPayroll ? 'Payroll' : 'Weekly'}
        </button>
        {canApprove && (
          <button className={'tab tab-sm flex-1 ' + (tab === 'approve' ? 'tab-active' : '')} onClick={() => setTab('approve')}>
            <CheckCircle size={14} className="mr-1" />
            {isAdmin ? 'Final Approve' : 'Approve'}
            {unapprovedEntries.length > 0 && (
              <span className="badge badge-warning badge-xs ml-1">{unapprovedEntries.length}</span>
            )}
          </button>
        )}
        {!isPayroll && (
          <button className={'tab tab-sm flex-1 ' + (tab === 'mytime' ? 'tab-active' : '')} onClick={() => setTab('mytime')}>
            <Clock size={14} className="mr-1" /> My Time
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {loading ? (
          <div className="flex justify-center py-8"><span className="loading loading-spinner loading-lg text-primary" /></div>
        ) : (
          <>
            {/* =================== DASHBOARD TAB =================== */}
            {tab === 'dashboard' && (
              <div className="p-3 space-y-3">
                {/* Week Navigator */}
                <div className="flex items-center justify-between gap-2">
                  <button className="btn btn-ghost btn-sm btn-circle" onClick={prevWeek}><ChevronLeft size={18} /></button>
                  <div className="text-center">
                    <div className="text-xs text-base-content/60">Pay Period (Sun–Sat)</div>
                    <div className="font-bold text-sm">{weekLabel}</div>
                    {isCurrentWeek && <span className="badge badge-primary badge-xs">Current Week</span>}
                  </div>
                  <button className="btn btn-ghost btn-sm btn-circle" onClick={nextWeek}><ChevronRight size={18} /></button>
                </div>
                {!isCurrentWeek && <button className="btn btn-ghost btn-xs w-full" onClick={thisWeek}>← Back to Current Week</button>}

                {/* ===== SUMMARY CARDS ===== */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-base-200 rounded-xl p-3">
                    <div className="text-xs text-base-content/50 flex items-center gap-1"><Clock size={12} /> Total Hours</div>
                    <div className="text-2xl font-black text-primary">{grandTotal.toFixed(1)}</div>
                    {hoursDelta !== 0 && (
                      <div className={'text-xs flex items-center gap-0.5 ' + (hoursDelta > 0 ? 'text-error' : 'text-success')}>
                        <TrendingUp size={10} className={hoursDelta < 0 ? 'rotate-180' : ''} />
                        {hoursDelta > 0 ? '+' : ''}{hoursDelta.toFixed(1)}h vs last week
                      </div>
                    )}
                  </div>
                  <div className="bg-base-200 rounded-xl p-3">
                    <div className="text-xs text-base-content/50 flex items-center gap-1"><Users size={12} /> Active Crew</div>
                    <div className="text-2xl font-black">{employeesWithHours.length}</div>
                    {employeesNoHours.length > 0 && (
                      <div className="text-xs text-base-content/40">{employeesNoHours.length} no hours</div>
                    )}
                  </div>
                  {grandOT > 0 && (
                    <div className="bg-error/10 border border-error/30 rounded-xl p-3">
                      <div className="text-xs text-error/70 flex items-center gap-1"><AlertTriangle size={12} /> Overtime</div>
                      <div className="text-2xl font-black text-error">{grandOT.toFixed(1)}h</div>
                      <div className="text-xs text-error/60">{employeesWithHours.filter(ew => ew.overtimeHours > 0).length} employee{employeesWithHours.filter(ew => ew.overtimeHours > 0).length !== 1 ? 's' : ''}</div>
                    </div>
                  )}
                  <div className={'rounded-xl p-3 ' + (approvalPct === 100 ? 'bg-success/10 border border-success/30' : 'bg-warning/10 border border-warning/30')}>
                    <div className="text-xs text-base-content/50 flex items-center gap-1"><CheckCircle size={12} /> Approved</div>
                    <div className={'text-2xl font-black ' + (approvalPct === 100 ? 'text-success' : 'text-warning')}>{approvalPct}%</div>
                    <div className="text-xs text-base-content/40">{approvedTotal}/{entryTotal} entries</div>
                  </div>
                  {canSeePay && (
                    <div className="bg-success/10 border border-success/30 rounded-xl p-3 col-span-2">
                      <div className="text-xs text-success/70 flex items-center gap-1"><DollarSign size={12} /> Est. Gross Payroll</div>
                      <div className="flex items-baseline gap-3">
                        <div className="text-2xl font-black text-success">${grandCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className="text-xs text-base-content/40">
                          Reg: {grandRegular.toFixed(1)}h · OT: {grandOT.toFixed(1)}h · Sun: {grandSunday.toFixed(1)}h
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Alerts */}
                {unassignedTotal > 0 && (
                  <div className="alert alert-warning py-2 text-sm">
                    <AlertTriangle size={16} />
                    <span><strong>{unassignedTotal}</strong> unassigned time {unassignedTotal === 1 ? 'entry' : 'entries'} — need a job number</span>
                  </div>
                )}

                {canApprove && unapprovedWeekCount > 0 && (
                  <button className="btn btn-success btn-sm w-full gap-1" onClick={batchApprove} disabled={approving}>
                    <CheckCircle size={14} /> {isAdmin ? 'Final Approve' : 'Approve'} All This Week ({unapprovedWeekCount})
                  </button>
                )}

                {/* ===== SECTION TABS ===== */}
                <div className="tabs tabs-boxed tabs-xs">
                  <button className={'tab flex-1 ' + (dashSection === 'grid' ? 'tab-active' : '')} onClick={() => setDashSection('grid')}>
                    👥 Crew Grid
                  </button>
                  <button className={'tab flex-1 ' + (dashSection === 'jobs' ? 'tab-active' : '')} onClick={() => setDashSection('jobs')}>
                    🏗️ Jobs ({jobHoursSummary.length})
                  </button>
                  <button className={'tab flex-1 ' + (dashSection === 'nonjob' ? 'tab-active' : '')} onClick={() => setDashSection('nonjob')}>
                    🔧 Non-Job ({nonJobSummary.length})
                  </button>
                </div>

                {/* ===== CREW GRID ===== */}
                {dashSection === 'grid' && (
                  <div className="space-y-2">
                    {/* Day totals header */}
                    <div className="card bg-primary/5 border border-primary/20 p-2">
                      <div className="grid grid-cols-8 gap-0.5 text-center">
                        <div className="text-[10px] font-bold text-base-content/40">CREW</div>
                        {weekDates.map(d => {
                          const isToday = d === todayStr;
                          const isHoliday = holidayDates.has(d);
                          const isSunday = new Date(d + 'T12:00:00').getDay() === 0;
                          return (
                            <div key={d} className="text-center">
                              <div className={'text-[10px] font-bold ' + (isToday ? 'text-primary' : isSunday ? 'text-warning' : isHoliday ? 'text-accent' : 'text-base-content/50')}>
                                {getDayName(d)}
                                {isHoliday && ' 🎉'}
                              </div>
                              <div className={'text-xs font-black ' + (isToday ? 'text-primary' : 'text-base-content/60')}>
                                {(dayTotals[d] || 0).toFixed(1)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Employee rows */}
                    {employeesWithHours.map(ew => {
                      const isExpanded = expandedUser === ew.userId;
                      const hasOT = ew.overtimeHours > 0;
                      const approaching = ew.monSatHours >= 35 && ew.monSatHours < 40;
                      const isSalary = ew.employeeType === 'salary';
                      const userPending = weekEntries.filter(e => {
                        if (e.user_id !== ew.userId) return false;
                        const s = normalizeStatus(e.status);
                        if (isAdmin) return s === 'pending' || s === 'foreman-approved';
                        if (isForeman) return s === 'pending';
                        return false;
                      }).length;

                      return (
                        <div key={ew.userId} className={'card overflow-hidden ' + (hasOT ? 'bg-error/5 border border-error/20' : approaching ? 'bg-warning/5 border border-warning/20' : 'bg-base-200')}>
                          {/* Summary row */}
                          <div
                            className="p-2 cursor-pointer active:bg-base-300/50"
                            onClick={() => setExpandedUser(isExpanded ? null : ew.userId)}
                          >
                            {/* Name + badges row */}
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                                <span className="font-bold text-sm truncate max-w-[120px]">{ew.userName}</span>
                                <span className={`badge badge-xs ${isSalary ? 'badge-accent' : 'badge-ghost'}`}>{isSalary ? 'S' : 'H'}</span>
                                {ew.worstStatus === 'pending' && <span className="badge badge-warning badge-xs">⏳</span>}
                                {ew.worstStatus === 'mixed' && <span className="badge badge-warning badge-xs">⏳</span>}
                                {ew.unassignedCount > 0 && <span className="badge badge-warning badge-xs">⚠️{ew.unassignedCount}</span>}
                                {hasOT && <span className="badge badge-error badge-xs">OT +{ew.overtimeHours.toFixed(1)}</span>}
                                {approaching && !hasOT && <span className="badge badge-warning badge-xs">⚡{ew.monSatHours.toFixed(0)}h</span>}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={'text-lg font-black ' + (hasOT ? 'text-error' : 'text-primary')}>{ew.totalHours.toFixed(1)}</span>
                                {isExpanded ? <ChevronUp size={14} className="text-base-content/30" /> : <ChevronDown size={14} className="text-base-content/30" />}
                              </div>
                            </div>

                            {/* Hours grid */}
                            <div className="grid grid-cols-8 gap-0.5 items-center">
                              <div className="text-[9px] text-base-content/40 truncate">
                                {canSeePay && ew.payRate > 0 ? (
                                  <span className="text-success font-medium">${ew.grossPay.toFixed(0)}</span>
                                ) : (
                                  <span>{ew.regularHours.toFixed(0)}r</span>
                                )}
                              </div>
                              {weekDates.map(d => {
                                const hrs = ew.dailyHours[d] || 0;
                                const dayEntries = ew.dailyEntries[d] || [];
                                const hasPending = dayEntries.some(e => normalizeStatus(e.status) === 'pending' || normalizeStatus(e.status) === 'foreman-approved');
                                const hasRejected = dayEntries.some(e => normalizeStatus(e.status) === 'rejected');
                                const isToday = d === todayStr;
                                const isSunday = new Date(d + 'T12:00:00').getDay() === 0;
                                return (
                                  <div
                                    key={d}
                                    className={'text-center rounded py-0.5 ' + (
                                      hasRejected ? 'bg-error/20' :
                                      hrs > 10 ? 'bg-error/20' :
                                      hrs > 8 ? 'bg-warning/20' :
                                      hrs > 0 ? (isToday ? 'bg-primary/15' : 'bg-base-300/50') :
                                      ''
                                    )}
                                  >
                                    <div className={'text-xs font-bold ' + (
                                      hrs === 0 ? 'text-base-content/15' :
                                      hrs > 10 ? 'text-error' :
                                      hasPending ? 'text-warning' :
                                      isSunday ? 'text-accent' :
                                      'text-base-content'
                                    )}>
                                      {hrs > 0 ? hrs.toFixed(1) : '–'}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Expanded detail */}
                          {isExpanded && (
                            <div className="px-2 pb-2 pt-0 border-t border-base-300/50">
                              {/* Pay breakdown */}
                              <div className="flex flex-wrap gap-x-3 gap-y-0.5 py-1.5 text-[11px]">
                                <span>Regular: <strong>{ew.regularHours.toFixed(1)}h</strong></span>
                                {ew.overtimeHours > 0 && <span className="text-error">OT: <strong>{ew.overtimeHours.toFixed(1)}h</strong></span>}
                                {ew.sundayHours > 0 && <span className="text-accent">Sun: <strong>{ew.sundayHours.toFixed(1)}h</strong>{!isSalary && ' (1.5×)'}</span>}
                                {canSeePay && ew.payRate > 0 && (
                                  <span className="text-success ml-auto">
                                    ${ew.grossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    <span className="text-base-content/30 ml-1">(${ew.payRate.toFixed(2)}/hr)</span>
                                  </span>
                                )}
                              </div>

                              {canApprove && userPending > 0 && (
                                <button className="btn btn-success btn-xs w-full mb-1.5 gap-1" onClick={e => { e.stopPropagation(); batchApproveUser(ew.userId); }} disabled={approving}>
                                  <CheckCircle size={12} /> {isAdmin ? 'Final Approve' : 'Approve'} All {ew.userName}'s ({userPending})
                                </button>
                              )}

                              {/* Day-by-day entries */}
                              {weekDates.map(d => {
                                const dayEntries = ew.dailyEntries[d] || [];
                                if (dayEntries.length === 0) return null;
                                const dayHrs = ew.dailyHours[d] || 0;
                                const dayKey = ew.userId + '-' + d;
                                const dayExp = expandedDay === dayKey;
                                return (
                                  <div key={d} className="mb-0.5">
                                    <div
                                      className="flex justify-between items-center cursor-pointer py-1 px-1 rounded hover:bg-base-300/30"
                                      onClick={e => { e.stopPropagation(); setExpandedDay(dayExp ? null : dayKey); }}
                                    >
                                      <span className="text-xs font-semibold flex items-center gap-1">
                                        {getDayName(d)} {formatDateShort(d)}
                                        <span className="text-base-content/30">({dayEntries.length})</span>
                                      </span>
                                      <span className="badge badge-sm badge-primary">{dayHrs.toFixed(1)}h</span>
                                    </div>
                                    {dayExp && dayEntries.map(entry => (
                                      <div key={entry.id} className="ml-2 mb-1 p-2 rounded-lg bg-base-300/40 flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1 flex-wrap">
                                            <span className="text-xs font-semibold">{getEntryLabel(entry)}</span>
                                            {!isNonJobEntry(entry) && !entry.job_id && <span className="badge badge-warning" style={{ fontSize: '9px', padding: '0 4px', height: '14px' }}>⚠️</span>}
                                            {isNonJobEntry(entry) && <span className="badge badge-ghost" style={{ fontSize: '9px', padding: '0 4px', height: '14px' }}>Non-Job</span>}
                                            {getStatusBadge(entry.status)}
                                          </div>
                                          {!isNonJobEntry(entry) && !entry.job_id && canApprove && (
                                            <button className="btn btn-warning btn-xs gap-1 mt-0.5" onClick={e => { e.stopPropagation(); setAssignJobEntry(entry); setAssignJobSearch(''); }}>
                                              Assign Job
                                            </button>
                                          )}
                                          {entry.notes && <div className="text-[10px] text-base-content/50 mt-0.5">{entry.notes}</div>}
                                          {entry.entered_by_name && <span className="text-[9px] text-base-content/30">by {entry.entered_by_name}</span>}
                                          {entry.lunch_deducted && <span className="text-[9px] text-base-content/30 ml-1">🍽️ lunch</span>}
                                          {normalizeStatus(entry.status) === 'rejected' && entry.rejection_reason && (
                                            <div className="text-[10px] text-error mt-0.5">❌ {entry.rejection_reason}</div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1 ml-2">
                                          <span className="text-xs font-bold">{Number(entry.hours).toFixed(1)}h</span>
                                          {(normalizeStatus(entry.status) === 'pending' || normalizeStatus(entry.status) === 'foreman-approved') && canApprove && (
                                            <>
                                              <button className="btn btn-ghost btn-xs text-success p-0.5" onClick={e => { e.stopPropagation(); approveEntry(entry.id, entry.user_id); }}><CheckCircle size={14} /></button>
                                              <button className="btn btn-ghost btn-xs text-error p-0.5" onClick={e => { e.stopPropagation(); setRejectModalEntry(entry); setRejectReason(''); }}><XCircle size={14} /></button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* No hours employees */}
                    {employeesNoHours.length > 0 && (
                      <div className="card bg-base-200/50 p-2">
                        <div className="text-xs text-base-content/40 flex items-center gap-1 mb-1">
                          <Users size={12} /> No hours logged:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {employeesNoHours.map(ew => (
                            <span key={ew.userId} className="badge badge-ghost badge-sm">{ew.userName}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {employeesWithHours.length === 0 && (
                      <div className="text-center py-8 text-base-content/30">
                        <Clock size={40} className="mx-auto mb-2 opacity-20" />
                        <p>No time entries this week</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== JOB HOURS ===== */}
                {dashSection === 'jobs' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-base-content/50">
                      <span>{jobHoursSummary.length} jobs with hours</span>
                      <span className="font-bold text-primary">{totalJobHours.toFixed(1)}h total</span>
                    </div>
                    {jobHoursSummary.map(j => {
                      const job = jobs.find(jb => jb.id === j.jobId);
                      const estHours = job ? (job.estimated_hours || (() => { try { const l = JSON.parse(job.labor_json || '[]'); return l.reduce((s: number, i: any) => s + (i.hours || 0), 0); } catch { return 0; } })()) : 0;
                      const pct = estHours > 0 ? Math.round((j.hours / estHours) * 100) : null;
                      return (
                        <div key={j.jobId} className="card bg-base-200 p-3">
                          <div className="flex justify-between items-start mb-1">
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-sm">{j.jobNumber}</div>
                              <div className="text-xs text-base-content/60 truncate">{j.client}</div>
                              {j.address && <div className="text-[10px] text-base-content/40 truncate">📍 {j.address}</div>}
                            </div>
                            <div className="text-right ml-2">
                              <div className="text-lg font-black text-primary">{j.hours.toFixed(1)}h</div>
                              {canSeePay && j.cost > 0 && <div className="text-xs text-success">${j.cost.toFixed(0)}</div>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-base-content/40">
                            <span>{j.entryCount} entries</span>
                            <span>{j.employeeCount} crew</span>
                            {pct !== null && (
                              <span className={pct > 100 ? 'text-error font-bold' : pct > 80 ? 'text-warning' : 'text-success'}>
                                {pct}% of bid ({estHours}h est)
                              </span>
                            )}
                          </div>
                          {estHours > 0 && (
                            <progress
                              className={'progress progress-xs w-full mt-1 ' + (j.hours > estHours ? 'progress-error' : j.hours > estHours * 0.8 ? 'progress-warning' : 'progress-success')}
                              value={j.hours}
                              max={estHours}
                            />
                          )}
                        </div>
                      );
                    })}
                    {jobHoursSummary.length === 0 && (
                      <div className="text-center py-6 text-base-content/30">No job hours this week</div>
                    )}
                  </div>
                )}

                {/* ===== NON-JOB HOURS ===== */}
                {dashSection === 'nonjob' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-base-content/50">
                      <span>{nonJobSummary.length} categories</span>
                      <span className="font-bold text-warning">{totalNonJobHours.toFixed(1)}h total</span>
                    </div>
                    {nonJobSummary.map(n => (
                      <div key={n.category} className="card bg-base-200 p-3 border-l-4 border-warning/40">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-sm">{n.label}</div>
                            <div className="text-[10px] text-base-content/40">{n.entryCount} entries</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-warning">{n.hours.toFixed(1)}h</div>
                            {canSeePay && n.cost > 0 && <div className="text-xs text-success">${n.cost.toFixed(0)}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {nonJobSummary.length === 0 && (
                      <div className="text-center py-6 text-base-content/30">No non-job hours this week</div>
                    )}

                    {/* Job vs Non-Job pie visual */}
                    {(totalJobHours > 0 || totalNonJobHours > 0) && (
                      <div className="card bg-base-200 p-3">
                        <div className="text-xs font-bold mb-2">Hours Split</div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-0.5">
                              <span>🏗️ Job</span>
                              <span className="font-bold">{totalJobHours.toFixed(1)}h ({grandTotal > 0 ? Math.round((totalJobHours / grandTotal) * 100) : 0}%)</span>
                            </div>
                            <div className="w-full bg-base-300 rounded-full h-3">
                              <div className="bg-primary h-3 rounded-full" style={{ width: `${grandTotal > 0 ? (totalJobHours / grandTotal) * 100 : 0}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-0.5">
                              <span>🔧 Non-Job</span>
                              <span className="font-bold">{totalNonJobHours.toFixed(1)}h ({grandTotal > 0 ? Math.round((totalNonJobHours / grandTotal) * 100) : 0}%)</span>
                            </div>
                            <div className="w-full bg-base-300 rounded-full h-3">
                              <div className="bg-warning h-3 rounded-full" style={{ width: `${grandTotal > 0 ? (totalNonJobHours / grandTotal) * 100 : 0}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =================== APPROVE TAB =================== */}
            {tab === 'approve' && (
              <div className="p-3 space-y-3">
                {canApprove && (
                  <>
                    <div className="bg-base-200 rounded-xl p-3 mb-2">
                      <div className="text-xs text-base-content/60">
                        {isAdmin ? (
                          <span>🔒 <strong>Final Approval</strong> — entries become payroll-ready after your approval</span>
                        ) : (
                          <span>📋 <strong>Step 1</strong> — your approval sends entries to Ryan for final sign-off</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm">
                        {isAdmin ? 'Needs Final Approval' : 'Needs Your Approval'}
                      </h3>
                      {unapprovedEntries.length > 0 && (
                        <button className="btn btn-success btn-xs gap-1" onClick={() => batchApprove()} disabled={approving}>
                          <CheckCircle size={12} /> {isAdmin ? 'Final Approve' : 'Approve'} All ({unapprovedEntries.length})
                        </button>
                      )}
                    </div>
                    {unapprovedEntries.length === 0 ? (
                      <div className="text-center py-4 text-base-content/40 text-sm">No pending entries 🎉</div>
                    ) : unapprovedEntries.map(entry => (
                      <EntryCard
                        key={entry.id}
                        entry={entry}
                        onApprove={() => approveEntry(entry.id, entry.user_id)}
                        onReject={() => { setRejectModalEntry(entry); setRejectReason(''); }}
                        onAssignJob={() => { setAssignJobEntry(entry); setAssignJobSearch(''); }}
                        approving={approving}
                      />
                    ))}
                  </>
                )}

                <div className="divider my-1" />
                <h3 className="font-bold text-sm text-base-content/60">Recently Approved</h3>
                {entries
                  .filter(e => normalizeStatus(e.status) === 'admin-approved')
                  .sort((a, b) => (b.admin_approved_at || b.approved_at || '').localeCompare(a.admin_approved_at || a.approved_at || ''))
                  .slice(0, 10)
                  .map(entry => (
                    <div key={entry.id} className="card bg-base-200/50 mb-1">
                      <div className="card-body p-2 flex-row items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold">{entry.user_name}</span>
                          <span className="text-xs text-base-content/50 ml-1">{getEntryLabel(entry)}</span>
                          <span className="text-xs text-base-content/40 ml-1">{entry.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="badge badge-success badge-xs">✓</span>
                          <span className="text-xs font-bold">{Number(entry.hours).toFixed(1)}h</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* =================== MY TIME TAB =================== */}
            {tab === 'mytime' && (
              <TimeEntryForm
                jobs={jobs}
                currentUser={currentUser}
                users={users}
                onBack={() => setTab('dashboard')}
                onSaved={() => { loadEntries(); onSaved(); }}
                embedded={true}
              />
            )}
          </>
        )}
      </div>

      {/* Assign Job modal */}
      {assignJobEntry && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg">Assign Job</h3>
            <div className="py-2 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">{assignJobEntry.user_name}</span>
                <span className="text-base-content/60 ml-2">{assignJobEntry.date}</span>
                <span className="badge badge-primary badge-sm ml-2">{Number(assignJobEntry.hours).toFixed(1)}h</span>
                {assignJobEntry.notes && <p className="text-xs text-base-content/50 mt-1">{assignJobEntry.notes}</p>}
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text text-sm">Search & select a job</span></label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  placeholder="Search by job #, client, or description..."
                  value={assignJobSearch}
                  onChange={e => setAssignJobSearch(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto border border-base-300 rounded-lg">
                {activeJobs
                  .filter(j => {
                    if (!assignJobSearch.trim()) return true;
                    const q = assignJobSearch.toLowerCase();
                    return (j.job_number || '').toLowerCase().includes(q) ||
                      (j.client_name || '').toLowerCase().includes(q) ||
                      (j.project_description || '').toLowerCase().includes(q) ||
                      (j.project_address || '').toLowerCase().includes(q);
                  })
                  .map(j => (
                    <button
                      key={j.id}
                      className="w-full text-left p-2.5 hover:bg-base-200 active:bg-primary/10 border-b border-base-200 last:border-0"
                      onClick={() => assignJobToEntry(assignJobEntry, j)}
                      disabled={approving}
                    >
                      <span className="font-bold text-sm">{j.job_number}</span>
                      <span className="text-xs text-base-content/60 ml-2">{j.client_name}</span>
                      {j.project_address && (
                        <div className="text-xs text-base-content/40 truncate">📍 {j.project_address}</div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost btn-sm" onClick={() => setAssignJobEntry(null)}>Cancel</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setAssignJobEntry(null)} />
        </div>
      )}

      {/* Reject modal */}
      {rejectModalEntry && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg">Reject Time Entry</h3>
            <div className="py-2 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">{rejectModalEntry.user_name}</span>
                <span className="text-base-content/60 ml-2">{getEntryLabel(rejectModalEntry)}</span>
                <span className="text-base-content/60 ml-2">{rejectModalEntry.date}</span>
                <span className="badge badge-primary badge-sm ml-2">{Number(rejectModalEntry.hours).toFixed(1)}h</span>
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text text-sm">Reason for rejection (crew will see this)</span></label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="e.g., Wrong job number, hours seem too high, etc."
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost btn-sm" onClick={() => setRejectModalEntry(null)}>Cancel</button>
              <button className="btn btn-error btn-sm gap-1" onClick={confirmReject} disabled={approving || !rejectReason.trim()}>
                <XCircle size={14} /> Reject
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setRejectModalEntry(null)} />
        </div>
      )}
    </div>
  );
};

// --- Entry Card sub-component ---
interface EntryCardProps {
  entry: TimeEntry;
  onApprove: () => void;
  onReject: () => void;
  onAssignJob?: () => void;
  approving: boolean;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onApprove, onReject, onAssignJob, approving }) => {
  const label = getEntryLabel(entry);
  const nonJob = isNonJobEntry(entry);
  const unassigned = !nonJob && !entry.job_id;
  return (
    <div className="card bg-base-200 mb-1">
      <div className="card-body p-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm">{entry.user_name}</span>
              <span className="badge badge-ghost badge-xs">{label}</span>
              {unassigned && <span className="badge badge-warning badge-xs">⚠️ Unassigned</span>}
              {nonJob && <span className="badge badge-warning badge-xs">Non-Job</span>}
              {entry.entered_by_name && <span className="text-[10px] text-base-content/40">entered by {entry.entered_by_name}</span>}
            </div>
            {unassigned && onAssignJob && (
              <button className="btn btn-warning btn-xs gap-1 mt-1" onClick={onAssignJob}>
                Assign Job
              </button>
            )}
            <p className="text-xs text-base-content/60 mt-0.5">
              {entry.date}
              {entry.clock_in && (' ' + entry.clock_in + ' -> ' + (entry.clock_out || 'running'))}
            </p>
            {entry.notes && <p className="text-xs mt-1">{entry.notes}</p>}
            {entry.lunch_deducted && <span className="text-[10px] text-base-content/40">lunch deducted</span>}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <span className="badge badge-primary badge-sm">{Number(entry.hours).toFixed(1)}h</span>
            <button className="btn btn-ghost btn-xs text-success" onClick={onApprove} disabled={approving}>
              <CheckCircle size={16} />
            </button>
            <button className="btn btn-ghost btn-xs text-error" onClick={onReject} disabled={approving}>
              <XCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
