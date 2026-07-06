import { BookOpen, Rocket, Sparkles, Blocks, Bot, FolderKanban, HelpCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type DocItem = {
  title: string
  href: string
}

export type DocGroup = {
  id: string
  title: string
  icon: string
  defaultOpen: boolean
  items: DocItem[]
}

export const sidebarGroups: DocGroup[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    defaultOpen: true,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/getting-started" },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    icon: "BookOpen",
    defaultOpen: false,
    items: [
      { title: "Features", href: "/docs/features" },
      { title: "AI Agent", href: "/docs/ai-agent" },
      { title: "Workspace Management", href: "/docs/workspace" },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    icon: "Blocks",
    defaultOpen: false,
    items: [
      { title: "Node Types", href: "/docs/node-types" },
    ],
  },
  {
    id: "support",
    title: "Support",
    icon: "HelpCircle",
    defaultOpen: false,
    items: [
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
]

export const iconMap: Record<string, LucideIcon> = {
  Rocket,
  BookOpen,
  Sparkles,
  Blocks,
  Bot,
  FolderKanban,
  HelpCircle,
}

export function getPrevNext(
  currentHref: string
): { prev: DocItem | null; next: DocItem | null } {
  const allItems = sidebarGroups.flatMap((g) => g.items)
  const idx = allItems.findIndex((i) => i.href === currentHref)
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  }
}
