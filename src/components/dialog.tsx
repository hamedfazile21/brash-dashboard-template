import { Fragment, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { X } from 'lucide-react'

/** Max-width steps for centered/top dialogs */
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

/** Width steps for left/right side panels — a "size" here means the
 * panel's actual width, not a max-width, since side panels are always
 * full-height and flush to one edge. */
const sideSizeClasses = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[28rem]',
  xl: 'w-[32rem]',
}

/** Each variant is a pair of Tailwind class strings for the panel's
 * closed state (enterFrom / leaveTo — same shape, entry/exit mirror
 * each other) vs its open state (enterTo / leaveFrom). */
const transitionVariants = {
  fadeIn: {
    closed: 'opacity-0',
    open: 'opacity-100',
  },
  slideInDown: {
    closed: 'opacity-0 -translate-y-8',
    open: 'opacity-100 translate-y-0',
  },
  fadeInUp: {
    closed: 'opacity-0 translate-y-4',
    open: 'opacity-100 translate-y-0',
  },
  slideInUp: {
    closed: 'opacity-0 translate-y-12',
    open: 'opacity-100 translate-y-0',
  },
  fadeInLeft: {
    closed: 'opacity-0 -translate-x-4',
    open: 'opacity-100 translate-x-0',
  },
  rotateInLeft: {
    closed: 'opacity-0 -rotate-6 -translate-x-4',
    open: 'opacity-100 rotate-0 translate-x-0',
  },
  fadeInRight: {
    closed: 'opacity-0 translate-x-4',
    open: 'opacity-100 translate-x-0',
  },
  zoomInUp: {
    closed: 'opacity-0 scale-90 translate-y-4',
    open: 'opacity-100 scale-100 translate-y-0',
  },
  // Full off-screen slides — distinct from fadeInLeft/Right's subtle 4px
  // nudge, which is meant for centered modals, not a real edge-to-edge
  // drawer entrance.
  slideInFromLeft: {
    closed: 'opacity-0 -translate-x-full',
    open: 'opacity-100 translate-x-0',
  },
  slideInFromRight: {
    closed: 'opacity-0 translate-x-full',
    open: 'opacity-100 translate-x-0',
  },
} as const

type TransitionVariant = keyof typeof transitionVariants
type Position = 'center' | 'top' | 'left' | 'right'

const wrapperPositionClasses: Record<Position, string> = {
  center: 'items-center justify-center p-4',
  top: 'items-start justify-center pt-20 p-4',
  left: 'items-stretch justify-start',
  right: 'items-stretch justify-end',
}

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: keyof typeof sizeClasses
  /** 'center'/'top' are centered modals. 'left'/'right' are full-height
   * slide-in side panels (a "drawer" or "sheet"). */
  position?: Position
  /** Hide the built-in X button if you want fully custom header content */
  showCloseButton?: boolean
  /**
   * Whether clicking the backdrop (outside the panel) closes the dialog.
   * Defaults to true. Escape and the X/footer buttons still close the
   * dialog either way — this only affects outside clicks.
   *
   * Note: Headless UI has no built-in way to distinguish "closed via
   * outside click" from "closed via Escape" — both fire the same onClose.
   * When this is false, we pass a no-op to Headless UI's onClose (which
   * disables both) and re-add Escape handling ourselves below.
   */
  closeOnOutsideClick?: boolean
  /** Panel enter/exit animation. Auto-picked per `position` if omitted:
   * zoomInUp for center, fadeInUp for top, slideInFromLeft/Right for sides. */
  transition?: TransitionVariant
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  closeOnOutsideClick = true,
  transition,
}: DialogProps) {
  const isSide = position === 'left' || position === 'right'

  const effectiveTransition: TransitionVariant =
    transition ??
    (position === 'left'
      ? 'slideInFromLeft'
      : position === 'right'
        ? 'slideInFromRight'
        : position === 'top'
          ? 'fadeInUp'
          : 'zoomInUp')

  const { closed, open: openState } = transitionVariants[effectiveTransition]

  // Re-add Escape-to-close ourselves when outside-click is disabled,
  // since disabling Headless UI's onClose disables Escape too.
  useEffect(() => {
    if (closeOnOutsideClick || !open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeOnOutsideClick, open, onClose])

  return (
    <Transition show={open} as={Fragment}>
      <HeadlessDialog
        onClose={closeOnOutsideClick ? onClose : () => {}}
        className="relative z-50"
      >
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Panel wrapper — controls center / top / left / right anchoring */}
        <div
          className={`fixed inset-0 flex overflow-y-auto ${wrapperPositionClasses[position]}`}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom={closed}
            enterTo={openState}
            leave="transition-all ease-in duration-200"
            leaveFrom={openState}
            leaveTo={closed}
          >
            <DialogPanel
              className={`card flex flex-col p-0 ${
                isSide
                  ? `h-full ${sideSizeClasses[size]} ${
                      position === 'left' ? 'rounded-l-none' : 'rounded-r-none'
                    }`
                  : `w-full ${sizeClasses[size]}`
              }`}
            >
              {/* Header — shrink-0 so it never gets squeezed by scrollable content */}
              {(title || showCloseButton) && (
                <div
                  className={`flex shrink-0 items-start justify-between gap-x-4 border-b border-white/10 p-4 dark:border-white/8 ${
                    !isSide ? 'p-1.5!' : ''
                  }`}
                >
                  <div>
                    {title && (
                      <DialogTitle className="text-base font-semibold text-foreground">
                        {title}
                      </DialogTitle>
                    )}
                    {description && (
                      <Description className="mt-1 text-sm text-muted">
                        {description}
                      </Description>
                    )}
                  </div>

                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              )}

              {/* Content — the only scrollable region, matters most for
                  tall side panels but harmless for centered dialogs too */}
              <div
                className={`flex-1 overflow-y-auto ${isSide ? 'p-4' : 'p-1.5'}`}
              >
                {children}
              </div>

              {/* Footer — shrink-0, stays pinned to the bottom */}
              {footer && (
                <div
                  className={`flex shrink-0 justify-end gap-x-2 border-t border-white/10 dark:border-white/8 ${
                    isSide ? 'p-4' : 'p-6 pt-4'
                  }`}
                >
                  {footer}
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export default Dialog
