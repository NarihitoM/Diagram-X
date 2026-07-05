import { Serverdatabase } from "@/config/axioconfig";
import type { googleuser, returnmessage, userinfo } from "@/types/auth";
import type { TokenResponse } from "@react-oauth/google";
import axios from "axios";

export const authapi = {
    googletoken: async (response: TokenResponse) : Promise<googleuser> => {
        const res = await axios.get<googleuser>("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${response.access_token}`
            }
        })
        return res.data;
    },
    googlelogin : async (username : string, useremail : string , userid : string, profileurl : string) : Promise<returnmessage> => {
        const response = await Serverdatabase.post("/api/googlelogin",{
            username,
            useremail,
            userid,
            profileurl,
        })
        return response.data;
    },
    diagramxsignup : async (username : string , useremail : string , userpassword : string) : Promise<returnmessage> => {
        const response = await Serverdatabase.post("/api/signup",{
            username,
            useremail,
            userpassword
        })
        return response.data;
    },
    diagramxlogin : async (useremail : string, userpassword : string) : Promise<returnmessage> => {
        const response = await Serverdatabase.post("/api/login",{
            useremail,
            userpassword
        })
        return response.data;
    },
    fetchuser : async () : Promise<userinfo> => {
        const response = await Serverdatabase.get("/api/fetch");
        return response.data;
    },
    logout : async () : Promise<returnmessage> => {
        const response = await Serverdatabase.post("/api/logout");
        return response.data;
    }
}