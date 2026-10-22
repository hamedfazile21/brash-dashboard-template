import { ClipboardList, Plus, SearchX, Star, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type EmptyTodosVariant =
  'all' | 'completed' | 'important' | 'trashed' | 'priority' | 'search'

interface EmptyTodosProps {
  onAddTask?: () => void
  /** Copy depends on which filter is active, or on an active search */
  variant?: EmptyTodosVariant
}

const copy: Record<
  EmptyTodosVariant,
  { title: string; description: string; icon: LucideIcon; showAction: boolean }
> = {
  all: {
    title: 'No tasks yet',
    description: 'Create your first task to get started.',
    icon: ClipboardList,
    showAction: true,
  },
  completed: {
    title: 'Nothing completed yet',
    description: 'Tasks you finish will show up here.',
    icon: ClipboardList,
    showAction: false,
  },
  important: {
    title: 'No important tasks',
    description: 'Mark a task as important to pin it here.',
    icon: Star,
    showAction: false,
  },
  trashed: {
    title: 'Trash is empty',
    description: 'Tasks you delete will show up here.',
    icon: Trash2,
    showAction: false,
  },
  priority: {
    title: 'No tasks with this priority',
    description: 'Tasks you give this priority will show up here.',
    icon: ClipboardList,
    showAction: true,
  },
  search: {
    title: 'No matching tasks',
    description: 'Try a different search term.',
    icon: SearchX,
    showAction: false,
  },
}

function EmptyTodos({ onAddTask, variant = 'all' }: EmptyTodosProps) {
  const { t } = useTranslation()
  const { title, description, icon: Icon, showAction } = copy[variant]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={26} />
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{t(title)}</p>
        <p className="mt-1 text-xs text-muted">{t(description)}</p>
      </div>

      {showAction && onAddTask && (
        <button
          type="button"
          onClick={onAddTask}
          className="btn btn-primary mt-2 w-auto px-4"
        >
          <Plus size={16} />
          {t('Add a task')}
        </button>
      )}
    </div>
  )
}

export default EmptyTodos
