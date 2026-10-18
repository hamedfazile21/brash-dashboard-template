import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Current timestamp, refreshed every second */
export function useNow() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  return now
}

const pad = (n: number) => String(n).padStart(2, '0')

interface CountdownProps {
  /** Milliseconds left */
  remaining: number
  withDays?: boolean
}

function Countdown({ remaining, withDays = false }: CountdownProps) {
  const { t } = useTranslation()
  const ms = Math.max(0, remaining)

  const units = [
    ...(withDays
      ? [{ label: 'Days', value: Math.floor(ms / 86_400_000) }]
      : []),
    {
      label: 'Hours',
      value: Math.floor(withDays ? (ms / 3_600_000) % 24 : ms / 3_600_000),
    },
    { label: 'Minutes', value: Math.floor((ms / 60_000) % 60) },
    { label: 'Seconds', value: Math.floor((ms / 1000) % 60) },
  ]

  return (
    <div className="flex items-center gap-2 sm:gap-3" dir="ltr">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div className="card flex w-16 flex-col items-center p-2.5! sm:w-20">
            <span className="font-mono text-2xl font-semibold text-foreground tabular-nums sm:text-3xl">
              {pad(value)}
            </span>
            <span className="mt-0.5 text-[10px] tracking-wider text-muted uppercase">
              {t(label)}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-semibold text-muted/60">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Countdown
