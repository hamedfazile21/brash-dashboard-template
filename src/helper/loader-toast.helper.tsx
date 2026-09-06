import { LoaderCircle, X } from 'lucide-react'
import { toast } from 'sonner'

interface LoaderToastOptions {
  id?: string | number
  duration?: number
}

export function showLoaderToast(
  message = 'Loading...',
  options: LoaderToastOptions = {},
) {
  return toast.custom(
    (id) => (
      <div className="flex w-80 items-center gap-x-3">
        <LoaderCircle
          size={18}
          className="shrink-0 animate-spin text-primary"
          aria-hidden="true"
        />
        <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          aria-label="Dismiss"
          className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <X size={14} />
        </button>
      </div>
    ),
    {
      id: options.id,
      duration: options.duration ?? Infinity,
      //   ariaProps: {
      //     role: 'status',
      //     'aria-live': 'polite',
      //   },
    },
  )
}

export function dismissLoaderToast(id: string | number) {
  toast.dismiss(id)
}
