import { useState, type FC } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import type { TaskDialogType } from './task-provider'
import Dialog from '#/components/dialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface props {
  open: boolean
  setOpen: (str: TaskDialogType | null) => void
  /** What's being deleted — shown in the message, e.g. "Fix RTL layout bug" */
  itemName?: string
  /** If deleting multiple items at once (e.g. from TableBulkAction), pass a count instead of itemName */
  itemCount?: number
  /** Called when the person confirms. Can be async — the dialog shows a
   * loading state and disables both buttons until it resolves. */
}

const DeleteConfirmationDialog: FC<props> = ({
  open,
  setOpen,
  itemName,
  itemCount,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useTranslation()
  const closeDialog = () => {
    if (isDeleting) return // don't allow closing mid-delete
    setOpen(null)
  }

  const handleConfirm = async () => {
    try {
      setIsDeleting(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success(`${subject} deleted successfully`)
      setOpen(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const subject =
    itemCount && itemCount > 1
      ? `${itemCount} tasks`
      : itemName
        ? `"${itemName}"`
        : 'this task'

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      closeOnOutsideClick={false}
      showCloseButton={false}
      size="sm"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-500/15 text-danger">
          <AlertTriangle size={22} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground">
          Delete {itemCount && itemCount > 1 ? `${itemCount} tasks` : 'task'}?
        </h3>

        <p className="mt-1.5 text-sm text-muted">
          You're about to permanently delete {subject}. This action can't be
          undone.
        </p>
      </div>

      <div className="mt-6 flex gap-x-2">
        <button
          type="button"
          onClick={closeDialog}
          disabled={isDeleting}
          className="btn btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('Cancel')}
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
          className="btn flex w-full items-center justify-center gap-x-2 rounded-md bg-danger p-2 text-sm font-semibold text-white!
            transition-colors duration-150
            hover:bg-red-600
            disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isDeleting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Deleting...
            </>
          ) : (
            t('Delete')
          )}
        </button>
      </div>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
