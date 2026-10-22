import useDialogState from '#/hooks/use-dialog-state'
import React, {
  createContext,
  useContext,
  useDeferredValue,
  useState,
} from 'react'
import { todoData } from '../data/todos'
import type { TodoType } from '../data/todos'

export type TodoDialogType = 'create' | 'update' | 'details'

export type TodoFilter =
  'inbox' | 'done' | 'important' | 'trash' | 'low' | 'medium' | 'high'

/** Trashed tasks only ever show up under the Trash filter */
const FILTERS: Record<TodoFilter, (item: TodoType) => boolean> = {
  inbox: (item) => item.status !== 'trashed',
  done: (item) => item.status === 'complete',
  important: (item) => item.isImportant && item.status !== 'trashed',
  trash: (item) => item.status === 'trashed',
  low: (item) => item.priority === 'Low' && item.status !== 'trashed',
  medium: (item) => item.priority === 'Medium' && item.status !== 'trashed',
  high: (item) => item.priority === 'High' && item.status !== 'trashed',
}

const TODOS_PER_PAGE = 10

type TodoContextType = {
  open: TodoDialogType | null
  setOpen: (str: TodoDialogType | null) => void
  currentRow: TodoType | null
  setCurrentRow: (row: TodoType | null) => void

  filter: TodoFilter
  setFilter: (filter: TodoFilter) => void
  search: string
  setSearch: (search: string) => void
  page: number
  setPage: (page: number) => void
  totalPage: number
  /** Filtered + searched + paginated — what the list renders */
  visibleTodos: TodoType[]
  /** Matches across all pages, for the "n tasks" label */
  matchCount: number
  counts: Record<TodoFilter, number>

  /** Pass the id to update an existing task; omit it to create one */
  saveTodo: (
    todo: Omit<TodoType, 'id' | 'status' | 'date'>,
    id?: number,
  ) => void
  toggleComplete: (id: number) => void
  toggleImportant: (id: number) => void
  moveToTrash: (id: number) => void
  restore: (id: number) => void
  deleteForever: (id: number) => void
}

const TodoContext = createContext<TodoContextType | null>(null)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TodoDialogType>(null)
  const [todos, setTodos] = useState<TodoType[]>(todoData)
  const [currentRow, setCurrentRow] = useState<TodoType | null>(null)
  const [filter, setFilterState] = useState<TodoFilter>('inbox')
  const [search, setSearchState] = useState('')
  const [page, setPage] = useState(1)
  const deferredSearch = useDeferredValue(search)

  const query = deferredSearch.trim().toLowerCase()
  const matches = todos.filter(
    (item) =>
      FILTERS[filter](item) &&
      (!query ||
        `${item.title} ${item.description}`.toLowerCase().includes(query)),
  )

  const totalPage = Math.max(1, Math.ceil(matches.length / TODOS_PER_PAGE))
  // Clamp so deleting the last item on a page never leaves an empty page
  const safePage = Math.min(page, totalPage)
  const visibleTodos = matches.slice(
    (safePage - 1) * TODOS_PER_PAGE,
    safePage * TODOS_PER_PAGE,
  )

  const counts = Object.fromEntries(
    (Object.keys(FILTERS) as TodoFilter[]).map((key) => [
      key,
      todos.filter(FILTERS[key]).length,
    ]),
  ) as Record<TodoFilter, number>

  const setFilter = (next: TodoFilter) => {
    setFilterState(next)
    setPage(1)
  }

  const setSearch = (next: string) => {
    setSearchState(next)
    setPage(1)
  }

  const update = (id: number, change: (item: TodoType) => Partial<TodoType>) =>
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...change(item) } : item,
      ),
    )

  const saveTodo: TodoContextType['saveTodo'] = (values, id) => {
    if (id !== undefined) {
      update(id, () => values)
      return
    }

    const date = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    setTodos((prev) => [
      {
        ...values,
        // max + 1, not length + 1 — ids must stay unique after deletes
        id: Math.max(0, ...prev.map((item) => item.id)) + 1,
        status: 'pending',
        date,
      },
      ...prev,
    ])
  }

  return (
    <TodoContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        filter,
        setFilter,
        search,
        setSearch,
        page: safePage,
        setPage,
        totalPage,
        visibleTodos,
        matchCount: matches.length,
        counts,
        saveTodo,
        toggleComplete: (id) =>
          update(id, (item) => ({
            status: item.status === 'complete' ? 'pending' : 'complete',
          })),
        toggleImportant: (id) =>
          update(id, (item) => ({ isImportant: !item.isImportant })),
        moveToTrash: (id) => update(id, () => ({ status: 'trashed' })),
        restore: (id) => update(id, () => ({ status: 'pending' })),
        deleteForever: (id) =>
          setTodos((prev) => prev.filter((item) => item.id !== id)),
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const todoContext = useContext(TodoContext)

  if (!todoContext) {
    throw new Error('useTodo has to be used within <TodoProvider>')
  }

  return todoContext
}
