import { useEffect, useId, useState } from 'react'
import { DayPicker } from '@daypicker/react'
import type { DateRange } from '@daypicker/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Popover from './popover'

interface DatePickerProps {
  label?: string
  error?: string
  required?: boolean
  parentClassName?: string
  labelClassName?: string
  placeholder?: string
  value?: Date
  onChange: (date: Date | undefined) => void
  disabled?: boolean
  id?: string
  /** Disable dates before/after these, or pass a custom matcher —
   * forwarded directly to DayPicker's `disabled` prop. */
  fromDate?: Date
  toDate?: Date
}

// Glass-themed classNames for the calendar popover content. Built from
// DayPicker v10's current documented key categories (UI / DayFlag /
// SelectionState) — if any key here doesn't visibly apply once wired up,
// cross-check the exact spelling against daypicker.dev/docs/anatomy, since
// v10 removed several deprecated v9 aliases (e.g. old `nav_button`,
// `day_selected` no longer exist).
const calendarClassNames = {
  months: 'relative flex flex-col',
  month: 'flex flex-col gap-y-3',
  month_caption:
    'flex items-center justify-center text-sm font-semibold text-foreground h-8',
  nav: 'absolute inset-x-0 top-0 flex items-center justify-between px-1 h-8',
  button_previous:
    'flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:opacity-30 disabled:pointer-events-none',
  button_next:
    'flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:opacity-30 disabled:pointer-events-none',
  weekdays: 'flex',
  weekday: 'w-9 text-center text-xs font-medium text-muted',
  week: 'flex w-full mt-1',
  day: 'w-9 h-9 flex items-center justify-center p-0 text-sm',
  day_button:
    'size-9 rounded-full flex items-center justify-center text-foreground transition-colors duration-150 hover:bg-surface-hover',
  // These four land on the day *cell*, while `day_button` above is the button
  // inside it — and that sets its own `text-foreground`, which beats a colour
  // inherited from the parent. So anything recolouring a day has to reach the
  // button with `[&>button]:`, the way `selected` already did.
  //
  // `today` marks itself with a ring rather than a colour, so that a day which
  // is both today and selected does not come down to which `text-*` utility
  // Tailwind happened to emit last.
  today:
    '[&>button]:font-semibold [&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-primary/40',
  selected:
    '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary',
  outside: '[&>button]:text-muted/40',
  // Struck through as well as dimmed: an unavailable date should read as
  // crossed off, not merely as low contrast.
  disabled:
    'pointer-events-none [&>button]:text-muted/40 [&>button]:line-through',
  hidden: 'invisible',
}

function DatePicker({
  label,
  error,
  required,
  parentClassName = '',
  labelClassName = '',
  placeholder = 'Select date',
  value,
  onChange,
  disabled = false,
  id,
  fromDate,
  toDate,
}: DatePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [open, setOpen] = useState(false)

  /**
   * The month on show. Controlled rather than left to DayPicker, so every
   * open starts on the selected date's month instead of today — and so
   * browsing away and closing without picking does not leave the calendar
   * somewhere else next time.
   *
   * `undefined` is DayPicker's own default, which is the current month.
   */
  const [month, setMonth] = useState<Date | undefined>(value)

  useEffect(() => {
    if (open) setMonth(value)
  }, [open, value])

  const formattedValue = value
    ? new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(value)
    : null

  return (
    <div className={`w-full ${parentClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium text-foreground ${labelClassName}`}
        >
          {label}
          {required && (
            <span className="text-red-500 ltr:ml-0.5 rtl:mr-0.5">*</span>
          )}
        </label>
      )}

      <Popover
        open={open}
        onOpenChange={disabled ? undefined : setOpen}
        placement="bottom-start"
        showArrow={false}
        closeOn="outside"
        trigger={
          <button
            type="button"
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`input flex w-full items-center justify-between text-left disabled:cursor-not-allowed disabled:bg-surface-hover! ${
              error ? 'border-red-500 focus:ring-red-500/30' : ''
            } ${!formattedValue ? 'text-muted' : ''}`}
          >
            <span>{formattedValue ?? placeholder}</span>
            <Calendar size={16} className="shrink-0 text-muted" />
          </button>
        }
      >
        <DayPicker
          mode="single"
          selected={value}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
          disabled={
            fromDate && toDate
              ? { before: fromDate, after: toDate }
              : fromDate
                ? { before: fromDate }
                : toDate
                  ? { after: toDate }
                  : undefined
          }
          className="p-2"
          classNames={calendarClassNames}
          components={{
            Chevron: ({ orientation }) =>
              orientation === 'left' ? (
                <ChevronLeft size={16} />
              ) : (
                <ChevronRight size={16} />
              ),
          }}
        />
      </Popover>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default DatePicker
export type { DateRange }
