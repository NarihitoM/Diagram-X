import { useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPrevNext } from "@/config/docs"

export function DocPager() {
  const location = useLocation()
  const navigate = useNavigate()
  const { prev, next } = getPrevNext(location.pathname)

  if (!prev && !next) return null

  const goTo = (href: string) => {
    navigate(href)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mt-12 flex items-center justify-between border-t border-border/40 pt-8">
      <div>
        {prev && (
          <button onClick={() => goTo(prev.href)}>
            <Button size="lg" className="gap-2 border border-cyan-500 bg-cyan-500/10 text-cyan-500 py-6 px-3 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.5),0_0_50px_rgba(6,182,212,0.2)]">
              <ChevronLeft className="size-4" />
              <div className="text-left">
                <div className="text-xs">Previous</div>
                <div className="text-sm font-medium">{prev.title}</div>
              </div>
            </Button>
          </button>
        )}
      </div>
      <div>
        {next && (
          <button onClick={() => goTo(next.href)}>
            <Button size="lg" className="gap-2 border border-cyan-500 bg-cyan-500/10 text-cyan-500 py-6 px-3 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.5),0_0_50px_rgba(6,182,212,0.2)]">
              <div className="text-right">
                <div className="text-xs">Next</div>
                <div className="text-sm font-medium">{next.title}</div>
              </div>
              <ChevronRight className="size-4" />
            </Button>
          </button>
        )}
      </div>
    </div>
  )
}
