import { chatbotapi } from "@/api/chatbot";
import type { createchatbotstore } from "@/types/chatbot";
import { create } from "zustand";

export const useChatbot = create<createchatbotstore>(() => (
    {
        chatbot: async (message: (string | null)[]) => {
            try {
                const result = await chatbotapi.chatbot(message);
                return result.data;
            }
            catch (err: unknown) {
                throw err;
            }
        },
        agent: async (userid: string, workspaceid: string, message: string) => {
            try {
                const result = await chatbotapi.agent(userid, workspaceid, message);
                return result;
            }
            catch (err: unknown) {
                throw err;
            }
        },
        chatfetch : async (userid : string, workspaceid : string) => {
            try{
                const result = await chatbotapi.chatfetch(userid, workspaceid);
                return result;
            }
            catch(err : unknown) {
                throw err;
            }
        }
    }
))