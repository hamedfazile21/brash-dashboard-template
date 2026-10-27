import Dialog from '#/components/dialog'
import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnId, Priority, Task } from '../data/task'
import { priorityStyles } from './task-card'
import { useTask } from './task-provider'

interface props {
  open: boolean
  setOpen: () => void
  modalColumn: ColumnId | null
}

const CreateTaskDialog: FC<props> = ({ open, setOpen, modalColumn }) => {
  const { t } = useTranslation()
  const { setTasks } = useTask()
  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !modalColumn) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      assignee: form.assignee.trim() || 'Unassigned',
      priority: form.priority,
      description: form.description.trim(),
    }

    setTasks((prev) => ({
      ...prev,
      [modalColumn]: [newTask, ...prev[modalColumn]],
    }))
    setForm({ title: '', assignee: '', priority: 'Medium', description: '' })
  }
  const [form, setForm] = useState({
    title: '',
    assignee: '',
    priority: 'Medium' as Priority,
    description: '',
  })

  return (
    <Dialog open={open} onClose={setOpen} title={t('New task')} position="top">
      <form onSubmit={handleCreateTask} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <label
            htmlFor="title"
            className="text-sm font-medium text-foreground"
          >
            {t('Title')}
          </label>
          <input
            id="title"
            type="text"
            autoFocus
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder={t('e.g. Design the onboarding flow')}
            className="glass-solid w-full rounded-md px-3 py-2 text-sm text-foreground outline-none
                transition-all duration-200 placeholder:text-muted
                focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label
            htmlFor="assignee"
            className="text-sm font-medium text-foreground"
          >
            {t('Assignee')}
          </label>
          <input
            id="assignee"
            type="text"
            value={form.assignee}
            onChange={(e) =>
              setForm((f) => ({ ...f, assignee: e.target.value }))
            }
            placeholder={t('e.g. Sara Ahmadi')}
            className="glass-solid w-full rounded-md px-3 py-2 text-sm text-foreground outline-none
                transition-all duration-200 placeholder:text-muted
                focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {t('Priority')}
          </label>
          <div className="flex gap-x-2">
            {(['Low', 'Medium', 'High'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm((f) => ({ ...f, priority: p }))}
                className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-all duration-150 ${
                  form.priority === p
                    ? `border-transparent ${priorityStyles[p]}`
                    : 'border-borderColor text-muted hover:bg-surface-hover'
                }`}
              >
                {t(p)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            {t('Description')}
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder={t('Add any extra context...')}
            className="glass-solid w-full resize-none rounded-md px-3 py-2 text-sm text-foreground outline-none
                transition-all duration-200 placeholder:text-muted
                focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="mt-2 flex gap-x-2">
          <button type="button" onClick={setOpen} className="btn btn-secondary">
            {t('Cancel')}
          </button>
          <button type="submit" className="btn btn-primary">
            {t('Create Task')}
          </button>
        </div>
      </form>
    </Dialog>
  )
}

export default CreateTaskDialog
