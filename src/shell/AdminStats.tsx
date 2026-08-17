import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import type { TimeEntry, User } from '../types';
import { normalizeStatus, isNonJobEntry, getEntryLabel, getPayPeriodStart, getPayPeriodDates } from '../types';
import { getAllTimeEntries, today } from '../utils/supabase';

interface Props {
  users: User[];
}

interface LiveSession {
  entry: TimeEntry;
  liveHours: number;
}

const REFRESH_MS = 60_000;

function formatDuration(hours: number): string {
  if (hours <= 0) return '0m';
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export const AdminStats: React.FC<Props> = ({ users }) => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => Date.now());

  const activeUsers = useMemo(() => users.filter(u => u.active), [users]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const all = await getAllTimeEntries(activeUsers);
        if (!cancelled) setEntries(all);
      } catch (err) {
        console.error('Failed to load time entries for admin stats:', err);
      }
      if (!cancelled) setLoading(false);
    };
    load();
    const dataTimer = setInterval(load, REFRESH_MS);
    return () => { cancelled = true; clearInterval(dataTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

  // Tick every 30s just to refresh elapsed-time displays between data refreshes.
  useEffect(() => {
    const clockTimer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(clockTimer);
  }, []);

  const todayStr = today();
  const weekDates = useMemo(() => getPayPeriodDates(getPayPeriodStart(new Date())), []);

  const liveSessions: LiveSession[] = useMemo(() => {
    return entries
      .filter(e => e.is_active && !!e.clock_in_time)
      .map(entry => ({
        entry,
        liveHours: Math.max(0, (now - new Date(entry.clock_in_time!).getTime()) / 3600000),
      }))
      .sort((a, b) => b.liveHours - a.liveHours);
  }, [entries, now]);

  const { hoursToday, hoursWeek, overtimeHours, overtimeEmployees } = useMemo(() => {
    const perUserWeek: Record<string, number> = {};
    let today_ = 0;
    let week = 0;

    for (const e of entries) {
      if (e.is_active) continue; // live sessions handled separately below
      const hrs = Number(e.hours) || 0;
      if (e.date === todayStr) today_ += hrs;
      if (weekDates.includes(e.date)) {
        week += hrs;
        const dow = new Date(e.date + 'T12:00:00').getDay();
        if (dow !== 0) perUserWeek[e.user_id] = (perUserWeek[e.user_id] || 0) + hrs;
      }
    }
    // Fold in live elapsed time from active sessions so "today"/"this week" feel real-time.
    for (const { entry, liveHours } of liveSessions) {
      if (entry.date === todayStr) today_ += liveHours;
      if (weekDates.includes(entry.date)) {
        week += liveHours;
        const dow = new Date(entry.date + 'T12:00:00').getDay();
        if (dow !== 0) perUserWeek[entry.user_id] = (perUserWeek[entry.user_id] || 0) + liveHours;
      }
    }

    let ot = 0;
    let otEmployees = 0;
    for (const hrs of Object.values(perUserWeek)) {
      if (hrs > 40) { ot += hrs - 40; otEmployees++; }
    }
    return { hoursToday: today_, hoursWeek: week, overtimeHours: ot, overtimeEmployees: otEmployees };
  }, [entries, liveSessions, todayStr, weekDates]);

  const pendingApprovals = useMemo(
    () => entries.filter(e => !e.is_active && ['pending', 'foreman-approved'].includes(normalizeStatus(e.status))).length,
    [entries]
  );

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-center py-6 text-base-content/40 text-sm gap-2">
          <span className="loading loading-spinner loading-sm" /> Loading live stats…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <StatTile
          icon={<Radio size={13} className={liveSessions.length > 0 ? 'text-success animate-pulse' : 'text-base-content/40'} />}
          label="Clocked In Now"
          value={String(liveSessions.length)}
          tone={liveSessions.length > 0 ? 'success' : 'default'}
        />
        <StatTile icon={<Clock size={13} />} label="Hours Today" value={formatDuration(hoursToday)} />
        <StatTile icon={<Clock size={13} />} label="Hours This Week" value={formatDuration(hoursWeek)} />
        <StatTile
          icon={<AlertTriangle size={13} className={overtimeHours > 0 ? 'text-error' : 'text-base-content/40'} />}
          label="Overtime This Week"
          value={overtimeHours > 0 ? `${formatDuration(overtimeHours)} · ${overtimeEmployees}` : 'None'}
          tone={overtimeHours > 0 ? 'error' : 'default'}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card bg-base-100 border border-base-300 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-base-content/60 flex items-center gap-1">
              <Radio size={12} /> Currently Clocked In
            </span>
            <span className="text-xs text-base-content/40">{liveSessions.length}</span>
          </div>
          {liveSessions.length === 0 ? (
            <p className="text-xs text-base-content/40 py-2">Nobody's clocked in right now.</p>
          ) : (
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {liveSessions.map(({ entry, liveHours }) => (
                <div key={entry.id} className="flex items-center justify-between text-xs bg-base-200 rounded-lg px-2 py-1.5">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{entry.user_name}</div>
                    <div className="text-base-content/50 truncate">
                      {getEntryLabel(entry) || (isNonJobEntry(entry) ? '' : 'Unassigned')}
                      {entry.equipment_name ? ` · ${entry.equipment_name}` : ''}
                    </div>
                  </div>
                  <span className="badge badge-success badge-sm font-mono shrink-0 ml-2">{formatDuration(liveHours)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card bg-base-100 border border-base-300 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-base-content/60 flex items-center gap-1">
              <CheckCircle2 size={12} /> Approvals
            </span>
          </div>
          {pendingApprovals === 0 ? (
            <p className="text-xs text-success py-2">All caught up — nothing pending. 🎉</p>
          ) : (
            <p className="text-xs text-base-content/60 py-1">
              <strong className="text-warning">{pendingApprovals}</strong> time {pendingApprovals === 1 ? 'entry needs' : 'entries need'} final approval.
            </p>
          )}
          <Link to="/field-ops" className="btn btn-xs btn-outline gap-1 mt-1 w-full">
            Review in Field Ops <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{ icon: React.ReactNode; label: string; value: string; tone?: 'default' | 'success' | 'error' }> = ({ icon, label, value, tone = 'default' }) => {
  const toneClass = tone === 'success' ? 'text-success' : tone === 'error' ? 'text-error' : 'text-base-content';
  return (
    <div className="card bg-base-100 border border-base-300 p-3">
      <div className="text-[11px] text-base-content/50 flex items-center gap-1 mb-1">{icon} {label}</div>
      <div className={`text-lg font-black ${toneClass}`}>{value}</div>
    </div>
  );
};
