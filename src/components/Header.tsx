import React from 'react';
import { HardHat, LogOut, User as UserIcon, LayoutGrid } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
  onGoHub?: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  office: 'Office',
  foreman: 'Foreman',
  crew: 'Crew',
  payroll: 'Payroll',
  estimator: 'Estimator',
};

const ROLE_COLORS: Record<string, string> = {
  admin: 'badge-error',
  office: 'badge-info',
  foreman: 'badge-warning',
  crew: 'badge-success',
  payroll: 'badge-accent',
  estimator: 'badge-secondary',
};

export const Header: React.FC<Props> = ({ user, onLogout, onGoHub }) => {
  return (
    <div className="navbar bg-base-200 px-3 py-1 min-h-0 gap-2">
      <div className="flex-1 flex items-center gap-2 min-w-0">
        {onGoHub && (
          <button className="btn btn-ghost btn-xs btn-circle" onClick={onGoHub} title="Back to dashboard">
            <LayoutGrid size={16} />
          </button>
        )}
        <HardHat size={20} className="text-primary shrink-0" />
        <span className="font-bold text-sm truncate">RDMPE Field Ops</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <UserIcon size={14} className="opacity-60" />
          <span className="text-xs font-medium">{user.name}</span>
          <span className={`badge badge-xs ${ROLE_COLORS[user.role] || 'badge-ghost'}`}>
            {ROLE_LABELS[user.role] || user.role}
          </span>
        </div>
        <button className="btn btn-ghost btn-xs btn-circle" onClick={onLogout} title="Sign out">
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};
