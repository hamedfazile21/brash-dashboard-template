import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_form/date-picker/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/_form/date-picker/"!</div>
}
