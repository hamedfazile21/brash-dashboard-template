import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import { showObjectToast } from '#/helper/toast-helper'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const sections = [
  {
    title: '1. Using the service',
    body: 'You may use the dashboard to manage your own projects and data. You are responsible for keeping your account credentials safe and for any activity that happens under your account.',
  },
  {
    title: '2. Your content',
    body: 'Everything you upload stays yours. You grant us a limited licence to store and display it only so we can run the service for you.',
  },
  {
    title: '3. Acceptable use',
    body: 'Do not use the service to break the law, harm others, or try to access accounts and systems that are not yours. We may suspend accounts that do.',
  },
  {
    title: '4. Billing',
    body: 'Paid plans renew automatically until cancelled. You can cancel at any time from the billing page and keep access until the end of the period.',
  },
  {
    title: '5. Privacy',
    body: 'We collect only what we need to run the service. Our privacy policy explains what we store, why, and how to request deletion.',
  },
  {
    title: '6. Termination',
    body: 'You can delete your account whenever you like. We may close accounts that break these terms, and will give notice where we reasonably can.',
  },
  {
    title: '7. Liability',
    body: 'The service is provided as is. To the extent the law allows, we are not liable for indirect losses or for data you did not back up.',
  },
  {
    title: '8. Changes',
    body: 'We may update these terms. If a change is significant we will tell you by email at least 30 days before it takes effect.',
  },
]

/** Long content scrolls inside the panel; Accept unlocks once the end is reached */
function ScrollModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [content, setContent] = useState<HTMLDivElement | null>(null)
  const reachedEnd = progress >= 0.98

  // Dialog's content wrapper is the element that scrolls, and scroll events
  // don't bubble — so listen on our parent directly
  useEffect(() => {
    const scroller = content?.parentElement
    if (!scroller) return
    const update = () => {
      const max = scroller.scrollHeight - scroller.clientHeight
      setProgress(max <= 0 ? 1 : scroller.scrollTop / max)
    }
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [content])

  const close = () => {
    setProgress(0)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      size="lg"
      title={t('Terms of Service')}
      description={t('Last updated October 1, 2026')}
      footer={
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-x-2">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-surface-hover sm:max-w-32">
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </span>
            <span className="text-xs text-muted">
              {reachedEnd ? t('All read') : t('Scroll to the end to accept')}
            </span>
          </div>
          <div className="flex justify-end gap-x-2">
            <button type="button" onClick={close} className="btn btn-secondary">
              {t('Decline')}
            </button>
            <button
              type="button"
              disabled={!reachedEnd}
              onClick={() => {
                showObjectToast(t('Terms accepted'), { accepted: true })
                close()
              }}
              className="btn btn-primary"
            >
              {t('Accept')}
            </button>
          </div>
        </div>
      }
    >
      <div
        ref={setContent}
        className="flex flex-col gap-y-5 text-sm leading-relaxed"
      >
        {sections.map(({ title, body }) => (
          <section key={title}>
            <h3 className="font-semibold text-foreground">{t(title)}</h3>
            <p className="mt-1 text-muted">{t(body)}</p>
          </section>
        ))}
      </div>
    </Dialog>
  )
}

export default ScrollModal
