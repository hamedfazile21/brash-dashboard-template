import SelectInputShowCase from '#/features/form/select'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_form/select/')({
  component: SelectInputShowCase,
})
