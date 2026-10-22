import { ArrowRight, Check, LayoutTemplate, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useModal } from './modal-provider'
import type { ModalDialogType } from './modal-provider'
import ShowcaseSection from './showcase-section'

type Pattern = Exclude<ModalDialogType, 'transition' | 'size'>

const patterns: { value: Pattern; title: string; description: string }[] = [
  {
    value: 'basic',
    title: 'Basic',
    description: 'Title, body and a single acknowledging action.',
  },
  {
    value: 'confirmation',
    title: 'Confirmation',
    description: 'Destructive action guarded by type-to-confirm.',
  },
  {
    value: 'form',
    title: 'Form',
    description: 'Validated fields with Cancel and Save in the footer.',
  },
  {
    value: 'top',
    title: 'Top-anchored',
    description: 'Opens near the top — quick create, Enter to submit.',
  },
  {
    value: 'success',
    title: 'Success',
    description: 'No title bar — fully custom, centered content.',
  },
  {
    value: 'drawer',
    title: 'Drawer',
    description: 'Full-height side panel that slides in from the edge.',
  },
  {
    value: 'scroll',
    title: 'Scrollable',
    description:
      'Long content with a pinned footer; accept unlocks at the end.',
  },
]

/* Tiny line placeholders used inside the previews */
function Line({ className = '' }: { className?: string }) {
  return <span className={`block h-1 rounded-full bg-muted/30 ${className}`} />
}

function Btn({ className = '' }: { className?: string }) {
  return <span className={`block h-2 w-6 rounded-sm ${className}`} />
}

/** Miniature drawing of each dialog pattern, built from divs */
function PatternPreview({ pattern }: { pattern: Pattern }) {
  const panel =
    'flex flex-col gap-1.5 rounded-lg border border-borderColor bg-surface p-2 shadow-lg shadow-black/10'

  switch (pattern) {
    case 'basic':
      return (
        <div className={`${panel} w-[62%]`}>
          <Line className="w-1/2 bg-foreground/40" />
          <Line className="w-full" />
          <Line className="w-4/5" />
          <span className="mt-1 flex justify-end">
            <Btn className="bg-primary" />
          </span>
        </div>
      )
    case 'confirmation':
      return (
        <div className={`${panel} w-[52%] items-center`}>
          <span className="flex size-4 items-center justify-center rounded-full bg-danger/15 text-danger">
            <TriangleAlert size={9} />
          </span>
          <Line className="w-2/3 bg-foreground/40" />
          <span className="h-2 w-full rounded-sm border border-danger/40" />
          <span className="flex w-full gap-1">
            <Btn className="flex-1 bg-muted/25" />
            <Btn className="flex-1 bg-danger" />
          </span>
        </div>
      )
    case 'form':
      return (
        <div className={`${panel} w-[62%]`}>
          <Line className="w-1/3 bg-foreground/40" />
          <span className="h-2.5 rounded-sm border border-borderColor bg-background" />
          <span className="h-2.5 rounded-sm border border-primary/60 bg-background" />
          <span className="mt-0.5 flex justify-end gap-1">
            <Btn className="bg-muted/25" />
            <Btn className="bg-primary" />
          </span>
        </div>
      )
    case 'top':
      return (
        <div className="flex h-full w-full justify-center pt-1">
          <div className={`${panel} h-fit w-[58%]`}>
            <span className="flex h-2.5 items-center gap-1 rounded-sm border border-primary/60 bg-background px-1">
              <span className="h-1 w-1/2 rounded-full bg-muted/40" />
            </span>
            <span className="flex justify-end">
              <Btn className="bg-primary" />
            </span>
          </div>
        </div>
      )
    case 'success':
      return (
        <div className={`${panel} w-[48%] items-center py-3`}>
          <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success ring-4 ring-success/10">
            <Check size={11} strokeWidth={3} />
          </span>
          <Line className="w-2/3 bg-foreground/40" />
          <Line className="w-1/2" />
          <Btn className="w-full bg-primary" />
        </div>
      )
    case 'drawer':
      return (
        <div className="flex h-full w-full justify-end">
          <div className="flex w-[42%] flex-col gap-1.5 rounded-s-lg border-s border-borderColor bg-surface p-2 shadow-lg shadow-black/10">
            <Line className="w-2/3 bg-foreground/40" />
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="size-2 shrink-0 rounded-full bg-primary/40" />
                <Line className="flex-1" />
              </span>
            ))}
          </div>
        </div>
      )
    case 'scroll':
      return (
        <div className={`${panel} relative w-[58%]`}>
          <Line className="w-1/2 bg-foreground/40" />
          {['w-full', 'w-11/12', 'w-full', 'w-4/5'].map((width, i) => (
            <Line key={i} className={`me-2 ${width}`} />
          ))}
          <span className="absolute inset-e-1 top-4 h-6 w-0.5 rounded-full bg-primary/60" />
          <span className="flex justify-end border-t border-borderColor pt-1">
            <Btn className="bg-primary" />
          </span>
        </div>
      )
  }
}

function PatternsSection() {
  const { t } = useTranslation()
  const { openModal } = useModal()

  return (
    <ShowcaseSection
      icon={LayoutTemplate}
      title="Patterns"
      description="Ready-made dialogs for the situations you meet most"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {patterns.map(({ value, title, description }) => (
          <button
            key={value}
            type="button"
            onClick={() => openModal(value)}
            className="card card-hover group flex flex-col p-0! text-start outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Preview stage — dotted backdrop like a design canvas */}
            <div className="relative flex aspect-16/9 items-center justify-center overflow-hidden rounded-t-xl border-b border-borderColor bg-background/60 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[12px_12px] p-3">
              <div className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <PatternPreview pattern={value} />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-1 p-4">
              <div className="flex items-center justify-between gap-x-2">
                <p className="text-sm font-semibold text-foreground">
                  {t(title)}
                </p>
                <ArrowRight
                  size={15}
                  className="-translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 rtl:translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-0"
                />
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {t(description)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ShowcaseSection>
  )
}

export default PatternsSection
