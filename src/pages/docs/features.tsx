import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot,CloudLightningIcon, Workflow, Save, LogIn, FolderKanban, Palette, Image } from "lucide-react"

const headings = [
  { id: slugify("Features"), title: "Features", level: 1 },
  { id: slugify("Node-Based Canvas"), title: "Node-Based Canvas", level: 2 },
  { id: slugify("AI Diagram Generation"), title: "AI Diagram Generation", level: 2 },
  { id: slugify("AI Chatbot Assistant"), title: "AI Chatbot Assistant", level: 2 },
  { id: slugify("Auto-Save"), title: "Auto-Save", level: 2 },
  { id: slugify("Authentication"), title: "Authentication", level: 2 },
  { id: slugify("Workspace Management"), title: "Workspace Management", level: 2 },
  { id: slugify("Customizable Nodes"), title: "Customizable Nodes", level: 2 },
  { id: slugify("Export to PNG"), title: "Export to PNG", level: 2 },
  { id: slugify("Real-Time Collaboration"), title: "Real-Time Collaboration", level: 2 },
]

const featureCards = [
  {
    icon: Workflow,
    title: "Node-Based Canvas",
    desc: "Drag, connect, and edit nodes on an infinite canvas powered by React Flow. Zoom, pan, minimap, and grid snapping make diagramming intuitive.",
  },
  {
    icon: Bot,
    title: "AI Diagram Generation",
    desc: "Describe what you want in natural language and the AI builds the nodes, edges, and properties automatically. Supports all 8 diagram types.",
  },
  {
    icon: CloudLightningIcon,
    title: "AI Chatbot Assistant",
    desc: "A floating AI assistant is available site-wide to answer questions about the platform. Inside workspaces, the AI can also generate and modify diagrams.",
  },
  {
    icon: Save,
    title: "Auto-Save",
    desc: "Workspaces auto-save with a 1-second debounce. Every change you make is persisted without clicking a save button.",
  },
  {
    icon: LogIn,
    title: "Authentication",
    desc: "Sign up or log in using email/password with OTP verification, or authenticate instantly with Google OAuth.",
  },
  {
    icon: FolderKanban,
    title: "Workspace Management",
    desc: "Organize your diagrams into workspaces. Search, paginate, create, and delete workspaces from your dashboard.",
  },
  {
    icon: Palette,
    title: "Customizable Nodes",
    desc: "Edit titles, items, attributes, methods, colors, shapes, and dimensions per node. Changes reflect in real time on the canvas.",
  },
  {
    icon: Image,
    title: "Export to PNG",
    desc: "Capture your entire canvas or selected nodes as a PNG image using html-to-image integration.",
  },
]

export function DocsFeatures() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("Features")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">Features</h1>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX is packed with features designed to make diagram creation fast, intuitive, and powerful. 
            Here is a detailed look at everything the platform offers.
          </p>

          <div className="grid grid-cols-1 gap-6 mt-8">
            {featureCards.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} id={slugify(feature.title)} className="scroll-m-26 hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="size-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-6">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <h2 id={slugify("Real-Time Collaboration")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Real-Time Collaboration</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX includes Socket.IO integration for real-time collaboration (feature in active development). 
            This will enable multiple users to edit the same workspace simultaneously with live cursor positions 
            and instant sync.
          </p>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
