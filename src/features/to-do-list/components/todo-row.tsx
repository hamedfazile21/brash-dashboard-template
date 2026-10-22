import CheckBox from '#/components/checkbox'
import {
  Calendar,
  Ellipsis,
  RotateCcw,
  SquarePen,
  Star,
  StarOff,
  Trash2,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Popover from '#/components/popover'
import type { TodoType } from '../data/todos'
import { getAssigneeName } from '../data/assignees'
import { priorityStyles } from '../data/filters'
import { useTodo } from './todo-provider'

interface MenuItem {
  title: string
  icon: ReactNode
  onClick: () => void
  danger?: boolean
}

function TodoRow({ item }: { item: TodoType }) {
  const { t } = useTranslation()
  const {
    setOpen,
    setCurrentRow,
    toggleComplete,
    toggleImportant,
    moveToTrash,
    restore,
    deleteForever,
  } = useTodo()

  const isComplete = item.status === 'complete'
  const isTrashed = item.status === 'trashed'
  const styles = priorityStyles[item.priority]

  const menuItems: MenuItem[] = isTrashed
    ? [
        {
          title: 'Restore',
          icon: <RotateCcw size={16} />,
          onClick: () => restore(item.id),
        },
        {
          title: 'Delete forever',
          icon: <Trash2 size={16} />,
          onClick: () => deleteForever(item.id),
          danger: true,
        },
      ]
    : [
        {
          title: 'Edit',
          icon: <SquarePen size={16} />,
          onClick: () => {
            setCurrentRow(item)
            setOpen('update')
          },
        },
        {
          title: item.isImportant ? 'Not Important' : 'Important',
          icon: item.isImportant ? <StarOff size={16} /> : <Star size={16} />,
          onClick: () => toggleImportant(item.id),
        },
        {
          title: 'Delete',
          icon: <Trash2 size={16} />,
          onClick: () => moveToTrash(item.id),
          danger: true,
        },
      ]

  const openDetails = () => {
    setCurrentRow(item)
    setOpen('details')
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter') openDetails()
      }}
      className={`group relative flex cursor-pointer items-center gap-x-3 border-b border-borderColor px-4 py-3 outline-none transition-colors duration-150 last:border-b-0 hover:bg-surface-hover/40 focus-visible:bg-surface-hover/40 ${
        isTrashed ? 'opacity-60' : ''
      }`}
    >

      {/* Stop clicks here from opening the details dialog */}
      <div
        className="flex shrink-0 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <CheckBox
          rounded
          checked={isComplete}
          onChange={() => toggleComplete(item.id)}
          reset={{
            disabled: isTrashed,
            'aria-label': t(isComplete ? 'Mark as pending' : 'Mark as done'),
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-y-0.5">
        <h3
          className={`truncate text-sm font-medium transition-colors ${
            isComplete ? 'text-muted line-through' : 'text-foreground'
          }`}
        >
          {item.title}
        </h3>
        <p className="truncate text-xs text-muted">{item.description}</p>
      </div>

      <span
        className={`hidden shrink-0 items-center gap-x-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium sm:inline-flex ${styles.badge}`}
      >
        <span className={`size-1.5 rounded-full ${styles.dot}`} />
        {t(item.priority)}
      </span>

      <span className="hidden shrink-0 items-center gap-x-1 text-xs text-muted lg:flex">
        <Calendar size={13} />
        {item.date}
      </span>

      <img
        src={item.assignee}
        alt={getAssigneeName(item.assignee) ?? ''}
        title={getAssigneeName(item.assignee)}
        className="size-8 shrink-0 rounded-full object-cover ring-2 ring-surface"
      />

      <div
        className="flex shrink-0 items-center gap-x-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        {!isTrashed && (
          <button
            type="button"
            onClick={() => toggleImportant(item.id)}
            aria-label={t(item.isImportant ? 'Not Important' : 'Important')}
            aria-pressed={item.isImportant}
            className={`rounded-lg p-1.5 transition-colors hover:bg-surface-hover ${
              item.isImportant
                ? 'text-warning'
                : 'text-muted opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
            }`}
          >
            <Star size={16} fill={item.isImportant ? 'currentColor' : 'none'} />
          </button>
        )}

        <Popover
          placement="bottom-end"
          className="w-44"
          trigger={
            <button
              type="button"
              aria-label={t('More actions')}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <Ellipsis size={16} />
            </button>
          }
        >
          <div className="flex flex-col gap-y-0.5">
            {menuItems.map(({ title, icon, onClick, danger }) => (
              <button
                key={title}
                type="button"
                onClick={onClick}
                className={`group/item flex w-full items-center gap-x-2 rounded-lg p-2 text-start text-sm transition-colors duration-150 ${
                  danger
                    ? 'text-danger hover:bg-danger/10'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <span className="shrink-0 transition-transform duration-150 group-hover/item:scale-110">
                  {icon}
                </span>
                {t(title)}
              </button>
            ))}
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default TodoRow
