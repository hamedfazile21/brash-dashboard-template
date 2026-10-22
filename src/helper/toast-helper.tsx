import { toast } from 'sonner'
import { X } from 'lucide-react'
import ObjectViewer from '#/components/object-viewer'

/**
 * Shows a JS object (e.g. form submission result) inside a glass toast.
 *
 * Usage:
 *   showObjectToast('Form submitted', formData)
 */
export function showObjectToast(title: string, data: unknown) {
  toast.custom(
    (id) => (
      // Fits sonner's column — a wider custom width sticks out of the stack
      <div className="relative w-full min-w-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <button
            type="button"
            onClick={() => toast.dismiss(id)}
            aria-label="Dismiss"
            className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <X size={14} />
          </button>
        </div>

        {/* max-h + overflow so a large object doesn't blow out the toast viewport */}
        <div className="max-h-64 w-full overflow-y-auto">
          <ObjectViewer data={data} />
        </div>
      </div>
    ),
    {
      duration: 8000, // give the person enough time to actually read the object
    },
  )
}
