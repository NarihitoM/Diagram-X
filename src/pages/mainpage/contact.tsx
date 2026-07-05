import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Contact2, GalleryVerticalEnd, Github, Mail, Menu, User } from "lucide-react"
import { Link } from "react-router-dom"

export const Contact = () => {
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
            <section className="min-h-screen w-full h-full flex flex-col py-20">
                <div className="pt-10 flex flex-col gap-5 items-center">
                    <div className="flex flex-row justify-center gap-3 items-center">
                        <h1 className="font-semibold text-4xl">Contact Us
                        </h1>
                        <Contact2 className="size-8 text-cyan-500" />
                    </div>
                    <div className="bg-white w-4/5 p-5 rounded-lg border border-gray-200 flex justify-between max-md:flex-col max-md:items-center max-md:justify-center gap-10">
                        <div className="flex flex-col p-5 rounded-lg bg-cyan-500">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-2xl xl:text-3xl text-white font-medium">Contact Information</h1>
                                <p className="text-white">We'll create a better app with your suggestions and improvements.</p>
                            </div>
                            <div className="pt-10 flex gap-3">
                                <Mail className="text-white" />
                                <p className="text-white">heinboss234@gmail.com</p>
                            </div>
                            <div className="pt-5 flex gap-3">
                                <Github className="text-white" />
                                <p className="text-white">NarihitoM</p>
                            </div>
                        </div>
                        <div className="w-full">
                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Write your message..."
                                        className="min-h-30"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full text-white bg-cyan-500 hover:bg-cyan-600">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
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