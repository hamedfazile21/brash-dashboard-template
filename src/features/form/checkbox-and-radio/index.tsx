import { useState } from 'react'
import CheckBox from '#/components/checkbox'
import Radio from '#/components/radio'

function CheckBoxAndRadioShowCase() {
  const [basicChecked, setBasicChecked] = useState(false)
  const [outlineChecked, setOutlineChecked] = useState(true)
  const [roundedChecked, setRoundedChecked] = useState(true)
  const [indeterminateChecked, setIndeterminateChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('monthly')
  const [themeValue, setThemeValue] = useState('light')

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          Checkbox &amp; radio
        </h1>
        <p className="mt-1 text-sm text-muted">
          Controlled checkbox and radio inputs with outline, rounded, size,
          indeterminate, and native input states.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Basic checkbox{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              checked + onChange
            </span>
          </p>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <CheckBox
              checked={basicChecked}
              onChange={(event) => setBasicChecked(event.target.checked)}
              reset={{ 'aria-label': 'Basic checkbox' }}
            />
            Accept the terms and conditions
          </label>
          <p className="mt-3 text-xs text-muted">
            State: {basicChecked ? 'checked' : 'unchecked'}
          </p>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Outline checkbox{' '}
            <span className="ml-2 text-xs font-normal text-muted">outline</span>
          </p>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <CheckBox
              checked={outlineChecked}
              onChange={(event) => setOutlineChecked(event.target.checked)}
              outline
              reset={{ 'aria-label': 'Outline checkbox' }}
            />
            Send me product updates
          </label>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Rounded checkbox{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              rounded + outline
            </span>
          </p>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <CheckBox
              checked={roundedChecked}
              onChange={(event) => setRoundedChecked(event.target.checked)}
              rounded
              outline
              reset={{ 'aria-label': 'Rounded checkbox' }}
            />
            Enable compact mode
          </label>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Indeterminate{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              isIndeterminate
            </span>
          </p>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <CheckBox
              checked={indeterminateChecked}
              onChange={(event) =>
                setIndeterminateChecked(event.target.checked)
              }
              isIndeterminate
              reset={{ 'aria-label': 'Indeterminate checkbox' }}
            />
            Select all projects
          </label>
          <p className="mt-3 text-xs text-muted">
            Useful when only some items in a group are selected.
          </p>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Checkbox sizes{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              sm | md | lg
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <CheckBox
                  checked
                  onChange={() => undefined}
                  size={size}
                  reset={{ 'aria-label': `${size} checkbox` }}
                />
                {size}
              </label>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Disabled checkbox{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              reset props
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm text-muted">
              <CheckBox
                checked={false}
                onChange={() => undefined}
                reset={{ disabled: true, 'aria-label': 'Disabled checkbox' }}
              />
              Unchecked
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <CheckBox
                checked
                onChange={() => undefined}
                outline
                reset={{
                  disabled: true,
                  'aria-label': 'Disabled checked checkbox',
                }}
              />
              Checked
            </label>
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Basic radio{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              checked + onChange
            </span>
          </p>
          <div className="flex flex-col gap-3">
            {[
              ['monthly', 'Monthly plan'],
              ['yearly', 'Yearly plan'],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <Radio
                  checked={radioValue === value}
                  onChange={() => setRadioValue(value)}
                  reset={{
                    name: 'billing-plan',
                    value,
                    'aria-label': label,
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Outline radio{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              outline + native props
            </span>
          </p>
          <div className="flex flex-col gap-3">
            {[
              ['light', 'Light theme'],
              ['dark', 'Dark theme'],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <Radio
                  checked={themeValue === value}
                  onChange={() => setThemeValue(value)}
                  outline
                  reset={{
                    name: 'theme-mode',
                    value,
                    'aria-label': label,
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Radio sizes{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              sm | md | lg
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <Radio
                  checked={size === 'md'}
                  onChange={() => undefined}
                  size={size}
                  reset={{
                    name: 'radio-size',
                    value: size,
                    'aria-label': `${size} radio`,
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Disabled radio{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              reset props
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm text-muted">
              <Radio
                checked={false}
                onChange={() => undefined}
                reset={{ disabled: true, 'aria-label': 'Disabled radio' }}
              />
              Unavailable
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <Radio
                checked
                onChange={() => undefined}
                outline
                reset={{
                  disabled: true,
                  'aria-label': 'Disabled checked radio',
                }}
              />
              Selected
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CheckBoxAndRadioShowCase
