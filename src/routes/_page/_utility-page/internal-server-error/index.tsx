import InternalServerError from '#/features/utility-pages/internal-server-error'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_page/_utility-page/internal-server-error/',
)({
  component: InternalServerError,
})
