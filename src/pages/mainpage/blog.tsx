import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const Blog = () => {
    return (
        <>
            <SiteHeader activePage="blog" />
            <main className="w-full h-full bg-linear-to-tl from-cyan-50 to-white min-h-screen pt-16">
                <section className="pt-30 px-4 sm:px-8 md:px-10 lg:px-16 mx-auto flex flex-col gap-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold"><span className="text-cyan-500">D</span>iagram X: Revolutionizing How You Plan Ideas</h1>
                    <p className="text-gray-700 text-[17px]">
                        Diagram X is a node-based diagram and flow editor that helps users plan ideas, workflows, systems, and projects using interactive and customizable diagrams.
                        It allows you to turn abstract concepts into visual structures quickly and intuitively.
                    </p>
                </section>
                <section className="py-10 px-4 sm:px-8 md:px-10 lg:px-16 mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-semibold">Why <span className="text-cyan-500">D</span>iagram X?</h2>
                    <p className="text-gray-700 text-[17px]">
                        In today's fast-paced world, organizing ideas, thoughts and planning clearly is essential for developing and maintaining software. Traditional diagram tools are often clunky and slow.
                        Diagram X provides a flexible and interactive platform where you can create, edit, and connect nodes effortlessly. Whether you are a student, developer, or team leader, Diagram X simplifies the process of turning ideas into actionable plans with complete steps by steps.
                    </p>
                </section>

                <section className="py-10 px-4 sm:px-8 md:px-10 lg:px-16 mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-semibold"><span className="text-cyan-500">K</span>ey Features</h2>
                    <ul className="list-disc ml-6 text-[16px] text-gray-700 space-y-2">
                        <li>Interactive node-based diagram editor</li>
                        <li>Customizable nodes and connections</li>
                        <li>Easy workflow, project, and system planning</li>
                        <li>Visualize complex ideas with clarity</li>
                        <li>Designed for collaboration and sharing</li>
                    </ul>
                </section>

                <section className="py-10 px-4 sm:px-8 md:px-10 lg:px-16 mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-semibold">How <span className="text-cyan-500">D</span>iagram X Helps You</h2>
                    <p className="text-gray-700 text-[17px]">
                        Diagram X turns abstract ideas into structured visuals. It helps you map out processes, brainstorm solutions, and communicate complex workflows effectively.
                        The node-based approach makes it easy to modify and expand diagrams as your projects grow.
                    </p>
                </section>
                <section className="py-10 px-4 sm:px-8 md:px-10 lg:px-16 mx-auto space-y-6 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-semibold">The Future of Diagramming with <span className="text-cyan-500">S</span>oftware</h2>
                    <p className="text-gray-700">
                        The vision for Diagram X is to become the go-to platform for smart visual thinking. With AI-assisted features, improved collaboration, and intuitive design, Diagram X will help individuals and teams move from idea to execution faster than ever.
                    </p>
                </section>
            </main>
            <SiteFooter />
        </>
    )
}
