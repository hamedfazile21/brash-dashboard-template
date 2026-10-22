import { useState } from 'react'
import { CornerDownLeft, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import { showObjectToast } from '#/helper/toast-helper'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const priorities = [
  { value: 'Low', dot: 'bg-success' },
  { value: 'Medium', dot: 'bg-info' },
  { value: 'High', dot: 'bg-danger' },
]

/** Quick create: one field, Enter submits, priority as chips */
function TopModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')

  const close = () => {
    setTitle('')
    setPriority('Medium')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      position="top"
      size="lg"
      showCloseButton={false}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!title.trim()) return
          showObjectToast(t('Task created'), { title: title.trim(), priority })
          close()
        }}
      >
        <div className="flex items-center gap-x-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Plus size={18} />
          </span>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('What needs to be done?')}
            aria-label={t('Task title')}
            className="min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted/70"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-borderColor pt-4">
          <div className="flex items-center gap-x-1.5" role="radiogroup">
            {priorities.map(({ value, dot }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={priority === value}
                onClick={() => setPriority(value)}
                className={`flex items-center gap-x-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  priority === value
                    ? 'border-primary/40 bg-primary/10 text-foreground'
                    : 'border-borderColor text-muted hover:text-foreground'
                }`}
              >
                <span className={`size-2 rounded-full ${dot}`} />
                {t(value)}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn btn-primary btn-sm"
          >
            {t('Create')}
            <CornerDownLeft size={13} className="rtl:-scale-x-100" />
          </button>
        </div>
      </form>
    </Dialog>
  )
}

export default TopModal
