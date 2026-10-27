import type { ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'

interface FieldLabelProps {
  htmlFor?: string
  required?: boolean
  className?: string
  children: ReactNode
}

/** Label shared by every form field — same spacing and required marker */
export function FieldLabel({
  htmlFor,
  required,
  className = '',
  children,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 inline-block text-sm font-medium text-foreground ${className}`}
    >
      {children}
      {required && (
        <span aria-hidden className="ms-0.5 text-danger">
          *
        </span>
      )}
    </label>
  )
}

interface FieldMessageProps {
  id?: string
  error?: string
  hint?: string
}

/** Error (with icon) or hint under a field. Error wins when both are set. */
export function FieldMessage({ id, error, hint }: FieldMessageProps) {
  if (error) {
    return (
      <p
        id={id}
        role="alert"
        className="mt-1.5 flex items-start gap-x-1.5 text-xs text-danger"
      >
        <CircleAlert size={13} aria-hidden className="mt-px shrink-0" />
        {error}
      </p>
    )
  }

  if (hint) {
    return (
      <p id={id} className="mt-1.5 text-xs text-muted">
        {hint}
      </p>
    )
  }

  return null
}
