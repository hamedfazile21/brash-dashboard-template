import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FieldLabel, FieldMessage } from './field'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  parentClassName?: string
  labelClassName?: string
  error?: string
  /** Helper text under the field, replaced by `error` when set */
  hint?: string
  /** Optional leading icon inside the field */
  icon?: LucideIcon
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      parentClassName = '',
      labelClassName = '',
      error,
      hint,
      id,
      required,
      placeholder = '',
      type = 'text',
      icon: Icon,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation()
    const generatedId = useId()
    const inputId = id ?? generatedId
    const messageId = `${inputId}-message`
    const isPassword = type === 'password'
    const [visible, setVisible] = useState(false)

    return (
      <div className={`w-full ${parentClassName}`}>
        {label && (
          <FieldLabel
            htmlFor={inputId}
            required={required}
            className={labelClassName}
          >
            {label}
          </FieldLabel>
        )}

        <div className="group/input relative w-full">
          {Icon && (
            <Icon
              size={16}
              aria-hidden
              className={`pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 transition-colors ${
                error
                  ? 'text-danger'
                  : 'text-muted group-focus-within/input:text-primary'
              }`}
            />
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (visible ? 'text' : 'password') : type}
            autoComplete="off"
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error || hint ? messageId : undefined}
            required={required}
            // `!` on padding: .input is unlayered CSS, so plain utilities lose to it
            className={`input ${Icon ? 'ps-9!' : ''} ${isPassword ? 'pe-10!' : ''} ${className}`}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? t('Hide password') : t('Show password')}
              aria-pressed={visible}
              tabIndex={-1}
              className="absolute inset-e-1.5 top-1/2 flex -translate-y-1/2 items-center rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        <FieldMessage id={messageId} error={error} hint={hint} />
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
