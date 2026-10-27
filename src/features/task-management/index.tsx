import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { type ColumnId, type Task } from './data/task'
import TaskCard from './components/task-card'
import Column from './components/column'
import { useTask } from './components/task-provider'
import { useTranslation } from 'react-i18next'

export const COLUMNS: { id: ColumnId; title: string; dotColor: string }[] = [
  { id: 'todo', title: 'To Do', dotColor: 'bg-slate-400' },
  { id: 'pending', title: 'Pending', dotColor: 'bg-amber-500' },
  { id: 'done', title: 'Done', dotColor: 'bg-emerald-500' },
]

function TaskManagement() {
    const {t} = useTranslation()
  const { tasks, setTasks } = useTask()
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  const findContainer = (id: string): ColumnId | undefined => {
    if (id in tasks) return id as ColumnId
    return (Object.keys(tasks) as ColumnId[]).find((col) =>
      tasks[col].some((t) => t.id === id),
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const container = findContainer(event.active.id as string)
    if (!container) return
    const task = tasks[container].find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeContainer = findContainer(active.id as string)
    const overContainer = findContainer(over.id as string)

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return

    setTasks((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]
      const activeIndex = activeItems.findIndex((t) => t.id === active.id)
      const movedTask = activeItems[activeIndex]
      const overIndex = overItems.findIndex((t) => t.id === over.id)

      return {
        ...prev,
        [activeContainer]: activeItems.filter((t) => t.id !== active.id),
        [overContainer]:
          overIndex >= 0
            ? [
                ...overItems.slice(0, overIndex),
                movedTask,
                ...overItems.slice(overIndex),
              ]
            : [...overItems, movedTask],
      }
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return

    const activeContainer = findContainer(active.id as string)
    const overContainer = findContainer(over.id as string)
    if (!activeContainer || !overContainer || activeContainer !== overContainer)
      return

    const activeIndex = tasks[activeContainer].findIndex(
      (t) => t.id === active.id,
    )
    const overIndex = tasks[overContainer].findIndex((t) => t.id === over.id)

    if (activeIndex !== overIndex) {
      setTasks((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }))
    }
  }

  return (
    <div className="card h-[calc(100vh-7rem)] w-full p-4">
      <div className="card-header">
        <h1 className="text-lg font-semibold text-foreground">
          {t('Tasks Management')}
        </h1>
        <button className='btn btn-primary'>{t('Add Task')}</button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              title={t(col.title)}
              dotColor={col.dotColor}
              tasks={tasks[col.id]}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default TaskManagement
