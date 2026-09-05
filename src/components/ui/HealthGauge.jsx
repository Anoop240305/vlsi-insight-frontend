import React from 'react'

const STATUS_COLOR = { pass: '#5FB98A', warn: '#E0B84B', fail: '#E1636B' }

export default function HealthGauge({ score = 0, status = 'warn', size = 148 }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - score / 100)
  const color = STATUS_COLOR[status] || STATUS_COLOR.warn

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#232E3D" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-semibold text-ink-100">{score}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">health</span>
      </div>
    </div>
  )
}
