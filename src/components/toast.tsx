import { Toaster as SonnerToaster } from 'sonner'
import type { ToasterProps } from 'sonner'
import {
  CircleCheck,
  CircleX,
  Info,
  LoaderCircle,
  TriangleAlert,
  X,
} from 'lucide-react'

/**
 * Glass-styled wrapper around sonner's <Toaster />.
 *
 * Mount this once near the root of your app (e.g. in App.tsx or your
 * root layout):
 *
 *   import { Toaster } from './Toaster'
 *   <Toaster />
 *
 * Then trigger toasts from anywhere using sonner's own `toast()` API,
 * or the typed helpers in `toast-helpers.tsx` for consistent icons.
 *
 * `unstyled` drops sonner's default CSS — including how it positions its
 * loading spinner and close button — so both are supplied here: lucide
 * icons via `icons`, and explicit placement in `classNames`.
 */
const Toaster = (props: ToasterProps) => {
  return (
    <SonnerToaster
      theme="system"
      richColors={false}
      closeButton
      icons={{
        success: <CircleCheck size={18} />,
        error: <CircleX size={18} />,
        warning: <TriangleAlert size={18} />,
        info: <Info size={18} />,
        loading: <LoaderCircle size={18} className="animate-spin" />,
        close: <X size={11} strokeWidth={2.5} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          // Mostly solid so text stays readable over busy pages
          toast: `
            group font-inter relative flex w-full items-center gap-x-3 rounded-xl border p-4
            border-borderColor bg-background/95 backdrop-blur-xl backdrop-saturate-150
            shadow-[0_12px_32px_-8px_rgb(0_0_0/0.18)]
            dark:bg-surface/90 dark:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.5)]
          `,
          title: 'text-sm font-medium text-foreground',
          description: 'text-xs text-muted mt-0.5',
          actionButton: `
            ms-auto shrink-0 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white
            transition-colors hover:brightness-110
          `,
          cancelButton: `
            shrink-0 rounded-md bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-muted
            transition-colors hover:text-foreground
          `,
          // Small badge on the toast's top corner (sonner's own CSS would do this)
          closeButton: `
            absolute -top-2 -inset-s-2 flex size-5 items-center justify-center rounded-full
            border border-borderColor bg-background text-muted shadow-sm
            transition-colors hover:bg-surface-hover hover:text-foreground
            dark:bg-surface
          `,
          // `relative` + fixed size: sonner absolutely centers its loader
          // wrapper inside this slot, so the slot must be its positioning box
          icon: 'relative flex size-[18px] shrink-0 items-center justify-center text-primary',
          loader: 'text-primary',
          success: '[&_[data-icon]]:text-success',
          error: '[&_[data-icon]]:text-danger',
          warning: '[&_[data-icon]]:text-warning',
          info: '[&_[data-icon]]:text-info',
        },
      }}
      {...props}
    />
  )
}

export default Toaster
