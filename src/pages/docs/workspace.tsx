import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Badge } from "@/components/ui/badge"

const headings = [
  { id: slugify("Workspace Management"), title: "Workspace Management", level: 1 },
  { id: slugify("What is a Workspace?"), title: "What is a Workspace?", level: 2 },
  { id: slugify("Creating a Workspace"), title: "Creating a Workspace", level: 2 },
  { id: slugify("Opening a Workspace"), title: "Opening a Workspace", level: 2 },
  { id: slugify("Searching Workspaces"), title: "Searching Workspaces", level: 2 },
  { id: slugify("Deleting a Workspace"), title: "Deleting a Workspace", level: 2 },
  { id: slugify("Auto-Save Behavior"), title: "Auto-Save Behavior", level: 2 },
  { id: slugify("The Editor Interface"), title: "The Editor Interface", level: 2 },
]

export function DocsWorkspace() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("Workspace Management")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">Workspace Management</h1>

          <h2 id={slugify("What is a Workspace?")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">What is a Workspace?</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            A workspace is a container for a single diagram. Each workspace stores:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">The complete graph of <strong>nodes</strong> and <strong>edges</strong> on the canvas.</li>
            <li className="leading-7">The <strong>AI chat history</strong> for that workspace.</li>
            <li className="leading-7">The workspace <strong>name</strong> and <strong>metadata</strong> (creation date, last modified).</li>
          </ul>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Each user can have multiple workspaces, and each workspace is independent.
          </p>

          <h2 id={slugify("Creating a Workspace")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Creating a Workspace</h2>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">Log in to your DiagramX account.</li>
            <li className="leading-7">Navigate to the <strong>Dashboard</strong>.</li>
            <li className="leading-7">Click the <Badge className="bg-cyan-500">Create Workspace</Badge> button.</li>
            <li className="leading-7">Enter a descriptive name for your workspace.</li>
            <li className="leading-7">Press <strong>Create</strong> — the workspace appears in your workspace list immediately.</li>
          </ol>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Workspace names do not need to be unique. Use descriptive names to help you organize your diagrams.
          </p>

          <h2 id={slugify("Opening a Workspace")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Opening a Workspace</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            From the Dashboard, click on any workspace card in the list. The workspace opens in the full 
            node editor interface, which includes:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">The <strong>React Flow canvas</strong> in the center.</li>
            <li className="leading-7">A left-side panel for <strong>adding nodes</strong>.</li>
            <li className="leading-7">A right-side panel for <strong>editing properties</strong> of selected nodes or edges.</li>
            <li className="leading-7">A floating <strong>AI agent chat</strong> for generating and modifying diagrams.</li>
          </ul>

          <h2 id={slugify("Searching Workspaces")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Searching Workspaces</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            The Dashboard includes a search bar at the top of the workspace list. Simply start typing to 
            filter workspaces by name. The search is case-insensitive and updates results in real time.
          </p>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Workspaces are also <strong>paginated</strong> — if you have many workspaces, use the pagination 
            controls at the bottom of the list to navigate between pages.
          </p>

          <h2 id={slugify("Deleting a Workspace")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Deleting a Workspace</h2>

          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">From the Dashboard, locate the workspace you want to delete.</li>
            <li className="leading-7">Click the <strong>delete</strong> icon on the workspace card.</li>
            <li className="leading-7">Confirm the deletion in the dialog prompt.</li>
          </ol>

          <blockquote className="my-6 border-l-2 border-primary pl-6 italic">
            <strong>Warning:</strong> Deleting a workspace is permanent. All nodes, edges, and AI chat history 
            for that workspace will be removed from the server.
          </blockquote>

          <h2 id={slugify("Auto-Save Behavior")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Auto-Save Behavior</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Workspaces auto-save automatically. Here is how it works:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7"><strong>Trigger:</strong> Every change to nodes or edges triggers a save.</li>
            <li className="leading-7"><strong>Debounce:</strong> Changes are batched and saved after 1 second of inactivity.</li>
            <li className="leading-7"><strong>Persistence:</strong> Data is sent to the backend API and stored server-side.</li>
            <li className="leading-7"><strong>Restore:</strong> When you reopen a workspace, its last saved state is loaded.</li>
          </ul>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            You do not need to manually save. Simply make your edits and navigate away — your work is preserved.
          </p>

          <h2 id={slugify("The Editor Interface")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">The Editor Interface</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            The workspace editor is divided into several zones:
          </p>

          <div className="my-6 w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm border-collapse">
              <thead className="border-b border-border">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Area</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody className="[&>tr:last-child]:border-0">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Center Canvas</td>
                  <td className="p-4 align-middle">The main React Flow workspace. Pan by dragging, zoom with scroll wheel or pinch. Minimap in bottom-right corner.</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Left Panel</td>
                  <td className="p-4 align-middle">Node library. Select a diagram type and click to add nodes to the canvas.</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Right Panel</td>
                  <td className="p-4 align-middle">Properties editor. Shows editable fields for the selected node or edge.</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">AI Chat (Floating)</td>
                  <td className="p-4 align-middle">Bottom-right corner. Chat with the AI agent to generate or modify the diagram.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
