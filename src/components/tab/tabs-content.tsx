import type { ReactNode } from 'react'
import { useTabsContext } from './tab-provider'

const TabsContent = ({
  value,
  children,
  className = '',
}: {
  value: string
  children: ReactNode
  className?: string
}) => {
  const { value: activeValue, variant } = useTabsContext()
  if (value !== activeValue) return null

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={`focus-visible:outline-none ${variant === 'vertical' ? 'flex-1' : 'mt-4'} ${className}`}
    >
      {children}
    </div>
  )
}

export default TabsContent
