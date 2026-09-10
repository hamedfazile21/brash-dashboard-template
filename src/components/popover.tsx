import { cloneElement, isValidElement, useState } from 'react'
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
import { useRef } from 'react'

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'

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

  const handleContentClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    if (shouldCloseOnSelect) {
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
              className="z-50"
              {...getFloatingProps()}
            >
              <div
                style={transitionStyles}
                onClick={(e: any) => handleContentClick(e)}
                className={` rounded-xl border border-white/10 bg-surface/40 p-1
                  backdrop-blur-xl backdrop-saturate-150
                  shadow-lg shadow-black/10 ring-1 ring-black/5
                  dark:border-white/8 dark:bg-surface/35 dark:shadow-black/30
                  ${className}`}
              >
                {children}
              </div>
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className="fill-surface/40 dark:fill-surface/35"
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
