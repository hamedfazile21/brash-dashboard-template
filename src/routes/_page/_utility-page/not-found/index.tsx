import NotFoundPage from '#/features/utility-pages/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_page/_utility-page/not-found/')({
  component: NotFoundPage,
})
