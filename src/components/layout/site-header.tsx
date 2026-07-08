import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { useAuth } from "@/store/authstore"
import DiagramXLogo from "@/assets/DiagramX-Icon.png"

type Page = "home" | "docs" | "blog" | "contact"

export function SiteHeader({ activePage }: { activePage?: Page }) {
  const { userid } = useAuth()

  const linkClass = (page: Page) =>
    `${page === activePage ? "text-cyan-500" : "text-muted-foreground"} font-medium`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between border-b border-black/15 bg-white/10 backdrop-blur-md px-3 sm:px-5 md:px-6 lg:px-8">
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        <img src={DiagramXLogo} alt="Diagram X" className="size-10 sm:size-12 md:size-15 rounded-lg" />
        <h1 className="font-bold text-lg sm:text-xl"><span className="text-cyan-500">D</span>iagram X</h1>
        <div className="hidden md:flex items-center gap-3 lg:gap-5 ml-3 lg:ml-5">
          <Link to="/" className={linkClass("home")}>DiagramX</Link>
          <Link to="/docs" className={linkClass("docs")}>Docs</Link>
          <Link to="/blog" className={linkClass("blog")}>Blog</Link>
          <Link to="/contact" className={linkClass("contact")}>Contact Us</Link>
        </div>
      </div>
      <div className="flex flex-row">
        <Link className="bg-cyan-500 flex items-center p-2 font-medium rounded-lg text-sm text-white max-md:hidden" to={userid ? "/dashboard" : "/signup"}>
          <User className="size-4 mr-1" />
          {userid ? "Dashboard" : "Sign Up"}
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-full">
              <nav className="flex flex-col items-center justify-center h-full gap-5 text-xl font-medium">
                <SheetClose asChild>
                  <Link to="/" className={linkClass("home")}>DiagramX</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/docs" className={linkClass("docs")}>Docs</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/blog" className={linkClass("blog")}>Blog</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/contact" className={linkClass("contact")}>Contact Us</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="bg-cyan-500 flex items-center p-2 font-medium rounded-lg text-sm text-white" to={userid ? "/dashboard" : "/signup"}>
                    <User className="size-4 mr-1" />
                    {userid ? "Dashboard" : "Sign Up"}
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
