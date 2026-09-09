import PaginationShowCase from '#/features/element/pagination'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_element/pagination/')({
  component: PaginationShowCase,
})
