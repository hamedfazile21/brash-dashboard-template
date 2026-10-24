import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  ListOrdered,
  LoaderCircle,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Pagination from '#/components/pagination'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'

const styles: {
  title: string
  code: string
  props: {
    variant?: 'primary' | 'outline'
    rounded?: 'md' | 'full'
    grouped?: boolean
  }
}[] = [
  { title: 'Default', code: 'variant="primary"', props: {} },
  {
    title: 'Outline',
    code: 'variant="outline"',
    props: { variant: 'outline' },
  },
  { title: 'Rounded', code: 'rounded="full"', props: { rounded: 'full' } },
  { title: 'Grouped', code: 'grouped', props: { grouped: true } },
  {
    title: 'Grouped outline pill',
    code: 'grouped variant="outline" rounded="full"',
    props: { grouped: true, variant: 'outline', rounded: 'full' },
  },
]

function StyleDemo({ props }: { props: (typeof styles)[number]['props'] }) {
  const [page, setPage] = useState(4)
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      {...props}
    />
  )
}

function StylesSection() {
  return (
    <ShowcaseSection
      icon={ListOrdered}
      title="Styles"
      description="Combine variant, rounded and grouped — each demo keeps its own page"
    >
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        {styles.map(({ title, code, props }) => (
          <DemoCard key={title} title={title} code={code}>
            <StyleDemo props={props} />
          </DemoCard>
        ))}
      </div>
    </ShowcaseSection>
  )
}

const TOTAL_ROWS = 248

function TableFooterDemo() {
  const { t } = useTranslation()
  const [page, setPage] = useState(4)
  const [perPage, setPerPage] = useState(10)
  const totalPages = Math.ceil(TOTAL_ROWS / perPage)
  const safePage = Math.min(page, totalPages)
  const from = (safePage - 1) * perPage + 1
  const to = Math.min(safePage * perPage, TOTAL_ROWS)

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-sm text-muted">
        {t('Showing')}{' '}
        <span className="font-semibold text-foreground tabular-nums">
          {from}–{to}
        </span>{' '}
        {t('of')}{' '}
        <span className="font-semibold text-foreground tabular-nums">
          {TOTAL_ROWS}
        </span>{' '}
        {t('results')}
      </p>
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
        perPage={perPage}
        setPerPage={(next) => {
          setPerPage(next)
          setPage(1)
        }}
        variant="outline"
      />
    </div>
  )
}

function SimplePagerDemo() {
  const { t } = useTranslation()
  const [page, setPage] = useState(3)
  const total = 12

  return (
    <nav
      aria-label={t('Pagination')}
      className="flex items-center justify-between gap-3"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="btn btn-secondary"
      >
        <ArrowLeft size={15} className="rtl:rotate-180" />
        {t('Previous')}
      </button>
      <span className="text-sm text-muted">
        {t('Page')}{' '}
        <span className="font-semibold text-foreground tabular-nums">
          {page}
        </span>{' '}
        {t('of')} <span className="tabular-nums">{total}</span>
      </span>
      <button
        type="button"
        disabled={page === total}
        onClick={() => setPage((p) => p + 1)}
        className="btn btn-secondary"
      >
        {t('Next')}
        <ArrowRight size={15} className="rtl:rotate-180" />
      </button>
    </nav>
  )
}

function LoadMoreDemo() {
  const { t } = useTranslation()
  const total = 48
  const [shown, setShown] = useState(12)
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setShown((s) => Math.min(total, s + 12))
      setLoading(false)
    }, 700)
  }

  return (
    <div className="flex flex-col items-center gap-y-3 text-center">
      <p className="text-sm text-muted">
        {t('Showing {{shown}} of {{total}} projects', { shown, total })}
      </p>
      <div
        role="progressbar"
        aria-valuenow={shown}
        aria-valuemin={0}
        aria-valuemax={total}
        className="h-1.5 w-48 overflow-hidden rounded-full bg-surface-hover"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${(shown / total) * 100}%` }}
        />
      </div>
      {shown < total ? (
        <button
          type="button"
          onClick={loadMore}
          disabled={loading}
          aria-busy={loading}
          className="btn btn-secondary btn-rounded-full px-5"
        >
          {loading && <LoaderCircle size={15} className="animate-spin" />}
          {t(loading ? 'Loading...' : 'Load more')}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setShown(12)}
          className="btn btn-primary-outline btn-rounded-full px-5"
        >
          {t("You've reached the end — reset")}
        </button>
      )}
    </div>
  )
}

function PatternsSection() {
  return (
    <ShowcaseSection
      icon={Layers}
      title="Patterns"
      description="How paging looks inside real screens"
    >
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <DemoCard
          title="Table footer"
          code="perPage / setPerPage"
          description="Range summary, rows per page and pages together"
          className="xl:col-span-2"
        >
          <TableFooterDemo />
        </DemoCard>
        <DemoCard
          title="Previous / next"
          description="Compact pager for phones and feeds"
        >
          <SimplePagerDemo />
        </DemoCard>
        <DemoCard
          title="Load more"
          description="Append results instead of switching pages"
        >
          <LoadMoreDemo />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function PaginationShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Pagination"
        description="One component driven by variant, rounded and grouped — with an optional rows-per-page menu. Arrows and groups mirror in RTL."
        code='<Pagination currentPage totalPages onPageChange variant="outline" grouped />'
        stats={[
          { value: 5, label: 'Styles' },
          { value: 3, label: 'Patterns' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <StylesSection />
      <PatternsSection />
    </div>
  )
}

export default PaginationShowCase
