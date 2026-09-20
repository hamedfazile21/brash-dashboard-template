import { useState } from 'react'
import { ArrowLeft, Mail, MailCheck } from 'lucide-react'
import Input from '#/components/input'
import { ForgotPasswordSVG, GlassBlob } from '../../../assets'
import { Link } from '@tanstack/react-router'
import { showObjectToast } from '#/helper/toast-helper'
import { useTranslation } from 'react-i18next'

function ForgotPasswordCover() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Email is required')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email')
      return
    }
    setError('')
    setSubmitting(true)
    // await api.sendResetLink(email)
    setSubmitting(false)
    setSent(true)
    showObjectToast(t('Login From Submitted'), { email })
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden lg:flex-row">
      {/* Cover side */}

      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none absolute bottom-50 rtl:lg:right-100 ltr:lg:left-100 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Form side */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-[55%]">
        <div className="card w-full max-w-md p-10">
          <Link
            to={'/login-cover'}
            className="mb-6 inline-flex items-center gap-x-1.5 text-sm font-medium text-muted hover:text-primary"
          >
            <ArrowLeft className="rtl:rotate-180" size={16} />
            {t('Back to sign in')}
          </Link>

          {!sent ? (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-foreground">
                  {t('Forgot your password?')}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {t(
                    "Enter the email linked to your account and we'll send you a reset link.",
                  )}
                </p>
              </div>

              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <Input
                  id="email"
                  type="email"
                  label={t('Email')}
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  error={error}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full! mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t('Sending…') : t('Send reset link')}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <MailCheck size={26} />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-foreground">
                {t('Check your inbox')}
              </h1>
              <p className="mt-2 max-w-xs text-sm text-muted">
                {t('We sent a password reset link to')}{' '}
                <span className="font-medium text-foreground">{email}</span>.
                {t("It'll expire in 15 minutes.")}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-xs font-medium text-primary hover:underline"
              >
                {t("Didn't get it? Try a different email")}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative hidden h-screen w-[45%] items-center justify-center overflow-hidden p-10 lg:flex">
        <img
          src={ForgotPasswordSVG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hidden dark:block absolute inset-0 bg-black/20" />

        <div className="card relative z-10 w-full max-w-md p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-white">
            <Mail size={22} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            {t('Account recovery, simplified')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {t(
              "We'll email you a secure link to reset your password — no security questions, no waiting on support.",
            )}
          </p>

          <div className="mt-6 flex flex-col gap-y-3 border-t border-white/10 pt-6">
            {[
              'Link expires after 15 minutes for your security',
              'Your account stays locked until you reset it',
              'Need help? Support responds within the hour',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-x-2.5 text-sm text-foreground"
              >
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {t(item)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordCover
