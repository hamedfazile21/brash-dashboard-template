import type { RowSelectionState } from '@tanstack/react-table'
import type { Dispatch, FC, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from '@headlessui/react'
import { Archive, Download, Trash2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Tooltip from '#/components/tooltip'

interface props {
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  onArchive?: (ids: string[]) => void
  onDelete?: (ids: string[]) => void
  onExport?: (ids: string[]) => void
}

const TableBulkAction: FC<props> = ({
  rowSelection,
  setRowSelection,
  onArchive,
  onDelete,
  onExport,
}) => {
  const selectedIds = Object.keys(rowSelection)
  const count = selectedIds.length
  const isOpen = count > 0
  const { t } = useTranslation()
  const clearSelection = () => setRowSelection({})

  return createPortal(
    <Transition
      show={isOpen}
      enter="transition duration-200 ease-out"
      enterFrom="opacity-0 translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition duration-150 ease-in"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-2 scale-95"
    >
      <div className="fixed bottom-4 ltr:left-[55%] rtl:right-[55%] z-40 w-full max-w-xs -translate-x-1/2 px-4">
        <div className="card flex items-center gap-x-1 rounded-xl px-2! py-1.5!">
          {/* Count + clear */}
          <div className="flex items-center gap-x-2 pl-2 pr-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {count}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-foreground">
              selected
            </span>
          </div>

          <div className="h-6 w-px shrink-0 bg-borderColor" />

          {/* Actions */}
          <div className="flex flex-1 items-center gap-x-2">
            <Tooltip placement="top" content={'Archive Tasks'}>
              <button
                type="button"
                onClick={() => onArchive?.(selectedIds)}
                className="btn btn-secondary"
              >
                <Archive size={18} />
              </button>
            </Tooltip>
            <Tooltip placement="top" content={'Download Tasks'}>
              <button
                type="button"
                onClick={() => onExport?.(selectedIds)}
                className="btn btn-secondary"
              >
                <Download size={18} />
              </button>
            </Tooltip>
            <Tooltip placement="top" content={'Delete Selected Tasks'}>
              <button
                type="button"
                onClick={() => onDelete?.(selectedIds)}
                className="btn btn-light bg-danger! text-white!"
              >
                <Trash2 size={18} />
              </button>
            </Tooltip>
          </div>

          <div className="h-6 w-px shrink-0 bg-borderColor" />

          {/* Clear selection */}
          <button
            type="button"
            onClick={clearSelection}
            aria-label="Clear selection"
            className="shrink-0 rounded-full p-1.5 text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </Transition>,
    document.body,
  )
}

export default TableBulkAction
