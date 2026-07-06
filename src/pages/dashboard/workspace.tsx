import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    Background,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { Send, Trash, X, Download } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { nodeTypes } from "@/Templates/samplenodesection2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/store/workspacestore";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/store/authstore";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useChatbot } from "@/store/chatbotstore";
import type { chatbot } from "@/types/chatbot";

const NodeItemsEditor = ({ items, itemInput, setItemInput, addItem, removeItem, placeholder }: any) => (
    <>
        <div className="flex gap-2">
            <Input value={itemInput} onChange={(e) => setItemInput(e.target.value)}
                placeholder={placeholder || "Add field/item"}
                className="flex-1 px-2 py-1 border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200" />
            <Button onClick={addItem} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition">Add</Button>
        </div>
        <ul className="mt-4 space-y-2">
            {Array.isArray(items) && items.length > 0 ? items.map((it: string, idx: number) => (
                <li key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-sm">
                    <span className="text-sm text-gray-700">{it}</span>
                    <button onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 transition" title="Remove">
                        <Trash className="w-4 h-4" />
                    </button>
                </li>
            )) : <div className="text-sm text-gray-400">No items</div>}
        </ul>
    </>
);

const NodeOption = ({ icon, label, desc, onClick }: { icon: React.ReactNode; label: string; desc: string; onClick: () => void }) => (
    <div onClick={onClick}
        className="group cursor-pointer rounded-xl border bg-white p-4 hover:border-cyan-400 hover:shadow-md transition-all duration-200"
    >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-100 transition">
                {icon}
            </div>
            <div>
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
    </div>
);

export const Workspace = () => {

    const { workspaceid } = useParams();
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [itemInput, setItemInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [nodeSearch, setNodeSearch] = useState<string>("");
    const scroll = useRef<HTMLDivElement | null>(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

    const exportImage = useCallback(() => {
        if (!reactFlowWrapper.current) return;
        toPng(reactFlowWrapper.current, {
            backgroundColor: '#ffffff',
            quality: 1,
            pixelRatio: 3,
            cacheBust: true,
            filter: (node) => {
                const excluded = node?.classList?.contains('react-flow__attribution');
                return !excluded;
            },
        }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `diagram-${workspaceid || 'export'}.png`;
            link.href = dataUrl;
            link.click();
            toast.success('Image exported successfully!');
        }).catch(() => {
            toast.error('Failed to export image');
        });
    }, [workspaceid]);


    const [openchat, setOpenchat] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [messages, setMessages] = useState<chatbot[]>([]);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const { userid } = useAuth();
    const { workspaceupdate, workspaceidfetch, Workspaceiddata, loadingworkspaceidfetch, error } = useWorkspace();
    const { agent, chatfetch } = useChatbot();

    useEffect(() => {
        if (!workspaceid || !userid) return;

        const fetchMessages = async () => {
            try {
                const data = await chatfetch(userid, workspaceid);
                if (data.success) {
                    setMessages(data.data);
                }
            } catch (err) {
                console.error("Error fetching chat:", err);
            }
        };

        fetchMessages();
    }, [workspaceid, userid]);


    const sendMessage = async (text?: string) => {
        const finalmessage = text ?? message;
        if (!finalmessage.trim()) return;

        setMessage("");

        setMessages((prev) => [...prev, { role: "user", message: finalmessage, loading: false },]);
        setMessage("");
        setMessages((prev) => [...prev, { role: "ai", message: "Replying", loading: true }])

        try {
            const aimessage = await agent(userid ?? "", workspaceid ?? "", finalmessage);

            setMessages((prev) => [...prev.filter(m => !m.loading)]);
            if (aimessage.success) {
                if (aimessage.data.action === "node") {
                    setNodes(aimessage.data.nodes || []);
                    setEdges(aimessage.data.edges || []);
                    setMessages(prev => [
                        ...prev,
                        {
                            role: "ai",
                            message: aimessage.data.message ?? "",
                            loading: false
                        }
                    ]);
                }
                else {
                    setMessages(prev => [
                        ...prev,
                        {
                            role: "ai",
                            message: aimessage.data.message ?? "",
                            loading: false
                        }
                    ]);
                }
            }
        }
        catch (err: any) {
            setMessages(prev => [
                ...prev.filter(m => !m.loading),
                {
                    role: "ai",
                    message:
                        err?.response?.data?.message ??
                        "It seems something went wrong",
                    loading: false
                }
            ]);
        }
    };

    useEffect(() => {
        if (workspaceid) {
            workspaceidfetch(workspaceid);
        }
    }, [workspaceid, workspaceidfetch]);

    useEffect(() => {
        if (selectedNodeId || selectedEdgeId) {
            scroll.current?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [selectedNodeId, selectedEdgeId]);


    useEffect(() => {
        if (Workspaceiddata) {
            setNodes(Workspaceiddata.nodes ?? []);
            setEdges(Workspaceiddata.edges ?? []);
        }
    }, [Workspaceiddata, setNodes, setEdges]);

    const saveTimer = useRef<any>(null);

    useEffect(() => {
        if (!workspaceid || !Workspaceiddata) return;

        if (saveTimer.current) clearTimeout(saveTimer.current);

        saveTimer.current = setTimeout(async () => {
            try {
                const result = await workspaceupdate(
                    userid ?? "",
                    workspaceid,
                    nodes,
                    edges,
                );
                if (!result.success) {
                    toast.error(result.message);
                }
            }
            catch (err: any) {
                toast.error(err?.response?.data?.message || "It seems something went wrong!")
            }
        }, 1000);
    }, [nodes, edges, workspaceid, userid, Workspaceiddata, workspaceupdate]);

    const onConnect = (params: any) =>
        setEdges((eds) =>
            addEdge(
                {
                    ...params,
                    label: "Enter Relation",
                    animated: true,
                    style: { stroke: "#00bcd4" }
                },
                eds
            )
        );

    const deleteNode = (nodeId: string) => {
        setNodes((nds: any[]) => nds.filter((n: any) => n.id !== nodeId));
        setEdges((eds: any[]) => eds.filter((e: any) => e.source !== nodeId && e.target !== nodeId));
        if (selectedNodeId === nodeId) {
            setSelectedNodeId(null);
        }
    };

    const addDBSchemaNode = () => {
        const id = `n${nodes.length + 1}`;
        setNodes((nds) => [
            ...nds,
            {
                id,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                type: "database",
                data: { title: `Database`, items: ["id", "name", "createdAt"] },
                style: {
                    borderRadius: 8,
                    border: "1px solid #00bcd4",
                    background: "white",
                    color: "#006064",
                    fontWeight: "bold",
                    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                },
            },
        ]);
        setOpen(false)
    };

    const addFlowchartNode = () => {
        const id = `n${nodes.length + 1}`;
        setNodes((nds) => [
            ...nds,
            {
                id,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                type: "dataflow",
                data: { title: `FlowChart`, items: [] },
                style: {
                    borderRadius: 8,
                    border: "1px solid #00bcd4",
                    background: "white",
                    color: "#006064",
                    fontWeight: "600",
                    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                },
            },
        ]);
        setOpen(false)
    };

    const addSequenceNode = () => {
        const id = `seq${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "sequence",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "Participant", items: [] },
            style: { borderRadius: 8, border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };

    const addUmlClassNode = () => {
        const id = `uml${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "umlclass",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "ClassName", attributes: ["+ attr: type"], methods: ["+ method(): void"] },
            style: { borderRadius: 8, border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };

    const addErNode = () => {
        const id = `er${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "er",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "Entity", items: ["PK: id", "name", "email"] },
            style: { borderRadius: 8, border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };

    const addStateNode = () => {
        const id = `st${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "state",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "State", type: "regular" },
            style: { borderRadius: 8, border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };

    const addMindMapNode = () => {
        const id = `mm${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "mindmap",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "Idea", color: "#06b6d4" },
            style: { borderRadius: "50%", border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };

    const addActivityNode = () => {
        const id = `act${nodes.length + 1}`;
        setNodes((nds) => [...nds, {
            id, type: "activity",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { title: "Action", shape: "action" },
            style: { borderRadius: 8, border: "1px solid #00bcd4", background: "white" }
        }]);
        setOpen(false)
    };


    const defaultNodeStyle = {
        borderRadius: 8,
        border: "1px solid #00bcd4",
        background: "white",
        color: "#006064",
        fontWeight: "bold",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    };

    const selectedNodeStyle = {
        ...defaultNodeStyle,
        border: "2px solid #00bcd4",
        boxShadow: "0 0 0 5px rgba(0,188,212,0.25)",
    };

    const onNodeClick = (_: any, node: any) => {
        setSelectedNodeId(node.id);

        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                style: n.id === node.id
                    ? selectedNodeStyle
                    : defaultNodeStyle,
            }))
        );
    };

    const defaultEdgeStyle = {
        stroke: '#00bcd4',
    };

    const selectedEdgeStyle = {
        stroke: "#06b6d4",
        strokeWidth: 4,
    };
    const onEdgeClick = (_: any, edge: any) => {
        setSelectedEdgeId(edge.id);

        setEdges((eds) =>
            eds.map((e) => ({
                ...e,
                style:
                    e.id === edge.id
                        ? selectedEdgeStyle
                        : defaultEdgeStyle,
            }))
        );
    };

    const onNodeDragStop = useCallback((_: any, node: { id: any; position: any; }) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === node.id ? { ...n, position: node.position } : n
            )
        );
    }, []);

    const clearSelectionNode = () => {
        setSelectedNodeId(null);

        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                style: defaultNodeStyle,
            }))
        );
    };

    const clearSelectionEdge = () => {
        setSelectedEdgeId(null);

        setEdges((nds) =>
            nds.map((n) => ({
                ...n,
                style: defaultEdgeStyle,
            }))
        );
    }

    const updateNodeItems = (nodeId: string, items: string[]) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, items } } : n
            )
        );
    };

    const updateNodeAttributes = (nodeId: string, attributes: string[]) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, attributes } } : n
            )
        );
    };

    const updateNodeMethods = (nodeId: string, methods: string[]) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, methods } } : n
            )
        );
    };

    const updateNodeType = (nodeId: string, type: string) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, type } } : n
            )
        );
    };

    const updateNodeShape = (nodeId: string, shape: string) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, shape } } : n
            )
        );
    };

    const updateNodeColor = (nodeId: string, color: string) => {
        setNodes((nds) =>
            nds.map((n: any) =>
                n.id === nodeId ? { ...n, data: { ...n.data, color } } : n
            )
        );
    };

    const updateNodeTitle = (nodeId: string, title: string) => {
        setNodes((nds: any[]) =>
            nds.map((n: any) => (n.id === nodeId ? { ...n, data: { ...n.data, title } } : n))
        );
    };
    const updateEdgeLabel = (edgeId: string, label: string) => {
        setEdges((eds) =>
            eds.map((e) =>
                e.id === edgeId ? { ...e, label } : e
            )
        );
    };
    const deleteEdge = (edgeId: string) => {
        setEdges((eds) => eds.filter((e) => e.id !== edgeId));

        if (selectedEdgeId === edgeId) {
            setSelectedEdgeId(null);
        }
    };
    const addItemToSelectedNode = () => {
        if (!selectedNodeId || !itemInput.trim()) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const items = Array.isArray(node?.data?.items)
            ? [...node.data.items, itemInput.trim()]
            : [itemInput.trim()];
        updateNodeItems(selectedNodeId, items);
        setItemInput("");
    };

    const removeItemFromSelectedNode = (index: number) => {
        if (!selectedNodeId) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const items = Array.isArray(node?.data?.items)
            ? node.data.items.filter((_: any, i: number) => i !== index)
            : [];
        updateNodeItems(selectedNodeId, items);
    };

    const [attrInput, setAttrInput] = useState("");
    const [methodInput, setMethodInput] = useState("");

    const addAttr = () => {
        if (!selectedNodeId || !attrInput.trim()) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const attrs = [...(node?.data?.attributes || []), attrInput.trim()];
        updateNodeAttributes(selectedNodeId, attrs);
        setAttrInput("");
    };

    const removeAttr = (idx: number) => {
        if (!selectedNodeId) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const attrs = (node?.data?.attributes || []).filter((_: any, i: number) => i !== idx);
        updateNodeAttributes(selectedNodeId, attrs);
    };

    const addMethod = () => {
        if (!selectedNodeId || !methodInput.trim()) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const methods = [...(node?.data?.methods || []), methodInput.trim()];
        updateNodeMethods(selectedNodeId, methods);
        setMethodInput("");
    };

    const removeMethod = (idx: number) => {
        if (!selectedNodeId) return;
        const node = nodes.find((n: any) => n.id === selectedNodeId);
        const methods = (node?.data?.methods || []).filter((_: any, i: number) => i !== idx);
        updateNodeMethods(selectedNodeId, methods);
    };

    if (loadingworkspaceidfetch) {
        return <div className="h-screen flex justify-center items-center">
            <Spinner className="size-10" />
        </div>
    }

    if (!Workspaceiddata) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center p-4 gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h1 className="text-3xl font-bold text-gray-800">Workspace Not Found</h1>
                <p className="text-lg text-gray-500">{error || "The workspace you're looking for doesn't exist or has been deleted."}</p>
            </div>
        );
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
            <div className="flex max-lg:flex-col w-full gap-3 h-screen">
                <div className="flex flex-col flex-1">
                    <div className="p-2 flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">
                            <span className="text-cyan-500">W</span>orkspace Designer
                        </h1>
                        <p className="text-lg font-medium text-gray-500">
                            Welcome To Space! Here you can edit and create diagrams.
                        </p>
                    </div>
                    <div ref={reactFlowWrapper} className="relative w-full h-screen mt-3">
                        <div className="absolute top-3 right-3 z-10">
                            <Button onClick={exportImage} className="px-3 py-2 bg-cyan-500 hover:bg-cyan-700 text-white rounded flex items-center gap-2">
                                <Download className="w-4 h-4" /> Export Image
                            </Button>
                        </div>
                       
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeDragStop={onNodeDragStop}
                            nodesDraggable={true}
                            nodesConnectable={true}
                            elementsSelectable={true}
                            nodeTypes={nodeTypes}
                            onEdgeClick={onEdgeClick}
                            fitView
                            proOptions={{ hideAttribution: true }}
                            style={{ width: "100%", height: "100%", background: "transparent" }}
                            onNodeClick={onNodeClick}
                        >
                            <Background />
                        </ReactFlow>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button className="px-3 py-1 bg-cyan-500 hover:bg-cyan-700 text-white rounded">
                                        Add Node
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full h-full z-200 flex flex-col">
                                    <div className="p-4 pb-0 shrink-0">
                                        <h2 className="text-2xl font-semibold mb-3">Add Node</h2>
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                                            </svg>
                                            <input
                                                value={nodeSearch}
                                                onChange={(e) => setNodeSearch(e.target.value)}
                                                placeholder="Search node types..."
                                                className="w-full pl-9 pr-3 py-2 text-sm border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-4 pt-3 space-y-3">
                                        {[
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>, label: "DB Schema", desc: "Database table structure", onClick: addDBSchemaNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="M6 9v3a6 6 0 0 0 6 6"/><path d="M18 9v3a6 6 0 0 1-6 6"/></svg>, label: "DataFlow", desc: "Workflow logic step", onClick: addFlowchartNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="M4 4h16"/><path d="M8 12h8"/><path d="M12 4v16"/></svg>, label: "Sequence", desc: "Participant with lifeline & messages", onClick: addSequenceNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>, label: "UML Class", desc: "Class with attributes & methods", onClick: addUmlClassNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>, label: "ER Diagram", desc: "Entity with key attributes", onClick: addErNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>, label: "State", desc: "State with transitions", onClick: addStateNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>, label: "Mind Map", desc: "Central idea with branches", onClick: addMindMapNode },
                                            { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>, label: "Activity", desc: "Start/action/decision/end shapes", onClick: addActivityNode },
                                        ]
                                            .filter((n) => n.label.toLowerCase().includes(nodeSearch.toLowerCase()) || n.desc.toLowerCase().includes(nodeSearch.toLowerCase()))
                                            .map((n, i) => (
                                                <NodeOption key={i} icon={n.icon} label={n.label} desc={n.desc} onClick={n.onClick} />
                                            ))}
                                        {nodeSearch && ![
                                            { label: "DB Schema" }, { label: "DataFlow" }, { label: "Sequence" }, { label: "UML Class" },
                                            { label: "ER Diagram" }, { label: "State" }, { label: "Mind Map" }, { label: "Activity" },
                                        ].some((n) => n.label.toLowerCase().includes(nodeSearch.toLowerCase())) && (
                                            <div className="text-center text-gray-400 py-8 text-sm">No node types match "{nodeSearch}"</div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 max-lg:border-t lg:border-l max-lg:w-full flex gap-4 flex-col">
                    <div ref={scroll} className="p-3 flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Selected Nodes And Edges</h3>
                    </div>
                    {selectedEdgeId && (
                        <div className="p-4 border-t">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">Edit Connection</h3>

                                <div className="flex gap-2">
                                    <Button
                                        className="text-xs bg-cyan-500 hover:bg-cyan-700 text-white transition"
                                        onClick={clearSelectionEdge}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        className="text-xs"
                                        onClick={() => deleteEdge(selectedEdgeId)}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </div>

                            <Input
                                value={
                                    edges.find(e => e.id === selectedEdgeId)?.label || ""
                                }
                                onChange={(e) =>
                                    updateEdgeLabel(selectedEdgeId, e.target.value)
                                }
                                placeholder="Relation name"
                                className="border p-2 rounded w-full mt-3 border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </div>
                    )}
                    {!selectedNodeId ? (
                        <div className="text-sm pb-10 text-gray-500 px-4 py-2 rounded">
                            Click a node to edit its items
                        </div>
                    ) : (
                        (() => {
                            const node = nodes.find((n: any) => n.id === selectedNodeId);
                            if (!node)
                                return (
                                    <div className="text-sm text-gray-500 px-4 py-2 rounded">
                                        Node not found
                                    </div>
                                );
                            return (
                                <div className=" px-4 py-3 rounded bg-white">
                                    <h3 className="font-semibold">Edit Node</h3>

                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-semibold text-cyan-500 ">
                                            <input
                                                value={node.data.title}
                                                onChange={(e) => updateNodeTitle(node.id, e.target.value)}
                                                className="w-3/4 font-semibold bg-transparent focus:outline-none focus:border-b focus:border-cyan-300"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                className="text-xs bg-cyan-500 hover:bg-cyan-700 text-white transition"
                                                onClick={clearSelectionNode}
                                            >
                                                Back
                                            </Button>
                                            <Button variant="destructive"
                                                className="text-xs transition"
                                                onClick={() => deleteNode(node.id)}
                                            >
                                                <Trash />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        {node.type === "database" && <NodeItemsEditor
                                            items={node.data.items}
                                            itemInput={itemInput}
                                            setItemInput={setItemInput}
                                            addItem={addItemToSelectedNode}
                                            removeItem={removeItemFromSelectedNode}
                                        />}
                                        {node.type === "sequence" && <NodeItemsEditor
                                            items={node.data.items}
                                            itemInput={itemInput}
                                            setItemInput={setItemInput}
                                            addItem={addItemToSelectedNode}
                                            removeItem={removeItemFromSelectedNode}
                                            placeholder="Add message"
                                        />}
                                        {node.type === "er" && <NodeItemsEditor
                                            items={node.data.items}
                                            itemInput={itemInput}
                                            setItemInput={setItemInput}
                                            addItem={addItemToSelectedNode}
                                            removeItem={removeItemFromSelectedNode}
                                            placeholder="Add attribute (PK: / FK: prefix)"
                                        />}
                                        {node.type === "umlclass" && <>
                                            <div className="mb-3">
                                                <p className="text-sm font-semibold text-gray-600 mb-1">Attributes</p>
                                                <div className="flex gap-2">
                                                    <Input value={attrInput} onChange={(e) => setAttrInput(e.target.value)}
                                                        placeholder="+ attr: type" className="flex-1 text-xs border-cyan-300" />
                                                    <Button onClick={addAttr} className="bg-cyan-500 hover:bg-cyan-600 text-xs">Add</Button>
                                                </div>
                                                <ul className="mt-2 space-y-1">
                                                    {(node.data.attributes || []).map((a: string, i: number) => (
                                                        <li key={i} className="flex items-center justify-between bg-gray-100 p-1.5 rounded text-xs">
                                                            <span className="font-mono">{a}</span>
                                                            <button onClick={() => removeAttr(i)} className="text-red-500 hover:text-red-700"><Trash className="w-3 h-3" /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600 mb-1">Methods</p>
                                                <div className="flex gap-2">
                                                    <Input value={methodInput} onChange={(e) => setMethodInput(e.target.value)}
                                                        placeholder="+ method(): type" className="flex-1 text-xs border-cyan-300" />
                                                    <Button onClick={addMethod} className="bg-cyan-500 hover:bg-cyan-600 text-xs">Add</Button>
                                                </div>
                                                <ul className="mt-2 space-y-1">
                                                    {(node.data.methods || []).map((m: string, i: number) => (
                                                        <li key={i} className="flex items-center justify-between bg-gray-100 p-1.5 rounded text-xs">
                                                            <span className="font-mono">{m}</span>
                                                            <button onClick={() => removeMethod(i)} className="text-red-500 hover:text-red-700"><Trash className="w-3 h-3" /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>}
                                        {node.type === "state" && <div className="mb-3">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">State Type</p>
                                            <select value={node.data.type || "regular"} onChange={(e) => updateNodeType(node.id, e.target.value)}
                                                className="w-full border border-cyan-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200">
                                                <option value="initial">Initial</option>
                                                <option value="regular">Regular</option>
                                                <option value="final">Final</option>
                                            </select>
                                        </div>}
                                        {node.type === "activity" && <div className="mb-3">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Shape</p>
                                            <select value={node.data.shape || "action"} onChange={(e) => updateNodeShape(node.id, e.target.value)}
                                                className="w-full border border-cyan-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200">
                                                <option value="start">Start</option>
                                                <option value="action">Action</option>
                                                <option value="decision">Decision</option>
                                                <option value="end">End</option>
                                            </select>
                                        </div>}
                                        {node.type === "mindmap" && <div className="mb-3">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Branch Color</p>
                                            <input type="color" value={node.data.color || "#06b6d4"}
                                                onChange={(e) => updateNodeColor(node.id, e.target.value)}
                                                className="w-full h-10 rounded border border-cyan-300 cursor-pointer" />
                                        </div>}
                                    </div>
                                </div>
                            );
                        })()
                    )}
                </div>
            </div>
            <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">
                {!openchat && (
                    <button
                        onClick={() => setOpenchat(true)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full shadow-lg transition animate-bounce"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-white">
                            <path d="M12 8V4H8"></path>
                            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                            <path d="M2 14h2"></path>
                            <path d="M20 14h2"></path>
                            <path d="M15 13v2"></path>
                            <path d="M9 13v2"></path>
                        </svg>
                    </button>
                )}

                {openchat && (
                    <div className="max-md:w-75 w-105 h-120 bg-white rounded-2xl shadow-2xl  border  flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between p-4 border-b bg-cyan-500 text-white">
                            <div className="flex flex-row items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-white">
                                    <path d="M12 8V4H8"></path>
                                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                    <path d="M2 14h2"></path>
                                    <path d="M20 14h2"></path>
                                    <path d="M15 13v2"></path>
                                    <path d="M9 13v2"></path>
                                </svg>
                                <p className="font-medium text-xl">Ai Agent</p>
                            </div>
                            <Button
                                size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setOpenchat(false)}>
                                <X className="text-white"/>
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                            {messages.length === 0 ? (
                                <div className="flex flex-1 flex-col justify-center items-center">
                                    <div className="rounded-full w-10 h-10 flex justify-center items-center bg-cyan-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-cyan-500">
                                            <path d="M12 8V4H8"></path>
                                            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                                            <path d="M2 14h2"></path>
                                            <path d="M20 14h2"></path>
                                            <path d="M15 13v2"></path>
                                            <path d="M9 13v2"></path>
                                        </svg>
                                    </div>
                                    <span className="text-center text-gray-600 text-lg">
                                        Ask Our Agent...
                                    </span>
                                    <div className="flex flex-col justify-center items-center mt-5 gap-3">
                                        <Button
                                            onClick={() => sendMessage("What can you do?")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            What can you do?
                                        </Button>

                                        <Button
                                            onClick={() => sendMessage("Build Me Library Management System")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            Build Me Library Management System
                                        </Button>

                                        <Button
                                            onClick={() => sendMessage("Build Me Food Ordering System")}
                                            className="bg-cyan-500 hover:bg-cyan-700"
                                        >
                                            Build Me Food Ordering System
                                        </Button></div>
                                </div>
                            ) : (messages.map((element, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-xl font-medium w-fit max-w-[90%] ${element.role === "user" ? "bg-cyan-500 text-white ml-auto" : "bg-gray-100 text-gray-900"
                                        }`}>
                                    {element.loading ?
                                        <h1 className="gradient-text">
                                            {element.message}
                                        </h1>
                                        : element.message}
                                </div>
                            )))}
                            <div ref={bottomRef} />
                        </div>
                        <div className="p-2 border-t flex gap-2">
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            />
                            <button
                                onClick={() => sendMessage()}
                                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 rounded-lg"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
