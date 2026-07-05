import { Serverchatbot, Serverdatabase } from "@/config/axioconfig";
import type { Airesponse, returnchatbot, returnchatfetch } from "@/types/chatbot";

export const chatbotapi = {
    chatbot: async (message: (string | null)[]): Promise<returnchatbot> => {
        const response = await Serverchatbot.post("/chat", {
            message
        });
        return response.data;
    },
    agent: async (userid: string, workspaceid: string, message: string): Promise<Airesponse> => {
        const response = await Serverdatabase.post("/chat/api/agent", {
            userid,
            workspaceid,
            message
        });
        return response.data;
    },
    chatfetch: async (userid: string, workspaceid: string): Promise<returnchatfetch> => {
        const response = await Serverdatabase.get("/chat/api/chatfetch", {
            params: {
                userid,
                workspaceid
            }
        })
        return response.data
    }
}