import type { ReactNode } from 'react'
import { useTabsContext, type TabsVariant } from './tab-provider'

const listVariantClasses: Record<TabsVariant, string> = {
  pill: 'inline-flex items-center gap-x-1 rounded-lg bg-surface-hover p-1',
  underline: 'flex items-center gap-x-5 border-b border-borderColor',
  boxed: 'inline-flex items-center gap-x-2',
  vertical:
    'flex w-40 shrink-0 flex-col items-stretch gap-y-1 ltr:border-r rtl:border-l border-borderColor ltr:pr-3 rtl:pl-3',
  circle: 'flex items-center gap-x-2 border-b border-borderColor pb-3',
  'circle-vertical':
    'flex w-18 shrink-0 flex-col items-stretch gap-y-2 ltr:border-r rtl:border-l border-borderColor ltr:pr-3 rtl:pl-3',
}

const TabsList = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  const { variant } = useTabsContext()
  return (
    <div
      role="tablist"
      className={`${listVariantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

export default TabsList
