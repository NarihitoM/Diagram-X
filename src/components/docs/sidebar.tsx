import { useLocation, useNavigate } from "react-router-dom"
import { ChevronRight, BookOpen, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { sidebarGroups, iconMap, type DocGroup } from "@/config/docs"
import { useEffect, useState, useCallback } from "react"
import type { TOCItem } from "@/lib/headings"

function SidebarGroup({ group, onLinkClick }: { group: DocGroup; onLinkClick?: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const Icon = iconMap[group.icon] || BookOpen
  const isActive = group.items.some((item) => item.href === location.pathname)
  const [open, setOpen] = useState(group.defaultOpen || isActive)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-1">
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-muted/50 hover:text-foreground active:scale-[0.98]">
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-left">{group.title}</span>
        <ChevronRight className={cn("size-3 shrink-0 transition-transform duration-300", open && "rotate-90")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 space-y-0.5 border-l border-border pl-3 pt-1">
          {group.items.map((item) => {
            const active = location.pathname === item.href
            return (
              <button
                key={item.href}
                onClick={() => { navigate(item.href); onLinkClick?.(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className={cn(
                  "block w-full text-left rounded-md px-3 py-1.5 text-sm transition-all duration-300 ease-in-out",
                    active
                      ? "bg-cyan-500/10 font-medium text-cyan-500"
                      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col overflow-y-auto pr-2">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-background px-4 py-3">
        <button
          onClick={() => { navigate("/docs"); onLinkClick?.(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <BookOpen className="size-4" />
          Documentation
        </button>
      </div>
      <ScrollArea className="flex-1 px-2 py-3">
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.id} group={group} onLinkClick={onLinkClick} />
        ))}
      </ScrollArea>
    </div>
  )
}

export function DocsSidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-48 lg:w-52 xl:w-56 shrink-0 flex-col overflow-y-auto border-r border-border/40 lg:flex">
      <SidebarContent />
    </aside>
  )
}

export function MobileDocsHeader({ headings }: { headings: TOCItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [activeId, setActiveId] = useState("")

  const scrollTo = useCallback((id: string) => {
    setTocOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: "smooth" })
    }, 150)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  return (
    <div className="fixed w-full left-0 top-16 z-40 flex items-center justify-between border-b backdrop-blur-md border-border/60 bg-background/40 px-3 py-2 lg:hidden">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-sm font-medium transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/5 active:scale-95">
          <Menu className="size-4" />
          Menu
        </SheetTrigger>
        <SheetContent side="left" className="border-border/40 bg-popover p-0 text-popover-foreground">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent onLinkClick={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {headings.length > 0 && (
        <Sheet open={tocOpen} onOpenChange={setTocOpen}>
          <SheetTrigger className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/5 active:scale-95">
            {activeId ? headings.find((h) => h.id === activeId)?.title ?? "On this page" : "On this page"}
            <ChevronRight className="size-3" />
          </SheetTrigger>
          <SheetContent side="right" className="w-56 border-border/40 bg-popover p-0 pt-12 text-popover-foreground">
            <SheetTitle className="sr-only">On This Page</SheetTitle>
            <div className="fixed top-0 z-10 border-b border-border/40 px-4 py-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">On This Page</h4>
            </div>
            <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 py-3">
              <ul className="space-y-1 border-l border-border/50">
                {headings.map((item) => (
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
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
