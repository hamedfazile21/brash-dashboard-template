import { useState } from 'react'
import type { ReactNode } from 'react'
import { AccordionContext, type AccordionVariant } from './accordion-provider'
import AccordionContent from './accordion-content'
import AccordionTrigger from './accordion-trigger'
import AccordionItem from './accordion-item'

interface AccordionProps {
  children: ReactNode
  /** 'single' = only one item open at a time. 'multiple' = any number open. */
  type?: 'single' | 'multiple'
  /** In 'single' mode, whether clicking the open item closes it again. Default true. */
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: AccordionVariant
  className?: string
}

const Accordion = ({
  children,
  type = 'single',
  collapsible = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'simple',
  className = '',
}: AccordionProps) => {
  const initial = defaultValue ?? (type === 'multiple' ? [] : '')
  const [uncontrolled, setUncontrolled] = useState<string | string[]>(initial)
  const isControlled = controlledValue !== undefined
  const current = isControlled ? controlledValue : uncontrolled

  const openSet = new Set(
    Array.isArray(current) ? current : current ? [current] : [],
  )

  const commit = (next: string | string[]) => {
    if (!isControlled) setUncontrolled(next)
    onValueChange?.(next)
  }

  const toggle = (itemValue: string) => {
    if (type === 'multiple') {
      const arr = Array.isArray(current) ? current : []
      commit(
        arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue],
      )
      return
    }
    // single mode
    const isOpen = current === itemValue
    if (isOpen) {
      commit(collapsible ? '' : itemValue)
    } else {
      commit(itemValue)
    }
  }

  const listGap =
    variant === 'bordered' || variant === 'boxed'
      ? 'flex flex-col gap-y-2'
      : 'flex flex-col'

  return (
    <AccordionContext.Provider
      value={{ isOpen: (v) => openSet.has(v), toggle, variant }}
    >
      <div className={`${listGap} ${className}`}>{children}</div>
    </AccordionContext.Provider>
  )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
