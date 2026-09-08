import { createContext, useContext } from 'react'

export type CardView =
  'default' | 'stat' | 'media' | 'hover' | 'horizontal' | 'profile'

interface CardContextValue {
  view: CardView
}

export const CardContext = createContext<CardContextValue | null>(null)

export function useCardContext(): CardContextValue {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('Card.* sub-components must be used within <Card>')
  }
  return context
}
