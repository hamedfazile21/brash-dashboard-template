import { FolderKanban, HardDrive, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const stats = [
  { icon: Users, label: 'Members', value: '8' },
  { icon: FolderKanban, label: 'Projects', value: '24' },
  { icon: HardDrive, label: 'Storage', value: '3.2 GB' },
]

function BasicModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('About this workspace')}
      description={t('Created on Aug 12, 2026 · Pro plan')}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary px-4"
        >
          {t('Got it')}
        </button>
      }
    >
      <p className="text-sm leading-relaxed text-muted">
        {t(
          'You can manage members, access and billing from the workspace settings page at any time.',
        )}
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-y-2 rounded-xl border border-borderColor bg-surface/40 p-3"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon size={16} />
            </span>
            <span>
              <span className="block text-base font-semibold text-foreground">
                {value}
              </span>
              <span className="block text-xs text-muted">{t(label)}</span>
            </span>
          </div>
        ))}
      </div>
    </Dialog>
  )
}

export default BasicModal
