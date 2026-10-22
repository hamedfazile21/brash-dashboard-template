import { createContext, useContext } from 'react'

export type TabsVariant =
  'pill' | 'underline' | 'boxed' | 'vertical' | 'circle' | 'circle-vertical'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  variant: TabsVariant
  /** Shared prefix so each trigger's aria-controls matches its panel's id */
  baseId: string
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within <Tabs>')
  }
  return context
}

export const isVerticalVariant = (variant: TabsVariant) =>
  variant === 'vertical' || variant === 'circle-vertical'

/** Variants whose active state is a sliding indicator owned by the list */
export const hasIndicator = (variant: TabsVariant) =>
  variant === 'pill' || variant === 'underline' || variant === 'vertical'

export const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`
export const panelId = (baseId: string, value: string) =>
  `${baseId}-panel-${value}`
