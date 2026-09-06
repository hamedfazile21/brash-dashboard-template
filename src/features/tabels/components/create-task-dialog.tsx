import { type FC } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import Dialog from '#/components/dialog'

import type { TaskDialogType } from './task-provider'
import { useAppSelector } from '#/hooks/redux'
import type { SelectOption } from '#/components/input-select'
import InputSelect from '#/components/input-select'
import { showObjectToast } from '#/helper/toast-helper'

export interface Task {
  title: string
  label: 'Bug' | 'Feature' | 'Documentation'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled'
}

interface props {
  open: boolean
  setOpen: (str: TaskDialogType | null) => void
  onCreate?: (task: Task) => void | Promise<void>
}

const labelOptions: SelectOption[] = [
  { value: 'Bug', label: 'Bug' },
  { value: 'Feature', label: 'Feature' },
  { value: 'Documentation', label: 'Documentation' },
]

const statusOptions: SelectOption[] = [
  { value: 'Backlog', label: 'Backlog' },
  { value: 'Todo', label: 'Todo' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
  { value: 'Canceled', label: 'Canceled' },
]

const priorityStyles: Record<Task['priority'], string> = {
  Low: 'bg-emerald-500/15 text-emerald-500',
  Medium: 'bg-amber-500/15 text-amber-500',
  High: 'bg-orange-500/15 text-orange-500',
  Critical: 'bg-red-500/15 text-red-500',
}

const CreateTaskDialog: FC<props> = ({ open, setOpen, onCreate }) => {
  const { direction } = useAppSelector((state) => state.themeConfig)

  const closeDialog = () => {
    setOpen(null)
  }

  const form = useForm({
    defaultValues: {
      title: '',
      label: 'Bug',
      priority: 'Medium',
      status: 'Backlog',
    } as Task,
    onSubmit: async ({ value }) => {
      await showObjectToast('Login From Submitted', value)

      form.reset()
      closeDialog()
    },
  })

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      closeOnOutsideClick={false}
      showCloseButton={false}
      size="xl"
      position={direction === 'ltr' ? 'right' : 'left'}
      title="Create task"
      description="Add a new task to your backlog."
      footer={
        <>
          <button
            type="button"
            onClick={closeDialog}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                form="create-task-form"
                disabled={!canSubmit || isSubmitting}
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </button>
            )}
          />
        </>
      }
    >
      <form
        id="create-task-form"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-y-4"
      >
        <form.Field
          name="title"
          validators={{
            onSubmit: ({ value }) => (!value ? 'Title is required' : undefined),
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-1.5">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-foreground"
              >
                Title
              </label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                autoFocus
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Fix RTL layout on settings page"
                className={`glass-solid w-full rounded-md px-3 py-2 text-sm text-foreground outline-none
                  transition-all duration-200 placeholder:text-muted
                  focus:border-primary/50 focus:ring-2 focus:ring-primary/30
                  ${field.state.meta.errors.length ? 'border-red-500' : ''}`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {field.state.meta.errors.join(', ')}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="label"
          children={(field) => (
            <InputSelect
              label="Label"
              options={labelOptions}
              value={labelOptions.find(
                (option) => option.value === field.state.value,
              )}
              onChange={(option) =>
                field.handleChange(option?.value as Task['label'])
              }
            />
          )}
        />

        <form.Field
          name="status"
          children={(field) => (
            <InputSelect
              label="Status"
              options={statusOptions}
              value={labelOptions.find(
                (option) => option.value === field.state.value,
              )}
              onChange={(option) =>
                field.handleChange(option?.value as Task['status'])
              }
            />
          )}
        />

        <form.Field
          name="priority"
          children={(field) => (
            <div className="flex flex-col gap-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Priority
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(priorityStyles) as Task['priority'][]).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => field.handleChange(p)}
                      className={`rounded-md border py-1.5 text-xs font-medium transition-all duration-150 ${
                        field.state.value === p
                          ? `border-transparent ${priorityStyles[p]}`
                          : 'border-borderColor text-muted hover:bg-surface-hover'
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        />
      </form>
    </Dialog>
  )
}

export default CreateTaskDialog
