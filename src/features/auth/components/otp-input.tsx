import { useRef } from 'react'
import type { ClipboardEvent, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface OtpInputProps {
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

/** One box per digit; typing advances, Backspace goes back, paste fills all */
function OtpInput({ value, onChange, error }: OtpInputProps) {
  const { t } = useTranslation()
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const length = value.length

  const focus = (index: number) => inputsRef.current[index]?.focus()

  const handleChange = (index: number, raw: string) => {
    if (!/^\d*$/.test(raw)) return
    const next = [...value]
    next[index] = raw.slice(-1)
    onChange(next)
    if (raw && index < length - 1) focus(index + 1)
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) focus(index - 1)
    if (e.key === 'ArrowLeft' && index > 0) focus(index - 1)
    if (e.key === 'ArrowRight' && index < length - 1) focus(index + 1)
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)
    if (!pasted) return
    const next = Array<string>(length).fill('')
    pasted.split('').forEach((char, i) => (next[i] = char))
    onChange(next)
    focus(Math.min(pasted.length, length - 1))
  }

  return (
    <div className="flex flex-col items-center gap-y-2">
      {/* Digits always read left to right, even in RTL */}
      <div
        className="flex justify-center gap-2"
        dir="ltr"
        onPaste={handlePaste}
      >
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            aria-label={t('Digit {{n}}', { n: index + 1 })}
            aria-invalid={!!error}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={(e) => e.target.select()}
            className={`size-11 rounded-xl border bg-surface/60 text-center text-lg font-semibold text-foreground outline-none transition-all duration-150 focus:-translate-y-0.5 focus:border-primary focus:ring-4 focus:ring-primary/20 sm:size-12 ${
              error
                ? 'border-danger'
                : digit
                  ? 'border-primary/50'
                  : 'border-borderColor'
            }`}
          />
        ))}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}

export default OtpInput
