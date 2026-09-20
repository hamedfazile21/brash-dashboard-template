import { ArrowLeft, MailCheck } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { GlassBlob, GlassBlob2, GlassBlob3 } from '../../../assets'
import { showObjectToast } from '#/helper/toast-helper'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
const CODE_LENGTH = 6
const RESEND_COOLDOWN = 30 // seconds
const EmailVerificationBasic = () => {
  const { t } = useTranslation()
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [coolDown, setCoolDown] = useState(RESEND_COOLDOWN)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const email = 'hamed@example.com' // pass this in as a prop in real usage

  useEffect(() => {
    if (coolDown <= 0) return
    const timer = setInterval(() => setCoolDown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [coolDown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // digits only

    const next = [...code]
    next[index] = value.slice(-1)
    setCode(next)
    if (error) setError('')

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, CODE_LENGTH)
    if (!pasted) return
    const next = Array(CODE_LENGTH).fill('')
    pasted.split('').forEach((char, i) => (next[i] = char))
    setCode(next)
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = code.join('')
    if (value.length < CODE_LENGTH) {
      setError('Enter the full 6-digit code')
      return
    }
    setError('')
    setSubmitting(true)
    setSubmitting(false)
    showObjectToast(t('Verification From Submitted'), { code: value })
  }

  const handleResend = () => {
    if (coolDown > 0) return
    setCoolDown(RESEND_COOLDOWN)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen relative ">
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none fixed -top-20 left-0 lg:-left-20 -z-10 size-128 opacity-70 dark:opacity-30"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none fixed bottom-50 right-0 md:right-180 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <img
        src={GlassBlob3}
        alt=""
        className="pointer-events-none fixed -bottom-24 right-0 lg:-right-16 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <div className="card w-full max-w-md p-10 text-center">
        <Link
          to="/login-cover"
          className="mb-6 inline-flex items-center gap-x-1.5 text-sm font-medium text-muted hover:text-primary"
        >
          <ArrowLeft className="rtl:rotate-180" size={16} />
          {t('Back to sign in')}
        </Link>

        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <MailCheck size={26} />
        </div>

        <h1 className="text-xl font-semibold text-foreground">
          {t('Verify your email')}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {t('We sent a 6-digit code to')}{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>

        <form
          className="mt-8 flex flex-col items-center gap-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center gap-x-2" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`size-12 rounded-lg border bg-surface/60 text-center text-lg font-semibold
                    text-foreground outline-none transition-all duration-150
                    focus:border-primary/50 focus:ring-2 focus:ring-primary/30
                    ${error ? 'border-red-500' : 'border-borderColor'}`}
              />
            ))}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full! mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t('Verifying…') : t('Verify email')}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          {t("Didn't get a code?")}{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={coolDown > 0}
            className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
          >
            {coolDown > 0
              ? t('Resend in ${coolDown}s', { coolDown })
              : t('Resend code')}
          </button>
        </p>
      </div>
    </div>
  )
}

export default EmailVerificationBasic
