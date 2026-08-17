import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardHat, Calculator, LogOut, Briefcase, FileText, ArrowRight, ClipboardCheck } from 'lucide-react';
import { User } from '../types';
import { getJobs, fetchAllBids } from '../utils/supabase';

interface Props {
  currentUser: User;
  onLogout: () => void;
}

export const Hub: React.FC<Props> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<number | null>(null);
  const [openBids, setOpenBids] = useState<number | null>(null);

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
      <div className="navbar bg-base-100 border-b border-base-300 px-4">
        <div className="flex-1 flex items-center gap-2">
          <img src="/logo.jpg" alt="RDMPE" className="w-8 h-8 rounded object-cover" />
          <span className="font-bold">RDMPE Ops</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-base-content/70">Hi, {currentUser.name}</span>
          <button className="btn btn-ghost btn-sm gap-1" onClick={onLogout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back, {currentUser.name}</h1>
          <p className="text-base-content/60 mt-1">Pick where you want to go</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          <button
            onClick={() => navigate('/field-ops')}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow text-left border border-base-300 hover:border-primary group"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HardHat size={26} className="text-primary" />
                </div>
                <ArrowRight size={18} className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="card-title mt-2">Field Ops</h2>
              <p className="text-sm text-base-content/60">Jobs, daily logs, time clock, timecards, scheduling, photos & crew.</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-base-content/50">
                <Briefcase size={14} />
                {activeJobs === null ? 'Loading…' : `${activeJobs} active job${activeJobs === 1 ? '' : 's'}`}
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/bid-builder')}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow text-left border border-base-300 hover:border-secondary group"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Calculator size={26} className="text-secondary" />
                </div>
                <ArrowRight size={18} className="text-base-content/30 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="card-title mt-2">Bid Builder</h2>
              <p className="text-sm text-base-content/60">Build, price, and submit bids &mdash; catalog, crews, proposals & approvals.</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-base-content/50">
                <FileText size={14} />
                {openBids === null ? 'Loading…' : `${openBids} bid${openBids === 1 ? '' : 's'} in progress`}
              </div>
            </div>
          </button>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => { navigate('/field-ops'); }}
            className="mt-6 text-xs text-base-content/50 hover:text-base-content flex items-center gap-1"
          >
            <ClipboardCheck size={13} /> Manage users, jobs & bids from their respective modules
          </button>
        )}
      </div>
    </div>
  );
};
