import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  preview: ReactNode
  label: ReactNode
  hint?: ReactNode
  icon?: ReactNode
}

/** Selectable card with a visual preview — used as a radio inside a radiogroup */
function OptionCard({
  selected,
  onSelect,
  preview,
  label,
  hint,
  icon,
}: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className="group flex flex-col gap-y-2.5 rounded-xl text-start outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ease-out ${
          selected
            ? 'border-primary shadow-lg shadow-primary/20'
            : 'border-borderColor group-hover:-translate-y-0.5 group-hover:border-muted/40 group-hover:shadow-md group-hover:shadow-black/5'
        }`}
      >
        {preview}
        <span
          className={`absolute end-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 ${
            selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex items-center gap-x-2 px-0.5">
        {icon && (
          <span
            className={`shrink-0 transition-colors ${selected ? 'text-primary' : 'text-muted'}`}
          >
            {icon}
          </span>
        )}
        <span
          className={`text-sm font-medium transition-colors ${selected ? 'text-foreground' : 'text-muted group-hover:text-foreground'}`}
        >
          {label}
        </span>
        {hint && <span className="ms-auto text-xs text-muted">{hint}</span>}
      </div>
    </button>
  )
}

export default OptionCard
