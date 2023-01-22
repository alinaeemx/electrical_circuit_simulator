/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import {
    Controls,
    ReactFlow,
    Background,
    useEdgesState,
    useNodesState,
    ReactFlowProvider,
    addEdge,
    Panel,
} from 'reactflow';
import { ExpSB1 } from './sidebar1';
import { ExpSB1store } from '../../store/index';
import play from '../../assets/play.png'
import stop from '../../assets/stop.png'
import { message } from 'antd';
import { CustomEdge } from './Elements/wire';
import Capacitor from './Elements/capacitor';
import DCSource from './Elements/DCSource';
import DSwitch from './Elements/dSwitch';
import Lamp from './Elements/lamp';
import Galvanometer from './Elements/Galvanometer';
import Resistor from './Elements/resistor';

const nodeTypes = {
    DSwitch: DSwitch,
    Lamp: Lamp,
    DCSource: DCSource,
    Capacitor: Capacitor,
    Resistor: Resistor,
    Galvanometer: Galvanometer
};
const edgeTypes = {
    wire: CustomEdge
}

const Workspace1 = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [lampId, setLampId] = useState(0);
    const [chargingCircuit, setChargingCircuit] = useState(0);
    const lampsId = useRef([
        {
            id: 'lampId0',
            status: false
        },
        {
            id: 'lampId1',
            status: false
        }
    ])
    const chargingCircuitsPossibility = [
        [
            "cS_dsMiddle",
            "gS_cT",
            "lS_gT0",
            "rS_lT",
            "dcS_rT",
            "dsBottom_dcT",
        ],
        [
            "cS_dsMiddle",
            "gS_cT",
            "lS_gT1",
            "rS_lT",
            "dcS_rT",
            "dsBottom_dcT",
        ]
    ]
    const dischargingCircuitsPossibility = [
        [
            "cS_dsMiddle",
            "gS_cT",
            "lS_gT1",
            "dsTop_lT",
        ],
        [
            "cS_dsMiddle",
            "gS_cT",
            "lS_gT0",
            "dsTop_lT",
        ]
    ]
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { setDSwitch, setLamp, setDCSource, setCapacitor, setResistor, setGalvanometer, setRun, Run } = ExpSB1store();

    const getId = (type) => {
        if (type == 'DSwitch') {
            setDSwitch(true)
            return `switchId1`
        } else if (type == 'Lamp') {
            if (lampId == 0) {
                setLampId(prev => ++prev)
                lampsId.current[0].status = true;
                return `lampId0`
            } else if (lampId == 1) {
                setLamp(true)
                setLampId(prev => ++prev)
                if (lampsId.current[0].status == false) {
                    lampsId.current[0].status = true
                    return `lampId0`
                } else if (lampsId.current[1].status == false) {
                    lampsId.current[1].status = true
                    return `lampId1`
                }
            }
            return
        } else if (type == 'DCSource') {
            setDCSource(true)
            return `sourceId1`
        } else if (type == 'Capacitor') {
            setCapacitor(true)
            return `capacitorId1`
        } else if (type == 'Resistor') {
            setResistor(true)
            return `resistorId1`
        } else if (type == 'Galvanometer') {
            setGalvanometer(true)
            return `galvanometerId1`
        }
    }

    const onDeleteNode = useCallback((e) => {
        if (e[0].type == 'DSwitch') {
            setDSwitch(false)
            return
        } else if (e[0].type == 'Lamp') {
            if (e[0].id == "lampId0") {
                lampsId.current[0].status = false;
            }
            if (e[0].id == "lampId1") {
                lampsId.current[1].status = false;
            }
            setLampId(prev => --prev);
            setLamp(false)
            return
        } else if (e[0].type == 'DCSource') {
            setDCSource(false)
            return
        } else if (e[0].type == 'Capacitor') {
            setCapacitor(false)
            return
        } else if (e[0].type == 'Resistor') {
            setResistor(false)
            return
        } else if (e[0].type == 'Galvanometer') {
            setGalvanometer(false)
            return
        }
        return
    }, [lampId]);
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
                id: getId(type),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        }, [reactFlowInstance, lampId]);
    const onConnect = useCallback((params) => {
        params.id =
            params.source == 'lampId0' ? params.sourceHandle + "_" + params.targetHandle + "0"
                : params.source == 'lampId1' ? params.sourceHandle + "_" + params.targetHandle + "1"
                    : params.sourceHandle + "_" + params.targetHandle;
        params.type = 'wire'
        setEdges((eds) => addEdge(params, eds))
        if (params.target == 'lampId0') {
            if (params.source == 'resistorId1') {
                setChargingCircuit(0);
            } else {
                setChargingCircuit(1);
            }
        }
    }, []);

    const checkConnections = (edges) => {
        const correctConnections = [
            "rS_lT",
            "gS_cT",
            "lS_gT0",
            "lS_gT1",
            "dcS_rT",
            "dsTop_lT",
            "dsTop_lT",
            "cS_dsMiddle",
            "dsBottom_dcT",
        ]
        let incorrectLinks = edges.filter((edge) => {
            if (!correctConnections.includes(edge.id)) {
                document.getElementById(edge.id).style.stroke = 'red';
                return edge.id
            } else {
                document.getElementById(edge.id).style.stroke = 'green';
                return null
            }
        })
        return incorrectLinks;
    }

    const RunFunc = useCallback(() => {
        if (nodes.length == 7) {
            if (edges.length == 8) {
                let status = checkConnections(edges).length > 0 ? false : true;
                if (status == true) {
                    message.success('Correct')
                    let animatedEdges = edges.map((edge) => {
                        if (dischargingCircuitsPossibility[chargingCircuit == 1 ? 0 : 0].includes(edge.id)) {
                            edge.animated = true
                        }
                        return edge
                    })
                    setEdges(animatedEdges)
                } else {
                    message.error('fail')
                }
            } else {
                console.log("Not Ready2")
                console.log("terminate2")
            }
        } else {
            console.log("Not Ready1")
            console.log("terminate1")
        }
    }, [edges, nodes])

    const TerminationFun = useCallback(() => {
        let animatedEdges = edges.map((edge) => {
            edge.animated = false
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])

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
            <aside style={{ width: '6vw' }} className='absolute top-32 bottom-32 right-4 bg-white shadow-xl border-gray-200 border-2 m-0 z-10 flex flex-col justify-around items-center overflow-x-hidden overflow-y-auto rounded-lg' >
                <ExpSB1 />
            </aside>
            <div className=' w-screen h-screen m-0 p-0' ref={reactFlowWrapper} >
                <ReactFlow
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setReactFlowInstance}
                    onNodesDelete={onDeleteNode}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    nodes={nodes}
                    edges={edges}
                    fitView
                >
                    <Panel position='top-center' style={{ height: 40, width: 100, background: 'red', borderRadius: 10, color: 'white', padding: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                        <img className='cursor-pointer' draggable={false} height={10} width={25} alt='' src={stop} onClick={TerminationFun} />
                        <img className='cursor-pointer' draggable={false} height={10} width={25} alt='' src={play} onClick={RunFunc} />
                    </Panel>
                    {/* <Background gap={7} /> */}
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}

export default Workspace1;