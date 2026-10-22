import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import { transitionOptions } from './modal-provider'
import type { TransitionVariant } from './modal-provider'

interface TransitionModalProps {
  open: boolean
  onClose: () => void
  onReplay: () => void
  variant: TransitionVariant
}

function TransitionModal({
  open,
  onClose,
  onReplay,
  variant,
}: TransitionModalProps) {
  const { t } = useTranslation()
  const option = transitionOptions.find((o) => o.variant === variant)
  const Icon = option?.icon

  return (
    <Dialog
      open={open}
      onClose={onClose}
      transition={variant}
      size="sm"
      title={t(option?.label ?? '')}
      footer={
        <>
          <button
            type="button"
            onClick={onReplay}
            className="btn btn-secondary"
          >
            <RotateCcw size={15} />
            {t('Replay')}
          </button>
          <button type="button" onClick={onClose} className="btn btn-primary">
            {t('Close')}
          </button>
        </>
      }
    >
      <div className="flex items-center gap-x-4">
        {Icon && (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
            <Icon size={22} />
          </span>
        )}
        <div>
          <p className="text-sm text-muted">
            {t('Opened with the transition')}
          </p>
          <code className="mt-1 inline-block rounded-md bg-surface-hover px-2 py-1 font-mono text-xs text-foreground">
            {`<Dialog transition="${variant}" />`}
          </code>
        </div>
      </div>
    </Dialog>
  )
}

export default TransitionModal
