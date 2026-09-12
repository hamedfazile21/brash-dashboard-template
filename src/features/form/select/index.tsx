import type { SelectOption } from '#/components/input-select'
import InputSelect from '#/components/input-select'
import { useState } from 'react'

const priorityOptions: SelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const assigneeOptions = [
  { value: 'sara', label: 'Sara Ahmadi' },
  { value: 'hamed', label: 'Hamed Fazeli' },
  { value: 'leila', label: 'Leila Karimi', isDisabled: true },
]

const tagOptions: SelectOption[] = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'docs', label: 'Documentation' },
  { value: 'design', label: 'Design' },
]

const groupedOptions = [
  {
    label: 'Active',
    options: [
      { value: 'todo', label: 'Todo' },
      { value: 'in-progress', label: 'In Progress' },
    ],
  },
  {
    label: 'Closed',
    options: [
      { value: 'done', label: 'Done' },
      { value: 'canceled', label: 'Canceled' },
    ],
  },
]

function SelectInputShowCase() {
  const [controlledValue, setControlledValue] = useState<SelectOption | null>(
    priorityOptions[1],
  )

  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Select</h1>
        <p className="mt-1 text-sm text-muted">
          Built on react-select — single/multi select, groups, loading,
          clearable, and disabled options.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Basic */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Basic{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              label + placeholder
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="basic"
              label="Priority"
              options={priorityOptions}
              placeholder="Choose priority"
            />
          </div>
        </section>

        {/* Required */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Required{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              required
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="required"
              label="Status"
              options={priorityOptions}
              placeholder="Select a status"
              required
            />
          </div>
        </section>

        {/* Error */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Error{' '}
            <span className="ml-2 text-xs font-normal text-muted">error</span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="error"
              label="Assignee"
              options={assigneeOptions}
              placeholder="Select an assignee"
              error="Please choose an assignee"
            />
          </div>
        </section>

        {/* Multi-select */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Multi-select{' '}
            <span className="ml-2 text-xs font-normal text-muted">isMulti</span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="multi"
              label="Tags"
              options={tagOptions}
              isMulti
              placeholder="Add tags..."
            />
          </div>
        </section>

        {/* Clearable */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Clearable{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              isClearable
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="clearable"
              label="Priority"
              options={priorityOptions}
              defaultValue={priorityOptions[2]}
              isClearable
            />
          </div>
        </section>

        {/* Disabled option + disabled select */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Disabled{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              isDisabled (option & whole select)
            </span>
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputSelect
              id="disabled-option"
              label="Assignee"
              options={assigneeOptions}
              placeholder="Leila is unavailable"
            />
            <InputSelect
              id="disabled-select"
              label="Region"
              options={priorityOptions}
              defaultValue={priorityOptions[0]}
              isDisabled
            />
          </div>
        </section>

        {/* Loading */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Loading{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              isLoading
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="loading"
              label="Assignee"
              options={[]}
              isLoading
              placeholder="Fetching..."
            />
          </div>
        </section>

        {/* No options found (custom empty state) */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Empty state{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              NoOptionsMessage
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="empty"
              label="Search users"
              options={[]}
              placeholder="Type to search..."
            />
          </div>
        </section>

        {/* Grouped options */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Grouped options{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              GroupBase
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="grouped"
              label="Status"
              options={groupedOptions}
              placeholder="Select status"
            />
          </div>
        </section>

        {/* Controlled */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Controlled value{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              value + onChange
            </span>
          </p>
          <div className="max-w-sm">
            <InputSelect
              id="controlled"
              label="Priority"
              options={priorityOptions}
              value={controlledValue}
              onChange={(option) => setControlledValue(option as SelectOption)}
            />
            <p className="mt-2 text-xs text-muted">
              Selected: {controlledValue ? controlledValue.label : 'none'}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SelectInputShowCase
