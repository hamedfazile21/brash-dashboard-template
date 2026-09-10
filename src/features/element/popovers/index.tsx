import Popover from '#/components/popover'
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const PopoverShowCase = () => {
  const [controlledOpen, setControlledOpen] = useState(false)
  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Popover</h1>
        <p className="mt-1 text-sm text-muted">
          Placement, trigger type, close behavior, arrow, and controlled state —
          all in one component built on Floating UI.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Placement */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Placement{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              placement
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
              <Popover
                key={placement}
                placement={placement}
                trigger={
                  <button
                    type="button"
                    className="btn btn-secondary w-auto px-4 capitalize"
                  >
                    {placement}
                  </button>
                }
              >
                <p className="px-2 py-1 text-sm text-foreground">
                  Placed on {placement}
                </p>
              </Popover>
            ))}
          </div>
        </section>

        {/* Placement — start/end alignment */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Alignment{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              bottom-start / bottom-end
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Popover
              placement="bottom-start"
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Bottom Start
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Aligned to the start edge
              </p>
            </Popover>
            <Popover
              placement="bottom-end"
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Bottom End
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Aligned to the end edge
              </p>
            </Popover>
          </div>
        </section>

        {/* Trigger type */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Trigger type{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              triggerType
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Popover
              triggerType="click"
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Click me
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Opens on click
              </p>
            </Popover>
            <Popover
              triggerType="hover"
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Hover me
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Opens on hover
              </p>
            </Popover>
          </div>
        </section>

        {/* Close behavior */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Close behavior{' '}
            <span className="ml-2 text-xs font-normal text-muted">closeOn</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-start gap-y-1.5">
              <Popover
                closeOn="select"
                trigger={
                  <button
                    type="button"
                    className="btn btn-secondary w-auto px-4"
                  >
                    <Ellipsis size={16} />
                    Menu (closeOn="select")
                  </button>
                }
              >
                <div className="flex min-w-36 flex-col gap-y-0.5">
                  <button
                    type="button"
                    className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-surface-hover"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-surface-hover"
                  >
                    <Copy size={14} />
                    Duplicate
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </Popover>
              <p className="text-xs text-muted">
                Clicking an item closes it — typical menu behavior
              </p>
            </div>

            <div className="flex flex-col items-start gap-y-1.5">
              <Popover
                closeOn="outside"
                trigger={
                  <button
                    type="button"
                    className="btn btn-secondary w-auto px-4"
                  >
                    Form (closeOn="outside")
                  </button>
                }
              >
                <div className="flex w-48 flex-col gap-y-2 p-1">
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="glass-solid w-full rounded-md px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted"
                  />
                  <button type="button" className="btn btn-primary btn-sm">
                    Save
                  </button>
                </div>
              </Popover>
              <p className="text-xs text-muted">
                Clicking inside doesn't close it — safe for forms
              </p>
            </div>
          </div>
        </section>

        {/* Arrow */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Arrow{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              showArrow
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Popover
              showArrow
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  With arrow
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Points back at the trigger
              </p>
            </Popover>
            <Popover
              showArrow={false}
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Without arrow
                </button>
              }
            >
              <p className="px-2 py-1 text-sm text-foreground">
                Cleaner, no pointer
              </p>
            </Popover>
          </div>
        </section>

        {/* Controlled state */}
        <section className="card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Controlled state{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              open / onOpenChange
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Popover
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              trigger={
                <button type="button" className="btn btn-secondary w-auto px-4">
                  Trigger
                </button>
              }
            >
              <div className="flex flex-col gap-y-2 p-1">
                <p className="px-1 text-sm text-foreground">
                  Opened externally too
                </p>
                <button
                  type="button"
                  onClick={() => setControlledOpen(false)}
                  className="btn btn-primary btn-sm"
                >
                  Close from inside
                </button>
              </div>
            </Popover>

            <button
              type="button"
              onClick={() => setControlledOpen((prev) => !prev)}
              className="btn btn-secondary-outline w-auto px-4"
            >
              Toggle externally
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PopoverShowCase
