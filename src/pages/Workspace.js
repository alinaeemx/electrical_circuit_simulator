import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import {
    Controls,
    ReactFlow,
    Background,
    useEdgesState,
    useNodesState,
    ReactFlowProvider,
} from 'reactflow';
import { SecondExpSB } from '../components/experimentSidebars/SecondExpSB';

export const Workspace = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    let id = 0;
    const getId = () => `node${id++}`;
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('data');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    useEffect(() => {
        let isRendered = true;
        if (isRendered) {
            if (document.getElementsByTagName('a').length > 0) {
                document.getElementsByTagName('a')[0].style.display = 'none'
            }
        }
        return () => (isRendered = false)
    })
    return (
        <ReactFlowProvider>
            <aside style={{width:'6vw'}} className='absolute top-32 bottom-32 right-4 bg-white shadow-xl border-gray-200 border-2 m-0 z-10 flex flex-col justify-around items-center overflow-x-hidden overflow-y-auto rounded-lg' >
                <SecondExpSB />
            </aside>
            <div className=' w-screen h-screen m-0 p-0' ref={reactFlowWrapper} >
                <ReactFlow
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setReactFlowInstance}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    nodes={nodes}
                    edges={edges}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}