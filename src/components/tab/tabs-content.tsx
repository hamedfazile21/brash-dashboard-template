import type { ReactNode } from 'react'
import {
  isVerticalVariant,
  panelId,
  tabId,
  useTabsContext,
} from './tab-provider'

const TabsContent = ({
  value,
  children,
  className = '',
}: {
  value: string
  children: ReactNode
  className?: string
}) => {
  const { value: activeValue, variant, baseId } = useTabsContext()
  if (value !== activeValue) return null

  return (
    <div
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      tabIndex={0}
      className={`animate-fade-up outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg ${
        isVerticalVariant(variant) ? 'min-w-0 flex-1' : 'mt-5'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default TabsContent
