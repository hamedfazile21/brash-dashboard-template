import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Compass,
  Copy,
  CreditCard,
  Ellipsis,
  Link2,
  LogOut,
  MousePointerClick,
  Pencil,
  Settings,
  Share2,
  Sparkles,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Popover from '#/components/popover'
import type { Placement } from '#/components/popover'
import CheckBox from '#/components/checkbox'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'
import { Avatar13 } from '../../../assets'

const menuItem =
  'flex w-full items-center gap-x-2 rounded-lg px-2.5 py-2 text-start text-sm transition-colors'

/* ------------------------------------------------------------------ */
/* Placement picker — 12 placements around one trigger                 */
/* ------------------------------------------------------------------ */

const ring: { placement: Placement; area: string }[] = [
  { placement: 'top-start', area: 'col-start-2 row-start-1' },
  { placement: 'top', area: 'col-start-3 row-start-1' },
  { placement: 'top-end', area: 'col-start-4 row-start-1' },
  { placement: 'left-start', area: 'col-start-1 row-start-2' },
  { placement: 'left', area: 'col-start-1 row-start-3' },
  { placement: 'left-end', area: 'col-start-1 row-start-4' },
  { placement: 'right-start', area: 'col-start-5 row-start-2' },
  { placement: 'right', area: 'col-start-5 row-start-3' },
  { placement: 'right-end', area: 'col-start-5 row-start-4' },
  { placement: 'bottom-start', area: 'col-start-2 row-start-5' },
  { placement: 'bottom', area: 'col-start-3 row-start-5' },
  { placement: 'bottom-end', area: 'col-start-4 row-start-5' },
]

function PlacementSection() {
  const { t } = useTranslation()
  const [placement, setPlacement] = useState<Placement>('top')
  const [open, setOpen] = useState(false)

  const pick = (next: Placement) => {
    // Close first so the popover re-measures from the new side
    setOpen(false)
    setPlacement(next)
    requestAnimationFrame(() => setOpen(true))
  }

  return (
    <ShowcaseSection
      icon={Compass}
      title="Placement"
      description="Pick any of the 12 placements — the popover flips and shifts to stay on screen"
    >
      <div className="card flex justify-center overflow-x-auto p-6! sm:p-10!">
        <div className="grid grid-cols-[repeat(5,auto)] grid-rows-[repeat(5,auto)] items-center justify-items-center gap-2 sm:gap-3">
          {ring.map(({ placement: p, area }) => (
            <button
              key={p}
              type="button"
              onClick={() => pick(p)}
              aria-pressed={placement === p && open}
              className={`${area} rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                placement === p && open
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-borderColor text-muted hover:bg-surface-hover/60 hover:text-foreground'
              }`}
              dir="ltr"
            >
              {p}
            </button>
          ))}

          <div className="col-span-3 col-start-2 row-span-3 row-start-2 flex size-full min-h-36 min-w-56 items-center justify-center rounded-2xl border border-dashed border-borderColor bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[12px_12px]">
            <Popover
              placement={placement}
              open={open}
              onOpenChange={setOpen}
              trigger={
                <button
                  type="button"
                  className="btn btn-primary shadow-lg shadow-primary/25"
                >
                  <MousePointerClick size={16} />
                  {t('Trigger')}
                </button>
              }
            >
              <div className="px-2.5 py-1.5">
                <p className="text-xs text-muted">{t('Placed on')}</p>
                <p
                  className="font-mono text-sm font-medium text-foreground"
                  dir="ltr"
                >
                  {placement}
                </p>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Behaviour                                                           */
/* ------------------------------------------------------------------ */

function BehaviourSection() {
  const { t } = useTranslation()
  const [controlledOpen, setControlledOpen] = useState(false)
  const [notify, setNotify] = useState(true)
  const [name, setName] = useState('Q3 roadmap')

  return (
    <ShowcaseSection
      icon={Settings}
      title="Behaviour"
      description="How it opens, when it closes, and who controls it"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard title="Trigger type" code='triggerType="click" | "hover"'>
          <div className="flex flex-wrap items-center gap-3">
            <Popover
              triggerType="click"
              trigger={
                <button type="button" className="btn btn-secondary">
                  {t('Click me')}
                </button>
              }
            >
              <p className="px-2.5 py-1.5 text-sm text-foreground">
                {t('Opens on click')}
              </p>
            </Popover>
            <Popover
              triggerType="hover"
              trigger={
                <button type="button" className="btn btn-secondary">
                  {t('Hover me')}
                </button>
              }
            >
              <p className="px-2.5 py-1.5 text-sm text-foreground">
                {t('Opens on hover')}
              </p>
            </Popover>
          </div>
        </DemoCard>

        <DemoCard
          title="Arrow"
          code="showArrow={false}"
          description="The arrow shares the panel's fill and border"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Popover
              placement="top"
              trigger={
                <button type="button" className="btn btn-secondary">
                  {t('With arrow')}
                </button>
              }
            >
              <p className="px-2.5 py-1.5 text-sm text-foreground">
                {t('Points back at the trigger')}
              </p>
            </Popover>
            <Popover
              placement="top"
              showArrow={false}
              trigger={
                <button type="button" className="btn btn-secondary">
                  {t('Without arrow')}
                </button>
              }
            >
              <p className="px-2.5 py-1.5 text-sm text-foreground">
                {t('Cleaner, no pointer')}
              </p>
            </Popover>
          </div>
        </DemoCard>

        <DemoCard
          title="Menu"
          code='closeOn="select"'
          description="Choosing an item closes it — blank space doesn't"
        >
          <Popover
            closeOn="select"
            trigger={
              <button type="button" className="btn btn-secondary">
                <Ellipsis size={16} />
                {t('Actions')}
              </button>
            }
          >
            <div className="flex min-w-44 flex-col gap-y-0.5" role="menu">
              <button
                type="button"
                role="menuitem"
                className={`${menuItem} text-foreground hover:bg-surface-hover`}
              >
                <Pencil size={15} />
                {t('Rename')}
              </button>
              <button
                type="button"
                role="menuitem"
                className={`${menuItem} text-foreground hover:bg-surface-hover`}
              >
                <Copy size={15} />
                {t('Duplicate')}
              </button>
              <div className="my-1 h-px bg-borderColor" />
              <button
                type="button"
                role="menuitem"
                className={`${menuItem} text-danger hover:bg-danger/10`}
              >
                <Trash2 size={15} />
                {t('Delete')}
              </button>
            </div>
          </Popover>
        </DemoCard>

        <DemoCard
          title="Form"
          code='closeOn="outside"'
          description="Stays open while you type and tick — closes on outside click"
        >
          <Popover
            closeOn="outside"
            trigger={
              <button type="button" className="btn btn-secondary">
                <Pencil size={15} />
                {t('Edit')} “{name}”
              </button>
            }
          >
            <form
              className="flex w-60 flex-col gap-y-3 p-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="flex flex-col gap-y-1.5 text-xs font-medium text-muted">
                {t('Name')}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </label>
              <label className="flex cursor-pointer items-center gap-x-2 text-sm text-foreground">
                <CheckBox
                  checked={notify}
                  onChange={() => setNotify((v) => !v)}
                />
                {t('Notify followers')}
              </label>
            </form>
          </Popover>
        </DemoCard>

        <DemoCard
          title="Controlled"
          code="open / onOpenChange"
          description="Open and close it from outside the popover"
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Popover
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              closeOn="outside"
              trigger={
                <button type="button" className="btn btn-secondary">
                  {t('Trigger')}
                </button>
              }
            >
              <div className="flex flex-col gap-y-2 p-2">
                <p className="text-sm text-foreground">
                  {t('Opened from outside')}
                </p>
                <button
                  type="button"
                  onClick={() => setControlledOpen(false)}
                  className="btn btn-primary btn-sm"
                >
                  {t('Close from inside')}
                </button>
              </div>
            </Popover>
            <button
              type="button"
              onClick={() => setControlledOpen((prev) => !prev)}
              className="btn btn-primary-outline"
            >
              {t(controlledOpen ? 'Close externally' : 'Open externally')}
            </button>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                controlledOpen
                  ? 'bg-success/10 text-success'
                  : 'bg-surface-hover text-muted'
              }`}
            >
              open = {String(controlledOpen)}
            </span>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Real-world examples                                                 */
/* ------------------------------------------------------------------ */

function ExamplesSection() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const link = 'https://brash.app/share/q3-roadmap'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      // Clipboard can be blocked (insecure origin) — the feedback still shows
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="Popovers you would actually ship"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard title="User menu" code='placement="bottom-start"'>
          <Popover
            placement="bottom-start"
            trigger={
              <button
                type="button"
                className="flex items-center gap-x-2.5 rounded-full border border-borderColor py-1 ps-1 pe-3 transition-colors hover:bg-surface-hover/60"
              >
                <img
                  src={Avatar13}
                  alt=""
                  className="size-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-foreground">
                  Hamed
                </span>
                <ChevronDown size={14} className="text-muted" />
              </button>
            }
          >
            <div className="w-56">
              <div className="flex items-center gap-x-3 border-b border-borderColor px-2.5 pt-1.5 pb-3">
                <img
                  src={Avatar13}
                  alt=""
                  className="size-9 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Hamed Fazeli
                  </p>
                  <p className="truncate text-xs text-muted">
                    hamed@example.com
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-0.5 pt-1" role="menu">
                {[
                  { icon: UserRound, label: 'Profile' },
                  { icon: CreditCard, label: 'Billing' },
                  { icon: Settings, label: 'Settings' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    role="menuitem"
                    className={`${menuItem} text-foreground hover:bg-surface-hover`}
                  >
                    <Icon size={15} className="text-muted" />
                    {t(label)}
                  </button>
                ))}
                <div className="my-1 h-px bg-borderColor" />
                <button
                  type="button"
                  role="menuitem"
                  className={`${menuItem} text-danger hover:bg-danger/10`}
                >
                  <LogOut size={15} />
                  {t('Sign out')}
                </button>
              </div>
            </div>
          </Popover>
        </DemoCard>

        <DemoCard title="Share link" code='closeOn="outside"'>
          <Popover
            closeOn="outside"
            placement="bottom-start"
            trigger={
              <button type="button" className="btn btn-primary">
                <Share2 size={15} />
                {t('Share')}
              </button>
            }
          >
            <div className="flex w-72 flex-col gap-y-3 p-2">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t('Share this project')}
                </p>
                <p className="text-xs text-muted">
                  {t('Anyone with the link can view')}
                </p>
              </div>
              <div className="flex items-center gap-x-2 rounded-lg border border-borderColor bg-surface/50 py-1 ps-2.5 pe-1">
                <Link2 size={14} className="shrink-0 text-muted" />
                <span
                  className="min-w-0 flex-1 truncate font-mono text-xs text-foreground"
                  dir="ltr"
                >
                  {link}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className={`btn btn-sm shrink-0 ${copied ? 'btn-success' : 'btn-secondary'}`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {t(copied ? 'Copied' : 'Copy')}
                </button>
              </div>
            </div>
          </Popover>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function PopoverShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Popovers"
        description="Floating panels built on Floating UI — any placement, click or hover, with flip, shift and an optional arrow."
        code='<Popover trigger={<button />} placement="bottom-start" closeOn="outside" />'
        stats={[
          { value: 12, label: 'Placements' },
          { value: 2, label: 'Triggers' },
          { value: 3, label: 'Close modes' },
        ]}
      />
      <PlacementSection />
      <BehaviourSection />
      <ExamplesSection />
    </div>
  )
}

export default PopoverShowCase
