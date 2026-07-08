import { Button } from "@/components/ui/button"
import { ArrowRight, Book, ChartBar, CloudLightningIcon, List, Rocket } from "lucide-react"
import { Link } from "react-router-dom"
import '@xyflow/react/dist/style.css';
import { SampleNode } from "@/Templates/samplenode";
import { SampleDatabase, SampleDataflow, SampleSequence, SampleUmlClass, SampleEr, SampleState, SampleMindMap, SampleActivity } from "@/Templates/samplenodesection2";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trustedlist } from "@/features/mainpage/trustedlink";
import { Featurelist } from "@/features/mainpage/featureslist";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useAuth } from "@/store/authstore";


export const MainPage = () => {
    const { userid } = useAuth()
    return (
        <>
            <SiteHeader activePage="home" />
            <main className="h-full w-full pt-16">
                <section className="bg-linear-to-t from-cyan-50 to-white flex max-md:flex-col justify-between max-md:justify-center max-md:py-30 items-center min-h-screen px-4 sm:px-8 md:px-10 lg:px-16">
                    <div className="flex flex-col px-4 sm:px-8 md:px-10 lg:px-16 items-start max-md:items-center gap-4">
                        <Button className="bg-cyan-500 rounded-full shadow-[3px_3px_5px_0_cyan] text-[16px] animate-bounce">Diagram X</Button>
                        <h1 className="font-bold max-md:text-4xl md:text-5xl xl:text-6xl max-md:text-center">
                            Work your projects and create ideas with
                            <span className="text-cyan-500"> Diagram X</span>
                        </h1>
                        <p className="text-[18px] max-md:text-center font-medium">
                            A customizable flowchart, diagram, schema with node-based editor and interactive diagrams.
                        </p>
                        <div className="flex justify-center items-center gap-4 max-md:w-full">
                            <Link to={userid ? "/dashboard" : "/login"}>
                                <Button className="bg-cyan-500 hover:bg-cyan-600 flex items-center gap-2">
                                    <CloudLightningIcon /> Quick Start
                                </Button>
                            </Link>
                            <Link to="/docs">
                                <Button variant="secondary" className="flex items-center gap-2">
                                    <Book />
                                    Read Documents
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5 w-full h-110 ">
                        <SampleNode />
                    </div>
                </section>
                <section className="flex flex-col min-h-screen  gap-10 py-20">
                    <div className="flex flex-col gap-3 px-4 sm:px-8 md:px-10 lg:px-16">
                        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Stop fighting with static <span className="text-cyan-500">Diagrams!</span>
                        </h1>
                        <p className="font-medium text-[18px]">
                            <span className="font-medium text-cyan-500">Diagram X</span> lets you build interactive, flexible workflow diagrams with custom or non-custom node that evolve
                            with your ideas.
                        </p>
                        <Link to={userid ? "/dashboard" : "/login"}>
                            <Button className="bg-cyan-500 hover:bg-cyan-600 w-30 flex items-center gap-2">
                                Get Started
                            </Button>
                        </Link>
                        <div className="max-md:flex grid grid-cols-2 mt-10 max-md:flex-col max-md:items-center max-md:justify-center gap-3">
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">Dataflow</span> Schema</h1>
                                <SampleDataflow />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">Database</span> Schema</h1>
                                <SampleDatabase />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">Sequence</span> Diagram</h1>
                                <SampleSequence />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">UML Class</span> Diagram</h1>
                                <SampleUmlClass />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">ER</span> Diagram</h1>
                                <SampleEr />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">State</span> Diagram</h1>
                                <SampleState />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">Mind Map</span> Diagram</h1>
                                <SampleMindMap />
                            </div>
                            <div className="flex flex-col w-full gap-3 h-80">
                                <h1 className="text-base sm:text-lg md:text-xl font-medium"><span className="text-cyan-500">Activity</span> Diagram</h1>
                                <SampleActivity />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col bg-linear-to-tr from-white to-cyan-50  gap-20 min-h-screen px-4 sm:px-8 md:px-10 lg:px-16 items-center py-20">
                    <div className="flex flex-row justify-center gap-3 items-center">
                        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                            Trusted By
                        </h1>
                        <ChartBar className="text-cyan-500 size-8" />
                    </div>
                    <div className="grid grid-cols-3 max-md:gap-10 gap-25">
                        {Trustedlist.map((element,index) => (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <h1 className="text-4xl max-md:text-2xl text-cyan-500 font-bold">{element.value}</h1>
                                <p className="text-xl font-medium text-center">{element.key}</p>
                            </div>
                        ))}
                    </div>
                    <p className="font-medium text-[19px] text-center">Diagram X is a popular workflow diagram editior which has been widely used by <span className="font-bold text-cyan-500">100K+</span>
                        users as of this month and chosen by <span className="font-bold text-cyan-500">10+</span> companies.{<br />}This platform is also supported by <span className="font-bold text-cyan-500">ReactFlow.</span></p>
                    <Link to={userid ? "/dashboard" : "/login"}>
                        <Button className="bg-cyan-500 hover:bg-cyan-700 max-md:w-full rounded-full">
                            Start Building With Diagram X <ArrowRight />
                        </Button>
                    </Link>
                </section>
                <section className="flex flex-col items-center bg-linear-to-br from-white to-cyan-50  gap-10 min-h-screen py-20 px-4 sm:px-8 md:px-10 lg:px-16">
                    <div className="flex flex-row justify-center gap-3 items-center">
                        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">Features
                        </h1>
                        <List className="size-8 text-cyan-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        {Featurelist.map((element,index) => {
                            const Icon = element.icon;
                            return (
                                <Card key={index} className="hover:scale-105 transition-all ">
                                    <CardHeader>
                                        <CardTitle className="text-2xl max-md:text-xl">{element.key}</CardTitle>
                                        <CardAction><Icon className="text-cyan-500" /></CardAction>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            <h1>{element.value}</h1>
                                            {element.list &&
                                                <ul className="list-disc">
                                                    {element.list.map((element,index) => (
                                                        <li key={index} className="list-inside">{element}</li>
                                                    ))}
                                                </ul>}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>
                <section className="flex flex-col items-center bg-linear-to-bl from-cyan-0 to-white gap-20  py-20 px-4 sm:px-8 md:px-10 lg:px-16">
                    <div className="flex flex-row items-center gap-3">
                        <h1 className="font-semibold text-5xl max-md:text-3xl">Let's Get Started!</h1>
                        <Rocket className="text-cyan-500 size-8"/>
                    </div>
                    <Link to={userid ? "/dashboard" : "/signup"}>
                        <Button className="bg-cyan-500 rounded-full hover:bg-cyan-600">Click here to sign up today and start<ArrowRight/></Button>
                    </Link>
                </section>
            </main >
            <SiteFooter />
        </>
    )
}

