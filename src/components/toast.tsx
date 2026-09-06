import { Toaster as SonnerToaster } from 'sonner'
import type { ToasterProps } from 'sonner'

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
 */
const Toaster = (props: ToasterProps) => {
  return (
    <SonnerToaster
      theme="system"
      richColors={false}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            group font-inter relative flex w-full items-center gap-x-3 rounded-xl border p-4
            border-white/10 bg-surface/40 backdrop-blur-xl backdrop-saturate-150
            shadow-lg shadow-black/10
            dark:border-white/8 dark:bg-surface/35 dark:shadow-black/30
          `,
          title: 'text-sm font-medium text-foreground',
          description: 'text-xs text-muted mt-0.5',
          actionButton: `
            rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white
            transition-colors hover:brightness-110
          `,
          cancelButton: `
            rounded-md bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-muted
            transition-colors hover:text-foreground
          `,
          closeButton: `
            border-white/10 bg-transparent! text-foreground!
            hover:text-foreground hover:bg-surface-hover 
          `,
          success: 'text-primary [&_[data-icon]]:text-emerald-500',
          error: '[&_[data-icon]]:text-red-500',
          warning: '[&_[data-icon]]:text-amber-500',
          info: '[&_[data-icon]]:text-blue-500',
          icon: 'shrink-0',
        },
      }}
      {...props}
    />
  )
}

export default Toaster
