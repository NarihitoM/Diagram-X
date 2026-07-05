import { Serverdatabase } from "@/config/axioconfig"
import type { returnmessage } from "@/types/auth"

export const updateapi = {
    userupdate: async (userid : string, bio: string, town: string, phone: string): Promise<returnmessage> => {
        const response = await Serverdatabase.post("/update/api/update", {
            userid,
            bio,
            town,
            phone
        })
        return response.data
    }
}