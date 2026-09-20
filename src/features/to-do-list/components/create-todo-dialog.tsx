import Dialog from '#/components/dialog'
import React, { useEffect } from 'react'
import { useTodo, type TodoDialogType } from './todo-provider'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import type { Priority, TodoType } from '../data/todos'
import Input from '#/components/input'
import InputSelect, { type SelectOption } from '#/components/input-select'
import {
  OptionWithAvatar,
  OptionWithIconColor,
} from '../helper/select-custom-component'
import Textarea from '#/components/textarea'
import CheckBox from '#/components/checkbox'

interface props {
  open: boolean
  setOpen: (str: TodoDialogType | null) => void
  currentRow?: TodoType | null
}

interface TodoFrom {
  title: string
  assignee: string
  description: string
  isImportant: boolean
  priority: string
}

interface UserOption {
  value: string
  label: string
  avatarUrl: string
}

const CreateTodoDialog: React.FC<props> = ({ open, setOpen, currentRow }) => {
  const { todos, setTodos } = useTodo()
  const { t } = useTranslation()

  const assigneeOption = Array.from({ length: 30 }).map((_, index) => {
    return {
      value: `/assets/avatar/memo_${index + 1}.png`,
      label: `User-${index + 1}`,
      avatarUrl: `/assets/avatar/memo_${index + 1}.png`,
    }
  })

  // 'Low' | 'Medium' | 'High'
  const priorityOption: SelectOption[] = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ]

  // const initial

  const { Field, handleSubmit, reset, setFieldValue } = useForm({
    defaultValues: {
      assignee: '',
      description: '',
      isImportant: false,
      priority: 'Low',
      title: '',
    } as TodoFrom,

    onSubmit: async ({ value }) => {
      const date = new Date()

      const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

      const currentStatus = currentRow?.status || 'pending'
      const currentId = currentRow?.id || todos.length + 1
      const currentDate = currentRow?.date || formatted

      const newRecord: TodoType = {
        assignee: value.assignee,
        description: value.description,
        isImportant: value.isImportant,
        priority: value.priority as Priority,
        title: value.title,
        id: currentId,
        status: currentStatus,
        date: currentDate,
      }

      console.log(newRecord, 'Good Man')

      if (currentRow) {
        const updatedData: TodoType[] = todos.map((item) =>
          item.id === currentRow.id ? newRecord : item,
        )
        setTodos(updatedData)
      } else {
        setTodos((prev) => [...prev, newRecord])
      }
      closeDialog()
    },
  })

  useEffect(() => {
    if (currentRow) {
      reset({
        assignee: currentRow.assignee,
        description: currentRow.description,
        isImportant: currentRow.isImportant,
        priority: currentRow.priority,
        title: currentRow.title,
      })
      console.log(currentRow)
    }
  }, [currentRow, open])

  const closeDialog = () => {
    setOpen('create')
    reset()
  }
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      title="New To Do"
      position="top"
      closeOnOutsideClick={false}
      size={'lg'}
    >
      <div className="card-body">
        <form className="space-y-2">
          <div className="flex flex-col gap-y-1.5">
            <Field
              name="title"
              validators={{
                onSubmit: ({ value }) => !value && 'Title is required',
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-1.5">
                  <Input
                    label={t('Title')}
                    required
                    placeholder="Do some thing..."
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
                onSubmit: ({ value }) => !value && 'Assignee is required',
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-1.5">
                  <InputSelect
                    options={assigneeOption}
                    required
                    label={t('Assignee')}
                    components={{ Option: OptionWithAvatar }}
                    value={
                      assigneeOption.find(
                        (opt) => opt.value === field.state.value,
                      ) ?? null
                    }
                    onChange={(option) => {
                      field.handleChange(
                        option ? (option as UserOption).value : '',
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
              validators={{
                onSubmit: ({ value }) => !value && 'Priority is required',
              }}
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
                      field.handleChange(
                        option ? (option as SelectOption).value : '',
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
              name="description"
              children={(field) => (
                <div className="flex flex-col gap-y-1.5">
                  <Textarea
                    label="Description"
                    placeholder="Write something..."
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
              <label
                className="flex items-center gap-x-2 text-sm text-muted cursor-pointer"
                onClick={() => field.handleChange(!field.state.value)}
              >
                <CheckBox
                  checked={field.state.value}
                  onChange={() => field.handleChange(!field.state.value)}
                />
                {t('Is Important')}
              </label>
            )}
          />
        </form>
      </div>
      <div className="card-footer">
        <div className="flex items-center gap-x-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }}
            className="btn btn-primary"
          >
            {t('Submit')}
          </button>
          <button className="btn btn-secondary" onClick={closeDialog}>
            {t('Cancel')}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateTodoDialog
