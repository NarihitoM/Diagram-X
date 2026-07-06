import { Outlet } from "react-router-dom"
import { DocsNavbar } from "@/components/docs/navbar"
import { DocsSidebar } from "@/components/docs/sidebar"
import { Footer } from "@/components/docs/footer"
import { ScrollToTop } from "@/components/docs/scroll-to-top"

export function DocsLayout() {
  return (
    <>
      <DocsNavbar />
      <ScrollToTop />
      <div className="flex flex-1 pt-16">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-6 py-8 sm:px-10 lg:pl-14 lg:pr-10">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
