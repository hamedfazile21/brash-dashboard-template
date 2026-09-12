import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_form/checkbox-and-radio/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/_form/checkbox-and-radio/"!</div>
}
