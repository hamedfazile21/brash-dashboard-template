import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnId, Task } from '../data/task'
import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import TaskCard from './task-card'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
interface props {
  id: ColumnId
  title: string
  dotColor: string
  tasks: Task[]
}

const Column: FC<props> = ({ id, title, dotColor, tasks }) => {
  const { t } = useTranslation()
  const { setNodeRef } = useDroppable({ id })
  return (
    <div className="card flex h-[calc(100vh-13rem)] w-full flex-col p-3">
      <div className="mb-3 flex shrink-0 items-center justify-between px-1">
        <div className="flex items-center gap-x-2">
          <span className={`size-2 rounded-full ${dotColor}`} />
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <span className="rounded-full bg-surface-hover px-1.5 py-0.5 text-[11px] font-medium text-muted">
            {tasks.length}
          </span>
        </div>
        <button
          type="button"
          aria-label={t('Add task to {{column}}', { column: title })}
          className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-primary"
        >
          <Plus size={16} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="scrollbar-thin flex flex-1 flex-col gap-y-2 overflow-y-auto px-0.5 pb-1"
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-borderColor py-8 text-xs text-muted">
              {t('Drop tasks here')}
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} isOverlay={false} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default Column
