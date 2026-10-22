import { useState } from 'react'
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'
import { authLinks } from '#/features/auth/auth-links'
import type { AuthVariant } from '#/features/auth/auth-links'
import {
  fieldError,
  validateConfirmPassword,
  validateNewPassword,
} from '#/features/auth/validators'
import AuthHeader from '#/features/auth/components/auth-header'
import { AuthCard } from '#/features/auth/components/auth-layout'
import PasswordStrength from '#/features/auth/components/password-strength'

function ResetPasswordForm({ variant }: { variant: AuthVariant }) {
  const { t } = useTranslation()
  const links = authLinks[variant]
  const [done, setDone] = useState(false)

  const { Field, handleSubmit } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
    onSubmit: ({ value }) => {
      // await api.resetPassword({ token, password: value.password })
      showObjectToast(t('Password reset submitted'), value)
      setDone(true)
    },
  })

  if (done) {
    return (
      <AuthCard>
        <AuthHeader
          icon={ShieldCheck}
          tone="success"
          title={t('Password updated')}
          description={t(
            'Your password has been changed successfully. You can now sign in with your new password.',
          )}
        />
        <Link
          to={links.login}
          className="group btn btn-primary w-full! shadow-lg shadow-primary/25"
        >
          {t('Continue to sign in')}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      footer={
        <Link
          to={links.login}
          className="inline-flex items-center gap-x-1.5 font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {t('Back to sign in')}
        </Link>
      }
    >
      <AuthHeader
        title={t('Set a new password')}
        description={t("Choose a strong password you haven't used before.")}
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
          name="password"
          validators={{
            onSubmit: ({ value }) => validateNewPassword(t, value),
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Input
                label={t('New password')}
                icon={LockKeyhole}
                id={field.name}
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                error={fieldError(field.state.meta)}
              />
              <PasswordStrength value={field.state.value} />
            </div>
          )}
        />

        <Field
          name="confirmPassword"
          validators={{
            onSubmit: ({ value, fieldApi }) =>
              validateConfirmPassword(
                t,
                value,
                fieldApi.form.getFieldValue('password'),
              ),
          }}
          children={(field) => (
            <Input
              label={t('Confirm new password')}
              icon={LockKeyhole}
              id={field.name}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={fieldError(field.state.meta)}
            />
          )}
        />

        <button
          type="submit"
          className="btn btn-primary mt-2 w-full! shadow-lg shadow-primary/25"
        >
          {t('Reset password')}
        </button>
      </form>
    </AuthCard>
  )
}

export default ResetPasswordForm
