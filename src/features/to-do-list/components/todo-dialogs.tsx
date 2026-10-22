import { useTodo } from './todo-provider'
import CreateTodoDialog from './create-todo-dialog'
import DetailsTodoDialog from './details-todo.dialog'

const TodoDialog = () => {
  const { open, setOpen, currentRow } = useTodo()
  const close = () => setOpen(null)

  return (
    <>
      <CreateTodoDialog
        key="todo-create"
        open={open === 'create'}
        onClose={close}
      />

      <CreateTodoDialog
        key={`todo-update-${currentRow?.id}`}
        open={open === 'update'}
        onClose={close}
        currentRow={currentRow}
      />

      <DetailsTodoDialog
        open={open === 'details'}
        onClose={close}
        onEdit={() => setOpen('update')}
        currentRow={currentRow}
      />
    </>
  )
}

export default TodoDialog
