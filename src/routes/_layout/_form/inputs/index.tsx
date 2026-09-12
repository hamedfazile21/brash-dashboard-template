import InputShowCase from '#/features/form/input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_form/inputs/')({
  component: InputShowCase,
})
