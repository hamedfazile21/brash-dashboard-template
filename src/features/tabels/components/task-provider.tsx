import useDialogState from '#/hooks/use-dialog-state'
import type {
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { Task } from '..'

export type TaskDialogType = 'delete-confirmation' | 'create-task'

type TaskContextType = {
  open: TaskDialogType | null
  setOpen: (str: TaskDialogType | null) => void
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  currentRow: Task | null
  setCurrentRow: Dispatch<SetStateAction<Task | null>>
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TaskDialogType>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [currentRow, setCurrentRow] = useState<Task | null>(null)

  return (
    <TaskContext.Provider
      value={{
        open,
        setOpen,
        globalFilter,
        setGlobalFilter,
        setSorting,
        sorting,
        columnVisibility,
        setColumnVisibility,
        rowSelection,
        setRowSelection,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const tasksContext = useContext(TaskContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
