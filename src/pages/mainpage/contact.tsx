import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Contact2, Github, Mail } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const Contact = () => {
    return (
        <>
            <SiteHeader activePage="contact" />
            <section className="min-h-screen w-full h-full flex flex-col py-20 pt-36">
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
            <SiteFooter />
        </>
    )
}
