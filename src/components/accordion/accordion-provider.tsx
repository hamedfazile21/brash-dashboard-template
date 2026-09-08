import { createContext, useContext } from 'react'

export type AccordionVariant =
  'simple' | 'bordered' | 'boxed' | 'icon' | 'plusMinus' | 'ghost'

interface AccordionContextValue {
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
  variant: AccordionVariant
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
)

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error(
      'Accordion.Item/Trigger/Content must be used within <Accordion>',
    )
  }
  return context
}

interface AccordionItemContextValue {
  value: string
  disabled: boolean
}

export const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null)

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error(
      'Accordion.Trigger/Content must be used within <Accordion.Item>',
    )
  }
  return context
}
