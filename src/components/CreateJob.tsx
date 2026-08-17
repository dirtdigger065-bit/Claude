import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { BidData, Job, User } from '../types';
import { fetchApprovedBids, genId, now, getNextJobNumber, getJobs, saveJobs } from '../utils/supabase';

interface Props {
  currentUser: User;
  users: User[];
  existingJobs: Job[];
  onBack: () => void;
  onCreated: (jobId: string) => void;
}

export const CreateJob: React.FC<Props> = ({ currentUser, users, existingJobs, onBack, onCreated }) => {
  const [mode, setMode] = useState<'choose' | 'from-bid' | 'manual'>('choose');
  const [bids, setBids] = useState<BidData[]>([]);
  const [loadingBids, setLoadingBids] = useState(false);
  const [jobNumber, setJobNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBid, setSelectedBid] = useState<BidData | null>(null);
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getNextJobNumber(existingJobs).then(setJobNumber);
  }, []);

  const loadBids = async () => {
    setLoadingBids(true);
    try { setBids(await fetchApprovedBids()); } catch {}
    setLoadingBids(false);
  };

  const selectBid = (bid: BidData) => {
    setSelectedBid(bid);
    setClientName(bid.clientName || '');
    setAddress(bid.projectAddress || '');
    setDescription(bid.projectDescription || '');
  };

  const toggleUser = (uid: string) => {
    setAssignedUserIds(prev => prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]);
  };

  const handleSave = async () => {
    if (!jobNumber.trim()) return;
    setSaving(true);
    try {
      const id = genId('job');
      const ts = now();
      const items = selectedBid?.items?.map(i => ({ id: i.id, description: i.description, qty: i.qty, unit: i.unit, category: i.category || 'general' })) || [];
      const labor = selectedBid?.laborItems?.map(l => ({ id: l.id, description: l.description, hours: l.hours, lumpSum: l.lumpSum || false })) || [];

      // Re-fetch the freshest job list right before saving and guarantee the
      // job number is unique. This prevents duplicate numbers when a job is
      // created twice in quick succession or from a stale list.
      const jobs = await getJobs();
      const existingNumbers = new Set(jobs.map(j => j.job_number));
      let finalNumber = jobNumber.trim();
      if (existingNumbers.has(finalNumber)) {
        const yr = new Date().getFullYear().toString().slice(2);
        // Year-scoped: only continue the current year's sequence, never pull
        // from archived / prior-year job numbers.
        const nums = jobs
          .map(j => { const m = String(j.job_number || '').match(/^(\d{2})-(\d+)$/); return m && m[1] === yr ? parseInt(m[2], 10) : 0; })
          .filter(n => n > 0);
        let next = (nums.length ? Math.max(...nums) : 0) + 1;
        let candidate = `${yr}-${String(next).padStart(4, '0')}`;
        while (existingNumbers.has(candidate)) { next++; candidate = `${yr}-${String(next).padStart(4, '0')}`; }
        finalNumber = candidate;
        setJobNumber(finalNumber);
        alert(`Job number "${jobNumber.trim()}" already exists.\n\nAssigned the next available number instead: ${finalNumber}`);
      }

      const newJob: Job = {
        id, bid_id: selectedBid?.id || '', bid_number: selectedBid?.bidNumber || '',
        job_number: finalNumber, client_name: clientName, project_address: address,
        project_description: description, status: 'active',
        items_json: JSON.stringify(items), labor_json: JSON.stringify(labor),
        assigned_user_ids: assignedUserIds,
        locate_date: '', locate_number: '',
        created_at: ts, updated_at: ts,
      };

      jobs.push(newJob);
      const ok = await saveJobs(jobs);
      if (!ok) { alert('Could not save the job. Please check your connection and try again.'); setSaving(false); return; }
      onCreated(id);
    } catch (err) {
      console.error('Failed to create job:', err);
      alert('Something went wrong creating the job. Please try again.');
    }
    setSaving(false);
  };

  const crewUsers = users.filter(u => u.active && (u.role === 'crew' || u.role === 'foreman'));

  const assignSection = null; // Crew assignment removed — single crew setup

  if (mode === 'choose') {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onBack}><ArrowLeft size={18} /></button>
          <h2 className="text-lg font-bold">New Job</h2>
        </div>
        <div className="grid gap-3">
          <button className="card bg-base-200 cursor-pointer hover:bg-base-300" onClick={() => { setMode('from-bid'); loadBids(); }}>
            <div className="card-body p-4 flex-row items-center gap-3">
              <Download size={24} className="text-primary" />
              <div><p className="font-semibold">Import from Approved Bid</p><p className="text-xs text-base-content/60">Pull scope, items, and labor from an approved bid</p></div>
            </div>
          </button>
          <button className="card bg-base-200 cursor-pointer hover:bg-base-300" onClick={() => setMode('manual')}>
            <div className="card-body p-4 flex-row items-center gap-3">
              <FileText size={24} className="text-secondary" />
              <div><p className="font-semibold">Create Manual Job</p><p className="text-xs text-base-content/60">Enter job details from scratch</p></div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'from-bid') {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 bg-base-200 flex items-center gap-2">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={() => { setMode('choose'); setSelectedBid(null); }}><ArrowLeft size={18} /></button>
          <h2 className="text-lg font-bold">Import from Bid</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-3">
          {loadingBids ? (
            <div className="flex justify-center py-8"><span className="loading loading-spinner loading-md text-primary" /></div>
          ) : !selectedBid ? (
            <div className="space-y-2">
              <p className="text-sm text-base-content/60">Select an approved bid:</p>
              {bids.length === 0 ? <p className="text-center py-8 text-base-content/50">No approved bids found</p> : bids.map(bid => (
                <div key={bid.id} className="card bg-base-200 cursor-pointer hover:bg-base-300" onClick={() => selectBid(bid)}>
                  <div className="card-body p-3">
                    <div className="font-bold text-sm">{bid.bidNumber}</div>
                    <div className="text-sm">{bid.clientName}</div>
                    <div className="text-xs text-base-content/60">{bid.projectAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="alert alert-success py-2"><span className="text-sm">Importing from Bid {selectedBid.bidNumber}</span></div>
              <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Job Number</span></label><input className="input input-bordered input-sm" value={jobNumber} onChange={e => setJobNumber(e.target.value)} /></div>
              <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Client Name</span></label><input className="input input-bordered input-sm" value={clientName} onChange={e => setClientName(e.target.value)} /></div>
              <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Project Address</span></label><input className="input input-bordered input-sm" value={address} onChange={e => setAddress(e.target.value)} /></div>
              <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Description</span></label><textarea className="textarea textarea-bordered textarea-sm" value={description} onChange={e => setDescription(e.target.value)} rows={2} /></div>
              {assignSection}
              {selectedBid.items.length > 0 && (
                <div><p className="text-xs font-semibold mb-1">Scope Items ({selectedBid.items.length})</p>
                <div className="bg-base-200 rounded-lg p-2 space-y-1">{selectedBid.items.map(item => (
                  <div key={item.id} className="text-xs flex justify-between"><span>{item.description}</span><span className="text-base-content/60">{item.qty} {item.unit}</span></div>
                ))}</div></div>
              )}
              <button className="btn btn-primary btn-sm w-full" onClick={handleSave} disabled={saving}>
                {saving ? <span className="loading loading-spinner loading-xs" /> : 'Create Work Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-base-200 flex items-center gap-2">
        <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setMode('choose')}><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-bold">New Job</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-3">
        <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Job Number *</span></label><input className="input input-bordered input-sm" value={jobNumber} onChange={e => setJobNumber(e.target.value)} placeholder="26-0044" /></div>
        <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Client Name</span></label><input className="input input-bordered input-sm" value={clientName} onChange={e => setClientName(e.target.value)} /></div>
        <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Project Address</span></label><input className="input input-bordered input-sm" value={address} onChange={e => setAddress(e.target.value)} /></div>
        <div className="form-control"><label className="label py-1"><span className="label-text text-xs">Description</span></label><textarea className="textarea textarea-bordered textarea-sm" value={description} onChange={e => setDescription(e.target.value)} rows={3} /></div>
        {assignSection}
        <button className="btn btn-primary btn-sm w-full" onClick={handleSave} disabled={saving || !jobNumber.trim()}>
          {saving ? <span className="loading loading-spinner loading-xs" /> : 'Create Work Order'}
        </button>
      </div>
    </div>
  );
};