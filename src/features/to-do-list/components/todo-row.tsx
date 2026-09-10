import CheckBox from '#/components/checkbox'
import { Ellipsis, SquarePen, Star, StarOff, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TodoType } from '../data/todos'
import { useTodo } from './todo-provider'
import type { Dispatch, SetStateAction } from 'react'
import Popover from '#/components/popover'

interface TaskRowProps {
  rowKey: number
  setActiveItem: Dispatch<SetStateAction<number>>
  item: TodoType
}

const categoryStyles = {
  red: 'border-danger/30 bg-danger/10 text-danger',
  blue: 'border-info/30 bg-info/10 text-info',
  emerald: 'border-success/30 bg-success/10 text-success',
}

function TodoRow({ rowKey, setActiveItem, item }: TaskRowProps) {
  const { t } = useTranslation()
  const { todos, setTodos, setOpen, setCurrentRow } = useTodo()
  const priorityStyle =
    item.priority === 'Low'
      ? 'emerald'
      : item.priority === 'Medium'
        ? 'blue'
        : 'red'

  const completeAction = (id: number) => {
    const updatedData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === 'complete' ? 'pending' : 'complete',
          }
        : item,
    )
    setTodos(updatedData)
  }

  const handelToggleImportant = (id: number) => {
    const updatedData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            isImportant: !item.isImportant,
          }
        : item,
    )
    setTodos(updatedData)
  }

  const handelFormEdit = (currentItem: TodoType) => {
    setOpen('update')
    setCurrentRow(currentItem)
  }

  const handelDeleteTask = (id: number) => {
    const deleteData: TodoType[] = todos.map((item) =>
      item.id === id
        ? {
            ...item,
            status: 'trashed',
          }
        : item,
    )
    setActiveItem(4)
    setTodos(deleteData)
  }

  const ellipsisData = [
    {
      className: `hover:bg-surface-hover`,
      onClick: () => handelFormEdit(item),
      title: 'Edit',
      icon: <SquarePen size={18} />,
    },

    {
      className: `hover:bg-surface-hover`,
      onClick: () => handelToggleImportant(item.id),
      title: item.isImportant ? 'Not Important' : 'Important',
      icon: item.isImportant ? <StarOff size={18} /> : <Star size={18} />,
    },
    {
      className: `text-red-500 hover:bg-surface-hover`,
      onClick: () => handelDeleteTask(item.id),
      title: 'Delete',
      icon: <Trash2 size={18} />,
    },
  ]

  return (
    <div
      key={rowKey}
      onClick={() => {
        setOpen('details')
        setCurrentRow(item)
      }}
      className={`group border-b border-borderColor cursor-pointer hover:bg-surface-hover ${item.status === 'trashed' && 'bg-gray-200 dark:bg-gray-800'}`}
    >
      <div
        className={`w-full flex items-center gap-x-3 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-surface-hover/40  ${status === 'complete' && 'bg-surface/30'}`}
      >
        <div className="shrink-0 flex items-start gap-x-2 text-sm text-muted">
          <CheckBox
            checked={item.status === 'complete'}
            onChange={() => completeAction(item.id)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h3
            className={`w-full truncate text-sm font-medium ${
              item.status === 'complete'
                ? 'text-muted line-through'
                : 'text-foreground'
            }`}
          >
            {item.title}
          </h3>
          <p className="w-full truncate text-xs text-muted">
            {item.description}
          </p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[priorityStyle]}`}
          >
            {item.priority}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-x-3">
          <p className="hidden text-xs text-muted md:block">{item.date}</p>

          <div className="flex size-9 items-center justify-center rounded-full border border-borderColor bg-surface-hover text-xs font-medium text-foreground">
            <img src={item.assignee} />
          </div>

          <Popover
            className="w-37.5"
            trigger={
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="flex items-center text-foreground"
              >
                <Ellipsis size={18} />
              </button>
            }
            children={
              <div>
                {ellipsisData.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`group relative flex w-full items-center gap-x-1 rounded-lg p-2 text-start text-sm text-foreground
                  transition-colors duration-150
                  data-focus:outline-hidden ${item.className}`}
                    >
                      <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                        {item.icon}
                      </span>
                      <span className="text-system">{t(`${item.title}`)}</span>
                    </button>
                  )
                })}
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TodoRow
