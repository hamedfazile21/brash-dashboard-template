import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { FieldLabel, FieldMessage } from './field'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  parentClassName?: string
  labelClassName?: string
  error?: string
  /** Helper text under the field, replaced by `error` when set */
  hint?: string
  showCount?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 4,
      maxLength,
      showCount = false,
      value,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const messageId = `${textareaId}-message`
    const length = String(value ?? '').length
    // Counter turns amber in the last 10% so the limit is not a surprise
    const nearLimit = !!maxLength && length >= maxLength * 0.9

    return (
      <div className={`w-full ${parentClassName}`}>
        {label && (
          <FieldLabel
            htmlFor={textareaId}
            required={required}
            className={labelClassName}
          >
            {label}
          </FieldLabel>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error || hint ? messageId : undefined}
          required={required}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={`input block min-h-20 resize-y ${className}`}
          {...rest}
        />

        <div className="flex items-start justify-between gap-x-3">
          <div className="min-w-0">
            <FieldMessage id={messageId} error={error} hint={hint} />
          </div>

          {showCount && maxLength && (
            <span
              className={`mt-1.5 shrink-0 text-xs tabular-nums ${
                nearLimit ? 'text-warning' : 'text-muted'
              }`}
            >
              {length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
