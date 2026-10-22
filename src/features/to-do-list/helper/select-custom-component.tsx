import type { SelectOption } from '@/components/input-select'
import { priorityStyles } from '../data/filters'
import type { Priority } from '../data/todos'
import { components } from 'react-select'
import type { OptionProps, GroupBase } from 'react-select'
import { Check } from 'lucide-react'

interface UserOption extends SelectOption {
  avatarUrl: string
}

export function OptionWithAvatar(
  props: OptionProps<UserOption, boolean, GroupBase<UserOption>>,
) {
  return (
    <components.Option {...props}>
      <div className="w-full flex items-center gap-x-2">
        <img
          src={props.data.avatarUrl}
          alt=""
          className="size-8 rounded-full border border-borderColor bg-surface object-cover shrink-0"
        />
        <span className="truncate text-sm flex-1">{props.label}</span>
        {props.isSelected && (
          <Check size={15} className="shrink-0 text-primary" />
        )}
      </div>
    </components.Option>
  )
}

export const OptionWithIconColor = (
  props: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>,
) => {
  // Static class names via priorityStyles — `text-${color}` is invisible to Tailwind
  const styles = priorityStyles[props.data.value as Priority] as
    (typeof priorityStyles)[Priority] | undefined

  return (
    <components.Option {...props}>
      <div className="flex w-full items-center gap-x-2">
        <span
          className={`size-2.5 shrink-0 rounded-full ${styles?.dot ?? ''}`}
        />
        <span className={`flex-1 truncate text-sm ${styles?.text ?? ''}`}>
          {props.label}
        </span>
        {props.isSelected && (
          <Check size={15} className="shrink-0 text-primary" />
        )}
      </div>
    </components.Option>
  )
}
