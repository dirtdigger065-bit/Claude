import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { Job, ScheduleEntry, TimeEntry, WeatherData, Announcement, SafetyTopic, DailyForecast } from '../types';
import { getJobs, getSchedule, getTimeEntries, getAnnouncements, getSafetyTopics, fetchWeather, centralDate } from '../utils/supabase';

const TV_TOKEN = 'rdmpe2026';
const PANEL_DURATION = 20;
const DATA_REFRESH = 5 * 60 * 1000;
const WEATHER_REFRESH = 15 * 60 * 1000;
const JOBS_PER_PAGE = 8;
const RADAR_LAT = 41.611;
const RADAR_LNG = -94.018;

type PanelType = string;

const PANEL_LABEL: Record<string, string> = {
  today: "📅 Today's Schedule",
  week: '📆 Weekly Look-Ahead',
  weather: '🌦️ Weather & Radar',
  announcements: '📢 Announcements',
};

function weatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 49) return '🌫️';
  if (code <= 59) return '🌧️';
  if (code <= 69) return '🌨️';
  if (code <= 79) return '🌧️';
  if (code <= 82) return '🌧️';
  if (code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

function weatherDesc(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 55) return 'Drizzle';
  if (code <= 57) return 'Freezing Drizzle';
  if (code <= 65) return 'Rain';
  if (code <= 67) return 'Freezing Rain';
  if (code <= 75) return 'Snow';
  if (code <= 77) return 'Snow Grains';
  if (code <= 82) return 'Rain Showers';
  if (code <= 86) return 'Snow Showers';
  if (code >= 95) return 'Thunderstorm';
  return '';
}

function windDirection(deg: number | undefined): string {
  if (deg == null) return '';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function dayOfWeek(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function TVDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [jobs, setJobs] = useState<Job[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [safetyTopics, setSafetyTopics] = useState<SafetyTopic[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [radarPaths, setRadarPaths] = useState<string[]>([]);
  const [radarIdx, setRadarIdx] = useState(0);
  const RADAR_ZOOM = 6;
  const RADAR_N = Math.pow(2, RADAR_ZOOM);
  const RADAR_TILE_X = Math.floor(((RADAR_LNG + 180) / 360) * RADAR_N);
  const RADAR_LAT_RAD = (RADAR_LAT * Math.PI) / 180;
  const RADAR_TILE_Y = Math.floor((1 - Math.log(Math.tan(RADAR_LAT_RAD) + 1 / Math.cos(RADAR_LAT_RAD)) / Math.PI) / 2 * RADAR_N);
  const RADAR_FRAC_X = ((RADAR_LNG + 180) / 360) * RADAR_N - RADAR_TILE_X;
  const RADAR_FRAC_Y = (1 - Math.log(Math.tan(RADAR_LAT_RAD) + 1 / Math.cos(RADAR_LAT_RAD)) / Math.PI) / 2 * RADAR_N - RADAR_TILE_Y;
  const [currentPanel, setCurrentPanel] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PANEL_DURATION);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') || params.get('t');
    if (token === TV_TOKEN) setAuthorized(true);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const activeJobs = useMemo(
    () => jobs.filter(j => j.status === 'active').sort((a, b) => (b.job_number || '').localeCompare(a.job_number || '')),
    [jobs]
  );

  const activeSafetyTopics = useMemo(() => safetyTopics.filter(t => t.active), [safetyTopics]);
  const currentWeek = useMemo(() =>
    Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
    []
  );
  const currentSafetyTopic = useMemo(
    () => activeSafetyTopics.length > 0 ? activeSafetyTopics[currentWeek % activeSafetyTopics.length] : null,
    [activeSafetyTopics, currentWeek]
  );

  const panels = useMemo<PanelType[]>(() => {
    const p: PanelType[] = ['today', 'week'];
    const totalPages = Math.max(1, Math.ceil(activeJobs.length / JOBS_PER_PAGE));
    for (let i = 0; i < totalPages; i++) p.push(`jobs-${i}`);
    p.push('weather');
    if (currentSafetyTopic) {
      const pdfPageCount = currentSafetyTopic.pdfPages?.length || 0;
      if (pdfPageCount > 0) {
        for (let i = 0; i < pdfPageCount; i++) p.push(`safety-${i}`);
      } else {
        p.push('safety-0');
      }
    }
    if (announcements.length > 0) p.push('announcements');
    return p;
  }, [activeJobs.length, announcements.length, currentSafetyTopic]);

  const todayStr = centralDate(clock);
  const activeSchedule = useMemo(() => schedule.filter(s => jobs.some(j => j.id === s.job_id && j.status === 'active')), [schedule, jobs]);
  const todaySchedule = useMemo(() => activeSchedule.filter(s => s.date === todayStr), [activeSchedule, todayStr]);
  const todayHours = useMemo(
    () => timeEntries.filter(t => t.date === todayStr).reduce((s, t) => s + (t.hours || 0), 0),
    [timeEntries, todayStr]
  );

  const weekDates = useMemo(() => {
    const d = new Date(clock);
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - day + 1);
    return Array.from({ length: 5 }, (_, i) => {
      const dd = new Date(start);
      dd.setDate(start.getDate() + i);
      return centralDate(dd);
    });
  }, [todayStr]);

  // Light-theme job colors — vivid but readable
  const jobColorMap = useMemo(() => {
    const colors = [
      'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500',
      'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-pink-500', 'bg-lime-500', 'bg-sky-500',
    ];
    const map: Record<string, string> = {};
    activeJobs.forEach((j, i) => { map[j.id] = colors[i % colors.length]; });
    return map;
  }, [activeJobs]);

  const getJobNumber = useCallback((id: string) => jobs.find(j => j.id === id)?.job_number || '??', [jobs]);

  const loadData = useCallback(async () => {
    try {
      const [j, s, te, ann, st] = await Promise.all([getJobs(), getSchedule(), getTimeEntries(), getAnnouncements(), getSafetyTopics()]);
      setJobs(j);
      setSchedule(s);
      setTimeEntries(te);
      const nowStr = new Date().toISOString();
      setAnnouncements(ann.filter(a => a.active && (!a.expires_at || a.expires_at > nowStr)));
      setSafetyTopics(st.filter(t => t.active));
    } catch (e) { console.error('TV data load error:', e); }
  }, []);

  const loadWeather = useCallback(async () => {
    try {
      const w = await fetchWeather(RADAR_LAT, RADAR_LNG);
      if (w) setWeather(w);
    } catch (e) { console.error('Weather load error:', e); }
  }, []);

  const loadRadar = useCallback(async () => {
    try {
      const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
      const data = await res.json();
      const past = data.radar?.past || [];
      const nowcast = data.radar?.nowcast || [];
      const allFrames = [...past, ...nowcast];
      const paths = allFrames.map((f: any) => f.path as string);
      setRadarPaths(paths);
      setRadarIdx(0);
    } catch (e) { console.error('Radar load error:', e); }
  }, []);

  useEffect(() => {
    if (!authorized) return;
    loadData();
    loadWeather();
    loadRadar();
    const d = setInterval(loadData, DATA_REFRESH);
    const w = setInterval(loadWeather, WEATHER_REFRESH);
    const r = setInterval(loadRadar, WEATHER_REFRESH);
    return () => { clearInterval(d); clearInterval(w); clearInterval(r); };
  }, [authorized, loadData, loadWeather, loadRadar]);

  useEffect(() => {
    if (radarPaths.length === 0) return;
    const t = setInterval(() => {
      setRadarIdx(prev => (prev + 1) % radarPaths.length);
    }, 800);
    return () => clearInterval(t);
  }, [radarPaths.length]);

  useEffect(() => {
    if (!authorized) return;
    const t = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setTransitioning(true);
          setTimeout(() => {
            setCurrentPanel(p => (p + 1) % panels.length);
            setTransitioning(false);
          }, 500);
          return PANEL_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [authorized, panels.length]);

  useEffect(() => {
    if (currentPanel >= panels.length) setCurrentPanel(0);
  }, [panels.length, currentPanel]);

  const progressPct = ((PANEL_DURATION - secondsLeft) / PANEL_DURATION) * 100;
  const panelKey = panels[currentPanel] || 'today';

  const getPanelLabel = (key: string) => {
    if (key.startsWith('jobs-')) {
      return `🏗️ Jobs ${parseInt(key.split('-')[1]) + 1}`;
    }
    if (key.startsWith('safety-')) {
      const pageNum = parseInt(key.split('-')[1]);
      const pdfCount = currentSafetyTopic?.pdfPages?.length || 0;
      if (pdfCount > 0) return `Safety ${pageNum + 1}`;
      return 'Safety';
    }
    return (PANEL_LABEL[key] || key).replace(/^[^\s]+\s/, '');
  };

  if (!authorized) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#1e293b' }}>
          <p style={{ fontSize: 24, marginBottom: 16 }}>🔒 RDMPE TV Dashboard</p>
          <p style={{ color: '#64748b' }}>Add <code>?token=rdmpe2026</code> to the URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ overflow: 'hidden', height: '100vh', background: '#f1f5f9', color: '#1e293b', padding: '2% 3%', boxSizing: 'border-box' }}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-3 rounded-xl shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="RDMPE" className="h-12 w-auto rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <span className="text-2xl font-bold" style={{ color: '#ea580c' }}>RDMPE</span>
            <span className="font-normal ml-2 text-2xl" style={{ color: '#475569' }}>Field Operations</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {weather && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{weatherIcon(weather.code)}</span>
                <div>
                  <span className="text-2xl font-bold" style={{ color: '#1e293b' }}>{weather.temp}°F</span>
                  <span className="text-sm ml-2" style={{ color: '#64748b' }}>{weather.description}</span>
                </div>
              </div>
              {(weather.wind_speed != null || weather.humidity != null) && (
                <div className="text-xs pl-4 space-y-0.5" style={{ borderLeft: '1px solid #e2e8f0', color: '#64748b' }}>
                  {weather.wind_speed != null && <div>💨 {weather.wind_speed} mph {windDirection(weather.wind_direction)}</div>}
                  {weather.humidity != null && <div>💧 {weather.humidity}%</div>}
                </div>
              )}
            </div>
          )}

          <div className="text-right">
            <div className="text-2xl font-bold tabular-nums" style={{ color: '#1e293b' }}>
              {clock.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xs" style={{ color: '#64748b' }}>
              {clock.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>Adel, Iowa</div>
          </div>
        </div>
      </div>

      {/* ── Panel Indicator ── */}
      <div className="flex items-center justify-between px-2 py-2 mt-1">
        <div className="flex gap-2 flex-wrap">
          {panels.map((p, i) => (
            <div
              key={p + i}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={i === currentPanel
                ? { background: '#ea580c', color: '#fff' }
                : { background: '#e2e8f0', color: '#64748b' }
              }
            >
              {getPanelLabel(p)}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ color: '#64748b' }}>
          <span>{activeJobs.length} active jobs</span>
          <span>•</span>
          <span>{todayHours.toFixed(1)}h logged today</span>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="h-1 rounded-full" style={{ background: '#e2e8f0' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${progressPct}%`, background: '#ea580c', transition: 'width 1s linear' }}
        />
      </div>

      {/* ── Main Panel ── */}
      <div className={`flex-1 py-4 overflow-hidden transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {panelKey === 'today' && (
          <TodayPanel schedule={todaySchedule} jobs={jobs} timeEntries={timeEntries} jobColorMap={jobColorMap} todayStr={todayStr} />
        )}
        {panelKey === 'week' && (
          <WeekPanel schedule={activeSchedule} weekDates={weekDates} jobs={jobs} getJobNumber={getJobNumber} jobColorMap={jobColorMap} />
        )}
        {panelKey.startsWith('jobs-') && (
          <JobsPanel
            jobs={activeJobs}
            page={parseInt(panelKey.split('-')[1])}
            totalPages={Math.ceil(activeJobs.length / JOBS_PER_PAGE)}
          />
        )}
        {panelKey === 'weather' && (
          <WeatherPanel weather={weather} radarPaths={radarPaths} radarIdx={radarIdx}
            zoom={RADAR_ZOOM} tileX={RADAR_TILE_X} tileY={RADAR_TILE_Y} fracX={RADAR_FRAC_X} fracY={RADAR_FRAC_Y} />
        )}
        {panelKey.startsWith('safety-') && (
          <SafetyPanel
            topic={currentSafetyTopic}
            pageIndex={parseInt(panelKey.split('-')[1])}
            totalTopics={activeSafetyTopics.length}
          />
        )}
        {panelKey === 'announcements' && (
          <AnnouncementsPanel announcements={announcements} />
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-2 py-1 flex justify-between text-xs rounded-lg" style={{ color: '#94a3b8' }}>
        <span>Auto-refresh every 5 min</span>
        <span>Panel {currentPanel + 1} of {panels.length} • {secondsLeft}s</span>
      </div>
    </div>
  );
}

// ── TODAY'S SCHEDULE PANEL ──
function TodayPanel({ schedule, jobs, timeEntries, jobColorMap, todayStr }: {
  schedule: ScheduleEntry[];
  jobs: Job[];
  timeEntries: TimeEntry[];
  jobColorMap: Record<string, string>;
  todayStr: string;
}) {
  const getJob = (id: string) => jobs.find(j => j.id === id);
  const todayEntries = timeEntries.filter(t => t.date === todayStr);
  const totalLogged = todayEntries.reduce((s, t) => s + (t.hours || 0), 0);
  const totalScheduled = schedule.reduce((s, e) => s + (e.estimated_hours || 0), 0);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1e293b' }}>📅 Today's Schedule</h2>
        <div className="flex gap-6 text-lg">
          <span style={{ color: '#64748b' }}>{totalScheduled}h scheduled</span>
          <span className="font-semibold" style={{ color: '#ea580c' }}>{totalLogged.toFixed(1)}h logged</span>
        </div>
      </div>
      {schedule.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl" style={{ color: '#94a3b8' }}>No jobs scheduled for today</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {schedule.map((entry, i) => {
            const job = getJob(entry.job_id);
            if (!job) return null;
            const logged = todayEntries
              .filter(t => t.job_id === entry.job_id)
              .reduce((s, t) => s + (t.hours || 0), 0);
            return (
              <div key={i} className={`${jobColorMap[job.id] || 'bg-gray-400'} rounded-xl p-5 flex flex-col text-white shadow-md`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold">{job.job_number}</div>
                    <div className="text-lg opacity-90 mt-1">
                      {job.client_name || job.project_description || 'Untitled'}
                    </div>
                    {job.project_address && <div className="text-sm opacity-80 mt-1">📍 {job.project_address}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{entry.estimated_hours}h</div>
                    {entry.notes?.includes('(Continued)') && <div className="text-xs opacity-70">↳ continued</div>}
                  </div>
                </div>
                {logged > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/30 text-sm">
                    ⏱️ {logged.toFixed(1)}h logged
                  </div>
                )}
                {entry.crew_name && <div className="mt-2 text-sm opacity-80">👷 Crew: {entry.crew_name}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── WEEKLY LOOK-AHEAD PANEL ──
function WeekPanel({ schedule, weekDates, jobs, getJobNumber, jobColorMap }: {
  schedule: ScheduleEntry[];
  weekDates: string[];
  jobs: Job[];
  getJobNumber: (id: string) => string;
  jobColorMap: Record<string, string>;
}) {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const today = centralDate();

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e293b' }}>📆 Weekly Look-Ahead</h2>
      <div className="grid grid-cols-5 gap-3 h-[calc(100%-3rem)]">
        {weekDates.map((date, di) => {
          const dayEntries = schedule.filter(s => s.date === date);
          const isToday = date === today;
          return (
            <div key={date} className="rounded-xl p-3 flex flex-col shadow-sm"
              style={{
                background: isToday ? '#fff7ed' : '#fff',
                border: isToday ? '2px solid #ea580c' : '1px solid #e2e8f0',
              }}
            >
              <div className="text-center mb-3">
                <div className="font-bold text-lg" style={{ color: isToday ? '#ea580c' : '#1e293b' }}>
                  {dayNames[di]}
                </div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>
                  {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div className="flex-1 space-y-2 overflow-hidden">
                {dayEntries.length === 0 ? (
                  <div className="text-sm text-center mt-4" style={{ color: '#cbd5e1' }}>No jobs</div>
                ) : (
                  dayEntries.map((entry, i) => {
                    const job = jobs.find(j => j.id === entry.job_id);
                    return (
                      <div key={i} className={`${jobColorMap[entry.job_id] || 'bg-gray-400'} rounded-lg p-2 text-sm text-white`}>
                        <div className="font-bold">{getJobNumber(entry.job_id)}</div>
                        <div className="opacity-90 text-xs truncate">{job?.client_name || job?.project_description || ''}</div>
                        <div className="text-xs opacity-80 mt-1">{entry.estimated_hours}h{entry.notes?.includes('(Continued)') ? ' ↳' : ''}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ACTIVE JOBS PANEL (PAGINATED) ──
function JobsPanel({ jobs, page, totalPages }: { jobs: Job[]; page: number; totalPages: number }) {
  const start = page * JOBS_PER_PAGE;
  const pageJobs = jobs.slice(start, start + JOBS_PER_PAGE);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1e293b' }}>🏗️ Active Jobs</h2>
        {totalPages > 1 && (
          <span className="text-lg" style={{ color: '#64748b' }}>
            Page {page + 1} of {totalPages} • {jobs.length} total
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pageJobs.map(job => (
          <div key={job.id} className="rounded-xl p-5 shadow-sm"
            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-xl font-bold" style={{ color: '#ea580c' }}>{job.job_number}</div>
              {job.city && <div className="text-sm" style={{ color: '#94a3b8' }}>📍 {job.city}</div>}
            </div>
            <div className="text-lg font-medium mb-1" style={{ color: '#1e293b' }}>
              {job.client_name || 'No client'}
            </div>
            {job.project_description && (
              <div className="text-sm mb-2 line-clamp-2" style={{ color: '#64748b' }}>{job.project_description}</div>
            )}
            {job.project_address && (
              <div className="text-xs" style={{ color: '#94a3b8' }}>📍 {job.project_address}</div>
            )}
            <div className="flex gap-3 mt-3 pt-3 text-xs" style={{ borderTop: '1px solid #e2e8f0', color: '#94a3b8' }}>
              {job.estimated_hours && <span>⏱️ {job.estimated_hours}h est.</span>}
              {job.locate_number && <span>📋 Locate: {job.locate_number}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── WEATHER & RADAR PANEL ──
function WeatherPanel({ weather, radarPaths, radarIdx, zoom, tileX, tileY, fracX, fracY }: {
  weather: WeatherData | null;
  radarPaths: string[];
  radarIdx: number;
  zoom: number;
  tileX: number;
  tileY: number;
  fracX: number;
  fracY: number;
}) {
  const radarContainerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState({ w: 400, h: 400 });

  React.useEffect(() => {
    const el = radarContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        setContainerSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const TILE_PX = 256;
  const gridPx = TILE_PX * 3;
  const adelX = TILE_PX + fracX * TILE_PX;
  const adelY = TILE_PX + fracY * TILE_PX;
  const scale = Math.max(containerSize.w, containerSize.h) / TILE_PX * 1.1;
  const offsetX = containerSize.w / 2 - adelX * scale;
  const offsetY = containerSize.h / 2 - adelY * scale;

  const tiles: { dx: number; dy: number }[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({ dx, dy });
    }
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e293b' }}>🌦️ Weather & Radar — Adel, Iowa</h2>
      <div className="grid grid-cols-2 gap-6 h-[calc(100%-3.5rem)]">
        {/* Left: Current conditions + 5-day forecast */}
        <div className="flex flex-col gap-4">
          {weather ? (
            <>
              <div className="rounded-2xl p-5 flex items-center gap-6 shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                <div className="text-center">
                  <div className="text-6xl mb-1">{weatherIcon(weather.code)}</div>
                </div>
                <div className="flex-1">
                  <div className="text-4xl font-bold" style={{ color: '#1e293b' }}>{weather.temp}°F</div>
                  <div className="text-lg mt-1" style={{ color: '#64748b' }}>{weather.description}</div>
                  <div className="flex gap-6 mt-3 text-sm" style={{ color: '#94a3b8' }}>
                    {weather.wind_speed != null && (
                      <span>💨 {weather.wind_speed} mph {windDirection(weather.wind_direction)}</span>
                    )}
                    {weather.humidity != null && <span>💧 {weather.humidity}%</span>}
                  </div>
                </div>
              </div>

              {weather.forecast && weather.forecast.length > 0 && (
                <div className="rounded-2xl p-4 flex-1 shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <h3 className="text-base font-semibold mb-3" style={{ color: '#475569' }}>5-Day Forecast</h3>
                  <div className="grid grid-cols-5 gap-2 h-[calc(100%-2.5rem)]">
                    {weather.forecast.map((day, i) => {
                      const isToday = i === 0;
                      return (
                        <div
                          key={day.date}
                          className="flex flex-col items-center justify-center rounded-xl p-2"
                          style={{
                            background: isToday ? '#fff7ed' : '#f8fafc',
                            border: isToday ? '2px solid #ea580c' : '1px solid #e2e8f0',
                          }}
                        >
                          <div className="text-sm font-bold mb-2" style={{ color: isToday ? '#ea580c' : '#475569' }}>
                            {isToday ? 'Today' : dayOfWeek(day.date)}
                          </div>
                          <div className="text-3xl mb-2">{weatherIcon(day.code)}</div>
                          <div className="text-xs mb-2" style={{ color: '#94a3b8' }}>{weatherDesc(day.code)}</div>
                          <div className="text-center">
                            <div className="text-lg font-bold" style={{ color: '#ef4444' }}>{day.temp_max}°</div>
                            <div className="text-base" style={{ color: '#3b82f6' }}>{day.temp_min}°</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-xl" style={{ color: '#94a3b8' }}>
              Loading weather...
            </div>
          )}
        </div>

        {/* Right: Radar */}
        <div className="flex flex-col">
          <div className="rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <span className="font-semibold text-base" style={{ color: '#1e293b' }}>📡 Doppler Radar</span>
              <span className="text-xs" style={{ color: '#94a3b8' }}>
                {radarPaths.length > 0 ? `Frame ${radarIdx + 1}/${radarPaths.length}` : 'Loading...'}
              </span>
            </div>
            <div ref={radarContainerRef} className="flex-1 relative overflow-hidden" style={{ background: '#f1f5f9' }}>
              {radarPaths.length > 0 ? (
                <>
                  <div style={{
                    position: 'absolute',
                    width: gridPx,
                    height: gridPx,
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    display: 'grid',
                    gridTemplateColumns: `repeat(3, ${TILE_PX}px)`,
                    gridTemplateRows: `repeat(3, ${TILE_PX}px)`,
                  }}>
                    {tiles.map(({ dx, dy }) => (
                      <img
                        key={`map-${dx}-${dy}`}
                        src={`https://tile.openstreetmap.org/${zoom}/${tileX + dx}/${tileY + dy}.png`}
                        alt=""
                        width={TILE_PX}
                        height={TILE_PX}
                        style={{ display: 'block', opacity: 0.7, imageRendering: 'auto' }}
                      />
                    ))}
                  </div>
                  <div style={{
                    position: 'absolute',
                    width: gridPx,
                    height: gridPx,
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    display: 'grid',
                    gridTemplateColumns: `repeat(3, ${TILE_PX}px)`,
                    gridTemplateRows: `repeat(3, ${TILE_PX}px)`,
                  }}>
                    {tiles.map(({ dx, dy }) => (
                      <img
                        key={`radar-${dx}-${dy}`}
                        src={`https://tilecache.rainviewer.com${radarPaths[radarIdx]}/256/${zoom}/${tileX + dx}/${tileY + dy}/2/1_1.png`}
                        alt=""
                        width={TILE_PX}
                        height={TILE_PX}
                        style={{ display: 'block' }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-4 h-4 rounded-full shadow-lg" style={{ background: '#ea580c', boxShadow: '0 0 0 4px rgba(234,88,12,0.3)' }} />
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded z-10" style={{ background: 'rgba(255,255,255,0.85)', color: '#475569' }}>
                    📍 Adel, Iowa — Central Iowa Radar
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full" style={{ color: '#94a3b8' }}>Loading radar...</div>
              )}
            </div>
            <div className="p-3 flex items-center gap-3 text-xs" style={{ borderTop: '1px solid #e2e8f0', color: '#94a3b8' }}>
              <span>Light</span>
              <div className="flex h-3 flex-1 rounded overflow-hidden">
                <div className="flex-1 bg-green-500/70" />
                <div className="flex-1 bg-yellow-500/70" />
                <div className="flex-1 bg-orange-500/70" />
                <div className="flex-1 bg-red-500/70" />
                <div className="flex-1 bg-purple-500/70" />
              </div>
              <span>Heavy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SAFETY / TOOLBOX TALK PANEL ──
function SafetyPanel({ topic, pageIndex, totalTopics }: {
  topic: SafetyTopic | null;
  pageIndex: number;
  totalTopics: number;
}) {
  if (!topic) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-xl" style={{ color: '#94a3b8' }}>No safety topics configured</p>
      </div>
    );
  }

  const hasPdfPages = topic.pdfPages && topic.pdfPages.length > 0;
  const pdfPageImage = hasPdfPages ? topic.pdfPages![pageIndex] : null;

  if (pdfPageImage) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{ color: '#1e293b' }}>🦺 {topic.title}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: '#64748b' }}>
              Page {pageIndex + 1} of {topic.pdfPages!.length}
            </span>
            <span className="text-xs" style={{ color: '#94a3b8' }}>
              Week {Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1} • {totalTopics} topics in rotation
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <img
            src={pdfPageImage}
            alt={`${topic.title} - Page ${pageIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1e293b' }}>🦺 Weekly Toolbox Talk</h2>
        <span className="text-base" style={{ color: '#64748b' }}>
          Week {Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1} • {totalTopics} topics in rotation
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
        <div className="rounded-2xl p-8 flex flex-col shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-5xl">⚠️</span>
            <h3 className="text-2xl font-bold" style={{ color: '#ea580c' }}>{topic.title}</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-lg whitespace-pre-wrap leading-relaxed" style={{ color: '#334155' }}>
              {topic.content}
            </p>
          </div>
          <div className="mt-6 pt-4 text-sm" style={{ borderTop: '1px solid #e2e8f0', color: '#94a3b8' }}>
            Added by {topic.created_by} • {new Date(topic.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {topic.image ? (
            <img
              src={topic.image}
              alt={topic.title}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
          ) : (
            <div className="rounded-2xl p-12 text-center w-full h-full flex flex-col items-center justify-center shadow-sm" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
              <div className="text-8xl mb-6">🦺</div>
              <div className="text-4xl font-bold mb-4" style={{ color: '#ea580c' }}>SAFETY FIRST</div>
              <div className="text-xl" style={{ color: '#64748b' }}>
                If you see something unsafe,<br />say something!
              </div>
              <div className="mt-8 text-6xl">👷‍♂️🔧🦺</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ANNOUNCEMENTS PANEL ──
function AnnouncementsPanel({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <img src="/logo.jpg" alt="RDMPE" className="h-32 w-auto rounded-lg mb-6 opacity-80" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <p className="text-xl" style={{ color: '#94a3b8' }}>No announcements</p>
      </div>
    );
  }

  const hasImages = announcements.some(a => a.image);

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e293b' }}>📢 Announcements</h2>
      <div className={hasImages ? 'grid grid-cols-2 gap-6' : 'space-y-4'}>
        {announcements.map(a => (
          <div
            key={a.id}
            className="rounded-xl p-6 border-l-4 shadow-sm"
            style={{
              background: a.priority === 'urgent' ? '#fef2f2' : '#fff',
              borderLeftColor: a.priority === 'urgent' ? '#ef4444' : '#ea580c',
              border: a.priority === 'urgent' ? undefined : '1px solid #e2e8f0',
              borderLeft: `4px solid ${a.priority === 'urgent' ? '#ef4444' : '#ea580c'}`,
            }}
          >
            <div className="flex items-start gap-4">
              {a.priority === 'urgent' && (
                <span className="text-4xl animate-pulse">🚨</span>
              )}
              <div className="flex-1">
                {a.message && (
                  <p className="text-xl" style={{ color: a.priority === 'urgent' ? '#991b1b' : '#334155', fontWeight: a.priority === 'urgent' ? 700 : 400 }}>
                    {a.message}
                  </p>
                )}
                {a.image && (
                  <img src={a.image} alt="" className="mt-3 max-h-64 rounded-lg object-contain" />
                )}
                <p className="text-sm mt-2" style={{ color: '#94a3b8' }}>
                  — {a.created_by}, {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
