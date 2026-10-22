import { useState } from 'react'
import { Trash2, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const PROJECT_NAME = 'brash-dashboard'

/** Destructive confirm: outside click disabled, Delete unlocks once the name is typed */
function ConfirmModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()
  const [typed, setTyped] = useState('')
  const matches = typed === PROJECT_NAME

  const close = () => {
    setTyped('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      closeOnOutsideClick={false}
      showCloseButton={false}
      size="sm"
      footer={
        <>
          <button type="button" onClick={close} className="btn btn-secondary">
            {t('Cancel')}
          </button>
          <button
            type="submit"
            form="confirm-delete"
            disabled={!matches}
            className="btn btn-danger"
          >
            <Trash2 size={15} />
            {t('Delete project')}
          </button>
        </>
      }
    >
      <form
        id="confirm-delete"
        onSubmit={(e) => {
          e.preventDefault()
          if (!matches) return
          showObjectToast(t('Project deleted'), { project: PROJECT_NAME })
          close()
        }}
      >
        <div className="flex items-start gap-x-4">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
            <span className="absolute inset-0 animate-ping rounded-full bg-danger/10 [animation-iteration-count:2]" />
            <TriangleAlert size={20} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {t('Delete this project?')}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t(
                "This permanently deletes the project and all of its tasks. This action can't be undone.",
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-danger/20 bg-danger/5 p-3">
          <label
            htmlFor="confirm-name"
            className="mb-2 block text-xs text-muted"
          >
            {t('Type')}{' '}
            <code className="rounded bg-danger/10 px-1 py-0.5 font-mono text-[11px] text-danger">
              {PROJECT_NAME}
            </code>{' '}
            {t('to confirm')}
          </label>
          <Input
            id="confirm-name"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={t('Project name')}
            autoComplete="off"
            spellCheck={false}
            dir="ltr"
          />
        </div>
      </form>
    </Dialog>
  )
}

export default ConfirmModal
