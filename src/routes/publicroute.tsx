import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/store/authstore";
import { Navigate, Outlet } from "react-router-dom";

export const Publicroute = () => {
    const { userid, sessionReady, loadingFetchUser } = useAuth();

    if (!sessionReady || loadingFetchUser) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Spinner className="size-10" />
            </div>
        )
    }

    if (userid) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
