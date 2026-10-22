import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { showObjectToast } from '#/helper/toast-helper'
import { authLinks } from '#/features/auth/auth-links'
import type { AuthVariant } from '#/features/auth/auth-links'
import AuthHeader from '#/features/auth/components/auth-header'
import { AuthCard } from '#/features/auth/components/auth-layout'
import OtpInput from '#/features/auth/components/otp-input'

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 30 // seconds
const DEMO_EMAIL = 'hamed@example.com'

function EmailVerificationForm({ variant }: { variant: AuthVariant }) {
  const { t } = useTranslation()
  const links = authLinks[variant]
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [coolDown, setCoolDown] = useState(RESEND_COOLDOWN)

  useEffect(() => {
    if (coolDown <= 0) return
    const timer = setTimeout(() => setCoolDown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [coolDown])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = code.join('')
    if (value.length < CODE_LENGTH) {
      setError(t('Enter the full {{count}}-digit code', { count: CODE_LENGTH }))
      return
    }
    setError('')
    showObjectToast(t('Verification submitted'), { code: value })
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
        icon={MailCheck}
        title={t('Verify your email')}
        description={
          <>
            {t('We sent a {{count}}-digit code to', { count: CODE_LENGTH })}{' '}
            <span className="font-medium text-foreground">{DEMO_EMAIL}</span>
          </>
        }
      />

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6"
      >
        <OtpInput
          value={code}
          onChange={(next) => {
            setCode(next)
            if (error) setError('')
          }}
          error={error}
        />

        <button
          type="submit"
          className="btn btn-primary w-full! shadow-lg shadow-primary/25"
        >
          {t('Verify email')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {t("Didn't get a code?")}{' '}
        <button
          type="button"
          onClick={() => {
            setCoolDown(RESEND_COOLDOWN)
            showObjectToast(t('Code resent'), { email: DEMO_EMAIL })
          }}
          disabled={coolDown > 0}
          className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
        >
          {coolDown > 0
            ? t('Resend in {{seconds}}s', { seconds: coolDown })
            : t('Resend code')}
        </button>
      </p>
    </AuthCard>
  )
}

export default EmailVerificationForm
