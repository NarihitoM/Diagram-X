import { updateapi } from "@/api/updateapi";
import type { createupdatestore } from "@/types/updatetype";
import { create } from "zustand";


export const useUpdate = create<createupdatestore>((set) => (
    {
        updateloading : false,
        userupdate : async (userid : string, bio : string, town : string, phone : string) => {
            try{
            set({updateloading : true});
            const result = await updateapi.userupdate(userid, bio,town,phone);
            return result;
            }
            catch(err : unknown){
                throw err;
            }
            finally{
                set({updateloading : false})
            }
        } 
    }
))