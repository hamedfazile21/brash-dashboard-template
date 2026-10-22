import type { ReactNode } from 'react'
import {
  useAccordionContext,
  useAccordionItemContext,
} from './accordion-provider'
import type { AccordionVariant } from './accordion-provider'

const AccordionContent = ({ children }: { children: ReactNode }) => {
  const { isOpen: isOpenFn, variant } = useAccordionContext()
  const { value, id } = useAccordionItemContext()
  const isOpen = isOpenFn(value)

  const contentPadding: Record<AccordionVariant, string> = {
    simple: 'pb-3.5',
    bordered: 'px-4 pb-3.5',
    boxed: 'px-4 pb-4',
    icon: 'pb-3.5 ps-[42px]',
    plusMinus: 'pb-3.5',
    ghost: 'pb-2.5',
  }

  return (
    <div
      id={`accordion-panel-${id}`}
      role="region"
      aria-labelledby={`accordion-trigger-${id}`}
      // Closed panels stay mounted for the height animation, so take them
      // out of the tab order and the accessibility tree
      aria-hidden={!isOpen}
      {...(!isOpen && { inert: '' })}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
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
