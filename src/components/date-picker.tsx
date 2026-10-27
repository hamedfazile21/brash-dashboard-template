import { useEffect, useId, useState } from 'react'
import { DayPicker } from '@daypicker/react'
import type { DateRange } from '@daypicker/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Popover from './popover'
import { FieldLabel, FieldMessage } from './field'

interface DatePickerProps {
  label?: string
  error?: string
  /** Helper text under the field, replaced by `error` when set */
  hint?: string
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
export const calendarClassNames = {
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
  // Range mode: a soft band on the cells, solid ends. Logical sides, so the
  // band's rounded caps land on the right ends in RTL too.
  range_start: 'rounded-s-full bg-primary/12',
  range_end: 'rounded-e-full bg-primary/12',
  range_middle:
    'bg-primary/12 [&>button]:rounded-none [&>button]:bg-transparent! [&>button]:text-foreground! [&>button]:hover:bg-primary/15!',
}

/** Month arrows that point outward in RTL as well */
export function CalendarChevron({
  orientation,
}: {
  orientation?: 'up' | 'down' | 'left' | 'right'
}) {
  return orientation === 'left' ? (
    <ChevronLeft size={16} className="rtl:rotate-180" />
  ) : (
    <ChevronRight size={16} className="rtl:rotate-180" />
  )
}

function DatePicker({
  label,
  error,
  hint,
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
  const messageId = `${inputId}-message`
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
        <FieldLabel
          htmlFor={inputId}
          required={required}
          className={labelClassName}
        >
          {label}
        </FieldLabel>
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
            aria-describedby={error || hint ? messageId : undefined}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={`input flex w-full items-center justify-between gap-x-2 text-start ${
              open ? 'border-primary/50 ring-2 ring-primary/30' : ''
            } ${!formattedValue ? 'text-muted' : ''}`}
          >
            <span className="truncate">{formattedValue ?? placeholder}</span>
            <Calendar
              size={16}
              className={`shrink-0 transition-colors ${
                error ? 'text-danger' : open ? 'text-primary' : 'text-muted'
              }`}
            />
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
          components={{ Chevron: CalendarChevron }}
        />
      </Popover>

      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  )
}

export default DatePicker
export type { DateRange }
