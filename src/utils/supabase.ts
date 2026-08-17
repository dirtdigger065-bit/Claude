// Supabase Storage JSON data layer + Weather API + GPS utilities
// Reconstructed to match the deployed RDMPE Field Ops data contract.
//
// NOTE: this uses the Supabase *anon* key, which is meant to be public and safe
// to ship in client code — access is controlled by Row Level Security policies
// on the `field-ops` and `bids` storage buckets (see SUPABASE_SETUP.md). Never
// put a service_role key here: it bypasses RLS entirely and grants full
// read/write/delete on the whole project to anyone who opens dev tools.

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vjhhhmgzvwdxrxkthrpx.supabase.co';
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const BUCKET = 'field-ops';

if (!SUPA_KEY && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_ANON_KEY is not set. Copy .env.example to .env and fill in your ' +
    "project's anon key (Supabase dashboard → Project Settings → API). See SUPABASE_SETUP.md."
  );
}

const headers = {
  'apikey': SUPA_KEY,
  'Authorization': `Bearer ${SUPA_KEY}`,
};

// ---- Generic JSON file CRUD ----
// Reads append a cache-busting query param so the storage CDN can never serve
// a stale copy (this is what previously allowed duplicate job numbers to slip in).

async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const res = await fetch(
      `${SUPA_URL}/storage/v1/object/${BUCKET}/${filename}?cb=${Date.now()}`,
      { headers: { ...headers, 'cache-control': 'no-cache' }, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<boolean> {
  try {
    const body = JSON.stringify(data, null, 2);
    const res = await fetch(
      `${SUPA_URL}/storage/v1/object/${BUCKET}/${filename}`,
      {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json', 'x-upsert': 'true' },
        body,
      }
    );
    if (res.ok) return true;
    if (res.status === 404 || res.status === 400) {
      const createRes = await fetch(
        `${SUPA_URL}/storage/v1/object/${BUCKET}/${filename}`,
        {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json', 'x-upsert': 'true' },
          body,
        }
      );
      return createRes.ok;
    }
    return false;
  } catch {
    return false;
  }
}

// ---- Data file names ----
const FILES = {
  users: 'users.json',
  jobs: 'jobs.json',
  dailyLogs: 'daily-logs.json',
  timeEntries: 'time-entries.json',
  materials: 'materials.json',
  photos: 'photos.json',
  schedule: 'schedule.json',
  holidays: 'holidays.json',
  equipment: 'equipment.json',
  timeOff: 'time-off-requests.json',
  announcements: 'announcements.json',
  safetyTopics: 'safety-topics.json',
} as const;

// ---- Public API ----

import type { User, Job, DailyLog, TimeEntry, MaterialEntry, Photo, ScheduleEntry, BidData, WeatherData, Holiday, Announcement, SafetyTopic } from '../types';

// Users
export async function getUsers(): Promise<User[]> {
  return readJsonFile<User>(FILES.users);
}
export async function saveUsers(users: User[]): Promise<boolean> {
  return writeJsonFile(FILES.users, users);
}
export async function getUserByPin(pin: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(u => u.pin === pin && u.active) || null;
}
// Upsert a single user (insert if new, replace if existing by id)
export async function saveUser(user: User): Promise<boolean> {
  const users = await getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  return saveUsers(users);
}

// Jobs
export async function getJobs(): Promise<Job[]> {
  return readJsonFile<Job>(FILES.jobs);
}
export async function saveJobs(jobs: Job[]): Promise<boolean> {
  return writeJsonFile(FILES.jobs, jobs);
}

// Daily Logs
export async function getDailyLogs(): Promise<DailyLog[]> {
  return readJsonFile<DailyLog>(FILES.dailyLogs);
}
export async function saveDailyLogs(logs: DailyLog[]): Promise<boolean> {
  return writeJsonFile(FILES.dailyLogs, logs);
}

// Time Entries (legacy global file — retained for migration/back-compat)
export async function getTimeEntries(): Promise<TimeEntry[]> {
  return readJsonFile<TimeEntry>(FILES.timeEntries);
}
export async function saveTimeEntries(entries: TimeEntry[]): Promise<boolean> {
  return writeJsonFile(FILES.timeEntries, entries);
}

// Per-user time entries (current storage model)
export async function getTimeEntriesForUser(userId: string): Promise<TimeEntry[]> {
  return readJsonFile<TimeEntry>(`time-entries-${userId}.json`);
}
export async function saveTimeEntriesForUser(userId: string, entries: TimeEntry[]): Promise<boolean> {
  return writeJsonFile(`time-entries-${userId}.json`, entries);
}
// Aggregate every user's entries into one flat array
export async function getAllTimeEntries(users: User[]): Promise<TimeEntry[]> {
  const lists = await Promise.all(users.map(u => getTimeEntriesForUser(u.id)));
  return lists.flat();
}
// Currently-open clock sessions (clocked in, not yet clocked out) across all users
export async function getActiveClockSessions(users: User[]): Promise<TimeEntry[]> {
  const all = await getAllTimeEntries(users);
  return all.filter(e => !!e.clock_in && !e.clock_out);
}
// One-time migration of the legacy global file into per-user files (idempotent, no-op when empty)
export async function migrateTimeEntries(): Promise<void> {
  try {
    const legacy = await getTimeEntries();
    if (!legacy || legacy.length === 0) return;
    const byUser: Record<string, TimeEntry[]> = {};
    for (const e of legacy) {
      if (!e.user_id) continue;
      (byUser[e.user_id] = byUser[e.user_id] || []).push(e);
    }
    for (const [uid, entries] of Object.entries(byUser)) {
      const existing = await getTimeEntriesForUser(uid);
      const ids = new Set(existing.map(x => x.id));
      const merged = existing.concat(entries.filter(e => !ids.has(e.id)));
      await saveTimeEntriesForUser(uid, merged);
    }
    await saveTimeEntries([]);
  } catch (err) {
    console.error('migrateTimeEntries failed:', err);
  }
}

// Materials
export async function getMaterials(): Promise<MaterialEntry[]> {
  return readJsonFile<MaterialEntry>(FILES.materials);
}
export async function saveMaterials(materials: MaterialEntry[]): Promise<boolean> {
  return writeJsonFile(FILES.materials, materials);
}

// Photos
export async function getPhotos(): Promise<Photo[]> {
  return readJsonFile<Photo>(FILES.photos);
}
export async function savePhotos(photos: Photo[]): Promise<boolean> {
  return writeJsonFile(FILES.photos, photos);
}

// Schedule
export async function getSchedule(): Promise<ScheduleEntry[]> {
  return readJsonFile<ScheduleEntry>(FILES.schedule);
}
export async function saveSchedule(entries: ScheduleEntry[]): Promise<boolean> {
  return writeJsonFile(FILES.schedule, entries);
}

// Holidays
export async function getHolidays(): Promise<Holiday[]> {
  return readJsonFile<Holiday>(FILES.holidays);
}
export async function saveHolidays(holidays: Holiday[]): Promise<boolean> {
  return writeJsonFile(FILES.holidays, holidays);
}

// Equipment
export async function getEquipment(): Promise<any[]> {
  return readJsonFile<any>(FILES.equipment);
}
export async function saveEquipment(equipment: any[]): Promise<boolean> {
  return writeJsonFile(FILES.equipment, equipment);
}

// Time Off Requests
export async function getTimeOffRequests(): Promise<any[]> {
  return readJsonFile<any>(FILES.timeOff);
}
export async function saveTimeOffRequests(requests: any[]): Promise<boolean> {
  return writeJsonFile(FILES.timeOff, requests);
}

// Announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  return readJsonFile<Announcement>(FILES.announcements);
}
export async function saveAnnouncements(announcements: Announcement[]): Promise<boolean> {
  return writeJsonFile(FILES.announcements, announcements);
}

// Safety Topics
export async function getSafetyTopics(): Promise<SafetyTopic[]> {
  return readJsonFile<SafetyTopic>(FILES.safetyTopics);
}
export async function saveSafetyTopics(topics: SafetyTopic[]): Promise<boolean> {
  return writeJsonFile(FILES.safetyTopics, topics);
}

// Fetch every bid from Bid Builder (any status) — used for Hub quick stats.
export async function fetchAllBids(): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch(`${SUPA_URL}/storage/v1/object/public/bids/all-bids.json?cb=${Date.now()}`);
    if (!res.ok) return [];
    const bids = await res.json();
    return Array.isArray(bids) ? bids : [];
  } catch {
    return [];
  }
}

// Fetch approved bids from Bid Builder
export async function fetchApprovedBids(): Promise<BidData[]> {
  try {
    const res = await fetch(`${SUPA_URL}/storage/v1/object/public/bids/all-bids.json?cb=${Date.now()}`);
    if (!res.ok) return [];
    const bids = await res.json();
    if (Array.isArray(bids)) {
      return bids.filter((b: Record<string, unknown>) => b.status === 'approved');
    }
    return [];
  } catch {
    return [];
  }
}

// ---- Weather API (Open-Meteo - free, no key needed) ----

const WMO_CODES: Record<number, string> = {
  0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle',
  55: 'Heavy drizzle', 56: 'Freezing drizzle', 57: 'Heavy freezing drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  66: 'Freezing rain', 67: 'Heavy freezing rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Light showers', 81: 'Showers', 82: 'Heavy showers',
  85: 'Light snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Severe thunderstorm',
};

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&temperature_unit=fahrenheit`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const cw = data.current_weather;
    return {
      temp: Math.round(cw.temperature),
      description: WMO_CODES[cw.weathercode] || 'Unknown',
      code: cw.weathercode,
    };
  } catch {
    return null;
  }
}

// ---- GPS Utilities ----

export function getCurrentPosition(): Promise<{ lat: number; lng: number; accuracy: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 3000, maximumAge: 60000 }
    );
  });
}

// ---- Helpers ----

export function genId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function now(): string {
  return new Date().toISOString();
}

// Returns the calendar date (YYYY-MM-DD) in Central time for a given instant.
// Using toISOString() here would return the UTC date, which rolls over to the
// next day at ~7 PM Central — stamping evening time entries on the wrong day.
export function centralDate(d: Date = new Date()): string {
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
}

export function today(): string {
  return centralDate();
}

export async function getNextJobNumber(jobs: Job[]): Promise<string> {
  const yr = new Date().getFullYear().toString().slice(2);
  // Only consider job numbers from the CURRENT year (e.g. "26-####").
  // This keeps each year's sequence self-contained and prevents archived /
  // prior-year numbers (09-#### … 25-####) from hijacking the next number.
  const numbers = jobs
    .map(j => {
      const match = String(j.job_number || '').match(/^(\d{2})-(\d+)$/);
      return match && match[1] === yr ? parseInt(match[2], 10) : 0;
    })
    .filter(n => n > 0);
  if (numbers.length > 0) {
    const max = Math.max(...numbers);
    return `${yr}-${String(max + 1).padStart(4, '0')}`;
  }
  // First job of a new year starts the sequence at 0001.
  return `${yr}-0001`;
}

export async function ensureDefaultAdmin(): Promise<void> {
  const users = await getUsers();
  if (users.length === 0) {
    const defaultAdmin: User = {
      id: genId('user'),
      name: 'Ryan',
      role: 'admin',
      pin: '1638',
      active: true,
      created_at: now(),
      updated_at: now(),
    };
    await saveUsers([defaultAdmin]);
  }
}
