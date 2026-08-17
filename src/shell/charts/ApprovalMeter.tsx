import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

interface Props {
  pct: number; // 0-100
  approvedCount: number;
  totalCount: number;
}

// A single ratio against a limit -> meter, not a multi-hue gauge. The fill is a
// status color (never alone) paired with an icon + label, per the status-color rule.
export const ApprovalMeter: React.FC<Props> = ({ pct, approvedCount, totalCount }) => {
  const clamped = Math.max(0, Math.min(100, pct));
  const r = 54;
  const cx = 64;
  const cy = 60;
  const circumference = Math.PI * r;
  const dash = (clamped / 100) * circumference;
  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  const zone = clamped >= 90 ? 'good' : clamped >= 60 ? 'warning' : 'critical';
  const zoneMeta = {
    good: { stroke: 'stroke-success', text: 'text-success', Icon: CheckCircle2, label: 'Caught up' },
    warning: { stroke: 'stroke-warning', text: 'text-warning', Icon: AlertTriangle, label: 'Some backlog' },
    critical: { stroke: 'stroke-error', text: 'text-error', Icon: AlertOctagon, label: 'Needs attention' },
  }[zone];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 128 70" className="w-full max-w-[180px]">
        <path d={trackPath} fill="none" strokeWidth={10} strokeLinecap="round" className="stroke-base-300" />
        <path
          d={trackPath}
          fill="none"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className={zoneMeta.stroke}
        />
        <text x={cx} y={cy - 6} textAnchor="middle" className={`text-[22px] font-black fill-current ${zoneMeta.text}`}>
          {Math.round(clamped)}%
        </text>
      </svg>
      <div className={`flex items-center gap-1 text-xs font-semibold -mt-1 ${zoneMeta.text}`}>
        <zoneMeta.Icon size={13} /> {zoneMeta.label}
      </div>
      <div className="text-[11px] text-base-content/40 mt-0.5">{approvedCount}/{totalCount} entries approved</div>
    </div>
  );
};
