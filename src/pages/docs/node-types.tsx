import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import { Badge } from "@/components/ui/badge"

const headings = [
  { id: slugify("Node Types Reference"), title: "Node Types Reference", level: 1 },
  { id: slugify("Database Schema"), title: "Database Schema", level: 2 },
  { id: slugify("DataFlow Diagram"), title: "DataFlow Diagram", level: 2 },
  { id: slugify("Sequence Diagram"), title: "Sequence Diagram", level: 2 },
  { id: slugify("UML Class Diagram"), title: "UML Class Diagram", level: 2 },
  { id: slugify("ER Diagram"), title: "ER Diagram", level: 2 },
  { id: slugify("State Diagram"), title: "State Diagram", level: 2 },
  { id: slugify("Mind Map"), title: "Mind Map", level: 2 },
  { id: slugify("Activity Diagram"), title: "Activity Diagram", level: 2 },
]

export function DocsNodeTypes() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("Node Types Reference")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">Node Types Reference</h1>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            DiagramX supports eight specialized diagram types, each with custom node components. 
            This reference covers each type, its node variants, and usage.
          </p>

          <div className="overflow-x-auto my-8 rounded-lg border border-border">
            <table className="w-full caption-bottom text-sm border-collapse">
              <thead className="border-b border-border">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Diagram Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Node Variants</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Best For</th>
                </tr>
              </thead>
              <tbody className="[&>tr:last-child]:border-0">
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Database Schema</td>
                  <td className="p-4 align-middle">Table, Field, Relationship</td>
                  <td className="p-4 align-middle">Designing relational database structures</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">DataFlow</td>
                  <td className="p-4 align-middle">Process, Data Store, External Entity, Data Flow</td>
                  <td className="p-4 align-middle">Mapping system processes and data movement</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Sequence</td>
                  <td className="p-4 align-middle">Participant, Message, Self-Message, Note</td>
                  <td className="p-4 align-middle">Modeling interaction flows between components</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">UML Class</td>
                  <td className="p-4 align-middle">Class, Interface, Abstract Class, Relationship</td>
                  <td className="p-4 align-middle">Object-oriented design and system architecture</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">ER Diagram</td>
                  <td className="p-4 align-middle">Entity, Attribute, Relationship, Weak Entity</td>
                  <td className="p-4 align-middle">Entity-relationship data modeling</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">State Diagram</td>
                  <td className="p-4 align-middle">Initial State, State, Final State, Transition</td>
                  <td className="p-4 align-middle">Visualizing state machines and workflows</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Mind Map</td>
                  <td className="p-4 align-middle">Root Node, Branch Node, Sub-Branch, Connector</td>
                  <td className="p-4 align-middle">Brainstorming and idea organization</td>
                </tr>
                <tr className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">Activity</td>
                  <td className="p-4 align-middle">Start, Action, Decision, End, Fork, Join</td>
                  <td className="p-4 align-middle">Process flow modeling and business workflows</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id={slugify("Database Schema")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Database Schema <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Design table structures with typed fields, primary keys, foreign keys, and indexes. Each table node 
            displays its columns with data types and constraints. Connect tables with relationship edges that 
            show cardinality (one-to-one, one-to-many, many-to-many).
          </p>

          <h2 id={slugify("DataFlow Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            DataFlow Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Map how data moves through a system. Process nodes transform data, data stores persist it, 
            and external entities represent outside systems or users. Data flow edges show the direction 
            and label of information moving between elements.
          </p>

          <h2 id={slugify("Sequence Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Sequence Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Model interactions between participants over time. Each participant is represented as a lifeline. 
            Message arrows between lifelines show method calls, responses, and asynchronous signals. 
            Self-messages represent internal operations.
          </p>

          <h2 id={slugify("UML Class Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            UML Class Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Define classes with attributes, methods, and visibility modifiers. Support for interfaces, 
            abstract classes, and relationships including inheritance, composition, aggregation, and dependency. 
            Each relationship type has a distinct line style and arrow.
          </p>

          <h2 id={slugify("ER Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            ER Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Create entity-relationship models for database design. Entities contain attributes with primary 
            and foreign key markers. Weak entities depend on identifying relationships. Connect with 
            relationship nodes showing cardinality labels.
          </p>

          <h2 id={slugify("State Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            State Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Visualize state machines with clearly marked initial and final states. State nodes display 
            entry, exit, and do actions. Transitions show events and guard conditions. Useful for modeling 
            UI flows, protocol states, and business process lifecycles.
          </p>

          <h2 id={slugify("Mind Map")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Mind Map <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Brainstorm and organize ideas around a central concept. The root node branches out to main 
            topics, which further subdivide into subtopics. Color-coded branches help group related 
            concepts. Drag to reorganize the hierarchy.
          </p>

          <h2 id={slugify("Activity Diagram")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">
            Activity Diagram <Badge className="ml-2 bg-cyan-500">8 types</Badge>
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Model workflows and business processes from start to end. Action nodes represent tasks, 
            decision nodes fork the flow based on conditions, and fork/join nodes handle parallel 
            execution. Swimlanes can group activities by responsible actor.
          </p>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
