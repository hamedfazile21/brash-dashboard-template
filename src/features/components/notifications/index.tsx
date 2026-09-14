import { Bell, Check, CircleAlert, Info, LoaderCircle, X } from 'lucide-react'
import { toast } from 'sonner'
import { showLoaderToast } from '#/helper/loader-toast.helper'

const NotificationsShowCase = () => {
  const showPromiseToast = () => {
    const request = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) resolve('Your changes were saved.')
        else reject(new Error('The server could not save your changes.'))
      }, 1600)
    })

    toast.promise(request, {
      loading: 'Saving your changes...',
      success: (message) => message,
      error: (error) => error.message,
    })
  }

  const showCustomToast = () => {
    toast.custom((toastId) => (
      <div className="flex w-[320px] items-center gap-3 ">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Bell size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            Custom notification
          </p>
          <p className="mt-0.5 text-xs text-muted">
            Built with your own JSX content.
          </p>
        </div>
        <button
          aria-label="Dismiss custom notification"
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          onClick={() => toast.dismiss(toastId)}
        >
          <X size={16} />
        </button>
      </div>
    ))
  }

  return (
    <div className="relative mx-auto flex w-full flex-col gap-y-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
        <p className="mt-1 text-sm text-muted">
          Interactive Sonner patterns using the shared notification styling.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <NotificationCard
          title="Basic"
          description="The default toast notification."
        >
          <DemoButton onClick={() => toast('Event created')}>
            Show default
          </DemoButton>
        </NotificationCard>

        <NotificationCard
          title="Status"
          description="Use semantic variants for feedback."
        >
          <div className="flex flex-wrap gap-2">
            <DemoButton
              onClick={() => toast.success('Profile updated')}
              icon={<Check size={15} />}
            >
              Success
            </DemoButton>
            <DemoButton
              onClick={() => toast.error('Something went wrong')}
              icon={<CircleAlert size={15} />}
            >
              Error
            </DemoButton>
            <DemoButton
              onClick={() => toast.info('New update available')}
              icon={<Info size={15} />}
            >
              Info
            </DemoButton>
            <DemoButton
              onClick={() => toast.warning('Your trial ends soon')}
              icon={<CircleAlert size={15} />}
            >
              Warning
            </DemoButton>
          </div>
        </NotificationCard>

        <NotificationCard
          title="Custom content"
          description="Render completely custom notification markup."
        >
          <DemoButton onClick={showCustomToast}>Show custom toast</DemoButton>
        </NotificationCard>
      </section>

      <section className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Toast management
          </p>
          <p className="mt-1 text-xs text-muted">
            Dismiss every active notification at once.
          </p>
        </div>
        <DemoButton onClick={() => toast.dismiss()} icon={<X size={15} />}>
          Dismiss all
        </DemoButton>
      </section>
    </div>
  )
}

type NotificationCardProps = {
  title: string
  description: string
  children: React.ReactNode
}

const NotificationCard = ({
  title,
  description,
  children,
}: NotificationCardProps) => (
  <section className="card flex min-h-40 flex-col justify-between gap-6 p-5">
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
    </div>
    <div>{children}</div>
  </section>
)

type DemoButtonProps = {
  children: React.ReactNode
  onClick: () => void
  icon?: React.ReactNode
}

const DemoButton = ({ children, onClick, icon }: DemoButtonProps) => (
  <button className="btn btn-primary btn-sm" onClick={onClick} type="button">
    {icon}
    {children}
  </button>
)

export default NotificationsShowCase
