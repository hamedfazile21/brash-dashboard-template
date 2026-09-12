import DatePickerShowCase from '#/features/form/date-picker'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_form/date-picker/')({
  component: DatePickerShowCase,
})