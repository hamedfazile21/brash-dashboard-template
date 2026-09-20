import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import Input from '#/components/input'
import { Avatar13, GlassBlob, GlassBlob1, GlassBlob2 } from '../../assets'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import { showObjectToast } from '#/helper/toast-helper'

interface LockScreenFrom {
  lockPassword: string
}

function LockScreen() {
  const { t } = useTranslation()
  const [now, setNow] = useState(new Date())

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      lockPassword: '',
    } as LockScreenFrom,
    onSubmit: async ({ value }) => {
      showObjectToast(t('Screen Lock Submitted'), value)
    },
  })

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const date = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Decorative blobs behind the glass card */}
      <img
        src={GlassBlob1}
        alt=""
        className="pointer-events-none fixed -top-20 -left-20 -z-10 size-128 opacity-70 dark:opacity-30"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none fixed bottom-50 right-180 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none fixed -bottom-24 -right-16 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Clock */}
      <div className="mb-10 text-center">
        <p className="text-6xl font-semibold tracking-tight text-foreground">
          {time}
        </p>
        <p className="mt-2 text-sm text-muted">{date}</p>
      </div>

      {/* Lock card */}
      <div className="card w-125 p-10! text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-surface-hover">
          <img src={Avatar13} className="size-full object-cover flex" />
        </div>

        <h1 className="text-lg font-semibold text-foreground">
          {'Hamed Fazeli'}
        </h1>
        <p className="mt-1 text-sm text-muted">{t('Your session is locked')}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="mt-6 flex flex-col gap-y-3 text-left"
        >
          <Field
            name="lockPassword"
            validators={{
              onSubmit: ({ value }) =>
                !value ? 'Password is required' : undefined,
            }}
            children={(field) => (
              <Input
                id={field.name}
                type="password"
                placeholder={t('Enter your password')}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors.join(', ')
                    : undefined
                }
              />
            )}
          />

          <button
            type="submit"
            className="btn btn-primary w-full! flex items-center justify-center gap-x-2"
          >
            <Lock size={16} />
            {t('Unlock')}
          </button>
        </form>
        <button
          type="button"
          className="mt-5 text-xs font-medium text-muted hover:text-primary hover:underline"
        >
          {t('Not you? Switch account')}
        </button>
      </div>
    </div>
  )
}

export default LockScreen
