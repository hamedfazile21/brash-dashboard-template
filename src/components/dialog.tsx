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

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
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
} as const

type TransitionVariant = keyof typeof transitionVariants

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: keyof typeof sizeClasses
  /** 'center' = normal modal; 'top' = anchored near the top of the viewport */
  position?: 'center' | 'top'
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
  /** Panel enter/exit animation. Defaults to 'zoomInUp'. */
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
  transition = 'zoomInUp',
}: DialogProps) {
  const { closed, open: openState } = transitionVariants[transition]

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

        {/* Panel wrapper — controls center vs top anchoring */}
        <div
          className={`fixed inset-0 flex justify-center overflow-y-auto p-4 ${
            position === 'top' ? 'items-start pt-20' : 'items-center'
          }`}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-250"
            enterFrom={closed}
            enterTo={openState}
            leave="ease-in duration-150"
            leaveFrom={openState}
            leaveTo={closed}
          >
            <DialogPanel className={`card w-full ${sizeClasses[size]} p-6`}>
              {(title || showCloseButton) && (
                <div className="mb-4 flex items-start justify-between gap-x-4">
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

              <div>{children}</div>

              {footer && (
                <div className="mt-6 flex justify-end gap-x-2 border-t border-white/10 pt-4 dark:border-white/8">
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
