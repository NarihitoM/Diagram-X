import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth } from "@/store/authstore"

const headings = [
  { id: slugify("Quick Start"), title: "Quick Start", level: 1 },
  { id: slugify("Prerequisites"), title: "Prerequisites", level: 2 },
  { id: slugify("Step 1: Create an Account"), title: "Step 1: Create an Account", level: 2 },
  { id: slugify("Step 2: Create a Workspace"), title: "Step 2: Create a Workspace", level: 2 },
  { id: slugify("Step 3: Add Nodes to Your Diagram"), title: "Step 3: Add Nodes to Your Diagram", level: 2 },
  { id: slugify("Step 4: Connect Nodes"), title: "Step 4: Connect Nodes", level: 2 },
  { id: slugify("Step 5: Edit Properties"), title: "Step 5: Edit Properties", level: 2 },
  { id: slugify("Step 6: Save and Export"), title: "Step 6: Save and Export", level: 2 },
  { id: slugify("Using the AI Agent"), title: "Using the AI Agent", level: 2 },
  { id: slugify("Next Steps"), title: "Next Steps", level: 2 },
]

export function DocsGettingStarted() {
  const { userid } = useAuth()

  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("Quick Start")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">Quick Start</h1>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Get your first diagram up and running in under 5 minutes.
          </p>

          <h2 id={slugify("Prerequisites")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Prerequisites</h2>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">A modern web browser (Chrome, Firefox, Edge, or Safari).</li>
            <li className="leading-7">An active internet connection.</li>
            <li className="leading-7">No installation required — DiagramX runs entirely in your browser.</li>
          </ul>

          <h2 id={slugify("Step 1: Create an Account")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 1: Create an Account <Badge className="ml-2 bg-cyan-500">Required</Badge>
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            To use DiagramX, you need an account. You have two options:
          </p>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">
              <strong>Email & Password</strong> — Go to <a href="/signup" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">/signup</a> and create an account with your email address.
              You will receive a one-time password (OTP) to verify your email.
            </li>
            <li className="leading-7">
              <strong>Google OAuth</strong> — Click the Google sign-in button on the login or signup page to authenticate with your Google account.
            </li>
          </ol>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Once signed in, you will be redirected to the dashboard.
          </p>

          <h2 id={slugify("Step 2: Create a Workspace")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 2: Create a Workspace
          </h2>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">From the <strong>Dashboard</strong>, click the <Badge className="bg-cyan-500">Create Workspace</Badge> button.</li>
            <li className="leading-7">Enter a name for your workspace (e.g., "My First Diagram").</li>
            <li className="leading-7">Click <strong>Create</strong> — the workspace will appear in your workspace list.</li>
            <li className="leading-7">Click on the workspace name to open the node editor canvas.</li>
          </ol>

          <h2 id={slugify("Step 3: Add Nodes to Your Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 3: Add Nodes to Your Diagram
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Once inside the editor, you can add nodes in two ways:
          </p>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            <strong>Manually:</strong>
          </p>
          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">Click the <strong>Add Node</strong> button in the left panel.</li>
            <li className="leading-7">Select a diagram type from the dropdown (Database, DataFlow, Sequence, UML Class, ER, State, Mind Map, Activity).</li>
            <li className="leading-7">Choose the specific node variant (e.g., for Database Schema: Table, Field, or Relationship).</li>
            <li className="leading-7">The node appears on the canvas. Drag it to position it where you want.</li>
          </ol>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            <strong>Using AI:</strong> Type a prompt like "Create a database schema with users and orders tables" in the AI chat panel, and the AI will generate the nodes and edges automatically.
          </p>

          <h2 id={slugify("Step 4: Connect Nodes")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 4: Connect Nodes
          </h2>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">Hover over a node to reveal its connection handles (small circles on the edges of the node).</li>
            <li className="leading-7">Click and drag from a handle to another node's handle.</li>
            <li className="leading-7">An edge will appear connecting the two nodes.</li>
            <li className="leading-7">You can click on an edge to select it and customize its appearance in the right panel.</li>
          </ol>

          <h2 id={slugify("Step 5: Edit Properties")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 5: Edit Properties
          </h2>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7"><strong>Select a node</strong> by clicking on it.</li>
            <li className="leading-7">The <strong>right panel</strong> will show editable properties specific to that node type.</li>
            <li className="leading-7">Modify the title, add items, change colors, or adjust dimensions.</li>
            <li className="leading-7">Changes are reflected immediately on the canvas.</li>
          </ol>

          <h2 id={slugify("Step 6: Save and Export")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Step 6: Save and Export
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX saves your work <strong>automatically</strong> with a 1-second debounce — no manual saving needed. You can also:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7"><strong>Export as PNG</strong> — Use the export button in the toolbar to capture the current canvas as an image.</li>
            <li className="leading-7"><strong>Navigate away</strong> — Your work persists. Return to it anytime from the Dashboard.</li>
          </ul>

          <h2 id={slugify("Using the AI Agent")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Using the AI Agent</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            The floating AI chat button (bottom-right corner of the screen) gives you access to two AI assistants:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7"><strong>Public AI Assistant</strong> — Available on the landing page, blog, contact, and docs pages. Answers general questions about DiagramX.</li>
            <li className="leading-7"><strong>Workspace AI Agent</strong> — Available inside a workspace editor. Can generate and modify diagram nodes based on your prompts.</li>
          </ul>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Example prompts for the workspace AI agent:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">"Create an ER diagram for a library management system with members, books, and loans."</li>
            <li className="leading-7">"Add a User class with id, name, and email attributes to my UML diagram."</li>
            <li className="leading-7">"Change all database table colors to blue."</li>
          </ul>

          <h2 id={slugify("Next Steps")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Next Steps</h2>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">Explore the full list of <a href="/docs/node-types" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">Node Types</a>.</li>
            <li className="leading-7">Learn about <a href="/docs/features" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">all features</a> DiagramX offers.</li>
            <li className="leading-7">Master the <a href="/docs/ai-agent" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">AI Agent</a> with advanced prompting tips.</li>
            <li className="leading-7">Understand <a href="/docs/workspace" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">workspace management</a> in detail.</li>
          </ul>

          <div className="mt-8">
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600">
              <Link to={userid ? "/dashboard" : "/login"}>
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
