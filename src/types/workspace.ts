import type { returnmessage } from "./auth"

export interface workspace {
    _id: string
    spacename: string,
    date: string
}

export interface workspacefetch {
    success: boolean,
    data: workspace[]
}

export interface workspaceid {
    success: boolean,
    message? : string,
    data: {
        nodes: [string],
        edges: [string],
        chathistory: [string]
    }
}

export interface workspacedata {
    nodes: [string],
    edges: [string],
    chathistory: [string]
}

export interface createworkspace {
    Workspacedata: workspace[],
    Workspaceiddata: workspacedata | null,
    loadingfetchworkspace: boolean,
    loadingworkspacecreate: boolean,
    loadingworkspacedelete: boolean,
    loadingworkspaceidfetch: boolean,
    error : string | null,
    workspacecreate: (userid: string, spacename: string) => Promise<returnmessage>,
    workspacefetch: (userid: string) => Promise<void>,
    workspacedelete: (userid: string, workspaceid: string) => Promise<returnmessage>,
    workspaceidfetch: (workspaceid: string) => Promise<void>,
    workspaceupdate: (userid: string, workspaceid: string, nodes: any[], edges: any[]) => Promise<returnmessage>
}