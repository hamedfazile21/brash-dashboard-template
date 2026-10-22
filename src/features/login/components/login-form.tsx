import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'
import { authLinks } from '#/features/auth/auth-links'
import type { AuthVariant } from '#/features/auth/auth-links'
import { fieldError, validateEmail } from '#/features/auth/validators'
import AuthHeader from '#/features/auth/components/auth-header'
import { AuthCard } from '#/features/auth/components/auth-layout'
import SocialLogin from '#/features/auth/components/social-login'

function LoginForm({ variant }: { variant: AuthVariant }) {
  const { t } = useTranslation()
  const links = authLinks[variant]

  const { Field, handleSubmit } = useForm({
    defaultValues: { email: '', password: '', rememberMe: false },
    onSubmit: ({ value }) => {
      showObjectToast(t('Login form submitted'), value)
    },
  })

  return (
    <AuthCard
      footer={
        <>
          {t("Don't have an account?")}{' '}
          <Link
            to={links.register}
            className="font-semibold text-primary hover:underline"
          >
            {t('Create one')}
          </Link>
        </>
      }
    >
      <AuthHeader
        title={t('Welcome back')}
        description={t('Sign in to your account to continue')}
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

        <Field
          name="password"
          validators={{
            onSubmit: ({ value }) =>
              !value ? t('Password is required') : undefined,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  {t('Password')}
                </label>
                <Link
                  to={links.forgotPassword}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {t('Forgot password?')}
                </Link>
              </div>
              <Input
                icon={LockKeyhole}
                id={field.name}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                error={fieldError(field.state.meta)}
              />
            </div>
          )}
        />

        <Field
          name="rememberMe"
          children={(field) => (
            <label className="flex w-fit cursor-pointer items-center gap-x-2 text-sm text-muted">
              <CheckBox
                checked={field.state.value}
                onChange={() => field.handleChange(!field.state.value)}
              />
              {t('Remember me for 30 days')}
            </label>
          )}
        />

        <button
          type="submit"
          className="group btn btn-primary mt-2 w-full! shadow-lg shadow-primary/25"
        >
          {t('Sign in')}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </button>
      </form>

      <SocialLogin action="Sign in" />
    </AuthCard>
  )
}

export default LoginForm
