import { ChartArea, Check, Settings, Sparkles, type LucideProps } from "lucide-react";

interface Featurelist {
    key : string,
    icon : React.FC<LucideProps>,
    value : string,
    list? : string[]
}

export const Featurelist : Featurelist[] = [
    {
        key : "Diagrams",
        icon : ChartArea,
        value : "Support any types of diagram.",
        list : [
            "Flowchart",
            "Dataflow",
            "DatabaseSchema"
        ]
    },
    {
        key : "Configuration",
        icon : Settings,
        value : "Easy to configure and edit by scrolling and moving nodes."
    },
    {
        key : "Ai Assistant",
        icon : Sparkles,
        value : "Draw diagrams easier and smarter with our Diagram X Ai."
    },
    {
        key : "Free For All",
        icon : Check,
        value : "Completely free to use and manage by teams,workspace.",
        list : [
            "No Creditcard needed",
            "No 3rd Party transaction needed"
        ]
    }
]