import { Background, Handle, Position, ReactFlow, useEdgesState, useNodesState, } from "@xyflow/react";
import React from "react";
import { type ReactElement, type JSXElementConstructor, type ReactNode, type ReactPortal, type Key, useEffect } from "react";


export const customNode = ({ data }: any) => {
    return (
        <div className="py-3 rounded-lg">
            <Handle type="target" position={Position.Top} />

            <h1 className="px-3 text-xl text-cyan-500 text-center font-medium">
                {data.title}
            </h1>

            <hr className="mt-3 w-full dark:border-white border-black" />

            {data.items &&
                <ul className="mt-2 text-center dark:text-white text-black text-sm space-y-1 font-normal list-none">
                    {data.items.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                        <>
                            <React.Fragment key={index}>
                                <li>{item}</li>
                                <hr className=" border-black dark:border-white" />
                            </React.Fragment>
                        </>
                    ))}
                </ul>
                }
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export const nodeTypes = {
    sample: customNode,
}


export const initialNodes = [
    {
        id: 'n1',
        position: { x: 30, y: 50 },
        data: {
            title: 'User',
            items: ['ID', 'Username', 'Useremail', "Userpassword", "createdAt"]
        },
        type: "sample",
        style: {
            borderRadius: 8,
            border: '1px solid #00bcd4',
            background: 'white',
            color: '#006064',
            fontWeight: 'bold',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        },
    },
    {
        id: 'n2',
        position: { x: 150, y: 300 },
        type: "sample",
        data: {
            title: 'Workspace',
            items: ['WorkspaceID', 'WorkspaceName', "Memberslist", "RoleMembers", "createdAt"]
        },
        style: {
            borderRadius: 8,
            border: '1px solid #00bcd4',
            background: 'white',
            color: '#006064',
            fontWeight: 'bold',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        },
    },
    {
        id: 'n3',
        position: { x: -130, y: 300 },
        type: "sample",
        data: {
            title: 'Payment',
            items: ['paymentID', 'paymentplatform', "paymentamount", "createdAt"]
        },
        style: {
            borderRadius: 8,
            border: '1px solid #00bcd4',
            background: 'white',
            color: '#006064',
            fontWeight: 'bold',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        },
    }
];

export const initialEdges = [
    { id: 'n1-n2', source: 'n1', target: 'n2', animated: true, style: { stroke: '#00bcd4' } },
    { id: 'n1-n3', source: 'n1', target: 'n3', animated: true, style: { stroke: '#00bcd4' } },
];

export const SampleNode = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, edges])

    return (
        <ReactFlow className="h-full w-full bg-linear-t from-white to-cyan-500"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            style={{ background: 'transparent' }}>
            <Background />
        </ReactFlow>
    )
}
