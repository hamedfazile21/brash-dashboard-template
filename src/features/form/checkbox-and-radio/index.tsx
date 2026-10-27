import { useState } from 'react'
import type { ReactNode } from 'react'
import { CircleDot, ListChecks, Sparkles, SquareCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CheckBox from '#/components/checkbox'
import Radio from '#/components/radio'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'

const sizes = ['sm', 'md', 'lg'] as const

/** A control with its text — the whole row is the click target */
function Choice({
  control,
  label,
  description,
  disabled,
}: {
  control: ReactNode
  label: string
  description?: string
  disabled?: boolean
}) {
  return (
    <label
      className={`flex items-start gap-x-3 ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      <span className="flex h-5 items-center">{control}</span>
      <span className="min-w-0">
        <span className="block text-sm text-foreground">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-muted">{description}</span>
        )}
      </span>
    </label>
  )
}

const checkboxStyles = [
  { key: 'default', label: 'Square', rounded: false, outline: false },
  { key: 'outline', label: 'Outline', rounded: false, outline: true },
  { key: 'rounded', label: 'Rounded', rounded: true, outline: false },
  {
    key: 'rounded-outline',
    label: 'Rounded outline',
    rounded: true,
    outline: true,
  },
]

function CheckboxSection() {
  const { t } = useTranslation()
  const [styles, setStyles] = useState<Record<string, boolean>>({
    default: true,
    outline: false,
    rounded: true,
    'rounded-outline': false,
  })

  return (
    <ShowcaseSection
      icon={SquareCheck}
      title="Checkbox"
      description="Square or rounded, filled or outline, in three sizes"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard title="Styles" code="rounded | outline">
          <div className="flex flex-col gap-y-3">
            {checkboxStyles.map(({ key, label, rounded, outline }) => (
              <Choice
                key={key}
                label={t(label)}
                control={
                  <CheckBox
                    checked={styles[key]}
                    onChange={(e) =>
                      setStyles((s) => ({ ...s, [key]: e.target.checked }))
                    }
                    rounded={rounded}
                    outline={outline}
                  />
                }
              />
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Sizes" code='size="sm" | "md" | "lg"'>
          <div className="flex items-center gap-x-6">
            {sizes.map((size) => (
              <Choice
                key={size}
                label={size}
                control={
                  <CheckBox checked onChange={() => undefined} size={size} />
                }
              />
            ))}
          </div>
        </DemoCard>

        <DemoCard title="States" code="isIndeterminate | disabled">
          <div className="flex flex-col gap-y-3">
            <Choice
              label={t('Unchecked')}
              control={<CheckBox checked={false} onChange={() => undefined} />}
            />
            <Choice
              label={t('Indeterminate')}
              control={
                <CheckBox
                  checked={false}
                  isIndeterminate
                  onChange={() => undefined}
                />
              }
            />
            <Choice
              disabled
              label={t('Disabled')}
              control={
                <CheckBox
                  checked={false}
                  onChange={() => undefined}
                  reset={{ disabled: true }}
                />
              }
            />
            <Choice
              disabled
              label={t('Disabled and checked')}
              control={
                <CheckBox
                  checked
                  onChange={() => undefined}
                  reset={{ disabled: true }}
                />
              }
            />
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const projects = ['Website redesign', 'Mobile app', 'Billing service', 'Docs']

function SelectAllSection() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string[]>([projects[0], projects[2]])

  const all = selected.length === projects.length
  const some = selected.length > 0 && !all

  return (
    <ShowcaseSection
      icon={ListChecks}
      title="Select all"
      description="The parent turns indeterminate when only some children are checked"
    >
      <DemoCard title="Checkbox group" code="isIndeterminate={some}">
        <div className="max-w-md rounded-lg border border-borderColor">
          <div className="flex items-center justify-between border-b border-borderColor bg-surface-hover/40 px-4 py-2.5">
            <Choice
              label={t('All projects')}
              control={
                <CheckBox
                  checked={all}
                  isIndeterminate={some}
                  onChange={() => setSelected(all ? [] : projects)}
                />
              }
            />
            <span className="text-xs text-muted tabular-nums">
              {t('{{selected}} of {{total}}', {
                selected: selected.length,
                total: projects.length,
              })}
            </span>
          </div>
          <div className="flex flex-col gap-y-3 px-4 py-3 ps-11">
            {projects.map((project) => (
              <Choice
                key={project}
                label={t(project)}
                control={
                  <CheckBox
                    checked={selected.includes(project)}
                    onChange={(e) =>
                      setSelected((s) =>
                        e.target.checked
                          ? [...s, project]
                          : s.filter((p) => p !== project),
                      )
                    }
                  />
                }
              />
            ))}
          </div>
        </div>
      </DemoCard>
    </ShowcaseSection>
  )
}

function RadioSection() {
  const { t } = useTranslation()
  const [billing, setBilling] = useState('monthly')
  const [theme, setTheme] = useState('system')

  return (
    <ShowcaseSection
      icon={CircleDot}
      title="Radio"
      description="One choice from a group — filled or outline, in three sizes"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard title="Filled" code="name + checked">
          <div role="radiogroup" className="flex flex-col gap-y-3">
            {['monthly', 'yearly'].map((value) => (
              <Choice
                key={value}
                label={t(value === 'monthly' ? 'Monthly plan' : 'Yearly plan')}
                control={
                  <Radio
                    checked={billing === value}
                    onChange={() => setBilling(value)}
                    reset={{ name: 'radio-billing', value }}
                  />
                }
              />
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Outline" code="outline">
          <div role="radiogroup" className="flex flex-col gap-y-3">
            {['light', 'dark', 'system'].map((value) => (
              <Choice
                key={value}
                label={t(value[0].toUpperCase() + value.slice(1))}
                control={
                  <Radio
                    checked={theme === value}
                    onChange={() => setTheme(value)}
                    outline
                    reset={{ name: 'radio-theme', value }}
                  />
                }
              />
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Sizes & disabled" code="size | disabled">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-6">
              {sizes.map((size) => (
                <Choice
                  key={size}
                  label={size}
                  control={
                    <Radio
                      checked={size === 'md'}
                      onChange={() => undefined}
                      size={size}
                      reset={{ name: 'radio-size' }}
                    />
                  }
                />
              ))}
            </div>
            <div className="flex items-center gap-x-6">
              <Choice
                disabled
                label={t('Disabled')}
                control={
                  <Radio
                    checked={false}
                    onChange={() => undefined}
                    reset={{ disabled: true }}
                  />
                }
              />
              <Choice
                disabled
                label={t('Selected')}
                control={
                  <Radio
                    checked
                    onChange={() => undefined}
                    reset={{ disabled: true }}
                  />
                }
              />
            </div>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const plans = [
  { value: 'starter', name: 'Starter', price: '$0', note: 'Up to 3 projects' },
  { value: 'pro', name: 'Pro', price: '$12', note: 'Unlimited projects' },
  { value: 'team', name: 'Team', price: '$29', note: 'Roles and audit log' },
]

const notifications = [
  {
    key: 'mentions',
    label: 'Mentions',
    description: 'When someone @mentions you',
  },
  {
    key: 'assigned',
    label: 'Assigned tasks',
    description: 'When a task is assigned to you',
  },
  {
    key: 'digest',
    label: 'Weekly digest',
    description: 'A summary every Monday morning',
  },
]

function InContextSection() {
  const { t } = useTranslation()
  const [plan, setPlan] = useState('pro')
  const [notify, setNotify] = useState<Record<string, boolean>>({
    mentions: true,
    assigned: true,
    digest: false,
  })

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="Radio cards and a settings list"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard
          title="Plan picker"
          description="The whole card selects the plan"
        >
          <div
            role="radiogroup"
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {plans.map(({ value, name, price, note }) => {
              const active = plan === value
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer flex-col gap-y-2 rounded-xl border p-3.5 transition-colors ${
                    active
                      ? 'border-primary bg-primary/8 ring-1 ring-primary/30'
                      : 'border-borderColor hover:bg-surface-hover/50'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {t(name)}
                    </span>
                    <Radio
                      checked={active}
                      onChange={() => setPlan(value)}
                      size="sm"
                      reset={{ name: 'plan', value }}
                    />
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {price}
                    <span className="text-xs font-normal text-muted">
                      {' '}
                      / {t('month')}
                    </span>
                  </span>
                  <span className="text-xs text-muted">{t(note)}</span>
                </label>
              )
            })}
          </div>
        </DemoCard>

        <DemoCard title="Email notifications">
          <div className="flex flex-col divide-y divide-borderColor">
            {notifications.map(({ key, label, description }) => (
              <div key={key} className="py-3 first:pt-0 last:pb-0">
                <Choice
                  label={t(label)}
                  description={t(description)}
                  control={
                    <CheckBox
                      checked={notify[key]}
                      onChange={(e) =>
                        setNotify((s) => ({ ...s, [key]: e.target.checked }))
                      }
                    />
                  }
                />
              </div>
            ))}
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function CheckBoxAndRadioShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Checkbox & radio"
        description="Native inputs styled with one class — square, rounded and outline checkboxes with an indeterminate state, and filled or outline radios."
        code='<CheckBox checked={on} onChange={toggle} rounded outline size="lg" />'
        stats={[
          { value: 4, label: 'Styles' },
          { value: 3, label: 'Sizes' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <CheckboxSection />
      <SelectAllSection />
      <RadioSection />
      <InContextSection />
    </div>
  )
}

export default CheckBoxAndRadioShowCase
