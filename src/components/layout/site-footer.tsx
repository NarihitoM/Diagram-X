import { Link } from "react-router-dom"
import DiagramXLogo from "@/assets/DiagramX-Icon.png"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
      <div className="w-full px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={DiagramXLogo} alt="Diagram X" className="size-10 rounded" />
              <h2 className="text-3xl font-bold">
                <span className="text-cyan-500">D</span>iagram X
              </h2>
            </div>
            <p className="mt-3 text-[17px] text-gray-600 font-medium">
              Create diagrams, workflows, and ideas with a powerful
              node-based editor built for creators and students.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] mb-3">Product</h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-cyan-500 cursor-pointer">Diagram-X Info</Link>
              <Link to="/blog" className="hover:text-cyan-500 cursor-pointer">Blog</Link>
              <Link to="/contact" className="hover:text-cyan-500 cursor-pointer">About Us</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] mb-3">Legal</h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/terms" className="hover:text-cyan-500 cursor-pointer">Terms and conditions</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-3 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center text-sm font-medium text-gray-600">
          <p className="text-sm">&copy;{new Date().getFullYear()} Diagram X. All rights reserved. Design By Narihito.</p>
        </div>
      </div>
    </footer>
  )
}
