import { QueryClient } from "@tanstack/react-query"

export const State = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime : 15 * 1000,
        },
    }
});