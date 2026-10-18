import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/')({
  beforeLoad: () => {
    throw redirect({ to: '/settings/profile', replace: true })
  },
})
