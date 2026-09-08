import { useId, type FC, type ReactNode } from 'react'
import { useTabsContext, type TabsVariant } from './tab-provider'

function triggerClasses(variant: TabsVariant, isActive: boolean) {
  switch (variant) {
    case 'pill':
      return `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted hover:text-foreground'
      }`
    case 'underline':
      return `border-b-2 px-0.5 pb-2.5 text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-muted hover:text-foreground'
      }`
    case 'boxed':
      return `rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'border-primary/40 bg-primary/10 text-primary'
          : 'border-borderColor text-muted hover:bg-surface-hover hover:text-foreground'
      }`
    case 'vertical':
      return `rounded-md px-3 py-2 text-left text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-primary/15 text-primary'
          : 'text-muted hover:bg-surface-hover hover:text-foreground'
      }`
    case 'circle':
    case 'circle-vertical':
      return `rounded-full flex flex-col items-center justify-center size-[50px] p-2 text-left text-sm font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-primary/15 text-primary'
          : 'text-muted bg-surface-hover hover:text-foreground '
      }`
  }
}

interface props {
  value: string
  children: ReactNode
  disabled?: boolean
}

const TabsTrigger: FC<props> = ({ value, children, disabled = false }) => {
  const { value: activeValue, setValue, variant } = useTabsContext()
  const isActive = value === activeValue
  const id = useId()

  return (
    <button
      type="button"
      role="tab"
      disabled={disabled}
      id={`tab-${id}-${value}`}
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-controls={`panel-${id}-${value}`}
      tabIndex={isActive && !disabled ? 0 : -1}
      onClick={() => setValue(value)}
      className={`relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:bg-transparent
        ${triggerClasses(variant, isActive)}`}
    >
      {children}
    </button>
  )
}

export default TabsTrigger
