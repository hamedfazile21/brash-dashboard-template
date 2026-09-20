import { useState } from 'react'
import { KeyRound, ShieldCheck } from 'lucide-react'
import Input from '#/components/input'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../assets'
import { showObjectToast } from '#/helper/toast-helper'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

function ResetBasic() {
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6">
      {/* Decorative blobs, same background treatment as the other basic auth pages */}
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
            <Link to="/login-basic" className="btn btn-primary mt-6">
              {t('Back to sign in')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetBasic
