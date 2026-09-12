import { useState } from 'react'
import { Mail } from 'lucide-react'
import Input from '#/components/input'

function InputShowCase() {
  const [controlledValue, setControlledValue] = useState('')
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Input</h1>
        <p className="mt-1 text-sm text-muted">
          Label, required indicator, error state, password visibility toggle,
          and every native input prop.
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
            <Input id="basic" label="Full name" placeholder="Hamed Fazeli" />
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
            <Input
              id="required"
              label="Email"
              type="email"
              placeholder="you@example.com"
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
            <Input
              id="error"
              label="Username"
              placeholder="Choose a username"
              defaultValue="ha"
              error="Username must be at least 3 characters"
            />
          </div>
        </section>

        {/* Password */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Password{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              type="password"
            </span>
          </p>
          <div className="max-w-sm">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </section>

        {/* Disabled */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Disabled{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              disabled
            </span>
          </p>
          <div className="max-w-sm">
            <Input
              id="disabled"
              label="Workspace ID"
              defaultValue="wksp_8f2a1c"
              disabled
            />
          </div>
        </section>

        {/* Types */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Types{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              type="number" | "date" | "tel"
            </span>
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input id="number" label="Quantity" type="number" placeholder="0" />
            <Input
              id="tel"
              label="Phone"
              type="tel"
              placeholder="+98 912 345 6789"
            />
          </div>
        </section>

        {/* Custom styling via parentClassName / labelClassName */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Custom label style
            <span className="ml-2 text-xs font-normal text-muted">
              labelClassName / parentClassName
            </span>
          </p>
          <div className="max-w-sm">
            <Input
              id="custom-label"
              label="Search"
              placeholder="Search tasks..."
              labelClassName="text-primary uppercase tracking-wide text-xs"
              parentClassName="gap-y-1 flex flex-col"
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
            <Input
              id="controlled"
              label="Bio"
              placeholder="Tell us about yourself"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="mt-2 text-xs text-muted">
              {controlledValue.length} character
              {controlledValue.length !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        {/* Ref forwarding — programmatic focus */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Ref forwarding{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              forwardRef
            </span>
          </p>
          <div className="flex max-w-sm flex-col gap-y-3">
            <Input
              id="ref-demo"
              ref={setInputRef}
              label="Focus target"
              placeholder="Click the button below"
            />
            <button
              type="button"
              onClick={() => inputRef?.focus()}
              className="btn btn-secondary w-auto self-start px-4"
            >
              <Mail size={14} />
              Focus this field
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InputShowCase
