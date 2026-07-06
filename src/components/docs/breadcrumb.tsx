import { useLocation, Link } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

function formatLabel(str: string): string {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function DocsBreadcrumb() {
  const location = useLocation()
  const segments = location.pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  const crumbs: { label: string; href: string }[] = []

  for (let i = 0; i < segments.length; i++) {
    const href = "/" + segments.slice(0, i + 1).join("/")
    const label = formatLabel(segments[i])
    crumbs.push({ label, href })
  }

  return (
    <nav className="max-md:mt-8 max-lg:mt-8 mb-6 flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/" className="flex items-center gap-1 transition-colors hover:text-foreground">
        <Home className="size-3.5" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRight className="size-3" />
          {i === crumbs.length - 1 ? (
            <span className="font-medium text-foreground">{crumb.label}</span>
          ) : (
            <Link to={crumb.href} className="transition-colors hover:text-foreground">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
