import { ChevronDown, Minus, Plus } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import {
  useAccordionContext,
  useAccordionItemContext,
} from './accordion-provider'
import type { AccordionVariant } from './accordion-provider'

function triggerClasses(variant: AccordionVariant, isOpen: boolean) {
  switch (variant) {
    case 'simple':
      return 'py-3.5 text-foreground hover:text-primary'
    case 'bordered':
      return `px-4 py-3.5 text-foreground hover:text-primary ${isOpen ? 'text-primary' : ''}`
    case 'boxed':
      return `px-4 py-3.5 ${isOpen ? 'text-primary' : 'text-foreground hover:bg-surface-hover/60'}`
    case 'icon':
      return 'py-3.5 text-foreground hover:text-primary'
    case 'plusMinus':
      return 'py-3.5 text-foreground hover:text-primary'
    case 'ghost':
      return `py-2.5 text-sm ${isOpen ? 'text-primary' : 'text-muted hover:text-foreground'}`
  }
}

interface props {
  children: ReactNode
  icon?: ReactNode
}

const AccordionTrigger: FC<props> = ({ children, icon }) => {
  const { isOpen: isOpenFn, toggle, variant } = useAccordionContext()
  const { value, disabled, id } = useAccordionItemContext()
  const isOpen = isOpenFn(value)

  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      aria-controls={`accordion-panel-${id}`}
      id={`accordion-trigger-${id}`}
      onClick={() => toggle(value)}
      className={`flex w-full items-center justify-between gap-x-3 text-start text-sm font-medium
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset
        disabled:pointer-events-none disabled:opacity-40
        ${triggerClasses(variant, isOpen)}`}
    >
      <span className="flex items-center gap-x-2.5">
        {variant === 'icon' && icon && (
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ${
              isOpen
                ? 'bg-primary/15 text-primary'
                : 'bg-surface-hover text-muted'
            }`}
          >
            {icon}
          </span>
        )}
        {children}
      </span>

      {variant === 'plusMinus' ? (
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen ? 'bg-primary text-white' : 'bg-surface-hover text-muted'
          }`}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      ) : (
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted'}`}
        />
      )}
    </button>
  )
}

export default AccordionTrigger
