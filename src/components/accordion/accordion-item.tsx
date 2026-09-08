import type { FC, ReactNode } from 'react'
import {
  AccordionItemContext,
  useAccordionContext,
  type AccordionVariant,
} from './accordion-provider'

interface props {
  value: string
  children: ReactNode
  disabled?: boolean
}

const AccordionItem: FC<props> = ({ value, children, disabled = false }) => {
  const { variant } = useAccordionContext()

  const itemWrapperClasses: Record<AccordionVariant, string> = {
    simple: 'border-b border-borderColor last:border-b-0',
    bordered: 'card p-0!',
    boxed: 'card p-0!',
    icon: 'border-b border-borderColor last:border-b-0',
    plusMinus: 'border-b border-borderColor last:border-b-0',
    ghost: '',
  }

  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div className={itemWrapperClasses[variant]}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

export default AccordionItem
