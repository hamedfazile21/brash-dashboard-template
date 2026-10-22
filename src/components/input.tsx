import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  parentClassName?: string
  labelClassName?: string
  error?: string
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
      id,
      required,
      placeholder = '',
      type = 'text',
      icon: Icon,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const isPassword = type === 'password'
    const [visible, setVisible] = useState(false)

    return (
      <div className={`w-full ${parentClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`mb-1.5 inline-block text-sm font-medium text-foreground ${labelClassName}`}
          >
            {label}
            {required && <span className="ms-0.5 text-danger">*</span>}
          </label>
        )}

        <div className="group/input relative w-full">
          {Icon && (
            <Icon
              size={16}
              aria-hidden
              className="pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within/input:text-primary"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (visible ? 'text' : 'password') : type}
            autoComplete="off"
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            required={required}
            // `!` on padding: .input is unlayered CSS, so plain utilities lose to it
            className={`input ${Icon ? 'ps-9!' : ''} ${isPassword ? 'pe-10!' : ''} ${
              error ? 'border-danger! focus:ring-danger/30!' : ''
            } ${className}`}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
              aria-pressed={visible}
              tabIndex={-1}
              className="absolute inset-e-1.5 top-1/2 flex -translate-y-1/2 items-center rounded-md p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
