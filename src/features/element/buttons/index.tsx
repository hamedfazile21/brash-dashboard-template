import { Trash2 } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const variants = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
]

const ButtonShowCase = () => {
  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Button</h1>
        <p className="mt-1 text-sm text-muted">
          6 variants × solid/outline × 3 sizes — plain CSS classes, no wrapper
          component.
        </p>
      </div>

      <div className="pt-8 grid grid-cols-2 gap-4">
        {/* Solid + Outline, per variant */}
        {variants.map(({ key, label }) => (
          <section key={key} className="card p-5">
            <p className="mb-3 text-sm font-semibold text-foreground">
              {label}{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                .btn-{key}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button className={`btn btn-${key}`}>{label}</button>
              <button className={`btn btn-${key}-outline`}>
                {label} Outline
              </button>
              <button className={`btn btn-${key}`} disabled>
                Disabled
              </button>
            </div>
          </section>
        ))}

        {/* Sizes */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Sizes{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              .btn-sm | .btn-md | .btn-lg
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary btn-md">Medium</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
        </section>

        {/* Rounded + icon example */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Rounded &amp; icons
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn btn-primary btn-rounded-full">
              Rounded Full
            </button>
            <button className="btn btn-danger-outline btn-rounded-full">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </section>

        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Button group{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              .btn-group
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="btn-group">
              <button className="btn btn-secondary">Day</button>
              <button className="btn btn-secondary">Week</button>
              <button className="btn btn-secondary">Month</button>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary-outline">Left</button>
              <button className="btn btn-primary-outline">Center</button>
              <button className="btn btn-primary-outline">Right</button>
            </div>

            <div className="btn-group btn-group-full">
              <button className="btn btn-secondary btn-sm">1</button>
              <button className="btn btn-secondary btn-sm">2</button>
              <button className="btn btn-secondary btn-sm">3</button>
            </div>
          </div>

          <div className="mt-4 btn-group-vertical w-40">
            <button className="btn btn-secondary">Top</button>
            <button className="btn btn-secondary">Middle</button>
            <button className="btn btn-secondary">Bottom</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ButtonShowCase
