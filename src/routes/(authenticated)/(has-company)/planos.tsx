import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(has-company)/planos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_has-company/planos"!</div>
}
