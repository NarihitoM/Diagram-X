import { Serverdatabase } from "@/config/axioconfig";
import type { returnmessage } from "@/types/auth";
import type { workspacefetch, workspaceid } from "@/types/workspace";

export const workspaceapi = {
    workspacecreate: async (userid: string, spacename: string): Promise<returnmessage> => {
        const response = await Serverdatabase.post("workspace/api/workspacecreate", {
            userid,
            spacename
        })
        return response.data;
    },
    workspacefetch: async (userid: string): Promise<workspacefetch> => {
        const response = await Serverdatabase.get("workspace/api/workspacefetch", {
            params: {
                userid
            }
        })
        return response.data;
    },
    workspacedelete: async (userid: string, workspaceid: string): Promise<returnmessage> => {
        const response = await Serverdatabase.post("workspace/api/workspacedelete", {
            userid,
            workspaceid
        })
        return response.data;
    },
    workspaceidfetch: async (workspaceid: string): Promise<workspaceid> => {
        const response = await Serverdatabase.get("workspace/api/workspaceidfetch", {
            params: {
                workspaceid
            }
        })
        return response.data;
    },
    workspaceupdate: async (userid: string, workspaceid: string, nodes: any[], edges: any[]): Promise<returnmessage> => {
        const response = await Serverdatabase.post("workspace/api/workspaceupdate", {
            userid,
            workspaceid,
            nodes,
            edges, 
        })
        return response.data;
    }
}