import { useState } from 'react'
import { KeyRound, ShieldCheck } from 'lucide-react'
import Input from '#/components/input'
import { GlassBlob, ResetPasswordPNG } from '../../../assets'
import { showObjectToast } from '#/helper/toast-helper'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

function ResetCover() {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: typeof errors = {}
    if (!password) {
      nextErrors.password = 'Password is required'
    } else if (password.length < 8) {
      nextErrors.password = 'Must be at least 8 characters'
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password'
    } else if (password && confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitting(true)
    // await api.resetPassword({ token, password })
    setSubmitting(false)
    setDone(true)
    showObjectToast('Register From Submitted', { password })
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden lg:flex-row">
      {/* Cover side */}

      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none fixed bottom-50 rtl:right-100 ltr:left-100 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Form side */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-[55%]">
        <div className="card w-full max-w-md p-10">
          {!done ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold text-foreground">
                  {t('Set a new password')}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {t("Choose a strong password you haven't used before.")}
                </p>
              </div>

              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <Input
                  id="password"
                  type="password"
                  label={t('New password')}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  error={errors.password}
                />

                <Input
                  id="confirmPassword"
                  type="password"
                  label={t('Confirm new password')}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword)
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }))
                  }}
                  error={errors.confirmPassword}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full! mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t('Resetting…') : t('Reset password')}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <ShieldCheck size={26} />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-foreground">
                {t('Password reset')}
              </h1>
              <p className="mt-2 max-w-xs text-sm text-muted">
                {t(
                  'Your password has been changed successfully. You can now sign in with your new password.',
                )}
              </p>
              <Link to="/login-cover" className="btn btn-primary mt-6">
                {t('Back to sign in')}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="relative hidden h-screen w-[45%] items-center justify-center overflow-hidden p-10 lg:flex">
        <img
          src={ResetPasswordPNG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="card relative z-10 w-full max-w-md p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <KeyRound size={22} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            {t('Almost there — secure your account')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t(
              "Pick a password you haven't used before. We'll sign you out of every other device once it's updated.",
            )}
          </p>

          <div className="mt-6 flex flex-col gap-y-3 border-t border-white/10 pt-6">
            {[
              'At least 8 characters',
              'A mix of letters and numbers works best',
              "You'll be signed out everywhere else",
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

export default ResetCover
