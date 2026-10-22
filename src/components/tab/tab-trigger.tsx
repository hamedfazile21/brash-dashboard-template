import type { FC, ReactNode } from 'react'
import { tabId, panelId, useTabsContext } from './tab-provider'
import type { TabsVariant } from './tab-provider'

// pill / underline / vertical draw their active state with the list's
// sliding indicator, so here they only change text color
function triggerClasses(variant: TabsVariant, isActive: boolean) {
  switch (variant) {
    case 'pill':
      return `z-10 flex shrink-0 items-center gap-x-2 rounded-lg px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-muted hover:text-foreground'
      }`
    case 'underline':
      return `flex shrink-0 items-center gap-x-2 px-0.5 pb-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        isActive ? 'text-primary' : 'text-muted hover:text-foreground'
      }`
    case 'boxed':
      return `flex items-center gap-x-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'border-primary/40 bg-primary/10 text-primary shadow-sm shadow-primary/10'
          : 'border-borderColor text-muted hover:border-muted/40 hover:bg-surface-hover/60 hover:text-foreground'
      }`
    case 'vertical':
      return `z-10 flex w-full items-center gap-x-2.5 rounded-lg px-3 py-2 text-start text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'text-primary'
          : 'text-muted hover:bg-surface-hover/50 hover:text-foreground'
      }`
    case 'circle':
    case 'circle-vertical':
      return `flex size-12 items-center justify-center rounded-full transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15'
          : 'bg-surface-hover text-muted hover:text-foreground'
      }`
  }
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  disabled?: boolean
  /** Accessible name for icon-only triggers (circle variants) */
  label?: string
}

const TabsTrigger: FC<TabsTriggerProps> = ({
  value,
  children,
  disabled = false,
  label,
}) => {
  const { value: activeValue, setValue, variant, baseId } = useTabsContext()
  const isActive = value === activeValue

  return (
    <button
      type="button"
      role="tab"
      disabled={disabled}
      id={tabId(baseId, value)}
      aria-selected={isActive}
      aria-controls={panelId(baseId, value)}
      aria-label={label}
      title={label}
      // Roving tabindex: only the active tab is in the Tab order; arrows move within
      tabIndex={isActive ? 0 : -1}
      onClick={() => setValue(value)}
      className={`relative outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-40 ${triggerClasses(variant, isActive)}`}
    >
      {children}
    </button>
  )
}

export default TabsTrigger
