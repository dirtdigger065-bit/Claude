import React, { useState, useEffect, useMemo } from 'react';
import { User, TimeOffRequest, TimeOffType, TimeOffStatus } from '../types';
import { getTimeOffRequests, saveTimeOffRequests } from '../utils/supabase';

interface Props {
  currentUser: User;
  users: User[];
}

const TIME_OFF_LABELS: Record<TimeOffType, string> = {
  pto: '🏖️ PTO',
  sick: '🤒 Sick',
  personal: '👤 Personal',
  unpaid: '⏸️ Unpaid',
  bereavement: '🕊️ Bereavement',
  jury_duty: '⚖️ Jury Duty',
};

const STATUS_BADGES: Record<TimeOffStatus, { label: string; bg: string; text: string }> = {
  pending: { label: '⏳ Pending', bg: '#fef3c7', text: '#92400e' },
  approved: { label: '✅ Approved', bg: '#d1fae5', text: '#065f46' },
  denied: { label: '❌ Denied', bg: '#fee2e2', text: '#991b1b' },
};

// Explicit dark-safe input style (DaisyUI dark theme makes text white)
const inputStyle: React.CSSProperties = {
  width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db',
  fontSize: 15, boxSizing: 'border-box' as const, color: '#111827', background: '#fff',
};

export default function TimeOffRequests({ currentUser, users }: Props) {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'my' | 'approve' | 'all'>('my');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<TimeOffType>('pto');
  const [reason, setReason] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [submitForUserId, setSubmitForUserId] = useState(''); // empty = self

  // Deny modal
  const [denyingId, setDenyingId] = useState<string | null>(null);
  const [denialReason, setDenialReason] = useState('');

  const isAdmin = currentUser.role === 'admin';
  const isForeman = currentUser.role === 'foreman';
  const isOffice = currentUser.role === 'office';
  const canSeeReasons = isAdmin || isForeman || isOffice;
  const canApprove = isAdmin || isForeman;
  const canSubmitForOthers = isAdmin || isForeman;

  // Crew members that admin/foreman can submit on behalf of
  const crewMembers = useMemo(() => {
    if (!canSubmitForOthers) return [];
    return users.filter(u => u.id !== currentUser.id && u.role !== 'admin').sort((a, b) => a.name.localeCompare(b.name));
  }, [users, currentUser, canSubmitForOthers]);

  useEffect(() => { loadRequests(); }, []);

  async function loadRequests() {
    setLoading(true);
    try {
      const r = await getTimeOffRequests();
      setRequests(r);
    } catch (e) {
      console.error('Failed to load time off requests:', e);
    }
    setLoading(false);
  }

  // Admin and Foreman can approve any pending request (except their own)
  const pendingForMe = useMemo(() => {
    if (!canApprove) return [];
    return requests.filter(r => r.status === 'pending' && r.userId !== currentUser.id);
  }, [requests, canApprove, currentUser.id]);

  const myRequests = useMemo(() => {
    // Include requests submitted BY me or FOR me
    return requests.filter(r => r.userId === currentUser.id || r.submittedBy === currentUser.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [requests, currentUser.id]);

  const allRequests = useMemo(() => {
    return [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [requests]);

  function getUserName(userId: string) {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  }

  function countDays(start: string, end: string): number {
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    let count = 0;
    const d = new Date(s);
    while (d <= e) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) count++; // weekdays only
      d.setDate(d.getDate() + 1);
    }
    return count;
  }

  async function submitRequest() {
    if (!startDate || !endDate) return;
    if (new Date(endDate) < new Date(startDate)) {
      alert('End date must be on or after start date');
      return;
    }
    setSaving(true);
    setSubmitError('');

    const targetUserId = submitForUserId || currentUser.id;
    const newReq: TimeOffRequest = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: targetUserId,
      startDate,
      endDate,
      type,
      reason,
      status: 'pending',
      hoursPerDay,
      createdAt: new Date().toISOString(),
      ...(submitForUserId ? { submittedBy: currentUser.id } : {}),
    };

    try {
      const updated = [...requests, newReq];
      await saveTimeOffRequests(updated);
      setRequests(updated);
      setShowForm(false);
      setStartDate('');
      setEndDate('');
      setType('pto');
      setReason('');
      setHoursPerDay(8);
      setSubmitForUserId('');
    } catch (e: any) {
      console.error('Submit failed:', e);
      setSubmitError(e?.message || 'Failed to submit. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function approveRequest(id: string) {
    try {
      const updated = requests.map(r =>
        r.id === id ? { ...r, status: 'approved' as TimeOffStatus, approvedBy: currentUser.id, approvedAt: new Date().toISOString() } : r
      );
      await saveTimeOffRequests(updated);
      setRequests(updated);
    } catch (e) {
      console.error('Approve failed:', e);
      alert('Failed to approve. Please try again.');
    }
  }

  async function denyRequest() {
    if (!denyingId || !denialReason.trim()) return;
    try {
      const updated = requests.map(r =>
        r.id === denyingId ? { ...r, status: 'denied' as TimeOffStatus, deniedBy: currentUser.id, deniedAt: new Date().toISOString(), denialReason: denialReason.trim() } : r
      );
      await saveTimeOffRequests(updated);
      setRequests(updated);
      setDenyingId(null);
      setDenialReason('');
    } catch (e) {
      console.error('Deny failed:', e);
      alert('Failed to deny. Please try again.');
    }
  }

  async function cancelRequest(id: string) {
    if (!confirm('Cancel this time off request?')) return;
    try {
      const updated = requests.filter(r => r.id !== id);
      await saveTimeOffRequests(updated);
      setRequests(updated);
    } catch (e) {
      console.error('Cancel failed:', e);
      alert('Failed to cancel. Please try again.');
    }
  }

  function formatDateRange(start: string, end: string) {
    const s = new Date(start + 'T12:00:00');
    const e = new Date(end + 'T12:00:00');
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (start === end) return s.toLocaleDateString('en-US', opts);
    return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', opts)}`;
  }

  function RequestCard({ req, showUser, showActions }: { req: TimeOffRequest; showUser?: boolean; showActions?: boolean }) {
    const days = countDays(req.startDate, req.endDate);
    const totalHours = days * req.hoursPerDay;
    const badge = STATUS_BADGES[req.status];

    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            {showUser && <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#111827' }}>{getUserName(req.userId)}</div>}
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{TIME_OFF_LABELS[req.type]}</div>
          </div>
          <span style={{ background: badge.bg, color: badge.text, padding: '4px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            {badge.label}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#6b7280', marginBottom: 8, flexWrap: 'wrap' }}>
          <span>📅 {formatDateRange(req.startDate, req.endDate)}</span>
          <span>{days} day{days !== 1 ? 's' : ''}</span>
          <span>{totalHours}h</span>
        </div>

        {req.hoursPerDay !== 8 && (
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{req.hoursPerDay}h per day (partial day)</div>
        )}

        {/* Submitted by someone else */}
        {req.submittedBy && req.submittedBy !== req.userId && (
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontStyle: 'italic' }}>
            Submitted by {getUserName(req.submittedBy)}
          </div>
        )}

        {/* Reason — only visible to admin, foreman, office */}
        {canSeeReasons && req.reason && (
          <div style={{ fontSize: 14, color: '#374151', background: '#f3f4f6', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
            📝 {req.reason}
          </div>
        )}

        {/* Denial reason — visible to requester + those who can see reasons */}
        {req.status === 'denied' && req.denialReason && (req.userId === currentUser.id || canSeeReasons) && (
          <div style={{ fontSize: 14, color: '#991b1b', background: '#fee2e2', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
            ❌ Denied: {req.denialReason}
          </div>
        )}

        {req.approvedBy && (
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Approved by {getUserName(req.approvedBy)}</div>
        )}

        {/* Actions for approvers */}
        {showActions && req.status === 'pending' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={() => approveRequest(req.id)}
              style={{ flex: 1, padding: '12px', background: '#059669', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              ✅ Approve
            </button>
            <button
              onClick={() => { setDenyingId(req.id); setDenialReason(''); }}
              style={{ flex: 1, padding: '12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              ❌ Deny
            </button>
          </div>
        )}

        {/* Cancel for own pending requests */}
        {req.userId === currentUser.id && req.status === 'pending' && !showActions && (
          <button
            onClick={() => cancelRequest(req.id)}
            style={{ marginTop: 8, padding: '8px 16px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel Request
          </button>
        )}
      </div>
    );
  }

  if (loading) return <div style={{ padding: 20, textAlign: 'center', color: '#9ca3af' }}>Loading time off requests...</div>;

  const tabs = [
    { id: 'my' as const, label: '📋 My Requests', count: myRequests.length },
    ...(canApprove ? [{ id: 'approve' as const, label: '✅ Approve', count: pendingForMe.length }] : []),
    ...((isAdmin || isForeman || isOffice) ? [{ id: 'all' as const, label: '📊 All Requests', count: allRequests.length }] : []),
  ];

  return (
    <div style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 20, color: '#f3f4f6' }}>🏖️ Time Off</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
        >
          {showForm ? '✕ Cancel' : '+ Request Time Off'}
        </button>
      </div>

      {/* Request Form */}
      {showForm && (
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 16, marginBottom: 16, border: '2px solid #2563eb' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1e3a5f' }}>New Request</div>

          {/* Submit for others (admin/foreman only) */}
          {canSubmitForOthers && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>Request For</label>
              <select
                value={submitForUserId}
                onChange={e => setSubmitForUserId(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">Myself ({currentUser.name})</option>
                {crewMembers.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>Start Date</label>
              <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); if (!endDate) setEndDate(e.target.value); }}
                style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate}
                style={inputStyle} />
            </div>
          </div>

          {startDate && endDate && (
            <div style={{ fontSize: 14, color: '#2563eb', fontWeight: 600, marginBottom: 12 }}>
              📅 {countDays(startDate, endDate)} weekday{countDays(startDate, endDate) !== 1 ? 's' : ''} ({countDays(startDate, endDate) * hoursPerDay}h total)
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {(Object.keys(TIME_OFF_LABELS) as TimeOffType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  style={{
                    padding: '10px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    border: type === t ? '2px solid #2563eb' : '1px solid #d1d5db',
                    background: type === t ? '#dbeafe' : '#fff', color: type === t ? '#1d4ed8' : '#374151'
                  }}>
                  {TIME_OFF_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>Hours per Day</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[4, 6, 8].map(h => (
                <button key={h} onClick={() => setHoursPerDay(h)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    border: hoursPerDay === h ? '2px solid #2563eb' : '1px solid #d1d5db',
                    background: hoursPerDay === h ? '#dbeafe' : '#fff', color: hoursPerDay === h ? '#1d4ed8' : '#374151'
                  }}>
                  {h}h
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, color: '#374151' }}>
              Reason <span style={{ color: '#9ca3af', fontWeight: 400 }}>(only visible to management)</span>
            </label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Optional — appointment, vacation, etc."
              rows={2} style={{ ...inputStyle, resize: 'vertical' as const }} />
          </div>

          {submitError && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 12px', borderRadius: 8, marginBottom: 12, fontSize: 14 }}>
              ⚠️ {submitError}
            </div>
          )}

          <button onClick={submitRequest} disabled={!startDate || !endDate || saving}
            style={{
              width: '100%', padding: 14, background: !startDate || !endDate ? '#9ca3af' : '#2563eb', color: '#fff',
              border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: !startDate || !endDate ? 'default' : 'pointer'
            }}>
            {saving ? 'Submitting...' : submitForUserId ? `📤 Submit for ${getUserName(submitForUserId)}` : '📤 Submit Request'}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#f3f4f6', borderRadius: 10, padding: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: tab === t.id ? '#ffffff' : 'transparent', color: tab === t.id ? '#111827' : '#6b7280',
              boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', position: 'relative'
            }}>
            {t.label}
            {t.count > 0 && (
              <span style={{
                marginLeft: 4, background: t.id === 'approve' ? '#dc2626' : '#6b7280',
                color: '#fff', borderRadius: 10, padding: '1px 6px', fontSize: 11
              }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* My Requests Tab */}
      {tab === 'my' && (
        <div>
          {myRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🏖️</div>
              <div>No time off requests yet</div>
            </div>
          ) : (
            myRequests.map(r => <RequestCard key={r.id} req={r} showUser={r.userId !== currentUser.id} />)
          )}
        </div>
      )}

      {/* Approve Tab */}
      {tab === 'approve' && canApprove && (
        <div>
          {pendingForMe.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
              <div>No pending requests to review</div>
            </div>
          ) : (
            pendingForMe.map(r => <RequestCard key={r.id} req={r} showUser showActions />)
          )}
        </div>
      )}

      {/* All Tab */}
      {tab === 'all' && (isAdmin || isForeman || isOffice) && (
        <div>
          {allRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No requests yet</div>
          ) : (
            allRequests.map(r => <RequestCard key={r.id} req={r} showUser />)
          )}
        </div>
      )}

      {/* Deny Reason Modal */}
      {denyingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 400 }}>
            <h3 style={{ margin: '0 0 12px', color: '#111827' }}>❌ Deny Request</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 12px' }}>A reason is required so the employee knows why.</p>
            <textarea
              value={denialReason}
              onChange={e => setDenialReason(e.target.value)}
              placeholder="Enter denial reason..."
              rows={3}
              autoFocus
              style={{ ...inputStyle, resize: 'vertical' as const, marginBottom: 12 }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setDenyingId(null); setDenialReason(''); }}
                style={{ flex: 1, padding: 12, background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={denyRequest} disabled={!denialReason.trim()}
                style={{ flex: 1, padding: 12, background: denialReason.trim() ? '#dc2626' : '#9ca3af', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: denialReason.trim() ? 'pointer' : 'default' }}>
                Deny Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
