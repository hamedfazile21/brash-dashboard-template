import { useId, type ReactNode } from 'react'
import {
  useAccordionContext,
  useAccordionItemContext,
  type AccordionVariant,
} from './accordion-provider'

const AccordionContent = ({ children }: { children: ReactNode }) => {
  const { isOpen: isOpenFn, variant } = useAccordionContext()
  const { value } = useAccordionItemContext()
  const isOpen = isOpenFn(value)
  const id = useId()

  const contentPadding: Record<AccordionVariant, string> = {
    simple: 'pb-3.5',
    bordered: 'px-4 pb-3.5',
    boxed: 'px-4 pb-3.5 mt-2',
    icon: 'pb-3.5 pl-[42px]',
    plusMinus: 'pb-3.5',
    ghost: 'pb-2.5',
  }

  return (
    <div
      id={`accordion-panel-${id}`}
      role="region"
      aria-labelledby={`accordion-trigger-${id}`}
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden">
        <div
          className={`text-sm leading-relaxed text-muted ${contentPadding[variant]}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccordionContent
