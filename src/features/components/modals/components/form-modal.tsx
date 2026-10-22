import { Mail, UserRound } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import Dialog from '#/components/dialog'
import Input from '#/components/input'
import Textarea from '#/components/textarea'
import { showObjectToast } from '#/helper/toast-helper'
import { fieldError, validateEmail } from '#/features/auth/validators'
import { Avatar13 } from '../../../../assets'

interface ModalProps {
  open: boolean
  onClose: () => void
}

function FormModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation()

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: { name: 'Hamed Fazeli', email: '', bio: '' },
    onSubmit: ({ value }) => {
      showObjectToast(t('Profile saved'), value)
      close()
    },
  })

  const close = () => {
    reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      title={t('Edit profile')}
      description={t('This is how others will see you')}
      footer={
        <>
          <button type="button" onClick={close} className="btn btn-secondary">
            {t('Cancel')}
          </button>
          <button type="submit" form="profile-form" className="btn btn-primary">
            {t('Save changes')}
          </button>
        </>
      }
    >
      <form
        id="profile-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex flex-col gap-y-4"
      >
        <div className="flex items-center gap-x-3">
          <img
            src={Avatar13}
            alt=""
            className="size-14 rounded-full object-cover ring-2 ring-borderColor"
          />
          <div className="flex flex-col gap-y-1">
            <button type="button" className="btn btn-secondary btn-sm">
              {t('Change photo')}
            </button>
            <span className="text-xs text-muted">
              {t('JPG or PNG, up to 2 MB')}
            </span>
          </div>
        </div>

        <Field
          name="name"
          validators={{
            onSubmit: ({ value }) =>
              !value.trim() ? t('Name is required') : undefined,
          }}
          children={(field) => (
            <Input
              id="modal-name"
              label={t('Name')}
              icon={UserRound}
              required
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={fieldError(field.state.meta)}
            />
          )}
        />
        <Field
          name="email"
          validators={{ onSubmit: ({ value }) => validateEmail(t, value) }}
          children={(field) => (
            <Input
              id="modal-email"
              type="email"
              label={t('Email')}
              icon={Mail}
              required
              placeholder="you@example.com"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={fieldError(field.state.meta)}
            />
          )}
        />
        <Field
          name="bio"
          children={(field) => (
            <Textarea
              label={t('Bio')}
              placeholder={t('A few words about you...')}
              maxLength={160}
              showCount
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
      </form>
    </Dialog>
  )
}

export default FormModal
