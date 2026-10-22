import { useState } from 'react'
import { ArrowLeft, ArrowRight, Mail, MailCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'
import { authLinks } from '#/features/auth/auth-links'
import type { AuthVariant } from '#/features/auth/auth-links'
import { fieldError, validateEmail } from '#/features/auth/validators'
import AuthHeader from '#/features/auth/components/auth-header'
import { AuthCard } from '#/features/auth/components/auth-layout'

function ForgotPasswordForm({ variant }: { variant: AuthVariant }) {
  const { t } = useTranslation()
  const links = authLinks[variant]
  const [sentTo, setSentTo] = useState<string | null>(null)

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
    onSubmit: ({ value }) => {
      // await api.sendResetLink(value.email)
      showObjectToast(t('Reset link requested'), value)
      setSentTo(value.email)
    },
  })

  const footer = (
    <Link
      to={links.login}
      className="inline-flex items-center gap-x-1.5 font-semibold text-primary hover:underline"
    >
      <ArrowLeft size={15} className="rtl:rotate-180" />
      {t('Back to sign in')}
    </Link>
  )

  if (sentTo) {
    return (
      <AuthCard footer={footer}>
        <AuthHeader
          icon={MailCheck}
          tone="success"
          title={t('Check your inbox')}
          description={
            <>
              {t('We sent a password reset link to')}{' '}
              <span className="font-medium text-foreground">{sentTo}</span>.{' '}
              {t("It'll expire in 15 minutes.")}
            </>
          }
        />
        <div className="flex flex-col gap-y-3">
          <a
            href="mailto:"
            className="btn btn-primary w-full! shadow-lg shadow-primary/25"
          >
            <Mail size={16} />
            {t('Open email app')}
          </a>
          <button
            type="button"
            onClick={() => {
              reset()
              setSentTo(null)
            }}
            className="btn btn-secondary w-full!"
          >
            {t('Use a different email')}
          </button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard footer={footer}>
      <AuthHeader
        title={t('Forgot your password?')}
        description={t(
          "Enter the email linked to your account and we'll send you a reset link.",
        )}
      />

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}
        className="flex flex-col gap-y-4"
      >
        <Field
          name="email"
          validators={{ onSubmit: ({ value }) => validateEmail(t, value) }}
          children={(field) => (
            <Input
              label={t('Email')}
              icon={Mail}
              id={field.name}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={fieldError(field.state.meta)}
            />
          )}
        />

        <button
          type="submit"
          className="group btn btn-primary mt-2 w-full! shadow-lg shadow-primary/25"
        >
          {t('Send reset link')}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </button>
      </form>
    </AuthCard>
  )
}

export default ForgotPasswordForm
