import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MIN_PASSWORD_LENGTH } from '../validators'

const rules = [
  {
    label: 'At least {{count}} characters',
    test: (v: string) => v.length >= MIN_PASSWORD_LENGTH,
  },
  {
    label: 'Upper and lowercase letters',
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { label: 'A number', test: (v: string) => /\d/.test(v) },
  { label: 'A symbol', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

const levels = [
  { label: 'Too weak', bar: 'bg-danger', text: 'text-danger' },
  { label: 'Weak', bar: 'bg-danger', text: 'text-danger' },
  { label: 'Fair', bar: 'bg-warning', text: 'text-warning' },
  { label: 'Good', bar: 'bg-info', text: 'text-info' },
  { label: 'Strong', bar: 'bg-success', text: 'text-success' },
]

/** 4-segment meter + checklist; renders nothing until the user starts typing */
function PasswordStrength({ value }: { value: string }) {
  const { t } = useTranslation()
  if (!value) return null

  const passed = rules.map((rule) => rule.test(value))
  const score = passed.filter(Boolean).length
  const level = levels[score]

  return (
    <div className="flex flex-col gap-y-2" aria-live="polite">
      <div className="flex items-center gap-x-3">
        <div className="grid flex-1 grid-cols-4 gap-1">
          {rules.map((rule, i) => (
            <span
              key={rule.label}
              className={`h-1 rounded-full transition-colors duration-300 ${
                i < score ? level.bar : 'bg-surface-hover'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${level.text}`}>
          {t(level.label)}
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <li
            key={rule.label}
            className={`flex items-center gap-x-1.5 text-xs transition-colors ${
              passed[i] ? 'text-success' : 'text-muted'
            }`}
          >
            <Check
              size={12}
              strokeWidth={3}
              className={passed[i] ? 'opacity-100' : 'opacity-30'}
            />
            {t(rule.label, { count: MIN_PASSWORD_LENGTH })}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordStrength
