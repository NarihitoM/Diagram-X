import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GalleryVerticalEnd, Menu, User } from "lucide-react"
import { Link } from "react-router-dom"

export const Blog = () => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 flex p-3 justify-between items-center border-b border-black/15 bg-white/10 backdrop-blur-md">
                <div className="flex flex-row items-center gap-2">
                    <GalleryVerticalEnd className="bg-cyan-500 size-10 p-2 rounded-lg text-white" />
                    <h1 className="font-bold text-xl"><span className="text-cyan-500">D</span>iagram X</h1>
                    <div className="hidden md:flex items-center gap-4 ml-5">
                        <Link to="/" className="text-muted-foreground font-medium">DiagramX</Link>
                        <Link to="/blog" className="text-muted-foreground font-medium">Blog</Link>
                        <Link to="/contact" className="text-muted-foreground font-medium">Contact Us</Link>
                    </div>
                </div>
                <div className="flex flex-row">
                    <Link className="bg-cyan-500 flex items-center p-2 font-medium rounded-lg text-sm text-white max-md:hidden" to="/signup">
                        <User className="size-4 mr-1" />
                        Sign Up
                    </Link>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden">
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-full">
                                <nav className="flex flex-col items-center justify-center h-full gap-5 text-xl font-medium">
                                    <SheetClose asChild>
                                        <Link to="/" className="text-muted-foreground font-medium">DiagramX</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/blog" className="text-muted-foreground font-medium">Blog</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/contact" className="text-muted-foreground font-medium">Contact Us</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link className="bg-cyan-500 flex items-center p-2 font-medium rounded-lg text-sm text-white" to="/signup">
                                            <User className="size-4 mr-1" />
                                            Sign Up
                                        </Link>
                                    </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <main className="w-full h-full bg-linear-to-tl from-cyan-50 to-white  min-h-screen">
                <section className="pt-30 px-10 mx-auto flex flex-col gap-6">
                    <h1 className="max-md:text-4xl text-5xl font-bold"><span className="text-cyan-500">D</span>iagram X: Revolutionizing How You Plan Ideas</h1>
                    <p className="text-gray-700 text-[17px]">
                        Diagram X is a node-based diagram and flow editor that helps users plan ideas, workflows, systems, and projects using interactive and customizable diagrams.
                        It allows you to turn abstract concepts into visual structures quickly and intuitively.
                    </p>
                </section>
                <section className="py-10 px-10  mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-3xl font-semibold">Why <span className="text-cyan-500">D</span>iagram X?</h2>
                    <p className="text-gray-700 text-[17px]">
                        In today's fast-paced world, organizing ideas, thoughts and planning clearly is essential for developing and maintaining software. Traditional diagram tools are often clunky and slow.
                        Diagram X provides a flexible and interactive platform where you can create, edit, and connect nodes effortlessly. Whether you are a student, developer, or team leader, Diagram X simplifies the process of turning ideas into actionable plans with complete steps by steps.
                    </p>
                </section>

                <section className="py-10 px-10  mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-3xl font-semibold"><span className="text-cyan-500">K</span>ey Features</h2>
                    <ul className="list-disc ml-6 text-[16px] text-gray-700 space-y-2">
                        <li>Interactive node-based diagram editor</li>
                        <li>Customizable nodes and connections</li>
                        <li>Easy workflow, project, and system planning</li>
                        <li>Visualize complex ideas with clarity</li>
                        <li>Designed for collaboration and sharing</li>
                    </ul>
                </section>

                <section className="py-10 px-10  mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-3xl font-semibold">How <span className="text-cyan-500">D</span>iagram X Helps You</h2>
                    <p className="text-gray-700 text-[17px]">
                        Diagram X turns abstract ideas into structured visuals. It helps you map out processes, brainstorm solutions, and communicate complex workflows effectively.
                        The node-based approach makes it easy to modify and expand diagrams as your projects grow.
                    </p>
                </section>
                <section className="py-10 px-10 mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-3xl font-semibold">The Future of Diagramming with <span className="text-cyan-500">S</span>oftware</h2>
                    <p className="text-gray-700">
                        The vision for Diagram X is to become the go-to platform for smart visual thinking. With AI-assisted features, improved collaboration, and intuitive design, Diagram X will help individuals and teams move from idea to execution faster than ever.
                    </p>
                </section>
            </main>
            <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
                <div className="w-full px-10 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
                        <div>
                            <h2 className="text-3xl font-bold ">
                                <span className="text-cyan-500">D</span>iagram X
                            </h2>
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
                        <p className="text-sm">©{new Date().getFullYear()} Diagram X. All rights reserved. Design By Narihito.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}