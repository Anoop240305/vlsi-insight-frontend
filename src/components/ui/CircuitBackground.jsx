import React from 'react'

// A generative-looking but fixed schematic: orthogonal traces meeting at
// via nodes, evoking a die floorplan rather than a generic "tech" texture.
// Pure decoration — aria-hidden, sits behind interactive content.
export default function CircuitBackground({ className = '' }) {
  const nodes = [
    [80, 90], [260, 90], [260, 220], [460, 220], [460, 70], [700, 70],
    [700, 300], [180, 300], [180, 430], [520, 430], [520, 540], [860, 540],
    [860, 160], [980, 160], [80, 540], [980, 400],
  ]
  const paths = [
    'M80,90 H260 V220 H460 V70 H700 V300 H180 V430 H520 V540 H860 V160 H980',
    'M80,540 H520',
    'M700,300 V540',
    'M980,160 V400',
    'M260,220 H80',
  ]

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1040 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="traceFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6813F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3FBDB2" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#traceFade)"
            strokeWidth="1.5"
            className="animate-pulse-trace"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2.5} fill="#6EE7DD" opacity="0.5" />
        ))}
      </svg>
    </div>
  )
}
