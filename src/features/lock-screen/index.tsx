import { useEffect, useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import Input from '#/components/input'
import GlassBackdrop from '#/components/layout/glass-backdrop'
import { showObjectToast } from '#/helper/toast-helper'
import { fieldError } from '#/features/auth/validators'
import { AuthCard, AuthFooter } from '#/features/auth/components/auth-layout'
import { Avatar13 } from '../../assets'

function LockScreen() {
  const { t, i18n } = useTranslation()
  const [now, setNow] = useState(new Date())

  const { Field, handleSubmit } = useForm({
    defaultValues: { lockPassword: '' },
    onSubmit: ({ value }) => {
      showObjectToast(t('Unlock submitted'), value)
    },
  })

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const locale = i18n.language === 'fa' ? 'fa-IR' : 'en-US'
  const time = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
  const date = now.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <GlassBackdrop />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        {/* Clock */}
        <div className="mb-10 text-center">
          <p className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-6xl font-bold tracking-tight text-transparent tabular-nums sm:text-7xl">
            {time}
          </p>
          <p className="mt-2 text-sm font-medium text-muted">{date}</p>
        </div>

        <AuthCard>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-primary/30 blur-2xl" />
              <img
                src={Avatar13}
                alt=""
                className="size-20 rounded-full object-cover ring-4 ring-surface"
              />
              <span className="absolute inset-e-0 bottom-0 flex size-7 items-center justify-center rounded-full bg-surface text-muted ring-2 ring-surface">
                <Lock size={14} />
              </span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">
              Hamed Fazeli
            </h1>
            <p className="mt-1 text-sm text-muted">
              {t('Your session is locked')}
            </p>
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }}
            className="mt-6 flex flex-col gap-y-3"
          >
            <Field
              name="lockPassword"
              validators={{
                onSubmit: ({ value }) =>
                  !value ? t('Password is required') : undefined,
              }}
              children={(field) => (
                <Input
                  id={field.name}
                  type="password"
                  autoComplete="current-password"
                  aria-label={t('Password')}
                  placeholder={t('Enter your password')}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={fieldError(field.state.meta)}
                />
              )}
            />

            <button
              type="submit"
              className="btn btn-primary w-full! shadow-lg shadow-primary/25"
            >
              {t('Unlock')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </button>
          </form>

          <Link
            to="/login-basic"
            className="mt-5 block text-center text-xs font-medium text-muted transition-colors hover:text-primary"
          >
            {t('Not you? Switch account')}
          </Link>
        </AuthCard>
      </main>

      <div className="px-6 py-6">
        <AuthFooter />
      </div>
    </div>
  )
}

export default LockScreen
