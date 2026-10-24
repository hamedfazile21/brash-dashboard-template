import { useState } from 'react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Bold,
  Download,
  Heart,
  Italic,
  LayoutGrid,
  LoaderCircle,
  Maximize2,
  Plus,
  Send,
  Shapes,
  Trash2,
  Underline,
  Group,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'

const variants = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
]

function VariantsSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={LayoutGrid}
      title="Variants"
      description="Six colors, each as solid, outline and disabled"
    >
      <div className="card overflow-hidden p-0!">
        <div className="hidden grid-cols-[10rem_repeat(3,1fr)] border-b border-borderColor bg-surface-hover/40 px-5 py-2.5 text-[11px] font-semibold tracking-wider text-muted uppercase sm:grid">
          <span>{t('Variant')}</span>
          <span>{t('Solid')}</span>
          <span>{t('Outline')}</span>
          <span>{t('Disabled')}</span>
        </div>
        {variants.map(({ key, label }) => (
          <div
            key={key}
            className="grid grid-cols-2 items-center gap-3 border-b border-borderColor px-5 py-3.5 last:border-b-0 sm:grid-cols-[10rem_repeat(3,1fr)]"
          >
            <span className="col-span-2 sm:col-span-1">
              <span className="block text-sm font-medium text-foreground">
                {t(label)}
              </span>
              <code dir="ltr" className="font-mono text-[11px] text-muted">
                .btn-{key}
              </code>
            </span>
            <span>
              <button type="button" className={`btn btn-${key}`}>
                {t(label)}
              </button>
            </span>
            <span>
              <button type="button" className={`btn btn-${key}-outline`}>
                {t(label)}
              </button>
            </span>
            <span className="hidden sm:block">
              <button type="button" className={`btn btn-${key}`} disabled>
                {t(label)}
              </button>
            </span>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  )
}

function ShapesSection() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)

  const fakeSubmit = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <ShowcaseSection
      icon={Shapes}
      title="Sizes, shapes & states"
      description="Scale, round, add icons and show progress"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard
          title="Sizes"
          code=".btn-sm | .btn-md | .btn-lg"
          description="Padding follows your Button padding setting"
        >
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary btn-sm">
              {t('Small')}
            </button>
            <button type="button" className="btn btn-primary btn-md">
              {t('Medium')}
            </button>
            <button type="button" className="btn btn-primary btn-lg">
              {t('Large')}
            </button>
            <span className="mx-1 h-6 w-px bg-borderColor" />
            <button
              type="button"
              aria-label={t('Add')}
              className="btn btn-secondary btn-icon btn-sm"
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              aria-label={t('Add')}
              className="btn btn-secondary btn-icon"
            >
              <Plus size={16} />
            </button>
            <button
              type="button"
              aria-label={t('Add')}
              className="btn btn-secondary btn-icon btn-lg"
            >
              <Plus size={18} />
            </button>
          </div>
        </DemoCard>

        <DemoCard
          title="Icons"
          code="<Icon /> + label"
          description="Leading, trailing or icon-only"
        >
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary">
              <Download size={16} />
              {t('Download')}
            </button>
            <button type="button" className="group btn btn-secondary">
              {t('Continue')}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </button>
            <button type="button" className="btn btn-danger-outline">
              <Trash2 size={16} />
              {t('Delete')}
            </button>
            <button
              type="button"
              aria-label={t('Like')}
              aria-pressed={liked}
              onClick={() => setLiked((v) => !v)}
              className={`btn btn-icon btn-rounded-full ${liked ? 'btn-danger' : 'btn-secondary'}`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </DemoCard>

        <DemoCard
          title="Rounded"
          code=".btn-rounded-full"
          description="Pill-shaped buttons and icon circles"
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-primary btn-rounded-full px-4"
            >
              {t('Get started')}
            </button>
            <button
              type="button"
              className="btn btn-success-outline btn-rounded-full px-4"
            >
              {t('Approve')}
            </button>
            <button
              type="button"
              aria-label={t('Fullscreen')}
              className="btn btn-secondary btn-icon btn-rounded-full"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </DemoCard>

        <DemoCard
          title="Loading"
          code='disabled aria-busy="true"'
          description="Click to see the button wait for a fake request"
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fakeSubmit}
              disabled={loading}
              aria-busy={loading}
              className="btn btn-primary min-w-32"
            >
              {loading ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  {t('Sending...')}
                </>
              ) : (
                <>
                  <Send size={16} className="rtl:-scale-x-100" />
                  {t('Send message')}
                </>
              )}
            </button>
            <button
              type="button"
              disabled
              aria-busy="true"
              className="btn btn-secondary"
            >
              <LoaderCircle size={16} className="animate-spin" />
              {t('Processing')}
            </button>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function GroupsSection() {
  const { t } = useTranslation()
  const [range, setRange] = useState('Week')
  const [align, setAlign] = useState('left')
  const [formats, setFormats] = useState<string[]>(['bold'])

  const toggleFormat = (format: string) =>
    setFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format],
    )

  return (
    <ShowcaseSection
      icon={Group}
      title="Groups"
      description="Joined buttons that share borders — they also join correctly in RTL"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <DemoCard
          title="Segmented"
          code=".btn-group"
          description="One choice at a time"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="btn-group" role="radiogroup">
              {['Day', 'Week', 'Month'].map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={range === option}
                  onClick={() => setRange(option)}
                  className={`btn ${range === option ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {t(option)}
                </button>
              ))}
            </div>
            <div className="btn-group btn-group-full" role="radiogroup">
              {[
                { value: 'left', icon: AlignLeft, label: 'Align left' },
                { value: 'center', icon: AlignCenter, label: 'Align center' },
                { value: 'right', icon: AlignRight, label: 'Align right' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={align === value}
                  aria-label={t(label)}
                  onClick={() => setAlign(value)}
                  className={`btn btn-icon btn-rounded-full ${align === value ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="Toolbar"
          code=".btn-group + aria-pressed"
          description="Several options can be on at once"
        >
          <div className="btn-group">
            {[
              { value: 'bold', icon: Bold, label: 'Bold' },
              { value: 'italic', icon: Italic, label: 'Italic' },
              { value: 'underline', icon: Underline, label: 'Underline' },
            ].map(({ value, icon: Icon, label }) => {
              const on = formats.includes(value)
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  aria-label={t(label)}
                  onClick={() => toggleFormat(value)}
                  className={`btn btn-icon ${on ? 'btn-primary-outline bg-primary/10!' : 'btn-secondary'}`}
                >
                  <Icon size={16} />
                </button>
              )
            })}
          </div>
        </DemoCard>

        <DemoCard
          title="Outline group"
          code=".btn-group > .btn-primary-outline"
        >
          <div className="btn-group">
            <button type="button" className="btn btn-primary-outline">
              {t('Previous')}
            </button>
            <button type="button" className="btn btn-primary-outline">
              {t('Today')}
            </button>
            <button type="button" className="btn btn-primary-outline">
              {t('Next')}
            </button>
          </div>
        </DemoCard>

        <DemoCard title="Vertical" code=".btn-group-vertical">
          <div className="btn-group-vertical w-44">
            <button type="button" className="btn btn-secondary">
              {t('Profile')}
            </button>
            <button type="button" className="btn btn-secondary">
              {t('Billing')}
            </button>
            <button type="button" className="btn btn-secondary">
              {t('Sign out')}
            </button>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function ButtonShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Buttons"
        description="Plain CSS classes, no wrapper component — combine a variant, a size and a shape on any <button>."
        code='<button className="btn btn-primary btn-sm btn-rounded-full" />'
        stats={[
          { value: 6, label: 'Variants' },
          { value: 3, label: 'Sizes' },
          { value: 3, label: 'Groups' },
        ]}
      />
      <VariantsSection />
      <ShapesSection />
      <GroupsSection />
    </div>
  )
}

export default ButtonShowCase
