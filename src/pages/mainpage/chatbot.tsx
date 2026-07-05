import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import type { chatbot } from "@/types/chatbot";
import { Input } from "@/components/ui/input";
import { useChatbot } from "@/store/chatbotstore";


export const Chatbot = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setmessage] = useState<string>("");
    const bottomref = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const [sessionmessage, setsessionmessage] = useState<chatbot[]>([]);

    useEffect(() => {
        bottomref.current?.scrollIntoView({ behavior: "smooth" });
    }, [sessionmessage]);

    const { chatbot } = useChatbot();

    const send = async (text?: string) => {
        if (!text && !message)
            return;
        const messageToSend = text || message;
        setsessionmessage((prev) => [...prev, {
            role: "user",
            message: messageToSend,
        }])

        const historymessage = [...sessionmessage.map((element) => element.message), messageToSend];

        setmessage("");
        setsessionmessage((prev) => [
            ...prev,
            {
                role: "ai",
                message: "Replying",
                loading: true
            }
        ])
        try {
            const aimessage = await chatbot(historymessage);
            setsessionmessage(prev => prev.filter(m => !m.loading));
            if (aimessage.action === "reply") {
                setsessionmessage((prev) => [...prev, {
                    role: "ai",
                    message: aimessage.message,
                    loading: false
                }])
            }
            else if (aimessage.action === "navigate") {
                setsessionmessage((prev) => [...prev, {
                    role: "ai",
                    message: aimessage.message,
                    loading: false
                }]);
                navigate(aimessage.data ?? "");
            }
            else {
                setsessionmessage((prev) => [...prev, {
                    role: "ai",
                    message: aimessage.message,
                    loading: false
                }])
            }
        }
        catch (err: any) {
            setsessionmessage(prev => prev.filter(m => !m.loading));
            setsessionmessage((prev) => [...prev, {
                role: "ai",
                message: err?.response?.data.data || "It seems something went wrong!",
                loading: false
            }])
        }
    }

    return (
        <>
            <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">
                {open && (
                    <div className="max-md:w-75 w-105 h-120 bg-white rounded-2xl shadow-2xl  border  flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between p-4 border-b bg-cyan-500 text-white">
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8 lucide lucide-bot text-white">
                                    <path d="M12 8V4H8"></path>
                                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                    <path d="M2 14h2"></path>
                                    <path d="M20 14h2"></path>
                                    <path d="M15 13v2"></path>
                                    <path d="M9 13v2"></path>
                                </svg>
                                <p className="font-medium text-xl">Ai Assistant</p>
                            </div>
                            <Button
                                size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setOpen(false)}>
                                <X />
                            </Button>
                        </div>
                        <div className="flex-1 flex flex-col p-4 overflow-y-auto text-sm space-y-3">
                            {sessionmessage.length === 0 ? (
                                <div className="flex flex-1 flex-col justify-center items-center">
                                    <div className="rounded-full w-10 h-10 flex justify-center items-center bg-cyan-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-cyan-500">
                                            <path d="M12 8V4H8"></path>
                                            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                            <path d="M2 14h2"></path>
                                            <path d="M20 14h2"></path>
                                            <path d="M15 13v2"></path>
                                            <path d="M9 13v2"></path>
                                        </svg>
                                    </div>
                                    <span className="text-center text-gray-600 text-sm">
                                        Welcome To DiagramX Ai Assistant! Ask me anything related to DiagramX.
                                    </span>
                                    <div className="flex flex-col justify-center items-center mt-5 gap-3">
                                        <Button
                                            onClick={() => send("What can you do?")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            What can you do in DiagramX?
                                        </Button>
                                        <Button
                                            onClick={() => send(" What is this website about?")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            What is this website about?
                                        </Button>
                                        <Button
                                            onClick={() => send("What features are available?")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            What features are available?
                                        </Button>
                                    </div>
                                </div>
                            ) :
                                (sessionmessage.map((element, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-xl font-medium w-fit max-w-[90%] ${element.role === "user" ? "bg-cyan-500 text-white ml-auto" : "bg-gray-100 text-gray-900"
                                            }`}>
                                        {element.loading ?
                                            <h1 className="gradient-text">
                                                {element.message}
                                            </h1>
                                            : element.message}
                                    </div>
                                )))}
                        </div>
                        <div ref={bottomref} />
                        <div className="p-3 border-t flex gap-2">
                            <Input  onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder="Ask something..." className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400" value={message} onChange={(e) => setmessage(e.target.value)} />
                            <Button onClick={() => send()} className="bg-cyan-500 hover:bg-cyan-600">
                                <Send/>
                            </Button>
                        </div>
                    </div>
                )}
                {!open && <Button onClick={() => setOpen(!open)} className="rounded-full size-14 bg-cyan-500 hover:bg-cyan-600 shadow-lg animate-bounce"  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8 lucide lucide-bot text-white">
                        <path d="M12 8V4H8"></path>
                        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                        <path d="M2 14h2"></path>
                        <path d="M20 14h2"></path>
                        <path d="M15 13v2"></path>
                        <path d="M9 13v2"></path>
                    </svg>
                </Button>}
            </div>
            <Outlet />
        </>
    )
}