import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspace } from "@/store/workspacestore";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Layers, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/authstore";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Workspacemenu = () => {
    const navigate = useNavigate();

    const { userid } = useAuth();
    const { Workspacedata, loadingfetchworkspace, loadingworkspacecreate, loadingworkspacedelete, workspacecreate, workspacedelete, workspacefetch } = useWorkspace();
    const [open, setOpen] = useState<boolean>(false);
    const [workspacename, setWorkspacename] = useState<string>("");
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [deleteid, setDeleteid] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refresh, setrefresh] = useState<boolean>(false);
    const pageSize = 5;

    const handlecreate = async () => {
        try {
            const result = await workspacecreate(userid ?? "", workspacename);
            if (result.success) {
                setOpen(false);
                setWorkspacename("");
                setSearchTerm("");
                toast.success(result.message);
            }
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "It seems something went wrong!")
        }
        finally {
            setrefresh(prev => !prev);
        }
    }

    const handleDelete = async () => {
        try {
            const result = await workspacedelete(userid ?? "", deleteid);
            if (result.success) {
                setOpenDelete(false);
                toast.success(result.message);
            }
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "It seems something went wrong!")
        }
        finally {
            setrefresh(prev => !prev);
        }
    }

    useEffect(() => {
        if (userid) {
            workspacefetch(userid);
        }
    }, [userid, refresh]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "bg-cyan-500 text-white shadow-lg rounded-lg p-4",
                    duration: 4000,
                }}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-600">Create New Space</h2>
                        <div className="flex flex-col mt-2">
                            <Label htmlFor="space-name" className="mb-2 font-medium text-gray-700">Space Name</Label>
                            <Input value={workspacename} onChange={(e) => setWorkspacename(e.target.value)} placeholder="Enter space name" className="mb-4" />
                        </div>
                        <div className="flex justify-end">
                            <Button disabled={loadingworkspacecreate} className="mr-2 bg-cyan-500 hover:bg-cyan-700 text-white" onClick={handlecreate}>{loadingworkspacecreate ? "Creating..." : "Create"}</Button>
                            <DialogClose asChild>
                                <Button variant="outline" className="rounded-md px-4 py-2">
                                    Close
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div >
                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogContent className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-600">Delete Workspace</h2>
                        <div className="flex flex-col mt-2">
                            <Label htmlFor="space-name" className="mb-2 font-medium text-gray-700">Are you sure you want to delete this workspace?</Label>
                        </div>
                        <div className="flex justify-end">
                            <Button disabled={loadingworkspacedelete} className="mr-2 bg-cyan-500 text-white hover:bg-cyan-700" onClick={handleDelete}>{loadingworkspacedelete ? "Deleting..." : "Delete"}</Button>
                            <DialogClose asChild>
                                <Button variant="outline" className="rounded-md px-4 py-2">
                                    Close
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold"><span className="text-cyan-500">P</span>ersonal Workspace</h1>
                        <p className="text-lg font-medium text-gray-500">
                            This is your personal workspace account.
                        </p>
                    </div>
                    <Button className="bg-cyan-500 mt-3 text-white hover:bg-cyan-700" onClick={() => setOpen(true)}>                                            
                        <Layers className="text-white h-4 w-4" />
                        Create Space</Button>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex gap-3">
                        <Input
                            className="w-full"
                            placeholder="Search Workspace"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {loadingfetchworkspace ? (
                    <>
                        <Skeleton className="p-10 rounded-lg  mt-2" />
                        <Skeleton className="p-10 rounded-lg  mt-2" />
                        <Skeleton className="p-10 rounded-lg  mt-2" />
                        <Skeleton className="p-10  rounded-lg  mt-2" />
                    </>
                ) : Array.isArray(Workspacedata) && Workspacedata.length > 0 ? (
                    (() => {
                        const filtered = Workspacedata.filter((ws) =>
                            ws.spacename.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        if (filtered.length === 0) {
                            return <div>There is no workspaces that match with your search.</div>;
                        }
                        const totalPages = Math.ceil(filtered.length / pageSize);
                        const start = (currentPage - 1) * pageSize;
                        const pageItems = filtered.slice(start, start + pageSize);
                        return (
                            <>
                                {pageItems.map((workspace, index) => (
                                    <div
                                        key={workspace._id ?? index}
                                        className="p-3 border rounded-lg mt-1 bg-white cursor-pointer hover:bg-gray-50 hover:border-cyan-400 hover:shadow-md transition-all duration-200"
                                        onClick={() => navigate(`/dashboard/workspace/${workspace._id}`)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-800">
                                                {workspace.spacename}
                                            </span>
                                            <span className="flex flex-col gap-2 text-sm text-gray-500">
                                                <Button variant="destructive" onClick={(e) => {
                                                    setDeleteid(workspace._id);
                                                    setOpenDelete(true);
                                                    e.stopPropagation();
                                                }}><Trash /></Button>
                                                {new Date(workspace.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-end gap-5 items-center  mt-4">
                                    <Button
                                        className=" bg-cyan-600 hover:bg-cyan-700 rounded disabled:opacity-70"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        className=" bg-cyan-600 hover:bg-cyan-700 rounded disabled:opacity-70"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        );
                    })()
                ) : (
                    <div>No workspaces found.</div>
                )}
            </div>
        </>
    )
}

