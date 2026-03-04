import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(has-company)/empresa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_has-company/empresa"!</div>
}
