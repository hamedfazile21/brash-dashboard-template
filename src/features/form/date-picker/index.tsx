import { useState } from 'react'
import { DayPicker } from '@daypicker/react'
import { CalendarDays, CalendarRange, Layers, Ruler, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DatePicker, {
  CalendarChevron,
  calendarClassNames,
} from '#/components/date-picker'
import type { DateRange } from '#/components/date-picker'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'

const addDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const tomorrow = addDays(today, 1)
const nextWeek = addDays(today, 7)
const nextMonth = addDays(today, 30)

const formatDate = (date: Date | undefined) =>
  date
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
    : '—'

const noop = () => undefined

function StatesSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Layers}
      title="States"
      description="A button that opens a calendar — styled like every other field"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard title="Default" code="label + placeholder">
          <DatePicker
            label={t('Start date')}
            placeholder={t('Choose a date')}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Required" code="required">
          <DatePicker
            label={t('Due date')}
            placeholder={t('Choose a date')}
            required
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Hint" code="hint">
          <DatePicker
            label={t('Reminder')}
            placeholder={t('Choose a date')}
            hint={t('We email you at 9:00 on this day.')}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Error" code="error">
          <DatePicker
            label={t('Birthday')}
            placeholder={t('Choose a date')}
            error={t('Please select a valid date')}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Disabled" code="disabled">
          <DatePicker
            label={t('Published on')}
            value={today}
            disabled
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="With value" code="value">
          <DatePicker label={t('Start date')} value={today} onChange={noop} />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function LimitsSection() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date | undefined>(tomorrow)

  return (
    <ShowcaseSection
      icon={Ruler}
      title="Limits"
      description="Dates outside the bounds are struck through and cannot be picked"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard title="Minimum date" code="fromDate">
          <DatePicker
            label={t('Book from tomorrow')}
            fromDate={tomorrow}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Maximum date" code="toDate">
          <DatePicker
            label={t('Book before next week')}
            toDate={nextWeek}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard title="Between two dates" code="fromDate + toDate">
          <DatePicker
            label={t('Within the next 30 days')}
            fromDate={today}
            toDate={nextMonth}
            onChange={noop}
          />
        </DemoCard>

        <DemoCard
          title="Controlled & clearable"
          code="value={undefined}"
          description="Clear by passing undefined"
        >
          <div className="flex items-end gap-x-2">
            <DatePicker
              label={t('Optional date')}
              value={date}
              onChange={setDate}
            />
            <button
              type="button"
              onClick={() => setDate(undefined)}
              disabled={!date}
              aria-label={t('Clear date')}
              className="btn btn-secondary btn-icon shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function InlineSection() {
  const { t } = useTranslation()
  const [day, setDay] = useState<Date | undefined>(today)
  const [range, setRange] = useState<DateRange | undefined>({
    from: addDays(today, 3),
    to: addDays(today, 7),
  })

  const nights =
    range?.from && range.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000)
      : 0

  return (
    <ShowcaseSection
      icon={CalendarDays}
      title="Inline calendar"
      description="The same calendar without the popover, using calendarClassNames"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard title="Single date" code='mode="single"'>
          <div className="flex flex-col items-center gap-y-3">
            <DayPicker
              mode="single"
              selected={day}
              onSelect={setDay}
              defaultMonth={today}
              classNames={calendarClassNames}
              components={{ Chevron: CalendarChevron }}
            />
            <p className="text-xs text-muted">
              {t('Selected')}:{' '}
              <span className="font-medium text-foreground">
                {formatDate(day)}
              </span>
            </p>
          </div>
        </DemoCard>

        <DemoCard
          title="Date range"
          code='mode="range"'
          description="Past dates are disabled"
        >
          <div className="flex flex-col items-center gap-y-3">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              defaultMonth={today}
              disabled={{ before: today }}
              classNames={calendarClassNames}
              components={{ Chevron: CalendarChevron }}
            />
            <div className="flex w-full items-center justify-between gap-x-3 rounded-lg border border-borderColor px-3 py-2 text-xs">
              <span className="flex items-center gap-x-2 text-muted">
                <CalendarRange size={14} />
                <span className="text-foreground">
                  {formatDate(range?.from)} – {formatDate(range?.to)}
                </span>
              </span>
              <span className="shrink-0 font-medium text-primary">
                {t('{{count}} nights', { count: nights })}
              </span>
            </div>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function DatePickerShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Date picker"
        description="A calendar popover built on @daypicker/react — single dates with limits, hint and error states, plus inline single and range calendars."
        code='<DatePicker label="Due date" value={date} onChange={setDate} fromDate={today} />'
        stats={[
          { value: 6, label: 'States' },
          { value: 2, label: 'Modes' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <StatesSection />
      <LimitsSection />
      <InlineSection />
    </div>
  )
}

export default DatePickerShowCase
