import { DocPager } from "@/components/docs/doc-pager"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MobileDocsHeader } from "@/components/docs/sidebar"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { slugify } from "@/lib/headings"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const headings = [
  { id: slugify("FAQ"), title: "FAQ", level: 1 },
  { id: slugify("General"), title: "General", level: 2 },
  { id: slugify("Usage"), title: "Usage", level: 2 },
  { id: slugify("Technical"), title: "Technical", level: 2 },
  { id: slugify("Account and Billing"), title: "Account and Billing", level: 2 },
]

const faqs = {
  general: [
    { q: "What is DiagramX?", a: "DiagramX is a web-based, AI-powered diagram and flowchart editor. It lets you create interactive diagrams, database schemas, UML class diagrams, sequence diagrams, and more using a node-based canvas. An AI agent can generate diagrams from natural language descriptions." },
    { q: "Is DiagramX free to use?", a: "DiagramX is currently free to use. Sign up with email or Google OAuth to get started. Future pricing plans may be introduced." },
    { q: "Do I need to install anything?", a: "No. DiagramX runs entirely in your browser. No downloads or installations are required." },
    { q: "What types of diagrams can I create?", a: "DiagramX supports 8 diagram types: Database Schema, DataFlow, Sequence, UML Class, ER, State, Mind Map, and Activity diagrams." },
  ],
  usage: [
    { q: "How do I add nodes to the canvas?", a: "From the workspace editor, use the left panel to select a diagram type and node variant, then click to add it. You can also ask the AI agent (floating chat button) to generate nodes for you." },
    { q: "How do I connect two nodes?", a: "Hover over a node to reveal its connection handles (small circles). Click and drag from a handle to another node's handle to create an edge." },
    { q: "Can I undo an action?", a: "Yes. The editor supports undo functionality through standard keyboard shortcuts (Ctrl+Z / Cmd+Z)." },
    { q: "How do I delete a node or edge?", a: "Select the node or edge by clicking on it, then press the Delete or Backspace key, or use the delete option in the context menu." },
    { q: "Does DiagramX auto-save my work?", a: "Yes. Workspaces auto-save with a 1-second debounce after any change. You never need to manually save." },
  ],
  technical: [
    { q: "What technology powers DiagramX?", a: "DiagramX is built with React 19, TypeScript, Tailwind CSS 4, Vite 8, React Flow (@xyflow/react), Zustand for state management, TanStack Query for server state, and shadcn/ui components. The AI is powered by Groq's LLM (openai/gpt-oss-120b)." },
    { q: "Is my data stored securely?", a: "Yes. Data is transmitted over HTTPS and stored securely on the server. Authentication uses JWT tokens with HTTP-only cookies for session management." },
    { q: "Can I export my diagrams?", a: "Yes. You can export your diagram canvas as a PNG image using the export button in the editor toolbar." },
    { q: "Is there a mobile app?", a: "DiagramX is a web application that works on mobile browsers. A dedicated mobile app is not currently available." },
  ],
  account: [
    { q: "How do I create an account?", a: "Go to the Sign Up page. You can register with your email address (OTP verification) or sign in instantly with Google OAuth." },
    { q: "I forgot my password. How do I reset it?", a: "On the login page, click the 'Forgot Password' link to receive a password reset email or OTP." },
    { q: "Can I delete my account?", a: "Account deletion can be requested by contacting support. Currently, profile settings allow updating your bio, town, and phone number." },
    { q: "How do I log out?", a: "Click the Logout button in the sidebar of your Dashboard to end your session." },
  ],
}

export function DocsFaq() {
  return (
    <>
      <MobileDocsHeader headings={headings} />
      <DocsBreadcrumb />
      <div className="flex gap-10 lg:pt-0">
        <article className="min-w-0 flex-1">
          <h1 id={slugify("FAQ")} className="mt-0 mb-4 scroll-m-26 text-3xl font-bold tracking-tight sm:text-4xl">FAQ</h1>

          <p className="leading-7 [&:not(:first-child)]:mt-4">
            Frequently asked questions about DiagramX. Can not find what you are looking for? 
            Ask the <a href="/" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">AI Assistant</a> or <a href="/contact" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">contact us</a>.
          </p>

          <h2 id={slugify("General")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">General</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.general.map((faq, i) => (
              <AccordionItem key={i} value={`general-${i}`}>
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 id={slugify("Usage")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Usage</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.usage.map((faq, i) => (
              <AccordionItem key={i} value={`usage-${i}`}>
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 id={slugify("Technical")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Technical</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.technical.map((faq, i) => (
              <AccordionItem key={i} value={`tech-${i}`}>
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 id={slugify("Account and Billing")} className="mt-10 mb-3 scroll-m-26 text-2xl font-semibold tracking-tight">Account and Billing</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.account.map((faq, i) => (
              <AccordionItem key={i} value={`account-${i}`}>
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <DocPager />
        </article>
        <TableOfContents items={headings} />
      </div>
    </>
  )
}
