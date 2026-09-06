import React from 'react'
import { useTask, type TaskDialogType } from './task-provider'
import DeleteConfirmationDialog from './delete-confirmation-dialog'

const TaskDialog = () => {
  const { open, setOpen, rowSelection } = useTask()
  const tasksCount = Object.values(rowSelection).length
  return (
    <>
      <DeleteConfirmationDialog
        key={'delete-confirmation-dialog'}
        open={open === 'delete-confirmation'}
        setOpen={() => setOpen('delete-confirmation')}
        itemCount={tasksCount}
      />
    </>
  )
}

export default TaskDialog
