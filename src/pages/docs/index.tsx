import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, GitBranch, Network, Shapes, Workflow, BrainCircuit, Activity, Files } from "lucide-react"

const headings = [
  { id: slugify("Introduction"), title: "Introduction", level: 1 },
  { id: slugify("What is DiagramX?"), title: "What is DiagramX?", level: 2 },
  { id: slugify("Key Concepts"), title: "Key Concepts", level: 2 },
  { id: slugify("Supported Diagram Types"), title: "Supported Diagram Types", level: 2 },
  { id: slugify("Core Features"), title: "Core Features", level: 2 },
  { id: slugify("Getting Started"), title: "Getting Started", level: 2 },
]

const diagramTypes = [
  { icon: Database, title: "Database Schema", desc: "Design table structures with typed fields, primary keys, and foreign keys." },
  { icon: GitBranch, title: "DataFlow Diagram", desc: "Map processes, logic steps, and data movement between components." },
  { icon: Network, title: "Sequence Diagram", desc: "Model participant interactions and message flows over time." },
  { icon: Shapes, title: "UML Class Diagram", desc: "Define classes with attributes, methods, and relationships." },
  { icon: Files, title: "ER Diagram", desc: "Create entities with primary/foreign keys and relationships." },
  { icon: Activity, title: "State Diagram", desc: "Visualize state machines with initial, regular, and final states." },
  { icon: BrainCircuit, title: "Mind Map", desc: "Brainstorm ideas with a central root and color-coded branches." },
  { icon: Workflow, title: "Activity Diagram", desc: "Build start, action, decision, and end flow charts." },
]

export function DocsIndex() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("Introduction")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">Introduction</h1>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            <strong>DiagramX</strong> is an AI-powered, web-based diagram and flowchart editor that lets you design, visualize, and 
            share interactive diagrams. Built on React Flow, it provides a flexible node-based canvas where you can create anything 
            from database schemas to UML class diagrams using an intuitive drag-and-drop interface.
          </p>

          <h2 id={slugify("What is DiagramX?")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">What is DiagramX?</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX is more than just a diagramming tool. It combines the power of a visual node editor with AI-driven diagram 
            generation, enabling you to describe your ideas in natural language and have them translated into structured diagrams 
            automatically. Whether you are a software engineer designing system architectures, a student mapping out concepts, or 
            a project manager visualizing workflows, DiagramX adapts to your needs.
          </p>

          <h2 id={slugify("Key Concepts")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Key Concepts</h2>

          <h3 id={slugify("Nodes and Edges")} className="mt-8 mb-2 scroll-m-26 text-xl font-semibold tracking-tight">Nodes and Edges</h3>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            At its core, DiagramX uses a graph model. <strong>Nodes</strong> represent diagram elements (entities, steps, classes, etc.), 
            and <strong>edges</strong> represent the connections between them. Each node type has specialized properties and handles 
            for connecting.
          </p>

          <h3 id={slugify("Workspaces")} className="mt-8 mb-2 scroll-m-26 text-xl font-semibold tracking-tight">Workspaces</h3>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Workspaces are containers for your diagrams. Each workspace stores a complete graph of nodes and edges along with an 
            AI chat history. Workspaces auto-save with debounced persistence so your work is never lost.
          </p>

          <h3 id={slugify("AI Agent")} className="mt-8 mb-2 scroll-m-26 text-xl font-semibold tracking-tight">AI Agent</h3>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            The AI agent can generate entire diagrams from natural language descriptions. Tell it what you want to build, and it 
            will create the nodes, edges, and properties automatically. You can also ask it to modify existing diagrams.
          </p>

          <h2 id={slugify("Supported Diagram Types")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Supported Diagram Types</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX supports eight specialized diagram types, each with custom node components and styling:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {diagramTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card key={type.title} className="hover:scale-[1.02] transition-all">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <Icon className="text-cyan-500 size-6 shrink-0" />
                    <CardTitle className="text-base">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{type.desc}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <h2 id={slugify("Core Features")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Core Features</h2>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7"><strong>Node-Based Canvas</strong> — Drag, connect, and edit nodes powered by React Flow with zoom, pan, and minimap.</li>
            <li className="leading-7"><strong>AI Diagram Generation</strong> — Describe what you want in natural language and the AI builds the diagram.</li>
            <li className="leading-7"><strong>AI Chatbot</strong> — A public assistant answers questions about DiagramX and helps you navigate.</li>
            <li className="leading-7"><strong>Auto-Save</strong> — Workspaces save automatically with debounced persistence.</li>
            <li className="leading-7"><strong>Google OAuth & Email Auth</strong> — Sign up or log in with Google or email/password.</li>
            <li className="leading-7"><strong>Workspace Management</strong> — Create, search, paginate, and delete workspaces from the dashboard.</li>
            <li className="leading-7"><strong>Customizable Nodes</strong> — Edit titles, items, attributes, methods, colors, and shapes per node.</li>
            <li className="leading-7"><strong>Export</strong> — Export your diagrams as PNG images.</li>
          </ul>

          <h2 id={slugify("Getting Started")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Getting Started</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Ready to create your first diagram? Head over to the <a href="/docs/getting-started" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">Quick Start</a> guide.
          </p>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
