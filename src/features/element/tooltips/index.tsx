import { Tooltip, type TooltipVariant } from '#/components/tooltip'

const variants: { key: TooltipVariant; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
]

const placements: {
  key: 'top' | 'bottom' | 'left' | 'right'
  label: string
}[] = [
  { key: 'top', label: 'Top' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
  { key: 'right', label: 'Right' },
]

function TooltipsShowCase() {
  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Tooltip</h1>
        <p className="mt-1 text-sm text-muted">
          6 colors × 4 placements — hover any button to preview.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {variants.map(({ key, label }) => (
          <section key={key} className="card p-5">
            <p className="mb-4 text-sm font-semibold text-foreground">
              {label}{' '}
              <span className="ml-2 text-xs font-normal text-muted">
                variant="{key}"
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {placements.map(({ key: placement, label: placementLabel }) => (
                <Tooltip
                  key={placement}
                  variant={key}
                  placement={placement}
                  content={`${label} tooltip — ${placementLabel}`}
                >
                  <button
                    type="button"
                    className="btn btn-secondary w-auto px-4"
                  >
                    {placementLabel}
                  </button>
                </Tooltip>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default TooltipsShowCase
