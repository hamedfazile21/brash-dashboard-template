import React from 'react'
import { useTask, type TaskDialogType } from './task-provider'
import DeleteConfirmationDialog from './delete-confirmation-dialog'
import CreateTaskDialog from './create-task-dialog'

const TaskDialog = () => {
  const { open, setOpen, rowSelection, currentRow } = useTask()
  const tasksCount = Object.values(rowSelection).length
  return (
    <>
      <DeleteConfirmationDialog
        key={'delete-confirmation-dialog'}
        open={open === 'delete-confirmation'}
        setOpen={() => setOpen('delete-confirmation')}
        itemCount={tasksCount}
      />
      <CreateTaskDialog
        key={'create-task'}
        open={open === 'create-task'}
        setOpen={() => setOpen('create-task')}
        currentRow={currentRow}
      />
    </>
  )
}

export default TaskDialog
