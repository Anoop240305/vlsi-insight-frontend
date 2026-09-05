import React from 'react'

// Frames content like an IC package outline: tick marks along the top and
// bottom edges stand in for pins, and a silkscreen-style designator sits
// in the corner. Used for the login card so the "VLSI" idea is structural,
// not just a color choice.
export default function ChipFrame({ designator = 'U1', children, className = '' }) {
  const pins = Array.from({ length: 9 })

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-2 left-6 right-6 flex justify-between">
        {pins.map((_, i) => (
          <span key={`t-${i}`} className="h-2 w-1 rounded-b-sm bg-trace-bright" />
        ))}
      </div>
      <div className="absolute -bottom-2 left-6 right-6 flex justify-between">
        {pins.map((_, i) => (
          <span key={`b-${i}`} className="h-2 w-1 rounded-t-sm bg-trace-bright" />
        ))}
      </div>

      <div className="relative rounded-md border border-trace bg-substrate-800/90 shadow-trace backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-trace px-5 py-2.5">
          <span className="font-mono text-[11px] tracking-wide text-ink-500">{designator}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
            <span className="font-mono text-[11px] text-ink-500">PWR</span>
          </span>
        </div>
        <div className="px-7 py-8">{children}</div>
      </div>
    </div>
  )
}
