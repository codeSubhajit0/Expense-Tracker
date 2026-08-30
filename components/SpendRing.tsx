"use client";

export interface RingSegment {
  key: string;
  value: number;
  color: string; // hex
  label: string;
}

export default function SpendRing({
  segments,
  size = 220,
  strokeWidth = 26,
  centerLabel,
  centerValue,
}: {
  segments: RingSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel: string;
  centerValue: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const gapDeg = segments.length > 1 ? 5 : 0;
  const gapLength = (gapDeg / 360) * circumference;

  let cumulative = 0;
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((seg) => {
      const fraction = total > 0 ? seg.value / total : 0;
      const rawLength = fraction * circumference;
      const length = Math.max(rawLength - gapLength, rawLength > 0 ? 2 : 0);
      const offset = -cumulative;
      cumulative += rawLength;
      return { ...seg, length, offset };
    });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EAE3D2"
            strokeWidth={strokeWidth}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${arc.length} ${circumference - arc.length}`}
              strokeDashoffset={arc.offset}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="font-display text-3xl font-semibold tracking-tight text-ink tabular">
          {centerValue}
        </span>
        <span className="mt-1 text-xs text-ink/45">{centerLabel}</span>
      </div>
    </div>
  );
}
