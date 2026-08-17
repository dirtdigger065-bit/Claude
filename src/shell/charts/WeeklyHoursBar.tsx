import React, { useState } from 'react';

interface DayValue {
  label: string;
  date: string;
  hours: number;
}

interface Props {
  days: DayValue[];
  todayStr: string;
}

// Single-series magnitude chart (hours/day this pay period). One hue, today
// emphasized — no legend needed for a single series with one highlighted point.
export const WeeklyHoursBar: React.FC<Props> = ({ days, todayStr }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const max = Math.max(1, ...days.map(d => d.hours));
  const W = 280;
  const H = 96;
  const barW = W / days.length;
  const padTop = 4;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" style={{ height: 108 }} role="img" aria-label="Hours logged per day this week">
        {/* baseline */}
        <line x1={0} y1={H} x2={W} y2={H} stroke="currentColor" className="text-base-300" strokeWidth={1} />
        {days.map((d, i) => {
          const isToday = d.date === todayStr;
          const barH = d.hours <= 0 ? 0 : Math.max(3, (d.hours / max) * (H - padTop));
          const x = i * barW + barW * 0.22;
          const w = barW * 0.56;
          const y = H - barH;
          return (
            <g
              key={d.date}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              className="cursor-default"
            >
              {/* full-height hit target, wider than the visual bar */}
              <rect x={i * barW} y={0} width={barW} height={H} fill="transparent" />
              {barH > 0 && (
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={barH}
                  rx={4}
                  className={isToday ? 'fill-primary' : 'fill-primary/35'}
                />
              )}
              <text
                x={i * barW + barW / 2}
                y={H + 13}
                textAnchor="middle"
                className={`text-[9px] ${isToday ? 'fill-primary font-bold' : 'fill-base-content/40'}`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {hoverIdx !== null && (
        <div className="absolute -top-1 left-0 right-0 flex justify-center pointer-events-none">
          <div
            className="badge badge-neutral badge-sm shadow"
            style={{ transform: `translateX(${(hoverIdx / days.length) * 100 - 50}%)` }}
          >
            {days[hoverIdx].label}: {days[hoverIdx].hours.toFixed(1)}h
          </div>
        </div>
      )}
    </div>
  );
};
