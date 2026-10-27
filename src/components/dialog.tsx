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
import { useTranslation } from 'react-i18next'

/** One scale for both tables below, so a size always exists in each. */
export type DialogSize =
  'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'

/** Max-width steps for centered/top dialogs */
const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  // The panel is already `w-full`; lifting the cap lets it fill everything the
  // wrapper's own padding leaves.
  full: 'max-w-none',
}

/** Width steps for left/right side panels — a "size" here means the
 * panel's actual width, not a max-width, since side panels are always
 * full-height and flush to one edge.
 *
 * `sm`–`xl` keep the gentler 4rem rhythm they have always had. From `2xl` up
 * they match the rem values of the `max-w-*` step of the same name above, so
 * the two scales agree about what a size means once they get wide.
 *
 * `max-w-full` on every step is what stops a panel wider than the phone it is
 * on from pushing the page sideways. */
const sideSizeClasses: Record<DialogSize, string> = {
  sm: 'w-80 max-w-full',
  md: 'w-96 max-w-full',
  lg: 'w-[28rem] max-w-full',
  xl: 'w-[32rem] max-w-full',
  '2xl': 'w-[42rem] max-w-full',
  '3xl': 'w-[48rem] max-w-full',
  '4xl': 'w-[56rem] max-w-full',
  '5xl': 'w-[64rem] max-w-full',
  full: 'w-full',
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
  // Offset from the top edge like a command palette; padding keeps the panel off the sides on phones
  top: 'items-start justify-center pt-[8vh]',
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
  size?: DialogSize
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
  const { t } = useTranslation()
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
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
            {/* `!` on padding/radius/shadow: .card is unlayered CSS, so plain
                utilities would lose to it */}
            <DialogPanel
              className={`card flex max-h-full flex-col overflow-hidden bg-background/95! p-0! dark:bg-surface/40! shadow-[0_24px_64px_-16px_rgb(0_0_0/0.3)]! ${
                isSide
                  ? // Round only the inner edge; logical sides keep this right in RTL
                    `h-full rounded-none! ${sideSizeClasses[size]} ${
                      position === 'left' ? 'rounded-e-2xl!' : 'rounded-s-2xl!'
                    }`
                  : `w-full rounded-2xl! ${sizeClasses[size]}`
              }`}
            >
              {/* Header — shrink-0 so it never gets squeezed by scrollable content */}
              {(title || showCloseButton) && (
                <div
                  className={`flex shrink-0 items-start justify-between gap-x-4 px-5 pt-5 ${
                    title ? 'border-b border-borderColor pb-4' : 'pb-0'
                  }`}
                >
                  <div className="min-w-0">
                    {title && (
                      <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
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
                      aria-label={t('Close')}
                      className="-me-1.5 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              )}

              {/* Content — the only scrollable region. The panel is capped at
                  `max-h-full` (the wrapper is `fixed inset-0`, so that is the
                  viewport less the wrapper's own padding), which is what gives
                  this `flex-1` something to overflow. Without the cap the panel
                  grows to fit and the wrapper scrolls the header and footer
                  away with it. */}
              <div className="flex-1 overflow-y-auto p-5">{children}</div>

              {/* Footer — shrink-0, stays pinned to the bottom */}
              {footer && (
                <div className="flex shrink-0 items-center justify-end gap-x-2 border-t border-borderColor bg-surface-hover/30 px-5 py-3.5">
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
