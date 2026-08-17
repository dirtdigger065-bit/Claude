import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardHat, Calculator, LogOut, Briefcase, FileText, ArrowRight, ClipboardList, Layers, Settings } from 'lucide-react';
import { User } from '../types';
import { getJobs, fetchAllBids } from '../utils/supabase';
import { AdminStats } from './AdminStats';

interface Props {
  currentUser: User;
  users: User[];
  onLogout: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin', office: 'Office', foreman: 'Foreman', crew: 'Crew', payroll: 'Payroll', estimator: 'Estimator',
};

export const Hub: React.FC<Props> = ({ currentUser, users, onLogout }) => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<number | null>(null);
  const [openBids, setOpenBids] = useState<number | null>(null);
  const isAdmin = currentUser.role === 'admin';

  useEffect(() => {
    let cancelled = false;
    getJobs().then(jobs => {
      if (!cancelled) setActiveJobs(jobs.filter(j => j.status === 'active').length);
    }).catch(() => {});
    fetchAllBids().then(bids => {
      if (!cancelled) setOpenBids(bids.filter(b => b.status === 'draft' || b.status === 'submitted').length);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-base-200 flex flex-col">
      {/* Top nav */}
      <div className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-10">
        <div className="flex-1 flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <img src="/logo.jpg" alt="RDMPE" className="w-8 h-8 rounded object-cover" />
            <span className="font-bold hidden sm:inline">RDMPE Ops</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <span className="btn btn-sm btn-primary pointer-events-none">Dashboard</span>
            <button className="btn btn-sm btn-ghost gap-1" onClick={() => navigate('/field-ops')}>
              <HardHat size={14} /> Field Ops
            </button>
            <button className="btn btn-sm btn-ghost gap-1" onClick={() => navigate('/bid-builder')}>
              <Calculator size={14} /> Bid Builder
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button className="btn btn-ghost btn-sm btn-circle" title="Manage users" onClick={() => navigate('/field-ops')}>
              <Settings size={16} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
              {currentUser.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold">{currentUser.name}</div>
              <div className="text-[10px] text-base-content/50">{ROLE_LABELS[currentUser.role] || currentUser.role}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onLogout} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-5xl mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            {isAdmin ? 'Operations Overview' : `Welcome back, ${currentUser.name}`}
          </h1>
          <p className="text-base-content/60 text-sm mt-0.5">
            {isAdmin ? "Here's what's happening right now" : 'Pick where you want to go'}
          </p>
        </div>

        {isAdmin && <AdminStats users={users} />}

        {/* Quick-launch panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HardHat size={22} className="text-primary" />
                </div>
                <button className="btn btn-ghost btn-xs gap-1" onClick={() => navigate('/field-ops')}>
                  Open <ArrowRight size={13} />
                </button>
              </div>
              <h2 className="card-title text-base mt-1">Field Ops</h2>
              <p className="text-xs text-base-content/60">Jobs, daily logs, time clock, timecards, scheduling, photos & crew.</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-base-content/50">
                <Briefcase size={13} />
                {activeJobs === null ? 'Loading…' : `${activeJobs} active job${activeJobs === 1 ? '' : 's'}`}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Calculator size={22} className="text-secondary" />
                </div>
                <button className="btn btn-ghost btn-xs gap-1" onClick={() => navigate('/bid-builder')}>
                  Open <ArrowRight size={13} />
                </button>
              </div>
              <h2 className="card-title text-base mt-1">Bid Builder</h2>
              <p className="text-xs text-base-content/60">Build, price, and submit bids — catalog, crews, proposals & approvals.</p>
              <div className="flex items-center gap-1.5 mt-1 mb-2 text-xs font-medium text-base-content/50">
                <FileText size={13} />
                {openBids === null ? 'Loading…' : `${openBids} bid${openBids === 1 ? '' : 's'} in progress`}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-outline btn-sm flex-1 gap-1"
                  onClick={() => navigate('/bid-builder?newBid=simple')}
                >
                  <FileText size={13} /> New Bid — Simple
                </button>
                <button
                  className="btn btn-outline btn-sm flex-1 gap-1"
                  onClick={() => navigate('/bid-builder?newBid=advanced')}
                >
                  <Layers size={13} /> New Bid — Advanced
                </button>
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate('/field-ops')}
            className="mt-6 text-xs text-base-content/50 hover:text-base-content flex items-center gap-1"
          >
            <ClipboardList size={13} /> Manage users, jobs & bids from their respective modules
          </button>
        )}
      </div>
    </div>
  );
};
