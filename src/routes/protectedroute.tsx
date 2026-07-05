import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/store/authstore";
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom";

export const Protectedroute = () => {

    const { userid, fetchuser, loadingFetchUser, sessionReady } = useAuth();

    useEffect(() => {
       fetchuser()
    },[])

    if (!sessionReady || loadingFetchUser) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Spinner className="size-10" />
            </div>
        )
    }

    if (!userid) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}