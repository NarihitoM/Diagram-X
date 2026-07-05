import { Background, Handle, Position, ReactFlow, useEdgesState, useNodesState, } from "@xyflow/react";
import React from "react";
import { type ReactElement, type JSXElementConstructor, type ReactNode, type ReactPortal, type Key, useEffect } from "react";

const baseStyle = "text-cyan-500 text-center font-medium";

export const Database = ({ data }: any) => {
    return (
        <div className="py-3 rounded-lg min-w-40 bg-white">
            <Handle type="target" position={Position.Top} />
            <h1 className={`px-3 text-xl ${baseStyle}`}>{data.title}</h1>
            <hr className="mt-3 w-full dark:border-white border-black" />
            {data.items && <ul className="mt-2 text-center dark:text-white text-black text-sm space-y-1 font-normal list-none">
                {data.items.map((item: any, index: Key | null | undefined) => (
                    <React.Fragment key={index}>
                        <li>{item}</li>
                        <hr className="border-black dark:border-white" />
                    </React.Fragment>
                ))}
            </ul>}
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export const Dataflow = ({ data }: any) => {
    return (
        <div className="bg-white rounded-lg min-w-32">
            <Handle type="target" position={Position.Left} />
            <h1 className={`px-3 py-5 text-xl ${baseStyle}`}>{data.title}</h1>
            <Handle type="source" position={Position.Right} />
        </div>
    )
};

export const SequenceNode = ({ data }: any) => {
    return (
        <div className="bg-white rounded-lg min-w-28" style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Left} id="left" />
            <div className="px-3 py-2 bg-cyan-500 text-white text-center font-bold text-sm rounded-t-sm">
                {data.title || "Participant"}
            </div>
            <div className="px-3 py-6 text-[10px] text-gray-400 text-center border-t border-dashed border-cyan-300">
                {data.items?.length ? data.items.join(" │ ") : "──── lifeline ────"}
            </div>
            <Handle type="source" position={Position.Right} id="right" />
        </div>
    )
};

export const UmlClassNode = ({ data }: any) => {
    return (
        <div className="bg-white rounded-lg min-w-44" style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Top} id="top" />
            <div className="px-3 py-2 bg-cyan-600 text-white text-center font-bold text-sm">
                {data.title || "ClassName"}
            </div>
            <div className="px-3 py-1 border-t border-cyan-600 text-xs">
                <div className="font-semibold text-gray-500 mb-1">Attributes</div>
                {data.attributes?.length ? data.attributes.map((a: string, i: number) => (
                    <div key={i} className="text-gray-700 font-mono text-[11px]">{a}</div>
                )) : <div className="text-gray-400 italic text-[11px]">no attributes</div>}
            </div>
            <div className="px-3 py-1 border-t border-cyan-600 text-xs">
                <div className="font-semibold text-gray-500 mb-1">Methods</div>
                {data.methods?.length ? data.methods.map((m: string, i: number) => (
                    <div key={i} className="text-gray-700 font-mono text-[11px]">{m}</div>
                )) : <div className="text-gray-400 italic text-[11px]">no methods</div>}
            </div>
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </div>
    )
};

export const ErNode = ({ data }: any) => {
    return (
        <div className="bg-white rounded-lg min-w-36" style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Top} id="top" />
            <div className="px-3 py-2 bg-emerald-500 text-white text-center font-bold text-sm rounded-t-sm">
                {data.title || "Entity"}
            </div>
            <div className="px-3 py-1 text-xs">
                {data.items?.length ? data.items.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-1 py-0.5 border-b border-dashed border-gray-200 last:border-0">
                        <span className={`${item.startsWith("PK:") ? "text-amber-600 font-bold" : item.startsWith("FK:") ? "text-purple-600" : "text-gray-700"}`}>
                            {item.startsWith("PK:") ? "🔑 " : item.startsWith("FK:") ? "🔗 " : ""}{item.replace(/^(PK:|FK:)\s*/, "")}
                        </span>
                    </div>
                )) : <div className="text-gray-400 italic text-[11px] text-center">no attributes</div>}
            </div>
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </div>
    )
};

export const StateNode = ({ data }: any) => {
    const isInitial = data.type === "initial";
    const isFinal = data.type === "final";
    return (
        <div className="bg-white rounded-lg min-w-28" style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Top} id="top" />
            <div className="px-4 py-3 text-center">
                {isInitial && <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1" />}
                {isFinal && <div className="w-3 h-3 rounded-full border-2 border-red-500 mx-auto mb-1" />}
                <span className="text-sm font-semibold text-cyan-600">{data.title || "State"}</span>
            </div>
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </div>
    )
};

export const MindMapNode = ({ data }: any) => {
    const color = data.color || "#06b6d4";
    return (
        <div className="bg-white rounded-full min-w-24 min-h-24 flex items-center justify-center"
            style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Left} id="left" />
            <h1 className="text-sm font-bold text-center px-2" style={{ color }}>
                {data.title || "Idea"}
            </h1>
            <Handle type="source" position={Position.Right} id="right" />
        </div>
    )
};

export const ActivityNode = ({ data }: any) => {
    const shape = data.shape || "action";
    const isStart = shape === "start";
    const isEnd = shape === "end";
    const isDecision = shape === "decision";

    if (isStart) {
        return (
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center" style={{ border: '1px solid #00bcd4' }}>
                <Handle type="source" position={Position.Bottom} id="bottom" />
                <div className="w-8 h-8 rounded-full bg-green-500" />
            </div>
        )
    }
    if (isEnd) {
        return (
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center" style={{ border: '1px solid #00bcd4' }}>
                <Handle type="target" position={Position.Top} id="top" />
                <div className="w-8 h-8 rounded-full bg-red-500" />
            </div>
        )
    }
    if (isDecision) {
        return (
            <div className="flex items-center justify-center shadow-sm" style={{ width: 0, height: 0, borderLeft: "50px solid transparent", borderRight: "50px solid transparent", borderTop: "60px solid #f59e0b" }}>
                <Handle type="target" position={Position.Top} id="top" />
                <Handle type="source" position={Position.Bottom} id="bottom" />
                <Handle type="source" position={Position.Left} id="left" />
                <Handle type="source" position={Position.Right} id="right" />
                <span className="absolute text-white text-xs font-bold -mt-1">{data.title || "?"}</span>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-lg min-w-32" style={{ border: '1px solid #00bcd4' }}>
            <Handle type="target" position={Position.Top} id="top" />
            <div className="px-4 py-3 text-center">
                <span className="text-sm font-semibold text-cyan-600">{data.title || "Action"}</span>
            </div>
            <Handle type="source" position={Position.Bottom} id="bottom" />
        </div>
    )
};

export const nodeTypes = {
    database: Database,
    dataflow: Dataflow,
    sequence: SequenceNode,
    umlclass: UmlClassNode,
    er: ErNode,
    state: StateNode,
    mindmap: MindMapNode,
    activity: ActivityNode,
}

export const databasenode = [
    {
        id: 'n1',
        position: { x: 30, y: 50 },
        data: { title: 'Data1', items: ['List1', 'List2', "List3", "List4"] },
        type: "database",
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' },
    },
    {
        id: 'n2',
        position: { x: 150, y: 300 },
        type: "database",
        data: { title: 'Data2', items: ['List1', 'List2', "List3", "List4"] },
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' },
    },
];

export const databaseedge = [
    { id: 'n1-n2', source: 'n1', target: 'n2', animated: true, style: { stroke: '#00bcd4' } },
];

export const dataflownode = [
    {
        id: 'n1', position: { x: 150, y: 300 },
        data: { title: "List1" }, type: "dataflow",
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }
    },
    {
        id: 'n2', position: { x: 350, y: 290 },
        data: { title: "List2" }, type: "dataflow",
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }
    },
    {
        id: 'n3', position: { x: 650, y: 300 },
        data: { title: "List3" }, type: "dataflow",
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }
    },
]

export const dataflowedge = [
    { id: 'n1-n2', source: 'n1', target: 'n2', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'n2-n3', source: 'n2', target: 'n3', animated: true, style: { stroke: '#00bcd4' } },
];

const nodeStyle = { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold' as const, boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' };

export const sequencenode = [
    { id: 's1', position: { x: 50, y: 50 }, data: { title: "Client", items: [] }, type: "sequence", style: nodeStyle },
    { id: 's2', position: { x: 300, y: 50 }, data: { title: "Server", items: [] }, type: "sequence", style: nodeStyle },
    { id: 's3', position: { x: 550, y: 50 }, data: { title: "Database", items: [] }, type: "sequence", style: nodeStyle },
];
export const sequenceedge = [
    { id: 's1-s2', source: 's1', target: 's2', label: 'request()', animated: true, style: { stroke: '#00bcd4' } },
    { id: 's2-s3', source: 's2', target: 's3', label: 'query()', animated: true, style: { stroke: '#00bcd4' } },
];

export const umlclassnode = [
    { id: 'u1', position: { x: 100, y: 50 }, data: { title: "User", attributes: ["- id: number", "- name: string"], methods: ["+ login(): void", "+ logout(): void"] }, type: "umlclass", style: nodeStyle },
    { id: 'u2', position: { x: 400, y: 50 }, data: { title: "Auth", attributes: ["- token: string"], methods: ["+ verify(): boolean"] }, type: "umlclass", style: nodeStyle },
];
export const umlclassedge = [
    { id: 'u1-u2', source: 'u1', target: 'u2', label: "uses", animated: true, style: { stroke: '#00bcd4' } },
];

export const ernode = [
    { id: 'e1', position: { x: 50, y: 50 }, data: { title: "User", items: ["PK: id", "name", "email"] }, type: "er", style: nodeStyle },
    { id: 'e2', position: { x: 350, y: 50 }, data: { title: "Order", items: ["PK: id", "FK: user_id", "total"] }, type: "er", style: nodeStyle },
    { id: 'e3', position: { x: 200, y: 300 }, data: { title: "Product", items: ["PK: id", "name", "price"] }, type: "er", style: nodeStyle },
];
export const eredge = [
    { id: 'e1-e2', source: 'e1', target: 'e2', label: "1:N", animated: true, style: { stroke: '#00bcd4' } },
    { id: 'e2-e3', source: 'e2', target: 'e3', label: "N:M", animated: true, style: { stroke: '#00bcd4' } },
];

export const statenode = [
    { id: 'st1', position: { x: 250, y: 20 }, data: { title: "", type: "initial" }, type: "state", style: nodeStyle },
    { id: 'st2', position: { x: 220, y: 130 }, data: { title: "Idle", type: "regular" }, type: "state", style: nodeStyle },
    { id: 'st3', position: { x: 220, y: 250 }, data: { title: "Running", type: "regular" }, type: "state", style: nodeStyle },
    { id: 'st4', position: { x: 220, y: 370 }, data: { title: "Done", type: "final" }, type: "state", style: nodeStyle },
];
export const stateedge = [
    { id: 'st1-st2', source: 'st1', target: 'st2', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'st2-st3', source: 'st2', target: 'st3', label: "start", animated: true, style: { stroke: '#00bcd4' } },
    { id: 'st3-st4', source: 'st3', target: 'st4', label: "finish", animated: true, style: { stroke: '#00bcd4' } },
];

export const mindmapnode = [
    { id: 'mm1', position: { x: 250, y: 200 }, data: { title: "Project", color: "#006064" }, type: "mindmap", style: { ...nodeStyle, borderRadius: "50%" } },
    { id: 'mm2', position: { x: 50, y: 50 }, data: { title: "Frontend" }, type: "mindmap", style: { ...nodeStyle, borderRadius: "50%" } },
    { id: 'mm3', position: { x: 450, y: 50 }, data: { title: "Backend" }, type: "mindmap", style: { ...nodeStyle, borderRadius: "50%" } },
    { id: 'mm4', position: { x: 50, y: 380 }, data: { title: "Design" }, type: "mindmap", style: { ...nodeStyle, borderRadius: "50%" } },
    { id: 'mm5', position: { x: 450, y: 380 }, data: { title: "DevOps" }, type: "mindmap", style: { ...nodeStyle, borderRadius: "50%" } },
];
export const mindmapedge = [
    { id: 'mm1-mm2', source: 'mm1', target: 'mm2', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'mm1-mm3', source: 'mm1', target: 'mm3', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'mm1-mm4', source: 'mm1', target: 'mm4', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'mm1-mm5', source: 'mm1', target: 'mm5', animated: true, style: { stroke: '#00bcd4' } },
];

export const activitynode = [
    { id: 'a1', position: { x: 250, y: 20 }, data: { shape: "start" }, type: "activity", style: nodeStyle },
    { id: 'a2', position: { x: 220, y: 140 }, data: { title: "Process", shape: "action" }, type: "activity", style: nodeStyle },
    { id: 'a3', position: { x: 240, y: 260 }, data: { title: "OK?", shape: "decision" }, type: "activity", style: nodeStyle },
    { id: 'a4', position: { x: 80, y: 380 }, data: { title: "Retry", shape: "action" }, type: "activity", style: nodeStyle },
    { id: 'a5', position: { x: 420, y: 380 }, data: { shape: "end" }, type: "activity", style: nodeStyle },
];
export const activityedge = [
    { id: 'a1-a2', source: 'a1', target: 'a2', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'a2-a3', source: 'a2', target: 'a3', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'a3-a4', source: 'a3', target: 'a4', label: "No", animated: true, style: { stroke: '#00bcd4' } },
    { id: 'a3-a5', source: 'a3', target: 'a5', label: "Yes", animated: true, style: { stroke: '#00bcd4' } },
    { id: 'a4-a2', source: 'a4', target: 'a2', animated: true, style: { stroke: '#00bcd4' } },
];

export const SampleDatabase = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(databasenode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(databaseedge);

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, edges])

    return (
        <ReactFlow className="h-full w-full bg-linear-t from-white to-cyan-500"
            nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleDataflow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(dataflownode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(dataflowedge);

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, edges])

    return (
        <ReactFlow className="h-full w-full bg-linear-t from-white to-cyan-500"
            nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleSequence = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(sequencenode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(sequenceedge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleUmlClass = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(umlclassnode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(umlclassedge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleEr = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(ernode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(eredge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleState = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(statenode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(stateedge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleMindMap = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(mindmapnode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(mindmapedge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}

export const SampleActivity = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(activitynode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(activityedge);
    useEffect(() => { setNodes(nodes); setEdges(edges); }, [nodes, edges]);
    return (
        <ReactFlow className="h-full w-full" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            nodesDraggable={true} nodesConnectable={true} elementsSelectable={true}
            nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}
