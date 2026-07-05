import type { returnmessage } from "./auth";

export interface createupdatestore {
    updateloading : boolean,
    userupdate : (userid : string, bio : string, town : string , phone : string) => Promise<returnmessage>
}