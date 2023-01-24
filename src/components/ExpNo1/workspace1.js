/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import { BsFillStopFill } from 'react-icons/bs'
import { VscDebugStart } from 'react-icons/vsc'
import {
    Controls,
    ReactFlow,
    // Background,
    useEdgesState,
    useNodesState,
    ReactFlowProvider,
    addEdge,
    updateEdge,
} from 'reactflow';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ExpSB1 } from './sidebar1';
import { ExpSB1store } from '../../store/index';
import { Button, message } from 'antd';
import { CustomEdge } from './Elements/wire';
import Capacitor from './Elements/capacitor';
import DCSource from './Elements/DCSource';
import DSwitch from './Elements/dSwitch';
import Lamp from './Elements/lamp';
import Galvanometer from './Elements/Galvanometer';
import Resistor from './Elements/resistor';
import { AvatarLogo } from '../layout/AvatarLogo';
import { useNavigate } from 'react-router-dom';
import CustomConnectionLine from './../CustomNode/CustomConnectionLine';

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

let intervalID;
function startInterval({ onHandled, time }) {
    intervalID = setInterval(onHandled, time);
}

// Function to stop setInterval call
function stopClearInterval() {
    clearInterval(intervalID);
}

const Workspace1 = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(Object.assign(
        [],
        JSON.parse(sessionStorage.getItem('nodes'))) ?? []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(Object.assign(
        [],
        JSON.parse(sessionStorage.getItem('edges'))) ?? []);
    const [lampId, setLampId] = useState(0);
    const [chargingCircuit, setChargingCircuit] = useState(parseInt(sessionStorage.getItem('chargingCircuit') ?? 0));
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
        stopProcess()
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

    const stopProcess = () => {
        console.log('stop process');
        setRun(false)
        stopClearInterval()
        setOnLed('lampId')
        TerminationFun()
        setDirection(0)

    }
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
            // if (!correctConnections.includes(edge.id)) {
            //     document.getElementById(edge.id).style.stroke = 'red';
            //     return edge.id
            // } else {
            //     document.getElementById(edge.id).style.stroke = 'green';
            //     return null
            // }
        })
        return incorrectLinks;
    }
    const [onLed, setOnLed] = useState('lampId')
    const [capacity, setCapacity] = useState(0)
    const [direction, setDirection] = useState(0)
    var x = 0
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === onLed) {
                    node.data = { ...node.data, onLed: 'on' }
                } else {
                    node.data = { ...node.data, onLed: 'off' }
                }

                if (node.id === 'capacitorId1') {
                    node.data = { ...node.data, num: capacity }
                }
                if (node.id === 'switchId1') {

                    node.data = {
                        ...node.data, onRunningOpenKey1, onRunningOpenKey2
                    }
                }
                if (node.id === 'galvanometerId1') {

                    node.data = {
                        ...node.data, direction,
                    }
                }
                return node;
            })
        );
    }, [capacity, onLed, setNodes, Run]);

    const onRunningOpenKey1 = () => {
        stopClearInterval()
        TerminationFun()
        if (Run) {
            sessionStorage.setItem("edges", JSON.stringify(edges));
            sessionStorage.setItem("nodes", JSON.stringify(nodes));
            sessionStorage.setItem("chargingCircuit", chargingCircuit);
            let body = document.querySelector('.bodyX');
            let open = body.classList.toggle('on');
            if (!open) { open = body.classList.toggle('on'); }

            var x = 0
            startInterval({
                onHandled: () => {
                    x++
                    if (x === 10) {
                        stopClearInterval()
                        setOnLed('lampId')
                        TerminationFun()
                        setDirection(0)
                    }
                    setCapacity(x)

                },
                time: 1000,
            })

            setOnLed('lampId1')
            TerminationFun1()
            setDirection(1)
        } else {
            stopClearInterval()
            setOnLed('lampId')
            TerminationFun()
            setDirection(0)

        }
    }

    const onRunningOpenKey2 = () => {
        stopClearInterval()
        TerminationFun()
        if (Run) {
            sessionStorage.setItem("edges", JSON.stringify(edges));
            sessionStorage.setItem("nodes", JSON.stringify(nodes));
            sessionStorage.setItem("chargingCircuit", chargingCircuit);
            let body = document.querySelector('.bodyX');
            let open = body.classList.toggle('on');
            if (!open) { open = body.classList.toggle('on'); }

            x = capacity
            startInterval({
                onHandled: () => {
                    if (x > 0) x--; else x = 0
                    if (x === 0) {
                        stopClearInterval()
                        setOnLed('lampId')
                        TerminationFun()
                        setDirection(0)

                    }

                    setCapacity(x)
                    // setOnLed('lampId0') 
                },
                time: 1000,
            })

            setOnLed('lampId0')
            TerminationFun2()
            setDirection(-1)
        } else {
            stopClearInterval()
            setOnLed('lampId')
            TerminationFun()
            setDirection(0)

        }
    }

    const RunFunc = useCallback(() => {
        if (nodes.length == 7) {
            if (edges.length == 8) {
                let status = checkConnections(edges).length > 0 ? false : true;
                if (status == true) {
                    setRun(true)
                    message.success('Correct')
                } else {
                    setRun(false)
                    message.error('fail')
                }
            } else {
                setRun(false)
                console.log("Not Ready2")
                console.log("terminate2")
            }
        } else {
            setRun(false)
            console.log("Not Ready1")
            console.log("terminate1")
        }
    }, [edges, nodes])

    const TerminationFun = useCallback(() => {
        let animatedEdges = edges.map((edge) => {

            edge.type = 'smoothstep'
            edge.animated = false
            edge.style = {
                strokeWidth: 1,
                stroke: 'black',
            }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])
    const TerminationFun1 = useCallback(() => {

        // let animatedEdges = edges.map((edge) => {

        //     edge.type = 'smoothstep'
        //     edge.animated = true
        //     edge.style = {
        //         strokeWidth: 3,
        //         stroke: '#ff53df',
        //     }
        //     return edge
        // })
        // setEdges(animatedEdges)

        let animatedEdges = edges.map((edge) => {
            if (chargingCircuitsPossibility[chargingCircuit].includes(edge.id)) {
                edge.type = 'smoothstep'
                edge.animated = true
                edge.style = {
                    strokeWidth: 2,
                    stroke: '#FF0072',
                }
            }
            // edge.type = 'smoothstep'
            // edge.animated = true
            // edge.style = {
            //     strokeWidth: 2,
            //     stroke: '#FF0072',
            // }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])
    const TerminationFun2 = useCallback(() => {

        // let animatedEdges = edges.map((edge) => {

        //     edge.type = 'smoothstep'
        //     edge.animated = true
        //     edge.style = {
        //         strokeWidth: 3,
        //         stroke: '#ff53df',
        //     }
        //     return edge
        // })
        // setEdges(animatedEdges)

        let animatedEdges = edges.map((edge) => {
            if (dischargingCircuitsPossibility[chargingCircuit].includes(edge.id)) {
                edge.type = 'smoothstep'
                edge.animated = true
                edge.style = {
                    strokeWidth: 2,
                    stroke: '#FF0072',
                }
            }
            // edge.type = 'smoothstep'
            // edge.animated = true
            // edge.style = {
            //     strokeWidth: 2,
            //     stroke: '#FF0072',
            // }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])

    // useEffect(() => {
    //     let isRendered = true;
    //     if (isRendered) {
    //         if (document.getElementsByTagName('a').length > 0) {
    //             document.getElementsByTagName('a')[0].style.display = 'none'
    //         }
    //     }
    //     return () => (isRendered = false)
    // })

    const navigate = useNavigate();
    const connectionLineStyle = {
        strokeWidth: 1,
        stroke: 'black',
        type: 'smoothstep',
    };
    const edgeUpdateSuccessful = useRef(true);
    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
      }, []);
    
      const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
      }, [setEdges]);
    
      const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
    
        edgeUpdateSuccessful.current = true;
      }, [setEdges]);
    return (
        <ReactFlowProvider>
            <aside style={{ width: '64px' }} className='absolute top-32 bottom-32 right-4 bg-white shadow-xl border-gray-200 border-2 m-0 z-10 flex flex-col justify-around items-center overflow-x-hidden overflow-y-auto rounded-lg' >
                <ExpSB1 />
            </aside>
            <aside
                dir='rtl'
                style={{ height: '64px' }} className='absolute w-full bg-white shadow m-0 z-10 ' >
                <div className='flex justify-between items-center gap-2 h-16'>
                    <AvatarLogo />
                    <div className='flex gap-2 '>
                        <Button
                            type='text'
                            onClick={() => Run ? stopProcess() : RunFunc()}
                        >{Run ? <div className='flex gap-1 justify-center items-center'>
                            ايقاف
                            <BsFillStopFill />
                        </div> :
                            <div className='flex gap-1 justify-center items-center'>
                                تشغيل
                                <VscDebugStart />
                            </div>
                            }
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('/quiz')
                            }}
                            type='text'
                        >  الاسئلة</Button>
                    </div>

                    <Button
                        onClick={() => {
                            navigate('/')
                        }}
                        type='text'
                    ><ArrowLeftOutlined style={{
                        fontSize: 19
                    }} /></Button>
                </div>


                {/* <img className='cursor-pointer' draggable={false} height={10} width={25} alt='' src={stop} onClick={stopProcess} />
                <img className='cursor-pointer' draggable={false} height={10} width={25} alt='' src={play} onClick={RunFunc} /> */}

            </aside>

            <div className=' w-screen h-screen m-0 p-0' ref={reactFlowWrapper} >
                <ReactFlow
                    className='bodyX'
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
                    connectionLineStyle={connectionLineStyle}
                    onEdgeUpdate={onEdgeUpdate}
                    onEdgeUpdateStart={onEdgeUpdateStart}
                    onEdgeUpdateEnd={onEdgeUpdateEnd}
                    connectionLineComponent={CustomConnectionLine}
                >

                    {/* <Background gap={7} /> */}
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}

export default Workspace1;