import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { hasIndicator, isVerticalVariant, useTabsContext } from './tab-provider'
import type { TabsVariant } from './tab-provider'

const listVariantClasses: Record<TabsVariant, string> = {
  pill: 'inline-flex max-w-full items-center gap-x-1 overflow-x-auto rounded-xl bg-surface-hover/70 p-1',
  underline:
    'flex items-center gap-x-6 overflow-x-auto overflow-y-hidden border-b border-borderColor',
  boxed: 'flex flex-wrap items-center gap-2',
  vertical:
    'flex w-44 shrink-0 flex-col items-stretch gap-y-1 border-e border-borderColor pe-3',
  circle: 'flex items-center gap-x-3 border-b border-borderColor pb-4',
  'circle-vertical':
    'flex shrink-0 flex-col items-center gap-y-3 border-e border-borderColor pe-4',
}

const indicatorClasses: Partial<Record<TabsVariant, string>> = {
  pill: 'inset-y-1 rounded-lg bg-primary shadow-md shadow-primary/25',
  underline: 'bottom-0 h-0.5 rounded-full bg-primary',
  vertical: 'inset-x-0 rounded-lg bg-primary/12',
}

const TabsList = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  const { variant, value } = useTabsContext()
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<CSSProperties | null>(null)
  const vertical = isVerticalVariant(variant)

  // Measure the active trigger so the indicator can glide to it
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !hasIndicator(variant)) return

    const update = () => {
      const active = list.querySelector<HTMLElement>(
        '[role="tab"][aria-selected="true"]',
      )
      if (!active) return setIndicator(null)
      setIndicator(
        vertical
          ? { top: active.offsetTop, height: active.offsetHeight }
          : { left: active.offsetLeft, width: active.offsetWidth },
      )
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(list)
    return () => observer.disconnect()
  }, [value, variant, vertical])

  // Arrow keys move between enabled tabs (mirrored in RTL), Home/End jump
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current
    if (!list) return
    const tabs = [
      ...list.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    ]
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (current === -1) return

    const rtl = getComputedStyle(list).direction === 'rtl'
    const nextKey = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
    const prevKey = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft'

    let target = -1
    if (e.key === nextKey) target = (current + 1) % tabs.length
    else if (e.key === prevKey)
      target = (current - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = tabs.length - 1
    if (target === -1) return

    e.preventDefault()
    tabs[target].focus()
    tabs[target].click()
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      onKeyDown={handleKeyDown}
      className={`relative ${listVariantClasses[variant]} ${className}`}
    >
      {indicator && hasIndicator(variant) && (
        <span
          aria-hidden
          className={`pointer-events-none absolute transition-all duration-300 ease-out ${indicatorClasses[variant]}`}
          style={indicator}
        />
      )}
      {children}
    </div>
  )
}

export default TabsList
