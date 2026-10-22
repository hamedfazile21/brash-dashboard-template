import {
  Bell,
  BellRing,
  Braces,
  CircleCheck,
  CircleX,
  Info,
  Layers,
  LoaderCircle,
  MessageSquare,
  Sparkles,
  TriangleAlert,
  Undo2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { showLoaderToast } from '#/helper/loader-toast.helper'
import { showObjectToast } from '#/helper/toast-helper'
import { Avatar10 } from '../../../assets'
import ShowcaseHeader from '../shared/showcase-header'
import ShowcaseSection from '../shared/showcase-section'

/* ------------------------------------------------------------------ */
/* Status tiles — each shows a miniature of the toast it fires         */
/* ------------------------------------------------------------------ */

interface StatusTile {
  title: string
  message: string
  icon: LucideIcon
  tone: string
  fire: (message: string) => void
}

const statusTiles: StatusTile[] = [
  {
    title: 'Default',
    message: 'Event created',
    icon: Bell,
    tone: 'bg-primary/12 text-primary',
    fire: (m) => toast(m),
  },
  {
    title: 'Success',
    message: 'Profile updated',
    icon: CircleCheck,
    tone: 'bg-success/12 text-success',
    fire: (m) => toast.success(m),
  },
  {
    title: 'Error',
    message: 'Something went wrong',
    icon: CircleX,
    tone: 'bg-danger/12 text-danger',
    fire: (m) => toast.error(m),
  },
  {
    title: 'Info',
    message: 'New update available',
    icon: Info,
    tone: 'bg-info/12 text-info',
    fire: (m) => toast.info(m),
  },
  {
    title: 'Warning',
    message: 'Your trial ends soon',
    icon: TriangleAlert,
    tone: 'bg-warning/12 text-warning',
    fire: (m) => toast.warning(m),
  },
]

function StatusSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={BellRing}
      title="Status"
      description="Semantic variants for feedback — click a tile to fire it"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {statusTiles.map(({ title, message, icon: Icon, tone, fire }) => (
          <button
            key={title}
            type="button"
            onClick={() => fire(t(message))}
            className="card card-hover group flex flex-col gap-y-4 p-4! text-start outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Mini toast */}
            <span className="flex items-center gap-x-2.5 rounded-lg border border-borderColor bg-background/70 p-2.5 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full ${tone}`}
              >
                <Icon size={15} />
              </span>
              <span className="truncate text-xs font-medium text-foreground">
                {t(message)}
              </span>
            </span>
            <span className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {t(title)}
              </span>
              <code className="font-mono text-[10px] text-muted" dir="ltr">
                {title === 'Default'
                  ? 'toast()'
                  : `toast.${title.toLowerCase()}()`}
              </code>
            </span>
          </button>
        ))}
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Patterns                                                            */
/* ------------------------------------------------------------------ */

function PatternCard({
  icon: Icon,
  title,
  description,
  code,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  code: string
  children: ReactNode
}) {
  const { t } = useTranslation()

  return (
    <section className="card flex flex-col gap-y-4 p-5!">
      <div className="flex items-start gap-x-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{t(title)}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            {t(description)}
          </p>
        </div>
      </div>
      <code
        dir="ltr"
        className="block truncate rounded-lg bg-surface-hover/70 px-3 py-2 font-mono text-[11px] text-muted"
      >
        {code}
      </code>
      <div className="mt-auto">{children}</div>
    </section>
  )
}

function PatternsSection() {
  const { t } = useTranslation()

  const showWithDescription = () =>
    toast(t('Meeting moved'), {
      description: t('Design review is now Thursday at 14:00.'),
    })

  const showWithAction = () =>
    toast(t('Task moved to trash'), {
      description: t('"Update onboarding copy"'),
      action: {
        label: t('Undo'),
        onClick: () => toast.success(t('Task restored')),
      },
    })

  const showPromise = () => {
    const request = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.25) resolve(t('Your changes were saved.'))
        else reject(new Error(t('The server could not save your changes.')))
      }, 1600)
    })
    toast.promise(request, {
      loading: t('Saving your changes...'),
      success: (message) => message,
      error: (error: Error) => error.message,
    })
  }

  const showLoader = () => {
    const id = showLoaderToast(t('Uploading 3 files...'))
    setTimeout(() => {
      toast.dismiss(id)
      toast.success(t('Upload complete'))
    }, 2200)
  }

  const showCustom = () =>
    toast.custom((id) => (
      <div className="flex w-85 items-start gap-3">
        <img
          src={Avatar10}
          alt=""
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Sara Ahmadi</p>
          <p className="mt-0.5 text-xs text-muted">
            {t('Can you review the new dashboard before lunch?')}
          </p>
          <div className="mt-2.5 flex gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(id)}
              className="btn btn-primary btn-sm"
            >
              {t('Reply')}
            </button>
            <button
              type="button"
              onClick={() => toast.dismiss(id)}
              className="btn btn-secondary btn-sm"
            >
              {t('Later')}
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label={t('Dismiss')}
          onClick={() => toast.dismiss(id)}
          className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <X size={14} />
        </button>
      </div>
    ))

  const showObject = () =>
    showObjectToast(t('Form submitted'), {
      name: 'Hamed Fazeli',
      email: 'hamed@example.com',
      plan: 'Pro',
      notifications: { email: true, sms: false },
    })

  const patterns = [
    {
      icon: MessageSquare,
      title: 'With description',
      description: 'A second line for context.',
      code: 'toast(title, { description })',
      label: 'Show toast',
      onClick: showWithDescription,
    },
    {
      icon: Undo2,
      title: 'With action',
      description: 'Let people undo what they just did.',
      code: 'toast(title, { action: { label, onClick } })',
      label: 'Delete a task',
      onClick: showWithAction,
    },
    {
      icon: Sparkles,
      title: 'Promise',
      description: 'Loading, then success or error — fails 1 in 4 times.',
      code: 'toast.promise(request, { loading, success, error })',
      label: 'Save changes',
      onClick: showPromise,
    },
    {
      icon: LoaderCircle,
      title: 'Loader',
      description: 'A spinner that stays until you replace it.',
      code: "showLoaderToast('Uploading...')",
      label: 'Upload files',
      onClick: showLoader,
    },
    {
      icon: Bell,
      title: 'Custom content',
      description: 'Your own JSX, with avatars and buttons.',
      code: 'toast.custom((id) => <YourContent />)',
      label: 'New message',
      onClick: showCustom,
    },
    {
      icon: Braces,
      title: 'Object viewer',
      description: 'Inspect submitted form data at a glance.',
      code: "showObjectToast('Form submitted', data)",
      label: 'Submit form',
      onClick: showObject,
    },
  ]

  return (
    <ShowcaseSection
      icon={Layers}
      title="Patterns"
      description="Richer notifications for real workflows"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patterns.map(({ icon, title, description, code, label, onClick }) => (
          <PatternCard
            key={title}
            icon={icon}
            title={title}
            description={description}
            code={code}
          >
            <button
              type="button"
              onClick={onClick}
              className="btn btn-primary btn-sm"
            >
              {t(label)}
            </button>
          </PatternCard>
        ))}
      </div>
    </ShowcaseSection>
  )
}

function NotificationsShowCase() {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Notifications"
        description="Sonner toasts styled with your design tokens — status variants, actions, promises and fully custom content."
        code="toast.success('Saved', { description, action })"
        stats={[
          { value: 5, label: 'Variants' },
          { value: 6, label: 'Patterns' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />

      <StatusSection />
      <PatternsSection />

      <section className="card flex flex-col gap-3 p-5! sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {t('Toast management')}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {t('Fire a few, then clear every active notification at once.')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss()}
          className="btn btn-secondary btn-sm"
        >
          <X size={15} />
          {t('Dismiss all')}
        </button>
      </section>
    </div>
  )
}

export default NotificationsShowCase
