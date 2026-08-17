import React, { useState } from 'react';
import { Plus, MapPin, ChevronRight, Search } from 'lucide-react';
import { Job, User } from '../types';
import { getJobs, saveJobs, now as nowFn } from '../utils/supabase';

interface Props {
  jobs: Job[];
  currentUser: User;
  onSelectJob: (jobId: string) => void;
  onCreateJob: () => void;
  onRefresh?: () => void;
}

const STATUS_OPTIONS = [
  { value: 'active',        label: 'Active',        cls: 'badge-success' },
  { value: 'on_hold',       label: 'Hold',          cls: 'badge-warning' },
  { value: 'ready_to_bill', label: 'Ready to Bill', cls: 'badge-accent'  },
  { value: 'completed',     label: 'Completed',     cls: 'badge-info'    },
  { value: 'billed',        label: 'Billed',        cls: 'badge-secondary'},
  { value: 'archived',      label: '📦 Archived',   cls: 'badge-ghost'   },
];

// Archived jobs can number in the thousands (legacy history import), so we cap
// how many render at once and nudge the user to search to narrow the list.
const ARCHIVED_RENDER_CAP = 200;

export const JobList: React.FC<Props> = ({ jobs, currentUser, onSelectJob, onCreateJob, onRefresh }) => {
  const [filter, setFilter] = useState('active');
  const [search, setSearch] = useState('');
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const canCreate = ['admin', 'office', 'foreman'].includes(currentUser.role);
  const canEdit   = ['admin', 'office', 'foreman'].includes(currentUser.role);

  const matchedAll = jobs.filter(j => {
    // "all" shows every current job but excludes the archived history pile.
    if (filter === 'all') { if (j.status === 'archived') return false; }
    else if (j.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (j.job_number || '').toLowerCase().includes(q)
        || (j.client_name || '').toLowerCase().includes(q)
        || (j.project_address || '').toLowerCase().includes(q)
        || (j.project_description || '').toLowerCase().includes(q)
        || (j.notes || '').toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => b.job_number.localeCompare(a.job_number, undefined, { numeric: true }));

  // Cap archived rendering for performance; searching narrows before capping.
  const totalMatches = matchedAll.length;
  const filtered = filter === 'archived' ? matchedAll.slice(0, ARCHIVED_RENDER_CAP) : matchedAll;
  const capped = filter === 'archived' && totalMatches > ARCHIVED_RENDER_CAP;

  const badgeCls = (s: string) =>
    s === 'active' ? 'badge-success' :
    s === 'ready_to_bill' ? 'badge-accent' :
    s === 'completed' ? 'badge-info' :
    s === 'on_hold' ? 'badge-warning' :
    s === 'billed' ? 'badge-secondary' : 'badge-ghost';

  const badgeLabel = (s: string) =>
    s === 'active' ? 'Active' :
    s === 'ready_to_bill' ? '💰 Bill' :
    s === 'completed' ? 'Done' :
    s === 'on_hold' ? 'Hold' :
    s === 'billed' ? 'Billed' :
    s === 'archived' ? '📦 Archived' : s;

  const quickSetStatus = async (jobId: string, newStatus: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavingId(jobId);
    setOpenPopover(null);
    try {
      const allJobs = await getJobs();
      const idx = allJobs.findIndex(j => j.id === jobId);
      if (idx >= 0) {
        allJobs[idx] = { ...allJobs[idx], status: newStatus, updated_at: nowFn() };
        await saveJobs(allJobs);
      }
      onRefresh?.();
    } catch (err) { console.error('Status update failed:', err); }
    setSavingId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <label className="input input-bordered input-sm flex items-center gap-2 flex-1">
            <Search className="h-[1em] opacity-50" />
            <input type="search" className="grow" placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} />
          </label>
          {canCreate && <button className="btn btn-primary btn-sm gap-1" onClick={onCreateJob}><Plus size={16} /> New</button>}
        </div>
        <div className="tabs tabs-boxed tabs-xs">
          {['active', 'ready_to_bill', 'completed', 'on_hold', 'billed', 'all', 'archived'].map(f => (
            <button key={f} className={`tab tab-xs ${filter === f ? 'tab-active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'on_hold' ? 'Hold' : f === 'ready_to_bill' ? '💰 Bill' : f === 'archived' ? '📦 Archived' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        {filter === 'archived' && (
          <div className="text-[11px] text-base-content/60 px-1">
            {totalMatches.toLocaleString()} archived job{totalMatches === 1 ? '' : 's'}
            {capped && <> — showing first {ARCHIVED_RENDER_CAP}. Type in search to find a specific job.</>}
          </div>
        )}
      </div>

      {/* backdrop for any open popover */}
      {openPopover && <div className="fixed inset-0 z-10" onClick={() => setOpenPopover(null)} />}

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <p className="text-sm">{currentUser.role === 'crew' ? 'No jobs assigned to you yet' : 'No jobs found'}</p>
            {canCreate && <button className="btn btn-primary btn-sm mt-3 gap-1" onClick={onCreateJob}><Plus size={14} /> Create Job</button>}
          </div>
        ) : filtered.map(job => (
          <div key={job.id} className="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors" onClick={() => onSelectJob(job.id)}>
            <div className="card-body p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">{job.job_number}</span>

                    {/* Status badge — tappable for admin/foreman/office */}
                    {canEdit ? (
                      <div className="relative" onClick={e => e.stopPropagation()}>
                        <button
                          className={`badge badge-xs cursor-pointer ${badgeCls(job.status)} ${savingId === job.id ? 'opacity-50' : ''}`}
                          onClick={e => { e.stopPropagation(); setOpenPopover(openPopover === job.id ? null : job.id); }}
                          title="Tap to change status"
                        >
                          {savingId === job.id ? '…' : badgeLabel(job.status)}
                          {savingId !== job.id && <span className="ml-0.5 opacity-60">▾</span>}
                        </button>
                        {openPopover === job.id && (
                          <div className="absolute left-0 top-5 z-20 bg-base-100 border border-base-300 rounded-xl shadow-xl p-2 flex flex-col gap-1 min-w-[130px]">
                            {STATUS_OPTIONS.map(opt => (
                              <button
                                key={opt.value}
                                onClick={e => quickSetStatus(job.id, opt.value, e)}
                                className={`btn btn-xs w-full justify-start gap-2 ${job.status === opt.value ? 'btn-active' : 'btn-ghost'}`}
                              >
                                <span className={`badge badge-xs ${opt.cls}`} />
                                {opt.label}
                                {job.status === opt.value && <span className="ml-auto">✓</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className={`badge badge-xs ${badgeCls(job.status)}`}>{badgeLabel(job.status)}</span>
                    )}

                    {job.bid_number && <span className="badge badge-ghost badge-xs">Bid {job.bid_number}</span>}
                  </div>
                  <p className="text-sm font-medium truncate mt-0.5">{job.client_name || 'No client'}</p>
                  {job.project_address && <p className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5"><MapPin size={10} /> {job.project_address}</p>}
                </div>
                <ChevronRight size={16} className="opacity-40 shrink-0 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
