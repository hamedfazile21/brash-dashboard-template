import CheckBox from '#/components/checkbox'
import Input from '#/components/input'
import Popover from '#/components/popover'
import type { Table } from '@tanstack/react-table'
import {
  LoaderCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTask } from './task-provider'
import type { Task } from '..'
import { priorityIcon, statusIcon } from './task-columns'

const statusOptions = [
  'Backlog',
  'Todo',
  'In Progress',
  'Done',
  'Canceled',
] as const

const priorityOptions = ['Low', 'Medium', 'High', 'Critical'] as const

interface TableToolbarProps {
  table: Table<Task>
}

const TableToolbar = ({ table }: TableToolbarProps) => {
  const { t } = useTranslation()
  const { setGlobalFilter, globalFilter } = useTask()
  const [statusSearch, setStatusSearch] = useState('')
  const [prioritySearch, setPrioritySearch] = useState('')
  const [searchValue, setSearchValue] = useState(globalFilter)
  const isSearching = searchValue !== globalFilter

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setGlobalFilter(searchValue)
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [searchValue, setGlobalFilter])
  const selectedStatuses =
    (table.getColumn('status')?.getFilterValue() as string[] | undefined) ?? []
  const statusCounts = table
    .getPreFilteredRowModel()
    .rows.reduce<Record<string, number>>((counts, row) => {
      const status = String(row.getValue('status'))
      counts[status] = (counts[status] ?? 0) + 1
      return counts
    }, {})
  const visibleStatuses = statusOptions.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase()),
  )
  const selectedPriorities =
    (table.getColumn('priority')?.getFilterValue() as string[] | undefined) ??
    []
  const priorityCounts = table
    .getPreFilteredRowModel()
    .rows.reduce<Record<string, number>>((counts, row) => {
      const priority = String(row.getValue('priority'))
      counts[priority] = (counts[priority] ?? 0) + 1
      return counts
    }, {})
  const visiblePriorities = priorityOptions.filter((priority) =>
    priority.toLowerCase().includes(prioritySearch.toLowerCase()),
  )

  const removeFilters = () => {
    table.getColumn('status')?.setFilterValue([])
    table.getColumn('priority')?.setFilterValue([])
  }

  return (
    <div className="flex items-center justify-between border-b border-borderColor p-4">
      <div className="flex items-center gap-x-2">
        <div className="relative w-64">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="py-1.5! pr-9"
            type="text"
            placeholder={t('Search Task ...')}
            aria-busy={isSearching}
          />
          {isSearching && (
            <LoaderCircle
              size={16}
              aria-label="Searching"
              className="pointer-events-none absolute top-1/2 ltr:right-3 rtl:left-3 -translate-y-1/2 animate-spin text-muted"
            />
          )}
        </div>

        <Popover
          className="w-48 p-1!"
          trigger={
            <button className="btn btn-secondary py-1.5! border-dashed">
              <span>
                <Sparkles size={17} className="text-muted" />
              </span>
              <span className="font-medium">{t('Status')}</span>
              {selectedStatuses.length > 0 && (
                <div className="border-l border-borderColor h-5" />
              )}
              {selectedStatuses.length >= 3 ? (
                <span className="text-xs bg-muted/20 rounded-lg px-2 py-0.5 w-20">
                  {selectedStatuses.length} {t('Selected')}
                </span>
              ) : (
                selectedStatuses.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`text-xs bg-muted/20 rounded-lg px-2 py-0.5 ${item === 'In Progress' ? 'w-24' : 'w-fit'}`}
                    >
                      {item}
                    </span>
                  )
                })
              )}
            </button>
          }

          placement="bottom-start"
          closeOn="outside"
        >
          <div className="flex flex-col gap-y-1 ">
            <div className="px-3 py-2 border-b border-borderColor relative">
              <Search
                size={17}
                className="text-muted absolute ltr:right-2 rtl:left-2 top-3"
              />
              <input
                className="border-0 w-34.5 outline-none text-system text-foreground"
                placeholder={t('Search...')}
                value={statusSearch}
                onChange={(event) => setStatusSearch(event.target.value)}
              />
            </div>
            {visibleStatuses.length > 0 ? (
              <>
                {visibleStatuses.map((status) => {
                  const isSelected = selectedStatuses.includes(status)

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        const nextStatuses = isSelected
                          ? selectedStatuses.filter((value) => value !== status)
                          : [...selectedStatuses, status]

                        table.getColumn('status')?.setFilterValue(nextStatuses)
                      }}
                      className="flex items-center gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-start text-system"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-1.5">
                          <CheckBox
                            size="sm"
                            checked={isSelected}
                            onChange={() => undefined}
                          />
                          <span className="text-muted">
                            {statusIcon[status]}
                          </span>
                          <span>{status}</span>
                        </div>
                        <div>
                          <p className="text-xs">{statusCounts[status] ?? 0}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
                {selectedStatuses.length > 0 && (
                  <div className="border-t border-borderColor p-1">
                    <button
                      type="button"
                      onClick={() =>
                        table.getColumn('status')?.setFilterValue([])
                      }
                      className="flex items-center gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-system"
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="p-2 text-system w-full text-center text-foreground">
                {t('No results found.')}
              </p>
            )}
          </div>
        </Popover>

        <Popover
          className="w-48 p-1!"
          trigger={
            <button className="btn btn-secondary py-1.5! border-dashed">
              <span>
                <Sparkles size={17} className="text-muted" />
              </span>
              <span className="font-medium">{t('Priority')}</span>

              {selectedPriorities.length > 0 && (
                <div className="border-l border-borderColor h-5" />
              )}
              {selectedPriorities.length >= 3 ? (
                <span className="text-xs bg-muted/20 rounded-lg px-2 py-0.5 w-20">
                  {selectedPriorities.length} {t('Selected')}
                </span>
              ) : (
                selectedPriorities.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`text-xs bg-muted/20 rounded-lg px-2 py-0.5 ${item === 'In Progress' ? 'w-24' : 'w-fit'}`}
                    >
                      {item}
                    </span>
                  )
                })
              )}
            </button>
          }
          placement="bottom-start"
          closeOn="outside"
        >
          <div className="flex flex-col gap-y-1">
            <div className="px-3 py-2 border-b border-borderColor relative">
              <Search
                size={17}
                className="text-muted absolute ltr:right-2 rtl:left-2 top-3"
              />
              <input
                className="border-0 w-34.5 outline-none text-system text-foreground"
                placeholder={t('Search...')}
                value={prioritySearch}
                onChange={(event) => setPrioritySearch(event.target.value)}
              />
            </div>
            {visiblePriorities.length > 0 ? (
              <>
                {visiblePriorities.map((priority) => {
                  const isSelected = selectedPriorities.includes(priority)

                  return (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => {
                        const nextPriorities = isSelected
                          ? selectedPriorities.filter(
                              (value) => value !== priority,
                            )
                          : [...selectedPriorities, priority]

                        table
                          .getColumn('priority')
                          ?.setFilterValue(nextPriorities)
                      }}
                      className="flex items-center justify-between gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-start text-system"
                    >
                      <span className="flex items-center gap-x-1.5">
                        <CheckBox
                          size="sm"
                          checked={isSelected}
                          onChange={() => undefined}
                        />
                        <span>{priorityIcon[priority]}</span>
                        <span>{priority}</span>
                      </span>
                      <span className="text-xs">
                        {priorityCounts[priority] ?? 0}
                      </span>
                    </button>
                  )
                })}
                {selectedPriorities.length > 0 && (
                  <div className="border-t border-borderColor p-1">
                    <button
                      type="button"
                      onClick={() =>
                        table.getColumn('priority')?.setFilterValue([])
                      }
                      className="flex items-center gap-x-1.5 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-system"
                    >
                      {t('Clear Filters')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="p-2 text-system w-full text-center text-foreground">
                {t('No results found.')}
              </p>
            )}
          </div>
        </Popover>
        {(selectedPriorities.length > 0 || selectedStatuses.length > 0) && (
          <div className="">
            <button
              onClick={removeFilters}
              className="text-system font-medium ms-5 flex items-center gap-x-1"
            >
              <span>{t('Reset')}</span>
              <X size={17} />
            </button>
          </div>
        )}
      </div>

      <Popover
        className="w-38 p-1!"
        trigger={
          <button className="btn btn-secondary py-1.5! border-dashed">
            <span>
              <SlidersHorizontal size={17} className="text-muted" />
            </span>
            <span className="font-medium">{t('View')}</span>
          </button>
        }

        placement="bottom-start"
        closeOn="outside"
      >
        <div className="flex flex-col gap-y-1 ">
          <div className="px-3 py-2 border-b border-borderColor">
            <span className="text-system text-foreground">
              {t('Toggle columns')}
            </span>
          </div>
          {table
            .getAllLeafColumns()
            .filter((column) => column.id !== 'select')
            .map((column) => {
              const headerLabels: Record<string, string> = {
                id: t('Task'),
                title: t('Title'),
                priority: t('Priority'),
                status: t('Status'),
              }

              if (!column.getCanHide()) return

              return (
                <button
                  key={column.id}
                  type="button"
                  disabled={!column.getCanHide()}
                  onClick={() => column.toggleVisibility()}
                  className="flex items-center justify-between gap-x-2 text-foreground hover:bg-surface-hover px-3 py-1.5 rounded-md w-full text-start text-system disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <div className="flex items-center gap-x-1.5">
                    <CheckBox
                      size="sm"
                      checked={column.getIsVisible()}
                      onChange={() => column.toggleVisibility()}
                    />

                    <span>{headerLabels[column.id] ?? column.id}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </Popover>
    </div>
  )
}

export default TableToolbar
