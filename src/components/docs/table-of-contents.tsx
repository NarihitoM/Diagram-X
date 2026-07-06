import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { TOCItem } from "@/lib/headings"

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("")

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    )

    for (const el of headingElements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] w-55 overflow-y-auto pr-2">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On This Page
        </h4>
        <ul className="space-y-1 border-l border-border/50">
          {items.map((item) => (
            <li key={item.id}>
              <a
                onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                className={cn(
                  "block border-l-2 py-1.5 pl-3 text-sm transition-all duration-300 ease-in-out hover:text-foreground",
                  item.level === 3 && "pl-6",
                  activeId === item.id
                    ? "border-l-cyan-500 bg-cyan-500/5 font-medium text-cyan-500"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/30"
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
