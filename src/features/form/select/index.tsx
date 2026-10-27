import { useState } from 'react'
import { Layers, ListFilter, Palette, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import InputSelect from '#/components/input-select'
import type { SelectOption } from '#/components/input-select'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'
import { Avatar10, Avatar11, Avatar12, Avatar13 } from '#/assets'

const priorities = [
  { value: 'low', label: 'Low', dot: 'bg-success' },
  { value: 'medium', label: 'Medium', dot: 'bg-warning' },
  { value: 'high', label: 'High', dot: 'bg-danger' },
]

const people = [
  { value: 'hamed', label: 'Hamed Fazeli', avatar: Avatar13, role: 'Lead' },
  { value: 'sara', label: 'Sara Ahmadi', avatar: Avatar10, role: 'Design' },
  { value: 'kian', label: 'Kian Rostami', avatar: Avatar11, role: 'Backend' },
  {
    value: 'nina',
    label: 'Nina Karimi',
    avatar: Avatar12,
    role: 'On leave',
    isDisabled: true,
  },
]

const tags = ['Bug', 'Feature', 'Documentation', 'Design', 'Performance']

const statusGroups = [
  { label: 'Active', options: ['Todo', 'In Progress', 'In Review'] },
  { label: 'Closed', options: ['Done', 'Canceled'] },
]

function useOptions() {
  const { t } = useTranslation()
  const toOption = (label: string) => ({ value: label, label: t(label) })

  return {
    priorityOptions: priorities.map((p) => ({ ...p, label: t(p.label) })),
    tagOptions: tags.map(toOption),
    groupedOptions: statusGroups.map((g) => ({
      label: t(g.label),
      options: g.options.map(toOption),
    })),
  }
}

function StatesSection() {
  const { t } = useTranslation()
  const { priorityOptions } = useOptions()

  return (
    <ShowcaseSection
      icon={Layers}
      title="States"
      description="Same height, label, hint and error as the text inputs"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard title="Default" code="label + placeholder">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            placeholder={t('Choose priority')}
          />
        </DemoCard>

        <DemoCard title="Required" code="required">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            placeholder={t('Choose priority')}
            required
          />
        </DemoCard>

        <DemoCard title="Hint" code="hint">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            defaultValue={priorityOptions[1]}
            hint={t('High priority tasks notify the whole team.')}
          />
        </DemoCard>

        <DemoCard title="Error" code="error">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            placeholder={t('Choose priority')}
            error={t('Please choose a priority')}
          />
        </DemoCard>

        <DemoCard title="Disabled" code="isDisabled">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            defaultValue={priorityOptions[0]}
            isDisabled
          />
        </DemoCard>

        <DemoCard title="Loading" code="isLoading">
          <InputSelect
            label={t('Assignee')}
            options={[]}
            isLoading
            placeholder={t('Fetching...')}
          />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function OptionsSection() {
  const { t } = useTranslation()
  const { priorityOptions, tagOptions, groupedOptions } = useOptions()

  return (
    <ShowcaseSection
      icon={ListFilter}
      title="Options"
      description="Multiple values, groups, clearing and the empty state"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard
          title="Multi-select"
          code="isMulti"
          description="Selected values become removable chips"
        >
          <InputSelect
            label={t('Tags')}
            options={tagOptions}
            defaultValue={[tagOptions[0], tagOptions[3]]}
            isMulti
            placeholder={t('Add tags...')}
          />
        </DemoCard>

        <DemoCard title="Grouped" code="options={[{ label, options }]}">
          <InputSelect
            label={t('Status')}
            options={groupedOptions}
            placeholder={t('Select status')}
          />
        </DemoCard>

        <DemoCard title="Clearable" code="isClearable">
          <InputSelect
            label={t('Priority')}
            options={priorityOptions}
            defaultValue={priorityOptions[2]}
            isClearable
          />
        </DemoCard>

        <DemoCard
          title="Empty state"
          code="NoOptionsMessage"
          description="Type anything to see it"
        >
          <InputSelect
            label={t('Search users')}
            options={[]}
            placeholder={t('Type to search...')}
          />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

type Priority = SelectOption & { dot: string }
type Person = SelectOption & {
  avatar: string
  role: string
  isDisabled?: boolean
}

function PriorityLabel({ label, dot }: Priority) {
  return (
    <span className="flex items-center gap-x-2">
      <span className={`size-2 shrink-0 rounded-full ${dot}`} />
      {label}
    </span>
  )
}

function PersonLabel({ label, avatar, role }: Person) {
  const { t } = useTranslation()

  return (
    <span className="flex min-w-0 items-center gap-x-2">
      <img
        src={avatar}
        alt=""
        className="size-5 shrink-0 rounded-full bg-surface-hover object-cover"
      />
      <span className="truncate">{label}</span>
      <span className="truncate text-xs text-muted">{t(role)}</span>
    </span>
  )
}

function CustomSection() {
  const { t } = useTranslation()
  const { priorityOptions } = useOptions()

  return (
    <ShowcaseSection
      icon={Palette}
      title="Custom labels"
      description="formatOptionLabel renders in both the field and the menu"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard title="Status dots" code="formatOptionLabel">
          <InputSelect<Priority>
            label={t('Priority')}
            options={priorityOptions}
            defaultValue={priorityOptions[2]}
            formatOptionLabel={PriorityLabel}
          />
        </DemoCard>

        <DemoCard
          title="People"
          code="isOptionDisabled"
          description="Nina is on leave and cannot be picked"
        >
          <InputSelect<Person>
            label={t('Assignee')}
            options={people}
            defaultValue={people[1]}
            formatOptionLabel={(person) => <PersonLabel {...person} />}
            isOptionDisabled={(person) => !!person.isDisabled}
          />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const tasks = [
  { title: 'Fix login redirect', priority: 'high', owner: 'hamed' },
  { title: 'Dark mode chart colors', priority: 'medium', owner: 'sara' },
  { title: 'Cache dashboard queries', priority: 'high', owner: 'kian' },
  { title: 'Update onboarding copy', priority: 'low', owner: 'sara' },
  { title: 'Paginate audit log', priority: 'medium', owner: 'kian' },
]

function InContextSection() {
  const { t } = useTranslation()
  const { priorityOptions } = useOptions()
  const [priority, setPriority] = useState<Priority | null>(null)
  const [owners, setOwners] = useState<readonly Person[]>([])

  const visible = tasks.filter(
    (task) =>
      (!priority || task.priority === priority.value) &&
      (owners.length === 0 || owners.some((o) => o.value === task.owner)),
  )

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="Controlled selects filtering a list"
    >
      <DemoCard title="Task filters" code="value + onChange">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputSelect<Priority>
            label={t('Priority')}
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
            formatOptionLabel={PriorityLabel}
            placeholder={t('Any priority')}
            isClearable
          />
          <InputSelect<Person, true>
            label={t('Assignee')}
            options={people}
            value={owners}
            onChange={setOwners}
            formatOptionLabel={(person) => <PersonLabel {...person} />}
            isOptionDisabled={(person) => !!person.isDisabled}
            placeholder={t('Anyone')}
            isMulti
          />
        </div>

        <ul className="mt-5 divide-y divide-borderColor rounded-lg border border-borderColor">
          {visible.map((task) => {
            const p = priorities.find((x) => x.value === task.priority)!
            const owner = people.find((x) => x.value === task.owner)!
            return (
              <li
                key={task.title}
                className="flex items-center gap-x-3 px-4 py-2.5 text-sm"
              >
                <span className={`size-2 shrink-0 rounded-full ${p.dot}`} />
                <span className="min-w-0 flex-1 truncate text-foreground">
                  {t(task.title)}
                </span>
                <img
                  src={owner.avatar}
                  alt={owner.label}
                  className="size-6 rounded-full bg-surface-hover object-cover"
                />
              </li>
            )
          })}
          {visible.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted">
              {t('No tasks match these filters')}
            </li>
          )}
        </ul>
      </DemoCard>
    </ShowcaseSection>
  )
}

function SelectInputShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Select"
        description="A react-select wrapper styled like the other fields — single and multi values, groups, custom option labels, loading and empty states."
        code='<InputSelect label="Priority" options={options} isMulti isClearable />'
        stats={[
          { value: 6, label: 'States' },
          { value: 'Multi', label: 'Values' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <StatesSection />
      <OptionsSection />
      <CustomSection />
      <InContextSection />
    </div>
  )
}

export default SelectInputShowCase
