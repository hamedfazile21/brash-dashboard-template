import {
  Bold,
  CircleHelp,
  Compass,
  Italic,
  Link2,
  MessageSquareText,
  Palette,
  Sparkles,
  Timer,
  Underline,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '#/components/tooltip'
import type { TooltipVariant } from '#/components/tooltip'
import type { Placement } from '#/components/popover'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'
import { Avatar10, Avatar11, Avatar12, Avatar13 } from '../../../assets'

const variants: { key: TooltipVariant; label: string; dot: string }[] = [
  { key: 'secondary', label: 'Secondary', dot: 'bg-muted' },
  { key: 'primary', label: 'Primary', dot: 'bg-primary' },
  { key: 'success', label: 'Success', dot: 'bg-success' },
  { key: 'danger', label: 'Danger', dot: 'bg-danger' },
  { key: 'info', label: 'Info', dot: 'bg-info' },
  { key: 'warning', label: 'Warning', dot: 'bg-warning' },
]

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

function VariantsSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Palette}
      title="Variants"
      description="A neutral default and five semantic colors — hover or focus a chip"
    >
      <div className="card flex flex-wrap items-center justify-center gap-3 p-6!">
        {variants.map(({ key, label, dot }) => (
          <Tooltip
            key={key}
            variant={key}
            content={t('{{name}} tooltip', { name: t(label) })}
          >
            <button
              type="button"
              className="flex items-center gap-x-2 rounded-full border border-borderColor px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover/60"
            >
              <span className={`size-2 rounded-full ${dot}`} />
              {t(label)}
            </button>
          </Tooltip>
        ))}
      </div>
    </ShowcaseSection>
  )
}

function PlacementSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Compass}
      title="Placement"
      description="Each button shows its tooltip on that side — it flips if there is no room"
    >
      <div className="card flex justify-center overflow-x-auto p-6! sm:p-10!">
        <div className="grid grid-cols-[repeat(5,auto)] grid-rows-[repeat(5,auto)] items-center justify-items-center gap-2 sm:gap-3">
          {ring.map(({ placement, area }) => (
            <Tooltip
              key={placement}
              placement={placement}
              variant="primary"
              content={placement}
            >
              <button
                type="button"
                className={`${area} rounded-lg border border-borderColor px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary`}
                dir="ltr"
              >
                {placement}
              </button>
            </Tooltip>
          ))}
          <div className="col-span-3 col-start-2 row-span-3 row-start-2 flex size-full min-h-32 min-w-52 items-center justify-center rounded-2xl border border-dashed border-borderColor bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[12px_12px] text-xs text-muted">
            {t('Hover a placement')}
          </div>
        </div>
      </div>
    </ShowcaseSection>
  )
}

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="rounded border border-white/25 bg-white/15 px-1 font-mono text-[10px]">
      {children}
    </kbd>
  )
}

function ContentSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={MessageSquareText}
      title="Content & timing"
      description="Tooltips can carry more than a word — and wait before they appear"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard title="Rich content" code="content={<JSX />}">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip
              content={
                <span className="flex flex-col gap-y-0.5 py-0.5">
                  <span className="font-semibold">{t('Auto-save is on')}</span>
                  <span className="text-xs font-normal text-muted">
                    {t('Changes are saved every few seconds.')}
                  </span>
                </span>
              }
            >
              <button type="button" className="btn btn-secondary">
                {t('Title + description')}
              </button>
            </Tooltip>
            <Tooltip
              variant="primary"
              content={
                <span className="flex items-center gap-x-2">
                  {t('Bold')} <Kbd>Ctrl</Kbd>
                  <Kbd>B</Kbd>
                </span>
              }
            >
              <button
                type="button"
                aria-label={t('Bold')}
                className="btn btn-secondary btn-icon"
              >
                <Bold size={16} />
              </button>
            </Tooltip>
          </div>
        </DemoCard>

        <DemoCard
          title="Long text"
          code="max-w-xs"
          description="Wraps instead of stretching across the page"
        >
          <Tooltip
            content={t(
              'Archived projects stay searchable and can be restored at any time from the archive page. Members keep read-only access.',
            )}
          >
            <button type="button" className="btn btn-secondary">
              {t('What does archiving do?')}
            </button>
          </Tooltip>
        </DemoCard>

        <DemoCard
          title="Delay"
          code="delay={0 | 150 | 600}"
          description="Longer delays avoid flicker on quick mouse passes"
        >
          <div className="flex flex-wrap items-center gap-3">
            {[0, 150, 600].map((delay) => (
              <Tooltip
                key={delay}
                delay={delay}
                content={t('Opened after {{ms}} ms', { ms: delay })}
              >
                <button type="button" className="btn btn-secondary">
                  <Timer size={15} />
                  {delay} ms
                </button>
              </Tooltip>
            ))}
          </div>
        </DemoCard>

        <DemoCard
          title="Disabled"
          code="disabled"
          description="Turn a tooltip off without removing it"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip disabled content={t('You will not see this')}>
              <button type="button" className="btn btn-secondary">
                {t('No tooltip here')}
              </button>
            </Tooltip>
            <Tooltip content={t('Focus works too — try Tab')}>
              <button type="button" className="btn btn-secondary">
                {t('Keyboard friendly')}
              </button>
            </Tooltip>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const team = [
  { name: 'Hamed Fazeli', avatar: Avatar13 },
  { name: 'Sara Ahmadi', avatar: Avatar10 },
  { name: 'Kian Rostami', avatar: Avatar11 },
  { name: 'Nina Karimi', avatar: Avatar12 },
]

function InContextSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="Where tooltips earn their place"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard
          title="Icon toolbar"
          description="Name every icon-only button"
        >
          <div className="btn-group">
            {[
              { icon: Bold, label: 'Bold', keys: 'Ctrl B' },
              { icon: Italic, label: 'Italic', keys: 'Ctrl I' },
              { icon: Underline, label: 'Underline', keys: 'Ctrl U' },
              { icon: Link2, label: 'Insert link', keys: 'Ctrl K' },
            ].map(({ icon: Icon, label, keys }) => (
              <Tooltip
                key={label}
                content={
                  <span className="flex items-center gap-x-2">
                    {t(label)}
                    <span
                      className="font-mono text-[10px] text-muted"
                      dir="ltr"
                    >
                      {keys}
                    </span>
                  </span>
                }
              >
                <button
                  type="button"
                  aria-label={t(label)}
                  className="btn btn-secondary btn-icon"
                >
                  <Icon size={16} />
                </button>
              </Tooltip>
            ))}
          </div>
        </DemoCard>

        <DemoCard
          title="Avatar stack"
          description="Names on hover, faces at rest"
        >
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {team.map(({ name, avatar }) => (
              <Tooltip key={name} content={name}>
                <button
                  type="button"
                  aria-label={name}
                  className="rounded-full ring-2 ring-surface transition-transform hover:z-10 hover:-translate-y-0.5"
                >
                  <img
                    src={avatar}
                    alt=""
                    className="size-9 rounded-full bg-surface object-cover"
                  />
                </button>
              </Tooltip>
            ))}
            <Tooltip content={t('and 8 more')}>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-full bg-surface-hover text-xs font-semibold text-muted ring-2 ring-surface"
              >
                +8
              </button>
            </Tooltip>
          </div>
        </DemoCard>

        <DemoCard
          title="Truncated text"
          description="Reveal the full value without widening the layout"
        >
          <Tooltip content="design-system/components/navigation/sidebar-collapsible.tsx">
            <span
              tabIndex={0}
              className="block max-w-56 truncate rounded-md bg-surface-hover/60 px-2.5 py-1.5 font-mono text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              dir="ltr"
            >
              design-system/components/navigation/sidebar-collapsible.tsx
            </span>
          </Tooltip>
        </DemoCard>

        <DemoCard
          title="Field help"
          description="Explain a setting right where it is"
        >
          <label className="flex flex-col gap-y-1.5">
            <span className="flex items-center gap-x-1.5 text-sm font-medium text-foreground">
              {t('Webhook URL')}
              <Tooltip
                content={t(
                  'We send a POST request here whenever a task changes.',
                )}
              >
                <button
                  type="button"
                  aria-label={t('Help')}
                  className="text-muted transition-colors hover:text-primary"
                >
                  <CircleHelp size={15} />
                </button>
              </Tooltip>
            </span>
            <input
              className="input"
              placeholder="https://example.com/hooks/tasks"
              dir="ltr"
            />
          </label>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function TooltipsShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Tooltips"
        description="Short hints on hover and keyboard focus — six colors, twelve placements, with flip and shift built in."
        code='<Tooltip content="Save" placement="top" variant="primary"><button /></Tooltip>'
        stats={[
          { value: 6, label: 'Variants' },
          { value: 12, label: 'Placements' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <VariantsSection />
      <PlacementSection />
      <ContentSection />
      <InContextSection />
    </div>
  )
}

export default TooltipsShowCase
