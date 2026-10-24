import { cloneElement, isValidElement, useState, useRef  } from 'react'
import type { ReactElement, ReactNode } from 'react'
import {
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  arrow as arrowMiddleware,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type CloseBehavior = 'select' | 'outside' | 'both'

interface PopoverProps {
  /** The trigger element — must accept a ref (a native element or forwardRef component) */
  trigger: ReactElement
  /** Popover body content */
  children: ReactNode
  placement?: Placement
  triggerType?: 'click' | 'hover'
  /** Controlled open state (optional — falls back to internal state if omitted) */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Close when an item inside the popover is clicked; useful for menus */
  closeOn?: CloseBehavior
  /** Show the little pointer arrow */
  showArrow?: boolean
  className?: string
}

export function Popover({
  trigger,
  children,
  placement = 'bottom-start',
  triggerType = 'click',
  open: controlledOpen,
  onOpenChange,
  closeOn = 'both',
  showArrow = true,
  className = '',
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = (value: boolean) => {
    if (!isControlled) setUncontrolledOpen(value)
    onOpenChange?.(value)
  }

  const arrowRef = useRef<SVGSVGElement>(null)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      arrowMiddleware({ element: arrowRef, padding: 8 }),
    ],
  })

  const click = useClick(context, { enabled: triggerType === 'click' })
  const hover = useHover(context, {
    enabled: triggerType === 'hover',
    delay: { open: 80, close: 100 },
  })
  const dismiss = useDismiss(context, {
    enabled: closeOn === 'outside' || closeOn === 'both',
  })
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ])
  const shouldCloseOnSelect = closeOn === 'select' || closeOn === 'both'

  // No preventDefault here — it would stop checkboxes, links and submit
  // buttons inside the popover from working. Only clicks on an actual
  // item (button / link / menuitem) count as a "select", not blank padding.
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const item = (e.target as HTMLElement).closest(
      'button, a, [role="menuitem"]',
    )
    if (shouldCloseOnSelect && item) {
      setOpen(false)
    }
  }

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    open: {
      opacity: 1,
      transform: 'scale(1)',
    },
  })

  if (!isValidElement(trigger)) return trigger

  return (
    <>
      {cloneElement(
        trigger as ReactElement<any>,
        getReferenceProps({
          ref: refs.setReference,
          ...(trigger.props as object),
        }),
      )}

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              // Focus moves here on open (FloatingFocusManager) — no browser outline
              className="z-50 outline-none"
              {...getFloatingProps()}
            >
              <div
                style={transitionStyles}
                onClick={handleContentClick}
                className={`rounded-xl border border-borderColor bg-background/95 p-1
                  backdrop-blur-xl backdrop-saturate-150
                  shadow-[0_12px_32px_-8px_rgb(0_0_0/0.18)]
                  dark:bg-surface/90 dark:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.5)]
                  ${className}`}
              >
                {children}
              </div>
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  // Same fill and border as the panel so the arrow reads as part of it
                  className="fill-background/95 stroke-borderColor dark:fill-surface/90"
                  strokeWidth={1}
                  width={14}
                  height={7}
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}

export default Popover
