import Pagination from '#/components/pagination'
import { useState } from 'react'

function PaginationShowCase() {
  const [page1, setPage1] = useState(4)
  const [page2, setPage2] = useState(4)
  const [page3, setPage3] = useState(4)
  const [page4, setPage4] = useState(4)
  const [page5, setPage5] = useState(3)
  const [perPage, setPerPage] = useState(10)

  return (
    <div className="">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Pagination</h1>
        <p className="mt-1 text-sm text-muted">
          One component, driven by{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            variant
          </code>
          ,{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            rounded
          </code>
          , and{' '}
          <code className="rounded bg-surface-hover px-1 py-0.5 text-xs">
            grouped
          </code>
          .
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-8">
        {/* Default */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Default{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="primary"
            </span>
          </p>
          <Pagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </section>

        {/* Outline */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Outline{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              variant="outline"
            </span>
          </p>
          <Pagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            variant="outline"
          />
        </section>

        {/* Rounded full */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Rounded full{' '}
            <span className="ml-2 text-xs font-normal text-muted">
              rounded="full"
            </span>
          </p>
          <Pagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            rounded="full"
          />
        </section>

        {/* Grouped */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Grouped{' '}
            <span className="ml-2 text-xs font-normal text-muted">grouped</span>
          </p>
          <Pagination
            currentPage={page4}
            totalPages={10}
            onPageChange={setPage4}
            grouped
          />
        </section>

        {/* Grouped + outline + rounded full, plus the rows-per-page selector */}
        <section className="card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Grouped + Outline + Rounded full
            <span className="ml-2 text-xs font-normal text-muted">
              grouped variant="outline" rounded="full"
            </span>
          </p>
          <Pagination
            currentPage={page5}
            totalPages={12}
            onPageChange={setPage5}
            grouped
            variant="outline"
            rounded="full"
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </section>
      </div>
    </div>
  )
}

export default PaginationShowCase
