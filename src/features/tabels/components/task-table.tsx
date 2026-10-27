import { useState, type SetStateAction } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
} from '@tanstack/react-table'
// import { columns, selectColumn } from './components/table-columns'

import Pagination from '#/components/pagination'
import { defaultData } from '../data/task'
import { useTranslation } from 'react-i18next'
import CheckBox from '#/components/checkbox'
import {
  actionsColumn,
  columns,
  priorityIcon,
  selectColumn,
  statusIcon,
} from './task-columns'
import ActionColumn from './action-column'
import { useTask } from './task-provider'
import TableToolbar from './table-toolbar'
import TableBulkAction from './table-bulk-action'

const TaskTable = () => {
  const {
    globalFilter,
    setGlobalFilter,
    sorting,
    setSorting,
    setColumnVisibility,
    columnVisibility,
    rowSelection,
    setRowSelection,
  } = useTask()
  const { t } = useTranslation()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data: defaultData,
    columns: [selectColumn, ...columns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      globalFilter,
      pagination,
      sorting,
      columnVisibility,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    // search
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase()
      return Object.keys(row.original as object).some((key) => {
        const value = row.getValue(key)
        return value != null && String(value).toLowerCase().includes(search)
      })
    },
    getFilteredRowModel: getFilteredRowModel(),
    // pagination
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),

    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    //visible
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  })

  const { pageIndex, pageSize } = table.getState().pagination

  const handelChangePageSize = (page: number) => {
    table.setPageSize(page)
  }
  const rows = table.getRowModel().rows
  const isVisible = (columnId: string) =>
    table.getColumn(columnId)?.getIsVisible() ?? true
  return (
    <div>
      <TableToolbar table={table} />
      <div className="table-wrapper">
        {/* Phones: one card per row instead of a sideways-scrolling table */}
        <div className="sm:hidden">
          <div className="flex items-center gap-x-2 border-b border-borderColor bg-surface px-4 py-2.5">
            <CheckBox
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              isIndeterminate={table.getIsSomePageRowsSelected()}
              rounded
              aria-label={t('Select all rows')}
            />
            <span className="text-sm font-medium text-foreground">
              {t('Select all')}
            </span>
          </div>
          {rows.length === 0 ? (
            <div className="table-empty-state">{t('No results found.')}</div>
          ) : (
            <ul>
              {rows.map((row) => {
                const task = row.original
                return (
                  <li
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className="table-body-row flex gap-x-3 px-4 py-3"
                  >
                    <div className="pt-0.5">
                      <CheckBox
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        rounded
                        aria-label={t('Select row')}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-y-2">
                      <div className="flex items-center justify-between gap-x-2">
                        <div className="flex min-w-0 items-center gap-x-2">
                          {isVisible('id') && (
                            <span className="text-system font-medium whitespace-nowrap text-muted">
                              {task.id}
                            </span>
                          )}
                          <span className="shrink-0 whitespace-nowrap text-xs px-2 font-medium border border-dashed border-borderColor rounded-xl text-foreground">
                            {t(task.label)}
                          </span>
                        </div>
                        <ActionColumn row={row} />
                      </div>
                      {isVisible('title') && (
                        <p className="line-clamp-2 text-system font-medium text-foreground">
                          {task.title}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-system text-foreground">
                        {isVisible('priority') && (
                          <span className="flex items-center gap-x-1.5">
                            <span className="text-muted">
                              {priorityIcon[task.priority]}
                            </span>
                            {t(task.priority)}
                          </span>
                        )}
                        {isVisible('status') && (
                          <span className="flex items-center gap-x-1.5">
                            <span className="text-muted">
                              {statusIcon[task.status]}
                            </span>
                            {t(task.status)}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <table className="hidden w-full text-left text-sm sm:table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="table-header-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    style={{
                      width:
                        header.getSize() !== 0 ? header.getSize() : undefined,
                    }}
                    className="table-header-cell"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllColumns().length}>
                  <div className="table-empty-state">{t('No results found.')}</div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="table-body-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="table-body-cell"
                      style={{
                        width:
                          cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined,
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between py-4 px-4 sm:px-5 border-t border-borderColor">
          <Pagination
            currentPage={pageIndex + 1}
            totalPages={Math.max(table.getPageCount(), 1)}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            perPage={pageSize}
            setPerPage={handelChangePageSize}
            siblingCount={0}
          />
        </div>
      </div>
      <TableBulkAction
        rowSelection={table.getState().rowSelection}
        setRowSelection={(updater) => table.setRowSelection(updater)}
        onArchive={(ids) => console.log('archive', ids)}
        onDelete={(ids) => console.log('delete', ids)}
        onExport={(ids) => console.log('export', ids)}
      />
    </div>
  )
}

export default TaskTable
