import { useId } from 'react'
import type { FC, ReactNode } from 'react'
import { AccordionItemContext, useAccordionContext } from './accordion-provider'
import type { AccordionVariant } from './accordion-provider'

interface props {
  value: string
  children: ReactNode
  disabled?: boolean
}

const AccordionItem: FC<props> = ({ value, children, disabled = false }) => {
  const { variant, isOpen } = useAccordionContext()
  const id = useId()
  const open = isOpen(value)

  const itemWrapperClasses: Record<AccordionVariant, string> = {
    simple: 'border-b border-borderColor last:border-b-0',
    bordered: `card overflow-hidden p-0! transition-colors ${open ? 'border-primary/30!' : ''}`,
    boxed: `overflow-hidden rounded-xl transition-colors ${open ? 'bg-primary/5' : 'bg-surface-hover/40'}`,
    icon: 'border-b border-borderColor last:border-b-0',
    plusMinus: 'border-b border-borderColor last:border-b-0',
    ghost: '',
  }

  return (
    <AccordionItemContext.Provider value={{ value, disabled, id }}>
      <div className={itemWrapperClasses[variant]}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

export default AccordionItem
