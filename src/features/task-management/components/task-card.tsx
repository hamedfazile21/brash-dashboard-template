import { useSortable } from '@dnd-kit/sortable'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { Priority, Task } from '../data/task'
import { GripVertical, User } from 'lucide-react'

export const priorityStyles: Record<Priority, string> = {
  Low: 'bg-emerald-500/15 text-emerald-500',
  Medium: 'bg-amber-500/15 text-amber-500',
  High: 'bg-red-500/15 text-red-500',
}

interface props {
  task: Task
  isOverlay: boolean
}

const TaskCard: FC<props> = ({ isOverlay, task }) => {
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, transition, isDragging } =
    useSortable({
      id: task.id,
    })

  const style = {
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card group flex flex-col gap-y-2 p-3 ${
        isDragging ? 'opacity-40' : ''
      } ${isOverlay ? 'rotate-2 shadow-xl shadow-black/20' : ''}`}
    >
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm font-medium text-foreground">{task.title}</p>
        <button
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab touch-none rounded p-0.5 text-muted opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          aria-label={t('Drag task')}
        >
          <GripVertical size={14} />
        </button>
      </div>

      {task.description && (
        <p className="line-clamp-2 text-xs text-muted">{task.description}</p>
      )}

      <div className="mt-1 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityStyles[task.priority]}`}
        >
          {t(task.priority)}
        </span>
        <span className="flex items-center gap-x-1 text-xs text-muted">
          <User size={12} />
          {t(task.assignee)}
        </span>
      </div>
    </div>
  )
}

export default TaskCard
