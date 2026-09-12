import { useState } from 'react'
import DatePicker from '#/components/date-picker'

const today = new Date()
const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
)
const tomorrow = new Date(startOfToday)
tomorrow.setDate(tomorrow.getDate() + 1)
const nextWeek = new Date(startOfToday)
nextWeek.setDate(nextWeek.getDate() + 7)
const nextMonth = new Date(startOfToday)
nextMonth.setMonth(nextMonth.getMonth() + 1)

const formatDate = (date: Date | undefined) =>
  date
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
      }).format(date)
    : 'none'

function DatePickerShowCase() {
  const [controlledDate, setControlledDate] = useState<Date | undefined>(
    startOfToday,
  )
  const [clearableDate, setClearableDate] = useState<Date | undefined>(tomorrow)

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-foreground">Date picker</h1>
        <p className="mt-1 text-sm text-muted">
          A calendar popover powered by{' '}
          <a
            href="https://www.npmjs.com/package/@daypicker/react"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            @daypicker/react
          </a>{' '}
          for selecting a single date with validation, disabled states, and date
          boundaries.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Basic{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              label + placeholder
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="basic-date"
              label="Start date"
              placeholder="Choose a date"
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Required{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              required
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="required-date"
              label="Due date"
              placeholder="Select a due date"
              required
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Error{' '}
            <span className="ml-2 text-xs font-normal text-muted">error</span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="error-date"
              label="Birthday"
              placeholder="Enter your birthday"
              error="Please select a valid date"
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Disabled{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              disabled
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="disabled-date"
              label="Published on"
              value={startOfToday}
              disabled
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Controlled value{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              value + onChange
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="controlled-date"
              label="Selected date"
              value={controlledDate}
              onChange={setControlledDate}
            />
            <p className="mt-2 text-xs text-muted">
              Selected: {formatDate(controlledDate)}
            </p>
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Custom placeholder{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              placeholder
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="custom-placeholder-date"
              label="Appointment"
              placeholder="Pick your appointment day"
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Minimum date{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              fromDate
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="minimum-date"
              label="Book from tomorrow"
              fromDate={tomorrow}
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Maximum date{' '}
            <span className="ml-2 text-xs font-normal text-muted">toDate</span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="maximum-date"
              label="Book before next week"
              toDate={nextWeek}
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Date range{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              fromDate + toDate
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="range-date"
              label="Choose a date this month"
              fromDate={startOfToday}
              toDate={nextMonth}
              onChange={() => undefined}
            />
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Clearable value{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              undefined value
            </span>
          </p>
          <div className="max-w-sm">
            <DatePicker
              id="clearable-date"
              label="Optional date"
              value={clearableDate}
              onChange={setClearableDate}
            />
            <button
              type="button"
              className="mt-2 text-xs font-medium text-primary hover:underline"
              onClick={() => setClearableDate(undefined)}
            >
              Clear selected date
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DatePickerShowCase
