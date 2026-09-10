import { cloneElement, isValidElement, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import {
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  arrow as arrowMiddleware,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'

export type TooltipVariant =
  'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning'

interface TooltipProps {
  /** The trigger element — must accept a ref (a native element or forwardRef component) */
  children: ReactElement
  content: ReactNode
  placement?: Placement
  /** Delay before showing, in ms — keeps quick mouse-passes from triggering it */
  delay?: number
  disabled?: boolean
  className?: string
  /** 'secondary' (default) is the neutral glass look. The rest render a
   * solid colored bubble matching that semantic color. */
  variant?: TooltipVariant
}

// Each variant is a pair: the bubble's own classes, and the arrow's fill
// class (arrows can't inherit `background-color` the way a div can, so
// they need their own explicit color).
const variantClasses: Record<
  TooltipVariant,
  { bubble: string; arrow: string }
> = {
  secondary: {
    bubble: `border border-white/10 bg-surface/40 text-foreground
      backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/10 ring-1 ring-black/5
      dark:border-white/8 dark:bg-surface/35 dark:shadow-black/30`,
    arrow: 'fill-surface/40 dark:fill-surface/35',
  },
  primary: {
    bubble:
      'bg-primary text-white dark:text-foreground shadow-lg shadow-primary/25',
    arrow: 'fill-primary',
  },
  success: {
    bubble:
      'bg-success text-white dark:text-foreground shadow-lg shadow-success/25',
    arrow: 'fill-success',
  },
  danger: {
    bubble:
      'bg-danger text-white dark:text-foreground shadow-lg shadow-danger/25',
    arrow: 'fill-danger',
  },
  info: {
    bubble: 'bg-info text-white dark:text-foreground shadow-lg shadow-info/25',
    arrow: 'fill-info',
  },
  warning: {
    bubble:
      'bg-warning text-white dark:text-foreground shadow-lg shadow-warning/25',
    arrow: 'fill-warning',
  },
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 150,
  disabled = false,
  className,
  variant = 'secondary',
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<SVGSVGElement>(null)

  const { refs, floatingStyles, context } = useFloating({
    open: disabled ? false : open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrowMiddleware({ element: arrowRef, padding: 6 }),
    ],
  })

  const hover = useHover(context, {
    move: false,
    delay: { open: delay, close: 0 },
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: {
        top: 'scale(0.96) translateY(4px)',
        bottom: 'scale(0.96) translateY(-4px)',
        left: 'scale(0.96) translateX(4px)',
        right: 'scale(0.96) translateX(-4px)',
      }[side],
    }),
    open: {
      opacity: 1,
      transform: 'scale(1) translate(0, 0)',
    },
  })

  if (!isValidElement(children) || !content) return children

  const { bubble, arrow } = variantClasses[variant]

  return (
    <>
      {cloneElement(
        children as ReactElement<any>,
        getReferenceProps({
          ref: refs.setReference,
          ...(children.props as object),
        }),
      )}

      {isMounted && !disabled && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`z-50 ${className ?? ''}`}
            {...getFloatingProps()}
          >
            <div
              style={transitionStyles}
              className={`rounded-lg px-2.5 py-1.5 text-sm font-medium ${bubble}`}
            >
              {content}
            </div>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className={arrow}
              width={10}
              height={5}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export default Tooltip
