import { Plus, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Pagination from '#/components/pagination'
import TodoRow from './components/todo-row'
import SidePanelFilter from './components/side-panel-filter'
import { useTodo } from './components/todo-provider'
import type { TodoFilter } from './components/todo-provider'
import TodoDialog from './components/todo-dialogs'
import EmptyTodos from './components/empty-todo'
import type { EmptyTodosVariant } from './components/empty-todo'
import { priorityFilters, statusFilters } from './data/filters'

const emptyVariants: Record<TodoFilter, EmptyTodosVariant> = {
  inbox: 'all',
  done: 'completed',
  important: 'important',
  trash: 'trashed',
  low: 'priority',
  medium: 'priority',
  high: 'priority',
}

function TodoList() {
  const { t } = useTranslation()
  const {
    page,
    setPage,
    totalPage,
    visibleTodos,
    matchCount,
    counts,
    filter,
    setFilter,
    search,
    setSearch,
    setOpen,
    setCurrentRow,
  } = useTodo()

  const openCreate = () => {
    setCurrentRow(null)
    setOpen('create')
  }

  const activeTitle = [...statusFilters, ...priorityFilters].find(
    (item) => item.value === filter,
  )?.title

  return (
    <>
      <div className="flex w-full items-stretch gap-x-4">
        <SidePanelFilter />

        <div className="card relative flex h-[calc(100vh-7rem)] min-w-0 flex-1 flex-col p-0!">
          {/* Header — fixed, doesn't scroll */}
          <div className="flex shrink-0 flex-col gap-3 border-b border-borderColor p-3">
            <div className="flex items-center gap-x-3">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-semibold text-foreground">
                  {t(activeTitle ?? 'Inbox')}
                </h2>
                <p className="text-xs text-muted">
                  {t('{{count}} tasks', { count: matchCount })}
                </p>
              </div>

              <label className="glass-solid flex w-full max-w-64 items-center gap-x-2 rounded-lg px-3 py-1.5 text-sm transition-colors focus-within:border-primary/50">
                <Search size={16} className="shrink-0 text-muted" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('Search tasks')}
                  aria-label={t('Search tasks')}
                  className="w-full bg-transparent text-foreground outline-none placeholder:text-muted"
                />
              </label>
            </div>

            {/* Mobile filters — the side panel is hidden below md */}
            <div className="-mx-3 flex gap-x-2 overflow-x-auto px-3 md:hidden">
              {[...statusFilters, ...priorityFilters].map(
                ({ value, title }) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                      filter === value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-borderColor text-muted hover:text-foreground'
                    }`}
                  >
                    {t(title)}
                    <span className="ms-1.5 opacity-70">{counts[value]}</span>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {visibleTodos.length === 0 ? (
              <EmptyTodos
                onAddTask={openCreate}
                variant={search.trim() ? 'search' : emptyVariants[filter]}
              />
            ) : (
              visibleTodos.map((item) => <TodoRow key={item.id} item={item} />)
            )}
          </div>

          {/* Footer — fixed, doesn't scroll */}
          {totalPage > 1 && (
            <div className="flex shrink-0 justify-end border-t border-borderColor p-3">
              <Pagination
                currentPage={page}
                totalPages={totalPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
      <TodoDialog />
    </>
  )
}

export default TodoList
