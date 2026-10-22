import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'
import { authLinks } from '#/features/auth/auth-links'
import type { AuthVariant } from '#/features/auth/auth-links'
import {
  fieldError,
  validateConfirmPassword,
  validateEmail,
  validateNewPassword,
} from '#/features/auth/validators'
import AuthHeader from '#/features/auth/components/auth-header'
import { AuthCard } from '#/features/auth/components/auth-layout'
import PasswordStrength from '#/features/auth/components/password-strength'
import SocialLogin from '#/features/auth/components/social-login'

function RegisterForm({ variant }: { variant: AuthVariant }) {
  const { t } = useTranslation()
  const links = authLinks[variant]

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      agreement: false,
    },
    onSubmit: ({ value }) => {
      showObjectToast(t('Register form submitted'), value)
    },
  })

  return (
    <AuthCard
      footer={
        <>
          {t('Already have an account?')}{' '}
          <Link
            to={links.login}
            className="font-semibold text-primary hover:underline"
          >
            {t('Sign in')}
          </Link>
        </>
      }
    >
      <AuthHeader
        title={t('Create your account')}
        description={t('Start your free trial — no credit card required')}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            name="first_name"
            validators={{
              onSubmit: ({ value }) =>
                !value.trim() ? t('First name is required') : undefined,
            }}
            children={(field) => (
              <Input
                label={t('First name')}
                icon={UserRound}
                id={field.name}
                autoComplete="given-name"
                placeholder="Hamed"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                error={fieldError(field.state.meta)}
              />
            )}
          />
          <Field
            name="last_name"
            children={(field) => (
              <Input
                label={t('Last name')}
                id={field.name}
                autoComplete="family-name"
                placeholder="Fazeli"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>

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
            onSubmit: ({ value }) => validateNewPassword(t, value),
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Input
                label={t('Password')}
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
          name="confirm_password"
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
              label={t('Confirm password')}
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

        <Field
          name="agreement"
          validators={{
            onSubmit: ({ value }) =>
              !value ? t('Please accept the terms to continue') : undefined,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-1">
              {/* No onClick on the label — it already forwards to the checkbox */}
              <label className="flex w-fit cursor-pointer items-start gap-x-2 text-sm text-muted">
                <CheckBox
                  checked={field.state.value}
                  onChange={() => field.handleChange(!field.state.value)}
                />
                <span>
                  {t('I agree to the')}{' '}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    {t('Terms of Service')}
                  </a>{' '}
                  {t('and')}{' '}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    {t('Privacy Policy')}
                  </a>
                </span>
              </label>
              {fieldError(field.state.meta) && (
                <p className="text-xs text-danger">
                  {fieldError(field.state.meta)}
                </p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="group btn btn-primary mt-2 w-full! shadow-lg shadow-primary/25"
        >
          {t('Create account')}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </button>
      </form>

      <SocialLogin action="Sign up" />
    </AuthCard>
  )
}

export default RegisterForm
