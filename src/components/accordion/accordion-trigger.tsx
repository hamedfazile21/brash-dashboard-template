import { ChevronDown, Minus, Plus } from 'lucide-react'
import { useId, type FC, type ReactNode } from 'react'
import {
  useAccordionContext,
  useAccordionItemContext,
  type AccordionVariant,
} from './accordion-provider'

function triggerClasses(variant: AccordionVariant, isOpen: boolean) {
  switch (variant) {
    case 'simple':
      return 'py-3.5 text-foreground hover:text-primary'
    case 'bordered':
      return `px-4 py-3.5 text-foreground hover:text-primary ${isOpen ? 'text-primary' : ''}`
    case 'boxed':
      return `px-4 py-3.5 text-foreground ${isOpen ? 'bg-primary/10 text-primary' : 'hover:bg-surface-hover'}`
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
  const { value, disabled } = useAccordionItemContext()
  const isOpen = isOpenFn(value)
  const id = useId()

  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      aria-controls={`accordion-panel-${id}`}
      id={`accordion-trigger-${id}`}
      onClick={() => toggle(value)}
      className={`flex w-full items-center justify-between gap-x-3 text-left text-sm font-medium
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset
        disabled:pointer-events-none disabled:opacity-40
        ${triggerClasses(variant, isOpen)} ${variant === 'boxed' ? 'rounded-lg' : ''}`}
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
        <span className="shrink-0 text-muted">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      ) : (
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      )}
    </button>
  )
}

export default AccordionTrigger
