import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'

interface NotifyFormProps {
  buttonLabel: string
  successMessage: string
  icon: LucideIcon
}

/** Single email field + submit button, used by maintenance / coming soon */
function NotifyForm({
  buttonLabel,
  successMessage,
  icon: Icon,
}: NotifyFormProps) {
  const { t } = useTranslation()

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      showObjectToast(t(successMessage), value)
      reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
      className="flex w-full flex-col gap-2 sm:flex-row sm:items-start"
    >
      <Field
        name="email"
        validators={{
          onSubmit: ({ value }) =>
            !value
              ? t('Email is required')
              : !/^\S+@\S+\.\S+$/.test(value)
                ? t('Enter a valid email')
                : undefined,
        }}
        children={(field) => (
          <Input
            id={field.name}
            type="email"
            placeholder={t('you@example.com')}
            onChange={(e) => field.handleChange(e.target.value)}
            value={field.state.value}
            error={
              field.state.meta.isTouched
                ? field.state.meta.errors.join(', ')
                : undefined
            }
          />
        )}
      />
      <button
        type="submit"
        className="btn btn-primary flex shrink-0 items-center justify-center gap-x-2"
      >
        <Icon size={16} />
        {t(buttonLabel)}
      </button>
    </form>
  )
}

export default NotifyForm
