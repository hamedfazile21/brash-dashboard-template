import React from 'react'
import type { TodoType } from '../data/todos'
import { getAssigneeName } from '../data/assignees'
import Dialog from '#/components/dialog'
import {
  Calendar,
  CheckCircle2,
  Circle,
  FileText,
  Flag,
  SquarePen,
  Star,
  User,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface props {
  open: boolean
  onClose: () => void
  onEdit: () => void
  currentRow: TodoType | null
}

const priorityStyles: Record<TodoType['priority'], string> = {
  High: 'bg-danger/15 text-danger',
  Medium: 'bg-info/15 text-info',
  Low: 'bg-success/15 text-success',
}

const statusStyles: Record<TodoType['status'], string> = {
  complete: 'bg-success/15 text-success',
  trashed: 'bg-danger/15 text-danger',
  pending: 'bg-muted/15 text-muted',
}

const DetailsTodoDialog: React.FC<props> = ({
  currentRow,
  open,
  onClose,
  onEdit,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`${t('Details')} #${currentRow?.id}`}
      position="top"
      size="lg"
      footer={
        currentRow?.status !== 'trashed' && (
          <div className="flex justify-end">
            <button type="button" className="btn btn-primary" onClick={onEdit}>
              <SquarePen size={16} />
              {t('Edit')}
            </button>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-y-5">
        {/* Header: title + important flag */}
        <div className="flex items-start justify-between gap-x-3">
          <h2 className="text-lg font-semibold text-foreground">
            {currentRow?.title}
          </h2>
          {currentRow?.isImportant && (
            <div className="flex shrink-0 items-center gap-x-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-500">
              <Star size={12} fill="currentColor" />
              {t('Important')}
            </div>
          )}
        </div>

        {/* Status + priority badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase ${statusStyles[currentRow?.status || 'trashed']}`}
          >
            {currentRow?.status === 'complete' ? (
              <CheckCircle2 size={13} />
            ) : (
              <Circle size={13} />
            )}
            {t(currentRow?.status || 'complete')}
          </span>
          <span
            className={`inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase ${priorityStyles[currentRow?.priority || 'Low']}`}
          >
            <Flag size={13} />
            {t(currentRow?.priority || 'High')}
          </span>
        </div>

        <div className="h-px bg-borderColor" />

        {/* Description */}
        <div className="flex flex-col gap-y-1.5">
          <div className="flex items-center gap-x-1.5 text-xs font-medium text-muted">
            <FileText size={14} />
            {t('Description')}
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {currentRow?.description}
          </p>
        </div>

        <div className="h-px bg-borderColor" />

        {/* Meta row: assignee + date */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Assignee */}
          <div className="glass-solid flex items-center gap-x-3 rounded-xl p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info/15 text-info">
              <User size={16} />
            </div>
            <div className="flex min-w-0 flex-col gap-y-0.5">
              <span className="text-xs font-medium text-muted">
                {t('Assignee')}
              </span>
              <div className="flex items-center gap-x-1.5">
                <img
                  src={currentRow?.assignee}
                  alt=""
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-black/8 dark:ring-white/10"
                />
                <span className="truncate text-sm font-medium text-foreground">
                  {getAssigneeName(currentRow?.assignee) ?? t('Unassigned')}
                </span>
              </div>
            </div>
          </div>

          {/* Due date */}
          <div className="glass-solid flex items-center gap-x-3 rounded-xl p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
              <Calendar size={16} />
            </div>
            <div className="flex min-w-0 flex-col gap-y-0.5">
              <span className="text-xs font-medium text-muted">
                {t('Created')}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {currentRow?.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DetailsTodoDialog
