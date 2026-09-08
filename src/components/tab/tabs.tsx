import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { TabsContext, type TabsVariant } from './tab-provider'
import TabsContent from './tabs-content'
import TabsTrigger from './tab-trigger'
import TabsList from './tab-list'

interface TabsProps {
  children: ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  className?: string
}

function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'pill',
  className = '',
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next)
  }

  return (
    <TabsContext.Provider value={{ value, setValue, variant }}>
      <div
        className={
          variant === 'vertical' || variant === 'circle-vertical'
            ? `flex gap-x-6 ${className}`
            : className
        }
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
