import Popover from '#/components/popover'
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react'
import React, { type FC } from 'react'
import type { Row } from '@tanstack/react-table'
import type { Task } from '..'
import { useTranslation } from 'react-i18next'
import { useTask } from './task-provider'

interface props {
  row: Row<Task>
}

const ActionColumn: FC<props> = ({ row }) => {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useTask()
  return (
    <div className="flex justify-end!">
      <Popover
        placement="bottom-end"
        closeOn="both"
        trigger={
          <button
            type="button"
            aria-label={`Actions for ${row.original.title}`}
            className="flex p-0.5 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <Ellipsis size={18} />
          </button>
        }
      >
        <div className="flex min-w-36 flex-col gap-y-1">
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-hover"
            onClick={() => {
              setOpen('create-task')
              setCurrentRow(row.original)
            }}
          >
            <SquarePen size={15} />
            {t('Edit')}
          </button>
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-md px-2.5 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
            onClick={() => setOpen('delete-confirmation')}
          >
            <Trash2 size={15} />
            {t('Delete')}
          </button>
        </div>
      </Popover>
    </div>
  )
}

export default ActionColumn
