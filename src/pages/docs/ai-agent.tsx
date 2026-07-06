import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Badge } from "@/components/ui/badge"

const headings = [
  { id: slugify("AI Agent"), title: "AI Agent", level: 1 },
  { id: slugify("Overview"), title: "Overview", level: 2 },
  { id: slugify("Public AI Assistant"), title: "Public AI Assistant", level: 2 },
  { id: slugify("Workspace AI Agent"), title: "Workspace AI Agent", level: 2 },
  { id: slugify("Prompting Tips"), title: "Prompting Tips", level: 2 },
  { id: slugify("Example Prompts"), title: "Example Prompts", level: 2 },
  { id: slugify("Limitations"), title: "Limitations", level: 2 },
]

export function DocsAiAgent() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("AI Agent")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">AI Agent</h1>

          <h2 id={slugify("Overview")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Overview</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX features two AI-powered assistants to help you get the most out of the platform. Both are 
            powered by Groq's LLM infrastructure using the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">openai/gpt-oss-120b</code> model.
          </p>

          <h2 id={slugify("Public AI Assistant")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Public AI Assistant <Badge className="ml-2 bg-cyan-500">Site-wide</Badge>
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            The public AI assistant is available via the floating chat button (bottom-right corner) on every page — 
            the landing page, blog, contact, and documentation. This assistant:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">Answers questions about what DiagramX is and how it works.</li>
            <li className="leading-7">Provides information about features, diagram types, and pricing.</li>
            <li className="leading-7">Can navigate you to relevant pages based on your questions.</li>
            <li className="leading-7">Does <strong>not</strong> modify any diagrams or workspaces.</li>
          </ul>

          <h2 id={slugify("Workspace AI Agent")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Workspace AI Agent <Badge className="ml-2 bg-cyan-500">Inside editor</Badge>
          </h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Inside a workspace editor, the AI agent becomes context-aware and can directly manipulate the diagram. 
            This agent:
          </p>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7"><strong>Generates diagrams</strong> from natural language descriptions.</li>
            <li className="leading-7"><strong>Adds nodes</strong> to existing diagrams based on your instructions.</li>
            <li className="leading-7"><strong>Modifies properties</strong> of existing nodes (titles, colors, attributes).</li>
            <li className="leading-7"><strong>Connects nodes</strong> with appropriate edges automatically.</li>
            <li className="leading-7">Maintains a chat history within the workspace for context-aware conversations.</li>
          </ul>

          <h2 id={slugify("Prompting Tips")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Prompting Tips</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            To get the best results from the AI agent, follow these guidelines:
          </p>

          <div className="my-6 w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm border-collapse">
              <thead className="border-b border-border">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground w-1/3">Tip</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Example</th>
                </tr>
              </thead>
              <tbody className="[&>tr:last-child]:border-0">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Be specific about diagram type</td>
                  <td className="p-4 align-middle">"Create a <strong>UML class diagram</strong> for a library system" is better than "Make a diagram for a library"</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">List the entities you want</td>
                  <td className="p-4 align-middle">"Create a database schema with tables: users, orders, products, and categories"</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Specify relationships</td>
                  <td className="p-4 align-middle">"Connect the User entity to the Order entity with a one-to-many relationship"</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Request modifications</td>
                  <td className="p-4 align-middle">"Add a 'price' field to the Product table with type decimal"</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Use the AI to explain</td>
                  <td className="p-4 align-middle">"Explain what this diagram shows" — the AI will read the current nodes and describe the system</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id={slugify("Example Prompts")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Example Prompts</h2>

          <p className="leading-7 [&:not(:first-child)]:mt-4"><strong>Database Schema:</strong></p>
          <pre className="my-4 rounded-lg bg-muted p-4 text-sm overflow-x-auto"><code>"Design a database for an e-commerce platform with customers, orders, products, and categories. Include foreign key relationships."</code></pre>

          <p className="leading-7 [&:not(:first-child)]:mt-4"><strong>UML Class Diagram:</strong></p>
          <pre className="my-4 rounded-lg bg-muted p-4 text-sm overflow-x-auto"><code>"Create a class diagram for a social media app with User, Post, Comment, and Like classes. User has id, name, email. Post has id, content, timestamp. Show inheritance."</code></pre>

          <p className="leading-7 [&:not(:first-child)]:mt-4"><strong>Sequence Diagram:</strong></p>
          <pre className="my-4 rounded-lg bg-muted p-4 text-sm overflow-x-auto"><code>"Generate a sequence diagram showing a user logging in: frontend sends credentials to backend, backend validates against database, returns JWT token."</code></pre>

          <p className="leading-7 [&:not(:first-child)]:mt-4"><strong>Mind Map:</strong></p>
          <pre className="my-4 rounded-lg bg-muted p-4 text-sm overflow-x-auto"><code>"Create a mind map about project planning with branches: scope, timeline, resources, risks, and milestones."</code></pre>

          <h2 id={slugify("Limitations")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Limitations</h2>

          <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
            <li className="leading-7">The AI agent works best with clear, structured requests. Vague prompts may produce incomplete results.</li>
            <li className="leading-7">Complex diagrams with many nodes may take longer to generate.</li>
            <li className="leading-7">The AI cannot delete nodes or edges (this must be done manually via the editor).</li>
            <li className="leading-7">The AI model is subject to rate limits imposed by the Groq API backend.</li>
          </ul>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
