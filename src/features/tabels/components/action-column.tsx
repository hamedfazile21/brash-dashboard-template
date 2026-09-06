import Popover from '#/components/popover'
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react'
import React, { type FC } from 'react'

interface props {
  row: any
}

const ActionColumn: FC<props> = ({ row }) => {
  return (
    <div className="flex justify-end">
      <Popover
        placement="bottom-end"
        closeOn="both"
        trigger={
          <button
            type="button"
            aria-label={`Actions for ${row.original.title}`}
            className="flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <Ellipsis size={18} />
          </button>
        }
      >
        <div className="flex min-w-36 flex-col gap-y-1">
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-hover"
            onClick={() => console.log('edit task', row.original)}
          >
            <SquarePen size={15} />
            Edit
          </button>
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-md px-2.5 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
            onClick={() => console.log('delete task', row.original)}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </Popover>
    </div>
  )
}

export default ActionColumn
