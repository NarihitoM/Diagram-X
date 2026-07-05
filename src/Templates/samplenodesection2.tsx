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
        style: { borderRadius: 8, border: '1px solid #00bcd4', background: 'white', color: '#006064', fontWeight: 'bold', width: "150px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }
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
