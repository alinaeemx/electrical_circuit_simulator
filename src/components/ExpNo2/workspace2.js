/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import '../../style/workspaceStyle.css';
import { GrNotes, GrPowerReset } from 'react-icons/gr'
import { BsFillPlayFill, BsStopFill } from 'react-icons/bs'
import {
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
    ReactFlowProvider,
    addEdge,
    updateEdge,
    ControlButton,
} from 'reactflow';
import { ExpSB2 } from './sidebar2';
import { ExpSB2store } from '../../store/index';
import { Button, message, Modal, Popconfirm, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import Capacitor from './Elements/capacitor';
import DCSource from './Elements/DCSource';
import DSwitch from './Elements/dSwitch';
import Lamp from './Elements/lamp';
import Galvanometer from './Elements/Galvanometer';
import Resistor from './Elements/resistor';
import { AvatarLogo } from '../layout/AvatarLogo';
import { useNavigate } from 'react-router-dom';
import CustomConnectionLine from '../CommonElements/CustomConnectionLine';

const nodeTypes = {
    DSwitch: DSwitch,
    Lamp: Lamp,
    DCSource: DCSource,
    Capacitor: Capacitor,
    Resistor: Resistor,
    Galvanometer: Galvanometer
};

let intervalID;
function startInterval({ onHandled, time }) {
    intervalID = setInterval(onHandled, time);
}

function stopClearInterval() {
    clearInterval(intervalID);
}

const Workspace2 = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const Message = ({ type, content }) => {
        messageApi.open({
            type: type,
            content: content,
            style: {
                marginTop: '65px',
                direction: 'rtl'
            },
        });
    };
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
    const {
        setDSwitch, DSwitch,
        setLamp, Lamp,
        setDCSource, DCSource,
        setCapacitor, Capacitor,
        setResistor, Resistor,
        setGalvanometer, Galvanometer,
        setRun, Run,
        setRunError, RunError
    } = ExpSB2store();

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
        params.type = 'smoothstep'
        params.style = {
            strokeWidth: 1.5,
            stroke: 'rgba(0,0,0,1)',
        }
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
            }
            return null
        })
        return incorrectLinks;
    }
    const [ShowInstructions, setShowInstructions] = useState(false);
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
            sessionStorage.setItem("Capacitor", Capacitor);
            sessionStorage.setItem("DCSource", DCSource);
            sessionStorage.setItem("DSwitch", DSwitch);
            sessionStorage.setItem("Lamp", Lamp);
            sessionStorage.setItem("Resistor", Resistor);
            sessionStorage.setItem("Galvanometer", Galvanometer);
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

            setOnLed(chargingCircuit == 0 ? 'lampId0' : 'lampId1')
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
            sessionStorage.setItem("Capacitor", Capacitor);
            sessionStorage.setItem("DCSource", DCSource);
            sessionStorage.setItem("DSwitch", DSwitch);
            sessionStorage.setItem("Lamp", Lamp);
            sessionStorage.setItem("Resistor", Resistor);
            sessionStorage.setItem("Galvanometer", Galvanometer);
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

            setOnLed(chargingCircuit == 0 ? 'lampId1' : 'lampId0')
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
                    Message({
                        content: 'الدائرة جاهزة لتنفيذ التجربة',
                        type: 'success'
                    })
                } else {
                    Message({
                        content: 'يجب ربط الدائرة بصورة صحيحة',
                        type: 'error'
                    })
                    setRun(false)
                }
            } else {
                Message({
                    content: 'يجب اكمال ربط الدائرة',
                    type: 'error'
                })
                setRun(false)
            }
        } else {
            Message({
                content: 'يجب استخدام جميع عناصر التجربة',
                type: 'error'
            })
            setRun(false)
        }
    }, [edges, nodes])

    const TerminationFun = useCallback(() => {
        let animatedEdges = edges.map((edge) => {

            edge.type = 'smoothstep'
            edge.animated = false
            edge.style = {
                strokeWidth: 1.5,
                stroke: 'rgba(0,0,0,1)',
            }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])
    const TerminationFun1 = useCallback(() => {
        let animatedEdges = edges.map((edge) => {
            if (chargingCircuitsPossibility[chargingCircuit].includes(edge.id)) {
                edge.type = 'smoothstep'
                edge.animated = true
                edge.style = {
                    strokeWidth: 1.5,
                    stroke: '#FF0072',
                }
            }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])
    const TerminationFun2 = useCallback(() => {
        let animatedEdges = edges.map((edge) => {
            if (dischargingCircuitsPossibility[chargingCircuit].includes(edge.id)) {
                edge.type = 'smoothstep'
                edge.animated = true
                edge.style = {
                    strokeWidth: 1.5,
                    stroke: '#FF0072',
                }
            }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])

    const navigate = useNavigate();

    const connectionLineStyle = {
        strokeWidth: 1.5,
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
    useEffect(() => {
        let anchorsArr = document.getElementsByTagName('a');
        if (anchorsArr.length > 0) {
            for (let idx = 0; idx < anchorsArr.length; idx++) {
                if (anchorsArr[idx].href === "https://reactflow.dev/") {
                    anchorsArr[idx].style.display = 'none';
                }
            }
        }
    }, [])
    return (
        <>
            {
                ShowInstructions && (
                    <Modal
                        onCancel={() => setShowInstructions(false)}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        title={<Typography.Title level={3} style={{ margin: 0 }} >تعليمات التجربة</Typography.Title>}
                        style={{ direction: 'rtl' }}
                        open={ShowInstructions}
                        width={'50vw'}
                    // bodyStyle={{background:'#F5F5DC'}}
                    >
                        <ul style={{ listStyleType: 'disc' }} >
                            <li>
                                <Typography.Title level={4} style={{ margin: 0 }} >
                                    ادوات التجربة
                                </Typography.Title>
                            </li>
                            <Typography.Paragraph style={{textAlign:'justify'}} >
                                بطارية فولطيتها مناسبة ، كلفانوميتر (G) صفره في وسط التدريجة ، متسعة (C) ذات الصفيحتين المتوازيتين (A) و B) مفتاح مزدوج (k) مقاومة ثابتة (R)، مصباحان متماثلان (L1) و (L2)، اسلاك توصيل.
                            </Typography.Paragraph>
                            <li className='font-bold' >
                                <Typography.Title level={4} style={{ margin: 0 }} >
                                    خطوات التجربة
                                </Typography.Title>
                            </li>
                            <div className='pr-5' >
                                <ul style={{ listStyleType: 'square' }}>
                                    <li>
                                        <Typography.Title level={5} style={{ margin: 0 }} >
                                            عملية الشحن
                                        </Typography.Title>
                                    </li>
                                    <Typography.Paragraph style={{textAlign:'justify'}} >
                                        تربط الدائرة الكهربائية بحيث نجعل المفتاح (K) في الموقع (1) ماذا يعني ذلك؟ يعني ربط صفيحتي المتسعة بين قطبي البطارية لغرض شحنها، لذا نلاحظ انحراف مؤشر الكلفانوميتر (G) لحظيا على أحد جانبي صفر التدرجية (مثلا) نحو اليمين ثم يعود بسرعة إلى الصفر ونلاحظ في الوقت نفسه توهج المصباح ما بضوء ساطع لبرهة من الزمن ثم ينطفئ، وكأن البطارية غير مربوطة في الدائرة. هل يمكننا أن نتسائل الآن عن سبب رجوع مؤشر الكلفانوميتر الى الصفر؟ ان جواب ذلك هو بعد اكتمال عملية شحن المتسعة يتساوى جهد كل صفيحة مع قطب البطارية المتصل بها. فيمكننا القول إن المتسعة صارت مشحونة بكامل شحنتها، وعندها يكون فرق الجهد بين صفيحتي المتسعة يساوي فرق الجهد بين قطبي البطارية، وفي هذه الحالة لا يتوافر فرق الجهد على طرفي المقاومة في الدائرة مما يجعل التيار في الدائرة يساوي صفرا. لذا فإن وجود المتسعة في دائرة التيار المستمر يعد مفتاحا مفتوحا بعد أن تنشحن. وبسبب كون صفيحتي المتسعة معزولتين عن بعضهما، فالإلكترونات تتراكم على الصفيحة B المربوطة بالقطب السالب للبطارية، لذا تشحن بالشحنة السالبة (Q-) في حين تُشحن الصفيحة A المربوطة بالقطب الموجب بالشحنة الموجبة (Q) (وبالمقدار نفسه بطريقة الحث. وقد وجد عملياً ان تيار الشحن يبدأ بمقدار كبير لحظة اغلاق دائرة الشحن ويتناقص مقداره الى الصفر بسرعة عند اكتمال شحنها.
                                    </Typography.Paragraph>
                                    <li>
                                        <Typography.Title level={5} style={{ margin: 0 }} >
                                            عملية التفريغ
                                        </Typography.Title>
                                    </li>
                                    <Typography.Paragraph style={{textAlign:'justify'}} >
                                        نستعمل الدائرة الكهربائية المربوطة في النشاط السابق ولكن نجعل المفتاح (K) في الموقع (2) يعني ربط صفيحتي المتسعة ببعضهما بسلك موصل وبهذا تتم عملية تفريغ المتسعة من شحنتها أي تتعادل شحنة صفيحتيها، لذا نلاحظ انحراف مؤشر الكلفانوميتر (G) لحظيا إلى الجانب الآخر من صفر التدرجية نحو (اليسار)ثم يعود إلى الصفر بسرعة ونلاحظ توهج المصباح 1 في الوقت نفسه بضوء ساطع للحظة ثم ينطفئ. نستنتج من النشاط أن تيارا لحظياً قد انساب في الدائرة الكهربائية يسمى تيار التفريغ، يتلاشى تيار الحر بسرعة (يساوي صفرا) عندما لا يتوافر فرق في الجهد بين صفيحتي المتسعة ان تيار التفريغ يبدأ بمقدار كبير لحظة إغلاق الدائرة (لحظة ربط صفيحتي المتسعة ببعضهما بوساطة سلك موصل) ويهبط إلى الصفر بسرعة بعد إتمام عملية تفريغ المتسعة.
                                    </Typography.Paragraph>
                                </ul>
                            </div>
                        </ul>
                    </Modal>
                )
            }
            {contextHolder}
            <ReactFlowProvider>
                <aside style={{ width: '100px', backgroundColor: "#F1F1F2", borderColor: 'rgba(0,0,0,0.5)', borderWidth: '1px' }} className='absolute top-32 bottom-32 right-4 shadow-xl z-10 flex flex-col items-center overflow-x-hidden overflow-y-auto rounded-lg' >
                    <ExpSB2 />
                </aside>
                <aside
                    dir='rtl'
                    style={{ height: '64px', paddingRight: '10px', paddingLeft: '10px', background: '#F1F1F2' }} className='absolute w-full shadow m-0 z-10  ' >
                    <div className='flex justify-between items-center h-full '>
                        <AvatarLogo />
                        <div className='font-bold text-lg' >
                            تجربة شحن و تفريغ المتسعة
                        </div>
                        <div className='flex justify-between items-center' >
                            <Popconfirm
                                title="يجب تشغيل الدائرة اولاً"
                                okButtonProps={{ style: { display: 'none' } }}
                                cancelButtonProps={{ style: { display: 'none' } }}
                                open={RunError}
                                placement='bottomRight'
                                showCancel={false}
                                icon={<WarningOutlined />}
                                overlayInnerStyle={{ paddingTop: 7, paddingBottom: 5 }}
                            >
                                <Button
                                    className='shadow'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(0,0,0,0.5)', borderWidth: '1px', background:'#E3E3E3' }}
                                    icon={Run ? <BsStopFill color='red' size={'30px'} /> : <BsFillPlayFill size={'30px'} color='green' />}
                                    onClick={() => {
                                        if (RunError) {
                                            setRunError(false)
                                        }
                                        Run ?
                                            stopProcess()
                                            : RunFunc()
                                    }}
                                />
                            </Popconfirm>
                            <Button
                                className='font-semibold mr-2 shadow '
                                onClick={() => navigate('/test2')}
                                style={{ color: 'white', borderColor: 'rgba(0,0,0,0.5)', borderWidth: '1px', background:'rgba(139,61,255,0.8)' }}
                            >
                                إختبر نفسك !
                            </Button>
                        </div>
                    </div>
                </aside>
                <div className=' w-screen h-screen m-0 p-0' ref={reactFlowWrapper} >
                    <ReactFlow
                        className='bodyX'
                        style={{ background: '#BFD7ED' }}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onInit={setReactFlowInstance}
                        onNodesDelete={onDeleteNode}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
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
                        <Controls style={{ display: 'flex', flexDirection: 'column-reverse', borderColor: 'rgba(0,0,0,0.4)', borderWidth: '1px', borderRadius:'4px' }} >
                            <ControlButton
                                onClick={() => setShowInstructions(true)}
                            >
                                <GrNotes />
                            </ControlButton>
                            <ControlButton
                                onClick={() =>{
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    window.location.reload(true);
                                }}
                            >
                                <GrPowerReset />
                            </ControlButton>
                        </Controls >
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </>
    )
}

export default Workspace2;