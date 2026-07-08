import { SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { User2Icon, LayoutDashboard, LogOut, Layers } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/store/authstore";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import DiagramXLogo from "@/assets/DiagramX-Icon.png";


export const Sidebarrender = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { username, profileurl, useremail, userlogout } = useAuth();

    const handlelogout = async () => {
        try {
            const result = await userlogout();
            localStorage.removeItem("isLoggedIn");
            toast.success(result.message || "Log out successful!");
            navigate("/login", { replace: true });
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "It seems something went wrong");
        }
    }
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "bg-cyan-500 text-white shadow-lg rounded-lg p-4",
                    duration: 4000,
                }}
            />
            <SidebarProvider>
                <Sidebar collapsible="icon">
                    <SidebarHeader className="flex w-full justify-between">
                        <div className="flex w-full items-center">
                            <SidebarTrigger />
                        </div>
                    </SidebarHeader>
                    <SidebarContent style={{ scrollbarWidth: "none" }}>
                        <SidebarGroup className="max-md:hidden">
                            <SidebarGroupLabel className="text-2xl fond-bold text-black dark:text-white flex items-center gap-2">
                                <img src={DiagramXLogo} alt="Diagram X" className="size-8 rounded" />
                                Diagram-X
                            </SidebarGroupLabel>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => navigate("/dashboard")}>
                                            <LayoutDashboard className="text-cyan-500 h-4 w-4 " />
                                            <span className={`${location.pathname === "/dashboard" ? "font-medium text-cyan-500" : ""}`}>Dashboard</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => navigate("/dashboard/workspace")}>
                                            <Layers className="text-cyan-500 h-4 w-4" />
                                            <span className={`${location.pathname.startsWith("/dashboard/workspace") ? "font-medium text-cyan-500" : ""}`}>Workspace</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                               
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="flex items-center justify-between">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="border-t flex items-center w-full gap-2 py-2 hover:bg-black/15 rounded-lg">
                                        <Avatar className="shrink-0">
                                            <AvatarImage src={profileurl || undefined} className="w-8 h-8 rounded-full" />
                                            <AvatarFallback className=" bg-cyan-500 text-white dark:text-white">
                                                {username?.substring(0, 1).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col text-left truncate mr-5">
                                            <span className="text-sm font-medium">{username}</span>
                                            <span className="text-xs text-muted-foreground">{useremail}</span>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="end" className="w-40">
                                    <DropdownMenuLabel>{username} </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                                        <User2Icon className="text-cyan-500 h-4 w-4 mr-2" />
                                        <span className={`${location.pathname === "/dashboard/profile" ? "font-medium text-cyan-500" : ""}`}>Profile</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handlelogout} >
                                        <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <div className="z-10 fixed py-3 px-3 sm:px-4 top-0 left-0 w-full  bg-white flex flex-row items-center gap-3 border-b md:hidden ">
                        <SidebarTrigger className="md:hidden" />
                    </div>
                    <main className="flex flex-col px-3 sm:px-4 md:px-5 lg:px-6 py-15 md:py-4">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}