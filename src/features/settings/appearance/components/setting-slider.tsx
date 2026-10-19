import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SettingSliderProps {
  id: string
  title: string
  value: number
  min: number
  max: number
  step: number
  format: (value: number) => string
  /** true when the user changed it — highlights the value and shows reset */
  overridden: boolean
  onChange: (value: number) => void
  onReset: () => void
}

/** Labelled .range slider with a value badge and a per-setting reset */
function SettingSlider({
  id,
  title,
  value,
  min,
  max,
  step,
  format,
  overridden,
  onChange,
  onReset,
}: SettingSliderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between gap-x-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {t(title)}
        </label>
        <span className="flex items-center gap-x-1.5">
          {overridden && (
            <button
              type="button"
              title={t('Reset')}
              aria-label={t('Reset')}
              onClick={onReset}
              className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <RotateCcw size={12} />
            </button>
          )}
          <span
            className={`min-w-12 rounded-md px-1.5 py-0.5 text-center font-mono text-xs tabular-nums ${
              overridden
                ? 'bg-primary/10 text-primary'
                : 'bg-surface-hover text-muted'
            }`}
          >
            {format(value)}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range"
        style={{
          ['--range-progress' as string]: `${((value - min) / (max - min)) * 100}%`,
        }}
      />
    </div>
  )
}

export default SettingSlider
