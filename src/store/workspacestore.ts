import { create } from "zustand";
import { type createworkspace } from "@/types/workspace";
import { workspaceapi } from "@/api/workspaceapi";

export const useWorkspace = create<createworkspace>((set) => ({
    Workspacedata: [],
    Workspaceiddata: null,
    loadingfetchworkspace: false,
    loadingworkspacecreate: false,
    loadingworkspacedelete: false,
    loadingworkspaceidfetch: true,
    error: null,
    workspacecreate: async (userid: string, spacename: string) => {
        try {
            set({ loadingworkspacecreate: true });
            const result = await workspaceapi.workspacecreate(userid, spacename);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingworkspacecreate: false })
        }
    },
    workspacefetch: async (userid: string) => {
        try {
            set({ loadingfetchworkspace: true });
            const result = await workspaceapi.workspacefetch(userid);
            if (result.success) {
                set({ Workspacedata: result.data });
            }
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingfetchworkspace: false })
        }
    },
    workspacedelete: async (userid: string, workspaceid: string) => {
        try {
            set({ loadingworkspacedelete: true });
            const result = await workspaceapi.workspacedelete(userid, workspaceid);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingworkspacedelete: false })
        }
    },
    workspaceidfetch: async (workspaceid: string) => {
        try {
            set({ loadingworkspaceidfetch: true, error: null });

            const result = await workspaceapi.workspaceidfetch(workspaceid);

            if (result.success && result.data) {
                set({
                    Workspaceiddata: result.data,
                    error: null
                });
            }
            else {
                set({
                    Workspaceiddata : null,
                    error : result.message
                })
            }
        } catch (err: unknown) {
            console.error(err);

        } finally {
            set({ loadingworkspaceidfetch: false });
        }
    },
    workspaceupdate: async (userid: string, workspaceid: string, nodes: any[], edges: any[]) => {
        try {
            const result = await workspaceapi.workspaceupdate(userid, workspaceid, nodes, edges);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
    }
}))