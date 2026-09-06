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
import { columns, selectColumn } from './task-columns'
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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data: defaultData,
    columns: [selectColumn, ...columns],
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
  return (
    <div>
      <TableToolbar table={table} />
      <div className="table-wrapper">
        <table className="w-full text-left text-sm">
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllColumns().length}>
                  <div className="table-empty-state">No results found.</div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
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
        <div className="flex items-center justify-between py-4 px-5 border-t border-borderColor">
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
