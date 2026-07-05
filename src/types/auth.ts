export interface googleuser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale?: string;
}

export interface userinfo {
    success: boolean,
    username: string,
    useremail: string,
    userid: string,
    profileurl: string
    bio : string,
    phone : string,
    town : string,
    message: string
}

export interface returnmessage {
    success: boolean,
    message: string
}

export interface createauth {
    //Variable
    username: string | null,
    useremail: string | null,
    profileurl: string | null,
    userid: string | null,
    session: string | null,
    bio : string | null,
    town : string | null,
    phone : string | null,
    
    //Loading
    loadingFetchUser: boolean,
    loadingLogin: boolean,
    sessionReady: boolean,
    loadingDiagramxlogin : boolean,
    loadingDiagramxsignup : boolean,

    //Function
    diagramxlogin : (useremail : string , userpassword : string) => Promise<string | null | undefined>
    diagramxsignup : (username : string ,useremail : string , userpassword : string) => Promise<string | null | undefined>
    googlelogin: (username: string, useremail: string, userid: string, profileurl: string) => Promise<returnmessage>,
    fetchuser: () => Promise<void>,
    userlogout: () => Promise<returnmessage>
}