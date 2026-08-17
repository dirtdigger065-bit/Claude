// ===== Data types for RDMPE Field Operations v4 =====
// New: Timecard system with non-job categories, two-step approval, weekly payroll

export type UserRole = 'admin' | 'office' | 'foreman' | 'crew' | 'payroll' | 'estimator';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  pin: string;
  active: boolean;
  employeeType?: 'hourly' | 'salary';
  payRate?: number;
  annualSalary?: number;
  phone?: string;
  textReminders?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  number: string;
  status: 'available' | 'maintenance' | 'retired';
  created_at: string;
  updated_at: string;
}

export const EQUIPMENT_TYPES = [
  'Excavator', 'Skid Steer', 'Dozer', 'Loader', 'Backhoe', 'Dump Truck',
  'Trailer', 'Compactor / Roller', 'Grader', 'Truck', 'Other',
] as const;

export type TimeOffType = 'pto' | 'sick' | 'personal' | 'unpaid' | 'bereavement' | 'jury_duty';
export type TimeOffStatus = 'pending' | 'approved' | 'denied';

export interface TimeOffRequest {
  id: string;
  userId: string;
  userName?: string;
  type: TimeOffType;
  status: TimeOffStatus;
  startDate: string;
  endDate: string;
  reason: string;
  hoursPerDay: number;
  createdAt: string;
  submittedBy?: string;
  approvedBy?: string;
  approvedAt?: string;
  deniedBy?: string;
  deniedAt?: string;
  denialReason?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
}

export interface PayrollSummary {
  userId: string;
  userName: string;
  employeeType: 'hourly' | 'salary';
  payRate: number;
  regularHours: number;
  overtimeHours: number;
  sundayHours: number;
  holidayHours: number;
  totalHours: number;
  regularPay: number;
  overtimePay: number;
  sundayPay: number;
  holidayPay: number;
  totalPay: number;
}

export interface CompletionChecklist {
  time_entries_complete: boolean;
  trucking_tickets_entered: boolean;
  rock_tickets_submitted: boolean;
  material_receipts_submitted: boolean;
  final_photos_uploaded: boolean;
  daily_logs_complete: boolean;
  billing_notes: string;
  completed_by: string;
  completed_at: string;
}

export interface Job {
  id: string;
  bid_id: string;
  bid_number: string;
  job_number: string;
  client_name: string;
  project_address: string;
  project_description: string;
  status: string;
  items_json: string;
  labor_json: string;
  assigned_user_ids: string[];
  locate_date: string;
  locate_number: string;
  estimated_hours?: number;
  completion_checklist?: CompletionChecklist;
  created_at: string;
  updated_at: string;
  // Optional fields carried from legacy/migrated jobs
  notes?: string;
  city?: string;
  contractor?: string;
}

export interface ScopeItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  category: string;
}

export interface LaborItem {
  id: string;
  description: string;
  hours: number;
  rate?: number;
  lumpSum: boolean;
}

export interface DailyLog {
  id: string;
  job_id: string;
  job_number: string;
  date: string;
  user_id: string;
  foreman_name: string;
  crew_size: number;
  weather: string;
  weather_temp?: number;
  weather_code?: string;
  weather_auto?: boolean;
  work_performed: string;
  issues: string;
  materials_used: string;
  equipment_used?: string;
  equipment_list?: Array<{ name: string; hours: number; note: string }>;
  manual_labor?: Array<{ name: string; hours: number; note: string }>;
  notes: string;
  gps_lat?: number;
  gps_lng?: number;
  created_at: string;
  updated_at: string;
}

export interface TimeEntry {
  id: string;
  job_id: string;
  job_number: string;
  category?: string; // 'job' (default/empty) or non-job category id
  date: string;
  user_id: string;
  user_name: string;
  clock_in: string;
  clock_out: string;
  hours: number;
  notes: string;
  status: 'pending' | 'foreman-approved' | 'admin-approved' | 'approved' | 'rejected';
  approved_by: string;     // foreman who approved (step 1)
  approved_at: string;
  admin_approved_by?: string;  // admin who final-approved (step 2)
  admin_approved_at?: string;
  rejection_reason?: string;   // reason for rejection
  entered_by?: string;         // userId if entered by foreman on behalf of crew
  entered_by_name?: string;    // name of person who entered on behalf
  lunch_deducted?: boolean;    // whether 30min lunch was deducted
  // Live clock-in session / equipment / location fields
  clock_in_time?: string;
  clock_out_time?: string;
  is_active?: boolean;
  equipment_id?: string;
  equipment_name?: string;
  clock_in_location?: string | { lat: number; lng: number; accuracy: number };
  clock_out_location?: string | { lat: number; lng: number; accuracy: number };
  non_job_category?: string;
  created_by?: string;
  created_at: string;
}

export interface MaterialEntry {
  id: string;
  daily_log_id: string;
  job_id: string;
  job_number: string;
  date: string;
  material_type: string;
  description: string;
  quantity: number;
  unit: string;
  source: string;
  hauler: string;
  ticket_number: string;
  ticket_photo: string;
  notes: string;
  created_at: string;
}

export interface Photo {
  id: string;
  job_id: string;
  daily_log_id: string;
  caption: string;
  photo_type: string;
  thumbnail: string;
  full_image: string;
  gps_lat?: number;
  gps_lng?: number;
  gps_accuracy?: number;
  taken_at?: string;
  created_at: string;
}

export interface ScheduleEntry {
  id: string;
  job_id: string;
  job_number: string;
  client_name?: string;
  date: string;
  assigned_user_ids: string[];
  foreman_id: string;
  crew_name?: string;
  estimated_hours: number;
  notes: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface BidData {
  id: string;
  bidNumber: string;
  status: string;
  clientName: string;
  projectAddress: string;
  projectDescription: string;
  items: Array<{
    id: string;
    description: string;
    qty: number;
    unit: string;
    category: string;
    unitCost: number;
    markupPct: number;
  }>;
  laborItems: Array<{
    id: string;
    description: string;
    hours: number;
    rate: number;
    lumpSum: boolean;
  }>;
}

export interface WeatherData {
  temp: number;
  description: string;
  code: number;
  wind_speed?: number;
  wind_direction?: number;
  humidity?: number;
  forecast?: DailyForecast[];
}

export interface Announcement {
  id: string;
  message: string;
  priority: 'normal' | 'urgent';
  created_by: string;
  created_at: string;
  expires_at?: string;
  active: boolean;
  image?: string; // base64 data URL
}

export interface SafetyTopic {
  id: string;
  title: string;
  content: string;
  image?: string; // base64 data URL
  pdfPages?: string[]; // base64 images of each PDF page
  created_by: string;
  created_at: string;
  active: boolean;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  code: number;
}

export type Screen =
  | 'login'
  | 'jobs'
  | 'job-detail'
  | 'create-job'
  | 'daily-log'
  | 'time-entry'
  | 'timecards'
  | 'dashboard'
  | 'photos'
  | 'schedule'
  | 'user-management'
  | 'announcements'
  | 'time-off';

export interface AppState {
  screen: Screen;
  currentUser: User | null;
  selectedJobId: string | null;
  selectedLogId: string | null;
}

export const SCHEDULE_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1',
];

export const NON_JOB_CATEGORIES = [
  { id: 'shop', label: 'Shop Work', icon: '🔧' },
  { id: 'mobilization', label: 'Mobilization', icon: '🚚' },
  { id: 'maintenance', label: 'Equipment Maintenance', icon: '⚙️' },
  { id: 'training', label: 'Training', icon: '📋' },
  { id: 'travel', label: 'Travel', icon: '🚗' },
  { id: 'pto', label: 'PTO', icon: '🏖️' },
  { id: 'office', label: 'Office / Admin', icon: '🏢' },
  { id: 'other', label: 'Other', icon: '📝' },
] as const;

export type NonJobCategory = typeof NON_JOB_CATEGORIES[number]['id'];

// Helper: normalize old 'approved' status to new two-step system
export function normalizeStatus(status: string): 'pending' | 'foreman-approved' | 'admin-approved' | 'rejected' {
  if (status === 'approved') return 'admin-approved';
  if (status === 'foreman-approved' || status === 'admin-approved' || status === 'pending' || status === 'rejected') {
    return status as 'pending' | 'foreman-approved' | 'admin-approved' | 'rejected';
  }
  return 'pending';
}

export function getCategoryLabel(cat?: string): string {
  if (!cat || cat === 'job') return '';
  const found = NON_JOB_CATEGORIES.find(c => c.id === cat);
  return found ? found.label : cat;
}

export function isNonJobEntry(entry: TimeEntry): boolean {
  return !!entry.category && entry.category !== 'job';
}

export function getEntryLabel(entry: TimeEntry): string {
  if (isNonJobEntry(entry)) {
    return getCategoryLabel(entry.category);
  }
  if (!entry.job_id && !entry.job_number) return 'Unassigned';
  return entry.job_number || 'Unknown Job';
}

// Pay period helpers (Sun-Sat)
export function getPayPeriodStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun
  d.setDate(d.getDate() - day);
  return d;
}

export function getPayPeriodEnd(start: Date): Date {
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  return d;
}

export function getPayPeriodDates(start: Date): string[] {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}
