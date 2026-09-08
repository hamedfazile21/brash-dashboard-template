import { createContext, useContext } from 'react'

export type TabsVariant =
  'pill' | 'underline' | 'boxed' | 'vertical' | 'circle' | 'circle-vertical'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  variant: TabsVariant
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within <Tabs>')
  }
  return context
}
