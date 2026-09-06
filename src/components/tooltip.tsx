// import React from 'react'
// import Tippy from '@tippyjs/react'
// import type { Placement } from 'tippy.js'
// import 'tippy.js/dist/tippy.css'

// interface TooltipProps {
//   placement?: Placement
//   content: React.ReactNode
//   children: React.ReactElement
//   className?: string
// }

// export default function Tooltip({
//   placement = 'top',
//   content,
//   children,
//   className,
// }: TooltipProps) {
//   return (
//     <Tippy
//       className={className}
//       placement={placement}
//       animation={`custom-${placement}`}
//       content={content}
//       theme="dashboard"
//       duration={[180, 120]}
//       delay={[50, 0]}
//     >
//       <span>{children}</span>
//     </Tippy>
//   )
// }

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

interface TooltipProps {
  /** The trigger element — must accept a ref (a native element or forwardRef component) */
  children: ReactElement
  content: ReactNode
  placement?: Placement
  /** Delay before showing, in ms — keeps quick mouse-passes from triggering it */
  delay?: number
  disabled?: boolean
  className?: string
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 150,
  disabled = false,
  className,
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
            className={`z-50 ${className}`}
            {...getFloatingProps()}
          >
            <div
              style={transitionStyles}
              className="rounded-lg border border-white/10 bg-surface/40 px-2.5 py-1.5
                text-sm font-medium text-foreground backdrop-blur-xl backdrop-saturate-150
                shadow-lg shadow-black/10 ring-1 ring-black/5
                dark:border-white/8 dark:bg-surface/35 dark:shadow-black/30"
            >
              {content}
            </div>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className="fill-surface/40 dark:fill-surface/35"
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
