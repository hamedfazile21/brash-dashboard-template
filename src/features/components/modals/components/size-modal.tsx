import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import { sizeOptions } from './modal-provider'
import type { Size } from './modal-provider'

interface SizeModalProps {
  open: boolean
  onClose: () => void
  size: Size
}

function SizeModal({ open, onClose, size }: SizeModalProps) {
  const { t } = useTranslation()
  const option = sizeOptions.find((o) => o.size === size)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size={size}
      title={t(option?.label ?? '')}
      description={t('Max width {{width}}', { width: option?.width })}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary px-4"
        >
          {t('Close')}
        </button>
      }
    >
      {/* Ruler spanning the panel's actual width */}
      <div className="flex flex-col gap-y-2">
        <div className="relative flex h-10 items-center justify-center rounded-lg border border-dashed border-primary/40 bg-primary/5">
          <span className="absolute inset-y-2 inset-s-0 w-px bg-primary/60" />
          <span className="absolute inset-y-2 inset-e-0 w-px bg-primary/60" />
          <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-primary/30" />
          <span
            className="relative rounded-md bg-background px-2 py-0.5 font-mono text-xs font-medium text-primary"
            dir="ltr"
          >
            size="{size}" · {option?.width}
          </span>
        </div>
        <p className="text-xs text-muted">
          {t(
            'Resize the window — the panel never grows wider than this, and shrinks to fit small screens.',
          )}
        </p>
      </div>
    </Dialog>
  )
}

export default SizeModal
