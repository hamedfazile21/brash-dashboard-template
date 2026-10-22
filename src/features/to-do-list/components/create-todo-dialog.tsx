import Dialog from '#/components/dialog'
import React, { useId } from 'react'
import { useTodo } from './todo-provider'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import type { Priority, TodoType } from '../data/todos'
import Input from '#/components/input'
import InputSelect from '#/components/input-select'
import type { SelectOption } from '#/components/input-select'
import {
  OptionWithAvatar,
  OptionWithIconColor,
} from '../helper/select-custom-component'
import Textarea from '#/components/textarea'
import CheckBox from '#/components/checkbox'
import { assigneeOptions } from '../data/assignees'
import type { AssigneeOption } from '../data/assignees'

interface props {
  open: boolean
  onClose: () => void
  /** Present → edit mode */
  currentRow?: TodoType | null
}

interface TodoForm {
  title: string
  assignee: string
  description: string
  isImportant: boolean
  priority: Priority
}

const CreateTodoDialog: React.FC<props> = ({ open, onClose, currentRow }) => {
  const { saveTodo } = useTodo()
  const formId = useId()
  const { t } = useTranslation()

  const priorityOption: SelectOption[] = [
    { value: 'Low', label: t('Low') },
    { value: 'Medium', label: t('Medium') },
    { value: 'High', label: t('High') },
  ]

  // The update dialog remounts per row (keyed in todo-dialogs), so the
  // row can seed the defaults directly
  const defaultValues: TodoForm = {
    assignee: currentRow?.assignee ?? '',
    description: currentRow?.description ?? '',
    isImportant: currentRow?.isImportant ?? false,
    priority: currentRow?.priority ?? 'Low',
    title: currentRow?.title ?? '',
  }

  const { Field, handleSubmit, reset } = useForm({
    defaultValues,

    onSubmit: ({ value }) => {
      saveTodo(
        {
          assignee: value.assignee,
          description: value.description,
          isImportant: value.isImportant,
          priority: value.priority,
          title: value.title.trim(),
        },
        currentRow?.id,
      )
      closeDialog()
    },
  })

  const closeDialog = () => {
    onClose()
    reset()
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      title={t(currentRow ? 'Edit To Do' : 'New To Do')}
      position="top"
      closeOnOutsideClick={false}
      size={'lg'}
      footer={
        <>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeDialog}
          >
            {t('Cancel')}
          </button>
          <button type="submit" form={formId} className="btn btn-primary">
            {t(currentRow ? 'Save changes' : 'Create task')}
          </button>
        </>
      }
    >
      <form
        id={formId}
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="flex flex-col gap-y-1.5">
          <Field
            name="title"
            validators={{
              onSubmit: ({ value }) => !value.trim() && t('Title is required'),
            }}
            children={(field) => (
              <div className="flex flex-col gap-y-1.5">
                <Input
                  label={t('Title')}
                  required
                  placeholder={t('What needs to be done?')}
                  id={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }
                />
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field
            name="assignee"
            validators={{
              onSubmit: ({ value }) => !value && t('Assignee is required'),
            }}
            children={(field) => (
              <div className="flex flex-col gap-y-1.5">
                <InputSelect
                  options={assigneeOptions}
                  required
                  label={t('Assignee')}
                  components={{ Option: OptionWithAvatar }}
                  value={
                    assigneeOptions.find(
                      (opt) => opt.value === field.state.value,
                    ) ?? null
                  }
                  onChange={(option) => {
                    field.handleChange(
                      option ? (option as AssigneeOption).value : '',
                    )
                  }}
                  error={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }
                />
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field
            name="priority"
            children={(field) => (
              <div className="flex flex-col gap-y-1.5">
                <InputSelect
                  required
                  options={priorityOption}
                  label={t('Priority')}
                  components={{ Option: OptionWithIconColor }}
                  value={
                    priorityOption.find(
                      (opt) => opt.value === field.state.value,
                    ) ?? null
                  }
                  onChange={(option) => {
                    // Always has a value (defaults to Low), so ignore clears
                    if (option) {
                      field.handleChange(
                        (option as SelectOption).value as Priority,
                      )
                    }
                  }}
                />
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field
            name="description"
            children={(field) => (
              <div className="flex flex-col gap-y-1.5">
                <Textarea
                  label={t('Description')}
                  placeholder={t('Add more details...')}
                  error={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }
                  maxLength={280}
                  showCount
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
        </div>
        <Field
          name="isImportant"
          children={(field) => (
            // No onClick on the label: the label already forwards clicks to
            // the checkbox, so a second toggle here would cancel it out
            <label className="flex w-fit cursor-pointer items-center gap-x-2 text-sm text-foreground">
              <CheckBox
                checked={field.state.value}
                onChange={() => field.handleChange(!field.state.value)}
              />
              {t('Mark as important')}
            </label>
          )}
        />
      </form>
    </Dialog>
  )
}

export default CreateTodoDialog
