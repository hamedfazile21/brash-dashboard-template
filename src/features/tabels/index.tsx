import { useTranslation } from 'react-i18next'

import TaskTable from './components/task-table'
import TaskDialog from './components/task-dialog'
import { useTask } from './components/task-provider'

export interface Task {
  id: string
  title: string
  label: 'Bug' | 'Feature' | 'Documentation'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled'
}

function TablesShowCase() {
  const { t } = useTranslation()
  const { setOpen } = useTask()

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-foreground">
            {t('Tasks')}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t(
              'View, search, and manage every task assigned across your team.',
            )}
          </p>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setOpen('create-task')}
          >
            {t('New Task')}
          </button>
        </div>
      </div>
      <div className="card w-full overflow-hidden p-0!">
        <TaskTable />
      </div>
      <TaskDialog />
    </div>
  )
}

export default TablesShowCase
