export interface chatbot {
    role : string,
    message : string | null,
    content? : string | null,
    loading? : boolean
}

export interface Airesponse {
    success : boolean,
    data : {
        message : string,
        action? : string,
        nodes? : any[],
        edges? : any[]
    }
}

export interface returnchatfetch {
    success : boolean,
    data : chatbot[]
}

interface returnchatbotfunction {
    action : string,
    data? : string,
    message : string
}

export interface returnchatbot {
    success : boolean,
    data : returnchatbotfunction
}



export interface createchatbotstore {
    chatbot : (message : (string | null)[]) => Promise<returnchatbotfunction>,
    agent : (userid : string, workspaceid : string, message : string) => Promise<Airesponse>,
    chatfetch : (userid : string, workspaceid : string) => Promise<returnchatfetch>
}