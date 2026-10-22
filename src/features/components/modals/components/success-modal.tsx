import { Check, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const receipt = [
  { label: 'Plan', value: 'Pro · Monthly' },
  { label: 'Amount', value: '$24.00' },
  { label: 'Receipt', value: '#BR-20481' },
]

/** No title bar — fully custom content with a celebratory check */
function SuccessModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} showCloseButton={false} size="sm">
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="relative">
          <span className="absolute inset-0 -z-10 scale-150 rounded-full bg-success/25 blur-xl" />
          <span className="flex size-16 items-center justify-center rounded-full bg-success text-white shadow-lg shadow-success/30 ring-8 ring-success/15">
            <Check size={30} strokeWidth={3} />
          </span>
        </div>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
          {t('Payment successful')}
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          {t(
            'Your subscription is now active. A receipt has been sent to your email.',
          )}
        </p>

        <dl className="mt-5 w-full divide-y divide-borderColor rounded-xl border border-borderColor bg-surface/40 text-sm">
          {receipt.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <dt className="text-muted">{t(label)}</dt>
              <dd className="font-medium text-foreground tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex w-full flex-col gap-y-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary w-full!"
          >
            {t('Continue')}
          </button>
          <button type="button" className="btn btn-secondary w-full!">
            <Download size={15} />
            {t('Download receipt')}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default SuccessModal
