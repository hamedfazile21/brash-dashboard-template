import { CircleCheckBig, ListChecks, Star, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TodoFilter } from '../components/todo-provider'
import type { Priority } from './todos'

export const statusFilters: {
  value: TodoFilter
  title: string
  icon: LucideIcon
}[] = [
  { value: 'inbox', title: 'Inbox', icon: ListChecks },
  { value: 'done', title: 'Done', icon: CircleCheckBig },
  { value: 'important', title: 'Important', icon: Star },
  { value: 'trash', title: 'Trash', icon: Trash2 },
]

export const priorityFilters: {
  value: TodoFilter
  title: Priority
}[] = [
  { value: 'low', title: 'Low' },
  { value: 'medium', title: 'Medium' },
  { value: 'high', title: 'High' },
]

/** Static class names per priority — Tailwind can't see `text-${color}` */
export const priorityStyles: Record<
  Priority,
  { dot: string; text: string; badge: string }
> = {
  Low: {
    dot: 'bg-success',
    text: 'text-success',
    badge: 'border-success/30 bg-success/10 text-success',
  },
  Medium: {
    dot: 'bg-info',
    text: 'text-info',
    badge: 'border-info/30 bg-info/10 text-info',
  },
  High: {
    dot: 'bg-danger',
    text: 'text-danger',
    badge: 'border-danger/30 bg-danger/10 text-danger',
  },
}
