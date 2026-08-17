import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, Check, X, Shield, HardHat, Briefcase, UserCheck, DollarSign, Calendar, Link, Copy, Phone, Bell, BellOff, Calculator } from 'lucide-react';
import type { User, UserRole, Holiday, Equipment } from '../types';
import { EQUIPMENT_TYPES } from '../types';
import { getUsers, saveUsers, getHolidays, saveHolidays, getEquipment, saveEquipment, genId, now } from '../utils/supabase';

interface Props {
  currentUser: User;
  onBack: () => void;
  onUsersChanged: () => void;
}

const ROLE_OPTIONS: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'admin', label: 'Admin', icon: <Shield size={14} />, desc: 'Full access, manage users' },
  { value: 'office', label: 'Office', icon: <Briefcase size={14} />, desc: 'Dashboard, reports, all jobs' },
  { value: 'foreman', label: 'Foreman', icon: <HardHat size={14} />, desc: 'Field ops, approve time (step 1)' },
  { value: 'crew', label: 'Crew', icon: <UserCheck size={14} />, desc: 'Assigned jobs, log time' },
  { value: 'payroll', label: 'Payroll', icon: <Briefcase size={14} />, desc: 'View approved timecards, no time logging' },
  { value: 'estimator', label: 'Estimator', icon: <Calculator size={14} />, desc: 'Bid Builder only, build & submit bids' },
];

export const UserManagement: React.FC<Props> = ({ currentUser, onBack, onUsersChanged }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('crew');
  const [newPin, setNewPin] = useState('');
  const [newEmpType, setNewEmpType] = useState<'hourly' | 'salary'>('hourly');
  const [newPayRate, setNewPayRate] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('crew');
  const [editPin, setEditPin] = useState('');
  const [editEmpType, setEditEmpType] = useState<'hourly' | 'salary'>('hourly');
  const [editPayRate, setEditPayRate] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editTextReminders, setEditTextReminders] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'users' | 'holidays' | 'equipment'>('users');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [newEquipName, setNewEquipName] = useState('');
  const [newEquipType, setNewEquipType] = useState('Excavator');
  const [newEquipNumber, setNewEquipNumber] = useState('');
  const [editingEquipId, setEditingEquipId] = useState<string | null>(null);
  const [editEquipName, setEditEquipName] = useState('');
  const [editEquipType, setEditEquipType] = useState('');
  const [editEquipNumber, setEditEquipNumber] = useState('');
  const [editEquipStatus, setEditEquipStatus] = useState<'available' | 'maintenance' | 'retired'>('available');
  const [newHolName, setNewHolName] = useState('');
  const [newHolDate, setNewHolDate] = useState('');

  useEffect(() => { loadUsers(); loadHolidays(); loadEquipmentList(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try { setUsers(await getUsers()); } catch {}
    setLoading(false);
  };

  const loadHolidays = async () => {
    try { setHolidays(await getHolidays()); } catch {}
  };

  const loadEquipmentList = async () => {
    try { setEquipmentList(await getEquipment()); } catch {}
  };

  const addEquipment = async () => {
    if (!newEquipName.trim()) return;
    const eq: Equipment = {
      id: genId('equip'), name: newEquipName.trim(), type: newEquipType,
      number: newEquipNumber.trim(), status: 'available', created_at: now(), updated_at: now(),
    };
    const updated = [...equipmentList, eq];
    await saveEquipment(updated);
    setEquipmentList(updated);
    setNewEquipName(''); setNewEquipNumber('');
  };

  const updateEquipment = async (id: string) => {
    const updated = equipmentList.map(eq => eq.id === id ? {
      ...eq, name: editEquipName, type: editEquipType, number: editEquipNumber,
      status: editEquipStatus, updated_at: now(),
    } : eq);
    await saveEquipment(updated);
    setEquipmentList(updated);
    setEditingEquipId(null);
  };

  const deleteEquipment = async (id: string) => {
    const updated = equipmentList.filter(eq => eq.id !== id);
    await saveEquipment(updated);
    setEquipmentList(updated);
  };

  const validatePin = (pin: string, excludeId?: string): string | null => {
    if (pin.length < 4) return 'PIN must be at least 4 digits';
    if (!/^\d+$/.test(pin)) return 'PIN must be numbers only';
    const existing = users.find(u => u.pin === pin && u.id !== excludeId);
    if (existing) return `PIN already used by ${existing.name}`;
    return null;
  };

  const addUser = async () => {
    const err = validatePin(newPin);
    if (err) { setError(err); return; }
    if (!newName.trim()) { setError('Name is required'); return; }
    setError('');
    try {
      const allUsers = await getUsers();
      allUsers.push({
        id: genId('user'), name: newName.trim(), role: newRole,
        pin: newPin, active: true, employeeType: newEmpType,
        payRate: newPayRate ? (newEmpType === 'salary' ? parseFloat((parseFloat(newPayRate) / 2080).toFixed(2)) : parseFloat(newPayRate)) : undefined,
        annualSalary: newEmpType === 'salary' && newPayRate ? parseFloat(newPayRate) : undefined,
        phone: newPhone.trim() || undefined,
        textReminders: !!newPhone.trim(),
        created_at: now(), updated_at: now(),
      });
      await saveUsers(allUsers);
      setNewName(''); setNewPin(''); setNewRole('crew'); setNewEmpType('hourly'); setNewPayRate(''); setNewPhone(''); setShowAdd(false);
      await loadUsers();
      onUsersChanged();
    } catch {}
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditRole(user.role);
    setEditPin(user.pin);
    setEditEmpType(user.employeeType || 'hourly');
    setEditPhone(user.phone || '');
    setEditTextReminders(user.textReminders ?? false);
    // For salary employees, show annual salary if available, otherwise back-calculate from hourly
    if ((user.employeeType || 'hourly') === 'salary') {
      setEditPayRate(user.annualSalary?.toString() || (user.payRate ? (user.payRate * 2080).toFixed(0) : ''));
    } else {
      setEditPayRate(user.payRate?.toString() || '');
    }
    setError('');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const err = validatePin(editPin, editingId);
    if (err) { setError(err); return; }
    if (!editName.trim()) { setError('Name is required'); return; }
    setError('');
    try {
      const allUsers = await getUsers();
      const idx = allUsers.findIndex(u => u.id === editingId);
      if (idx >= 0) {
        allUsers[idx] = {
          ...allUsers[idx], name: editName.trim(), role: editRole, pin: editPin,
          employeeType: editEmpType,
          payRate: editPayRate ? (editEmpType === 'salary' ? parseFloat((parseFloat(editPayRate) / 2080).toFixed(2)) : parseFloat(editPayRate)) : undefined,
          annualSalary: editEmpType === 'salary' && editPayRate ? parseFloat(editPayRate) : undefined,
          phone: editPhone.trim() || undefined,
          textReminders: editTextReminders,
          updated_at: now(),
        };
        await saveUsers(allUsers);
      }
      setEditingId(null);
      await loadUsers();
      onUsersChanged();
    } catch {}
  };

  const toggleActive = async (userId: string) => {
    if (userId === currentUser.id) return;
    try {
      const allUsers = await getUsers();
      const idx = allUsers.findIndex(u => u.id === userId);
      if (idx >= 0) {
        allUsers[idx].active = !allUsers[idx].active;
        allUsers[idx].updated_at = now();
        await saveUsers(allUsers);
      }
      await loadUsers();
      onUsersChanged();
    } catch {}
  };

  const deleteUser = async (userId: string) => {
    if (userId === currentUser.id) return;
    if (!confirm('Delete this user permanently?')) return;
    try {
      let allUsers = await getUsers();
      allUsers = allUsers.filter(u => u.id !== userId);
      await saveUsers(allUsers);
      await loadUsers();
      onUsersChanged();
    } catch {}
  };

  const addHoliday = async () => {
    if (!newHolName.trim() || !newHolDate) return;
    const updated = [...holidays, { id: genId('hol'), name: newHolName.trim(), date: newHolDate }];
    updated.sort((a, b) => a.date.localeCompare(b.date));
    await saveHolidays(updated);
    setHolidays(updated);
    setNewHolName(''); setNewHolDate('');
  };

  const deleteHoliday = async (id: string) => {
    const updated = holidays.filter(h => h.id !== id);
    await saveHolidays(updated);
    setHolidays(updated);
  };

  const ROLE_COLORS: Record<string, string> = { admin: 'badge-error', office: 'badge-info', foreman: 'badge-warning', crew: 'badge-success', payroll: 'badge-accent', estimator: 'badge-secondary' };
  const EMP_COLORS: Record<string, string> = { hourly: 'badge-outline', salary: 'badge-accent' };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-base-200 flex items-center gap-2">
        <button className="btn btn-ghost btn-sm btn-circle" onClick={onBack}><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-bold flex-1">Settings</h2>
        {tab === 'users' && (
          <button className="btn btn-primary btn-sm gap-1" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? <X size={14} /> : <Plus size={14} />} {showAdd ? 'Cancel' : 'Add User'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-base-300">
        <button className={`flex-1 py-2 text-sm font-medium ${tab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-base-content/60'}`} onClick={() => setTab('users')}>
          <UserCheck size={14} className="inline mr-1" /> Users
        </button>
        <button className={`flex-1 py-2 text-sm font-medium ${tab === 'holidays' ? 'border-b-2 border-primary text-primary' : 'text-base-content/60'}`} onClick={() => setTab('holidays')}>
          <Calendar size={14} className="inline mr-1" /> Holidays
        </button>
        <button className={`flex-1 py-2 text-sm font-medium ${tab === 'equipment' ? 'border-b-2 border-primary text-primary' : 'text-base-content/60'}`} onClick={() => setTab('equipment')}>
          🚜 Equipment
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 pb-4 space-y-3">
        {error && <div className="alert alert-error py-2 text-sm">{error}</div>}

        {tab === 'holidays' && (
          <>
            <div className="text-xs text-base-content/60 mb-2">
              Holidays affect payroll — employees get 8h straight time if they work the weekday before or after.
            </div>
            <div className="card bg-base-200">
              <div className="card-body p-3 space-y-2">
                <h3 className="font-semibold text-sm">Add Holiday</h3>
                <input className="input input-bordered input-sm w-full" value={newHolName} onChange={e => setNewHolName(e.target.value)} placeholder="Holiday name" />
                <input className="input input-bordered input-sm w-full" type="date" value={newHolDate} onChange={e => setNewHolDate(e.target.value)} />
                <button className="btn btn-primary btn-sm w-full" onClick={addHoliday} disabled={!newHolName.trim() || !newHolDate}>Add Holiday</button>
              </div>
            </div>
            {holidays.map(h => (
              <div key={h.id} className="card bg-base-200">
                <div className="card-body p-3 flex-row items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{h.name}</div>
                    <div className="text-xs text-base-content/60">{new Date(h.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  <button className="btn btn-ghost btn-xs text-error" onClick={() => deleteHoliday(h.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {holidays.length === 0 && <div className="text-center text-base-content/40 py-8">No holidays set. Default holidays will be used.</div>}
          </>
        )}

        {tab === 'users' && (
          <>
            {/* Invite Link */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Link size={16} className="text-blue-600" />
                <span className="font-semibold text-sm text-blue-800">Crew Invite Link</span>
              </div>
              <p className="text-xs text-blue-600 mb-2">Share this link with new crew members to let them sign up</p>
              <div className="flex gap-2">
                <input className="input input-bordered input-sm flex-1 bg-white text-xs" readOnly
                  value={`${window.location.origin}/?join=rdmpe2026`}
                  onFocus={e => e.target.select()} />
                <button className="btn btn-sm btn-primary gap-1" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/?join=rdmpe2026`);
                  setInviteCopied(true);
                  setTimeout(() => setInviteCopied(false), 2000);
                }}>
                  {inviteCopied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>

            {/* Add user form */}
            {showAdd && (
              <div className="card bg-base-200">
                <div className="card-body p-3 space-y-2">
                  <h3 className="font-semibold text-sm">Add New User</h3>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">Name *</span></label>
                    <input className="input input-bordered input-sm" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">Role *</span></label>
                    <select className="select select-bordered select-sm" value={newRole} onChange={e => setNewRole(e.target.value as UserRole)}>
                      {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label} - {r.desc}</option>)}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">PIN * (4+ digits)</span></label>
                    <input className="input input-bordered input-sm" value={newPin} onChange={e => setNewPin(e.target.value)} placeholder="1234" maxLength={6} type="tel" />
                  </div>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">Employee Type *</span></label>
                    <div className="flex gap-2">
                      <button className={`btn btn-sm flex-1 ${newEmpType === 'hourly' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setNewEmpType('hourly')}>
                        💰 Hourly
                      </button>
                      <button className={`btn btn-sm flex-1 ${newEmpType === 'salary' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setNewEmpType('salary')}>
                        📋 Salary
                      </button>
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">{newEmpType === 'salary' ? 'Annual Salary ($)' : 'Hourly Rate ($/hr)'}</span></label>
                    <div className="input-group">
                      <input className="input input-bordered input-sm w-full" value={newPayRate} onChange={e => setNewPayRate(e.target.value)} placeholder={newEmpType === 'salary' ? '65000' : '25.00'} type="number" step={newEmpType === 'salary' ? '1000' : '0.01'} min="0" />
                    </div>
                    {newEmpType === 'salary' && newPayRate && (
                      <span className="text-xs text-base-content/50 mt-0.5">= ${(parseFloat(newPayRate) / 2080).toFixed(2)}/hr</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label py-0"><span className="label-text text-xs">Phone <span className="text-base-content/40">(for reminders)</span></span></label>
                    <input className="input input-bordered input-sm" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="(515) 555-1234" type="tel" />
                  </div>
                  <button className="btn btn-primary btn-sm w-full" onClick={addUser} disabled={!newName.trim() || !newPin}>Create User</button>
                </div>
              </div>
            )}

            {/* Users list */}
            {loading ? (
              <div className="flex justify-center py-8"><span className="loading loading-spinner loading-md" /></div>
            ) : (
              <>
                <div className="text-xs text-base-content/60">{users.length} users total, {users.filter(u => u.active).length} active</div>
                {users.map(user => (
                  <div key={user.id} className={`card bg-base-200 ${!user.active ? 'opacity-50' : ''}`}>
                    <div className="card-body p-3">
                      {editingId === user.id ? (
                        <div className="space-y-2">
                          <input className="input input-bordered input-sm w-full" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Name" />
                          <select className="select select-bordered select-sm w-full" value={editRole} onChange={e => setEditRole(e.target.value as UserRole)}>
                            {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                          </select>
                          <input className="input input-bordered input-sm w-full" value={editPin} onChange={e => setEditPin(e.target.value)} type="tel" maxLength={6} placeholder="PIN" />
                          <div className="flex gap-2">
                            <button className={`btn btn-sm flex-1 ${editEmpType === 'hourly' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setEditEmpType('hourly')}>
                              💰 Hourly
                            </button>
                            <button className={`btn btn-sm flex-1 ${editEmpType === 'salary' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setEditEmpType('salary')}>
                              📋 Salary
                            </button>
                          </div>
                          <label className="label py-0"><span className="label-text text-xs">{editEmpType === 'salary' ? 'Annual Salary ($)' : 'Hourly Rate ($/hr)'}</span></label>
                          <input className="input input-bordered input-sm w-full" value={editPayRate} onChange={e => setEditPayRate(e.target.value)} type="number" step={editEmpType === 'salary' ? '1000' : '0.01'} min="0" placeholder={editEmpType === 'salary' ? '65000' : '25.00'} />
                          {editEmpType === 'salary' && editPayRate && (
                            <span className="text-xs text-base-content/50 mt-0.5">= ${(parseFloat(editPayRate) / 2080).toFixed(2)}/hr</span>
                          )}
                          <div className="form-control">
                            <label className="label py-0"><span className="label-text text-xs">Phone</span></label>
                            <input className="input input-bordered input-sm w-full" value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="(515) 555-1234" type="tel" />
                          </div>
                          <div className="flex items-center justify-between bg-base-100 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              {editTextReminders ? <Bell size={14} className="text-primary" /> : <BellOff size={14} className="text-base-content/40" />}
                              <span className="text-xs font-medium">Text Reminders</span>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary toggle-sm"
                              checked={editTextReminders} onChange={e => setEditTextReminders(e.target.checked)}
                              disabled={!editPhone.trim()} />
                          </div>
                          <div className="flex gap-2">
                            <button className="btn btn-success btn-sm flex-1 gap-1" onClick={saveEdit}><Check size={14} /> Save</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm">{user.name}</span>
                              <span className={`badge badge-xs ${ROLE_COLORS[user.role] || ''}`}>{user.role}</span>
                              <span className={`badge badge-xs ${EMP_COLORS[user.employeeType || 'hourly'] || 'badge-outline'}`}>
                                {(user.employeeType || 'hourly') === 'salary' ? '📋 Salary' : '💰 Hourly'}
                              </span>
                              {!user.active && <span className="badge badge-xs badge-ghost">Inactive</span>}
                              {user.id === currentUser.id && <span className="badge badge-xs badge-outline">You</span>}
                            </div>
                            <div className="flex gap-3 text-xs text-base-content/60 mt-0.5 flex-wrap">
                              <span>PIN: {user.pin}</span>
                              {user.payRate && (
                                <span className="flex items-center gap-0.5">
                                  <DollarSign size={10} />
                                  {(user.employeeType === 'salary' && user.annualSalary)
                                    ? `${user.annualSalary.toLocaleString()}/yr`
                                    : `${user.payRate.toFixed(2)}/hr`}
                                </span>
                              )}
                              {user.phone && (
                                <span className="flex items-center gap-0.5">
                                  <Phone size={10} /> {user.phone}
                                  {user.textReminders && <Bell size={10} className="text-primary" />}
                                </span>
                              )}
                            </div>
                          </div>
                          {user.id !== currentUser.id ? (
                            <div className="flex items-center gap-1">
                              <button className="btn btn-ghost btn-xs" onClick={() => startEdit(user)}><Edit2 size={12} /></button>
                              <button className="btn btn-ghost btn-xs" onClick={() => toggleActive(user.id)}>
                                {user.active ? '🔒' : '🔓'}
                              </button>
                              <button className="btn btn-ghost btn-xs text-error" onClick={() => deleteUser(user.id)}><Trash2 size={12} /></button>
                            </div>
                          ) : (
                            <button className="btn btn-ghost btn-xs" onClick={() => startEdit(user)}><Edit2 size={12} /></button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {/* ━━━ EQUIPMENT TAB ━━━ */}
        {tab === 'equipment' && (
          <>
            <div className="text-xs text-base-content/60 mb-2">
              Manage your equipment — operators can select equipment when clocking in.
            </div>
            <div className="card bg-base-200 p-3 space-y-2">
              <h3 className="font-semibold text-sm">Add Equipment</h3>
              <input className="input input-bordered input-sm w-full" placeholder="Name (e.g., Cat 320)"
                value={newEquipName} onChange={e => setNewEquipName(e.target.value)} />
              <div className="flex gap-2">
                <select className="select select-bordered select-sm flex-1" value={newEquipType}
                  onChange={e => setNewEquipType(e.target.value)}>
                  {EQUIPMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input className="input input-bordered input-sm w-24" placeholder="Unit #"
                  value={newEquipNumber} onChange={e => setNewEquipNumber(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-sm w-full" onClick={addEquipment} disabled={!newEquipName.trim()}>
                <Plus size={14} /> Add Equipment
              </button>
            </div>
            {equipmentList.length === 0 ? (
              <div className="text-center py-8 text-base-content/40 text-sm">No equipment added yet</div>
            ) : (
              equipmentList.map(eq => (
                <div key={eq.id} className="card bg-base-200 p-3">
                  {editingEquipId === eq.id ? (
                    <div className="space-y-2">
                      <input className="input input-bordered input-sm w-full" value={editEquipName}
                        onChange={e => setEditEquipName(e.target.value)} />
                      <div className="flex gap-2">
                        <select className="select select-bordered select-sm flex-1" value={editEquipType}
                          onChange={e => setEditEquipType(e.target.value)}>
                          {EQUIPMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input className="input input-bordered input-sm w-24" placeholder="Unit #" value={editEquipNumber}
                          onChange={e => setEditEquipNumber(e.target.value)} />
                      </div>
                      <select className="select select-bordered select-sm w-full" value={editEquipStatus}
                        onChange={e => setEditEquipStatus(e.target.value as 'available' | 'maintenance' | 'retired')}>
                        <option value="available">✅ Available</option>
                        <option value="maintenance">⚠️ Maintenance</option>
                        <option value="retired">🚫 Retired</option>
                      </select>
                      <div className="flex gap-2">
                        <button className="btn btn-primary btn-sm flex-1" onClick={() => updateEquipment(eq.id)}>
                          <Check size={14} /> Save
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditingEquipId(null)}>
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{eq.name}</span>
                          {eq.number && <span className="badge badge-ghost badge-xs">#{eq.number}</span>}
                          <span className={`badge badge-xs ${eq.status === 'available' ? 'badge-success' : eq.status === 'maintenance' ? 'badge-warning' : 'badge-error'}`}>
                            {eq.status}
                          </span>
                        </div>
                        <div className="text-xs text-base-content/50">{eq.type}</div>
                      </div>
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-xs" onClick={() => {
                          setEditingEquipId(eq.id); setEditEquipName(eq.name);
                          setEditEquipType(eq.type); setEditEquipNumber(eq.number);
                          setEditEquipStatus(eq.status as 'available' | 'maintenance' | 'retired');
                        }}><Edit2 size={12} /></button>
                        <button className="btn btn-ghost btn-xs text-error" onClick={() => deleteEquipment(eq.id)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};
