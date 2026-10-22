import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { priorityFilters, priorityStyles, statusFilters } from '../data/filters'
import { useTodo } from './todo-provider'
import type { TodoFilter } from './todo-provider'

/** Desktop filter column — mobile uses the chip row in the list header */
function SidePanelFilter() {
  const { setOpen, setCurrentRow, filter, setFilter, counts } = useTodo()
  const { t } = useTranslation()

  const itemClass = (value: TodoFilter) =>
    `group flex w-full items-center gap-x-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150 ${
      filter === value
        ? 'bg-primary/10 text-primary'
        : 'text-muted hover:bg-surface-hover/60 hover:text-foreground'
    }`

  return (
    <aside className="card hidden h-[calc(100vh-7rem)] w-64 shrink-0 flex-col p-0! md:flex">
      <div className="border-b border-borderColor px-4 py-3.5">
        <h1 className="text-lg font-semibold text-foreground">
          {t('To Do List')}
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-y-5 overflow-y-auto p-3">
        <div>
          <p className="mb-1.5 px-2.5 text-xs font-medium tracking-wide text-muted uppercase">
            {t('Status')}
          </p>
          <ul className="flex flex-col gap-y-0.5">
            {statusFilters.map(({ value, title, icon: Icon }) => (
              <li key={value}>
                <button
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className={itemClass(value)}
                >
                  <Icon
                    size={18}
                    className="shrink-0 transition-transform duration-150 group-hover:scale-110"
                  />
                  <span className="flex-1 text-start">{t(title)}</span>
                  <span
                    className={`min-w-6 rounded-md px-1.5 py-0.5 text-center text-xs tabular-nums ${
                      filter === value
                        ? 'bg-primary/15 text-primary'
                        : 'bg-surface-hover text-muted'
                    }`}
                  >
                    {counts[value]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-1.5 px-2.5 text-xs font-medium tracking-wide text-muted uppercase">
            {t('Priority')}
          </p>
          <ul className="flex flex-col gap-y-0.5">
            {priorityFilters.map(({ value, title }) => (
              <li key={value}>
                <button
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className={itemClass(value)}
                >
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${priorityStyles[title].dot}`}
                  />
                  <span className="flex-1 text-start">{t(title)}</span>
                  <span className="text-xs text-muted tabular-nums">
                    {counts[value]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-borderColor p-3">
        <button
          type="button"
          onClick={() => {
            setCurrentRow(null)
            setOpen('create')
          }}
          className="btn btn-primary w-full!"
        >
          <Plus size={16} />
          {t('New Task')}
        </button>
      </div>
    </aside>
  )
}

export default SidePanelFilter
