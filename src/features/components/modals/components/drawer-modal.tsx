import { useState } from 'react'
import { CheckCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import { Avatar1, Avatar2, Avatar3, Avatar4, Avatar5 } from '../../../../assets'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const initialNotifications = [
  {
    avatar: Avatar1,
    name: 'Sara Ahmadi',
    action: 'commented on',
    target: 'Design Login Page',
    time: '2m',
    unread: true,
  },
  {
    avatar: Avatar2,
    name: 'Kian Rostami',
    action: 'assigned you',
    target: 'Implement Authentication',
    time: '18m',
    unread: true,
  },
  {
    avatar: Avatar3,
    name: 'Nina Karimi',
    action: 'completed',
    target: 'Dashboard charts',
    time: '1h',
    unread: true,
  },
  {
    avatar: Avatar4,
    name: 'Design Team',
    action: 'mentioned you in',
    target: 'Weekly sync',
    time: '3h',
    unread: false,
  },
  {
    avatar: Avatar5,
    name: 'Omid Jafari',
    action: 'shared',
    target: 'Q3 roadmap',
    time: 'Yesterday',
    unread: false,
  },
]

/** Side panel: full height, slides in from the edge (left in RTL) */
function DrawerModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()
  const [items, setItems] = useState(initialNotifications)
  const unread = items.filter((item) => item.unread).length

  return (
    <Dialog
      open={open}
      onClose={onClose}
      position="right"
      size="md"
      title={t('Notifications')}
      description={t('{{count}} unread', { count: unread })}
      footer={
        <button
          type="button"
          disabled={unread === 0}
          onClick={() =>
            setItems((prev) => prev.map((item) => ({ ...item, unread: false })))
          }
          className="btn btn-secondary w-full!"
        >
          <CheckCheck size={15} />
          {t('Mark all as read')}
        </button>
      }
    >
      <ul className="-mx-2 flex flex-col gap-y-1">
        {items.map((item) => (
          <li
            key={item.target}
            className={`relative flex items-start gap-x-3 rounded-xl p-2.5 transition-colors ${
              item.unread ? 'bg-primary/5' : 'hover:bg-surface-hover/50'
            }`}
          >
            <img
              src={item.avatar}
              alt=""
              className="size-9 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1 text-sm">
              <p className="text-muted">
                <span className="font-medium text-foreground">
                  {t(item.name)}
                </span>{' '}
                {t(item.action)}{' '}
                <span className="font-medium text-foreground">
                  {item.target}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted">{t(item.time)}</p>
            </div>
            {item.unread && (
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
            )}
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

export default DrawerModal
