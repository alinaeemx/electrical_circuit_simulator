/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import '../../style/workspaceStyle.css';
import {
    GrNotes,
    // GrPowerReset
} from 'react-icons/gr'
import { BsFillPlayFill, BsStopFill, BsFillTrashFill } from 'react-icons/bs'
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
import { ExpSB1 } from './sidebar1';
import { ExpSB1store } from '../../store/index';
import { Button, Checkbox, Divider, InputNumber, message, Modal, Popconfirm, Steps, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import Capacitor from './Elements/capacitor';
import DCSource from './Elements/DCSource';
import SingeSwitch from './Elements/SingleSwitch';
import Voltmeter from './Elements/Voltmeter';
import { AvatarLogo } from '../layout/AvatarLogo';
import { useNavigate } from 'react-router-dom';
import CustomConnectionLine from '../CommonElements/CustomConnectionLine';

const nodeTypes = {
    SingeSwitch,
    DCSource,
    Capacitor,
    Voltmeter,
};

let intervalID;
function startInterval({ Func, time }) {
    intervalID = setInterval(Func, time);
}

function stopInterval() {
    clearInterval(intervalID);
}

const Workspace1 = () => {

    const navigate = useNavigate();
    const reactFlowWrapper = useRef(null);
    const edgeUpdateSuccessful = useRef(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [ShowInstructions, setShowInstructions] = useState(false);
    const [SelectedItem, setSelectedItem] = useState({
        nodes: [],
        edges: []
    });
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        setSingeSwitch,
        setDCSource,
        setCapacitor,
        setVoltmeter,
        setRun, Run,
        setSwitchStatus,
        setVoltmeterValue,
        setCapacityImgIdx, CapacityImgIdx,
        setTheVoltage, theVoltage,
        // setTheCapacity, theCapacity,
        setRunError, RunError,
        setCurrentStep, currentStep,
        setTheInsulator, theInsulator,
    } = ExpSB1store();
    const connectionLineStyle = {
        strokeWidth: 1.5,
        stroke: 'black',
        type: 'smoothstep',
    };
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

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const getId = (type) => {
        if (type == 'SingeSwitch') {
            setSingeSwitch(true)
            return `switchId1`
        } else if (type == 'DCSource') {
            setDCSource(true)
            return `sourceId1`
        } else if (type == 'Capacitor') {
            setCapacitor(true)
            return `capacitorId1`
        } else if (type == 'Voltmeter') {
            setVoltmeter(true)
            return `voltmeterId1`
        }
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
        }, [reactFlowInstance]);

    const onDeleteNode = useCallback((e) => {
        StopFunc()
        if (e[0].type == 'SingeSwitch') {
            setSingeSwitch(false)
            return
        } else if (e[0].type == 'DCSource') {
            setDCSource(false)
            return
        } else if (e[0].type == 'Capacitor') {
            setCapacitor(false)
            return
        } else if (e[0].type == 'Voltmeter') {
            setVoltmeter(false)
            return
        }
        return
    }, []);

    const onDeleteEdge = useCallback(() => {
        StopFunc()
        return
    }, [])

    const onConnect = useCallback((params) => {
        params.id = params.sourceHandle + "_" + params.targetHandle;
        params.type = 'smoothstep'
        params.style = {
            strokeWidth: 1.5,
            stroke: 'rgba(0,0,0,1)',
        }
        setEdges((eds) => addEdge(params, eds))
    }, []);

    const startAnimation = useCallback(() => {
        let animatedEdges = edges.map((edge) => {
            edge.type = 'smoothstep'
            edge.animated = true
            edge.style = {
                strokeWidth: 1.5,
                stroke: '#FF0072',
            }
            return edge
        })
        setEdges(animatedEdges)
    }, [edges, nodes])

    const stopAnimation = useCallback(() => {
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

    const startCct1Running = (Q) => {
        stopCct1Running();
        if (Q < 10) {
            let counter = Q;
            startAnimation();
            startInterval({
                Func: () => {
                    counter = counter + 1;
                    if (counter == 11) {
                        stopCct1Running();
                    } else {
                        setCapacityImgIdx(counter)
                    }
                },
                time: 1000
            })
        }
    }

    const stopCct1Running = () => {
        stopAnimation();
        stopInterval();
    }

    const startCct2Running = (l) => {
        if (CapacityImgIdx == 0) {
            setVoltmeterValue(0.01)
            Message({
                content: 'المتسعة غير مشحونة',
                type: 'warning'
            })
        } else {
            stopCct2Running();
            startAnimation();
            let capacitorVoltage = (theVoltage / 10) * CapacityImgIdx;
            setVoltmeterValue(capacitorVoltage / l)
        }
    }

    const stopCct2Running = () => {
        stopAnimation();
        setVoltmeterValue(0.01)
    }

    const onStepChange = (value) => {
        if (value === 0) {
            setNodes([]);
            setEdges([]);
            setRun(false);
            setRunError(false);
            setDCSource(false);
            setCapacitor(false);
            setVoltmeter(false);
            setSingeSwitch(false);
            setSwitchStatus(false);
            setTheInsulator(false)
            setTheVoltage(0);
            // setTheCapacity(0.05);
            setCapacityImgIdx(0);
            setVoltmeterValue(0.01)
            setCurrentStep(value);
        } else {
            stopCct1Running();
            setNodes((n) => n.filter((e) => e.id === 'capacitorId1'));
            setEdges([]);
            setRun(false);
            setRunError(false);
            setCurrentStep(value);
        }
    };

    const checkFStepCct = (edges) => {
        const correctConnections = [
            "dcS_swT",
            "swS_cT",
            "cS_dcT",
        ];
        let incorrectLinksCounter = 0;
        let checkedEdges = edges.map((edge) => {
            if (!correctConnections.includes(edge.id)) {
                edge.style = {
                    strokeWidth: 1.5,
                    stroke: '#FF0072',
                }
                incorrectLinksCounter = incorrectLinksCounter + 1;
            }
            return edge
        })
        setEdges(checkedEdges)
        return incorrectLinksCounter;
    }

    const checkSStepCct = (edges) => {
        const correctConnections = [
            "cS_vT",
            "vS_cT"
        ];
        let incorrectLinksCounter = 0;
        let checkedEdges = edges.map((edge) => {
            if (!correctConnections.includes(edge.id)) {
                edge.style = {
                    strokeWidth: 1.5,
                    stroke: '#FF0072',
                }
                incorrectLinksCounter = incorrectLinksCounter + 1;
            }
            return edge
        })
        setEdges(checkedEdges)
        return incorrectLinksCounter;
    }

    const RunFunc = useCallback(() => {
        if (currentStep === 0) {
            if (nodes.length === 3) {
                if (edges.length === 3) {
                    let status = checkFStepCct(edges) > 0 ? false : true;
                    if (status == true) {
                        if (theVoltage > 0) {
                            setRun(true)
                            Message({
                                content: 'الدائرة جاهزة لتنفيذ التجربة',
                                type: 'success'
                            })
                        } else {
                            Message({
                                content: 'فرق جهد البطارية (0V), لا يمكن اجراء عملية الشحن',
                                type: 'error'
                            })
                            setRun(false)
                        }
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
        } else {
            if (nodes.length === 2) {
                if (edges.length === 2) {
                    let status = checkSStepCct(edges) > 0 ? false : true;
                    if (status == true) {
                        setRun(true)
                        if (theInsulator == true) {
                            startCct2Running(2)
                        } else {
                            startCct2Running(1)
                        }
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
        }
    }, [edges, nodes])

    const StopFunc = () => {
        stopAnimation();
        setRun(false);
        if (currentStep === 0) {
            setSwitchStatus(false);
            stopInterval();
        } else {
            stopCct2Running();
        }
    }

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === 'capacitorId1') {
                    node.data = { ...node.data }
                }
                if (node.id === 'switchId1') {

                    node.data = { ...node.data, startCct1Running, stopCct1Running }
                }
                if (node.id === 'voltmeterId1') {

                    node.data = { ...node.data }
                }
                return node;
            })
        );
    }, [setNodes, Run, SelectedItem]);

    useEffect(() => {
        let anchorsArr = document.getElementsByTagName('a');
        if (anchorsArr.length > 0) {
            for (let idx = 0; idx < anchorsArr.length; idx++) {
                if (anchorsArr[idx].href === "https://reactflow.dev/") {
                    anchorsArr[idx].style.display = 'none';
                }
            }
        }
    }, []);

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
                            <Typography.Paragraph style={{ textAlign: 'justify' }} >
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
                                    <Typography.Paragraph style={{ textAlign: 'justify' }} >
                                        تربط الدائرة الكهربائية بحيث نجعل المفتاح (K) في الموقع (1) ماذا يعني ذلك؟ يعني ربط صفيحتي المتسعة بين قطبي البطارية لغرض شحنها، لذا نلاحظ انحراف مؤشر الكلفانوميتر (G) لحظيا على أحد جانبي صفر التدرجية (مثلا) نحو اليمين ثم يعود بسرعة إلى الصفر ونلاحظ في الوقت نفسه توهج المصباح ما بضوء ساطع لبرهة من الزمن ثم ينطفئ، وكأن البطارية غير مربوطة في الدائرة. هل يمكننا أن نتسائل الآن عن سبب رجوع مؤشر الكلفانوميتر الى الصفر؟ ان جواب ذلك هو بعد اكتمال عملية شحن المتسعة يتساوى جهد كل صفيحة مع قطب البطارية المتصل بها. فيمكننا القول إن المتسعة صارت مشحونة بكامل شحنتها، وعندها يكون فرق الجهد بين صفيحتي المتسعة يساوي فرق الجهد بين قطبي البطارية، وفي هذه الحالة لا يتوافر فرق الجهد على طرفي المقاومة في الدائرة مما يجعل التيار في الدائرة يساوي صفرا. لذا فإن وجود المتسعة في دائرة التيار المستمر يعد مفتاحا مفتوحا بعد أن تنشحن. وبسبب كون صفيحتي المتسعة معزولتين عن بعضهما، فالإلكترونات تتراكم على الصفيحة B المربوطة بالقطب السالب للبطارية، لذا تشحن بالشحنة السالبة (Q-) في حين تُشحن الصفيحة A المربوطة بالقطب الموجب بالشحنة الموجبة (Q) (وبالمقدار نفسه بطريقة الحث. وقد وجد عملياً ان تيار الشحن يبدأ بمقدار كبير لحظة اغلاق دائرة الشحن ويتناقص مقداره الى الصفر بسرعة عند اكتمال شحنها.
                                    </Typography.Paragraph>
                                    <li>
                                        <Typography.Title level={5} style={{ margin: 0 }} >
                                            عملية التفريغ
                                        </Typography.Title>
                                    </li>
                                    <Typography.Paragraph style={{ textAlign: 'justify' }} >
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
                    <ExpSB1 />
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
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(0,0,0,0.5)', borderWidth: '1px', background: '#E3E3E3' }}
                                    icon={Run ? <BsStopFill color='red' size={'30px'} /> : <BsFillPlayFill size={'30px'} color='green' />}
                                    onClick={() => {
                                        if (RunError) {
                                            setRunError(false)
                                        }
                                        Run ?
                                            StopFunc()
                                            : RunFunc()
                                    }}
                                />
                            </Popconfirm>
                            <Button
                                className='font-semibold mr-2 shadow '
                                onClick={() => navigate('/test2')}
                                style={{ color: 'white', borderColor: 'rgba(0,0,0,0.5)', borderWidth: '1px', background: 'rgba(139,61,255,0.8)' }}
                            >
                                إختبر نفسك !
                            </Button>
                        </div>
                    </div>
                </aside>
                <div
                    className='shadow'
                    style={{
                        position: 'absolute',
                        top: '65px',
                        left: '333px',
                        right: '333px',
                        zIndex: 100,
                        background: '#F1F1F2',
                        padding: '10px 25px',
                        borderRadius: '0 0 8px 8px'
                    }}
                >
                    <Steps
                        current={currentStep}
                        onChange={onStepChange}
                        items={[
                            {
                                title: 'عملية الشحن',
                            },
                            {
                                title: 'عملية القياس',
                            },
                        ]}
                    />
                </div>
                {
                    SelectedItem.nodes.length > 0 && (SelectedItem.nodes[0].id == 'sourceId1' || SelectedItem.nodes[0].id == 'capacitorId1') ? (
                        <div
                            className='shadow animate__animated animate__fadeIn '
                            style={{
                                zIndex: 100,
                                background: '#F1F1F2',
                                borderRadius: '8px',
                                borderColor: 'rgba(0,0,0,0.5)',
                                borderWidth: '0.5px',
                                minHeight: '100px',
                                position: 'absolute',
                                bottom: '15px',
                                left: '550px',
                                right: '550px',
                                padding: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                direction: 'rtl'
                            }}
                        >
                            {
                                SelectedItem.nodes[0].id == 'sourceId1' ? (
                                    <>
                                        <div
                                            className='flex justify-center items-center'
                                            style={{
                                                minHeight: '25px',
                                                width: '100%',
                                            }}
                                        >
                                            <Divider style={{ margin: 0, fontWeight: 'bold' }} orientation='left' >البطارية</Divider>
                                        </div>
                                        <div
                                            className='flex justify-center items-center'
                                            style={{
                                                minHeight: '60px',
                                                width: '100%',
                                            }}
                                        >
                                            <InputNumber
                                                disabled={Run}
                                                size='small'
                                                addonBefore={'فرق الجهد'}
                                                addonAfter={'V'}
                                                min={0}
                                                max={100}
                                                defaultValue={5}
                                                value={theVoltage}
                                                step={0.1}
                                                onChange={(e) => {
                                                    if (e) {
                                                        setTheVoltage(e)
                                                    } else {
                                                        setTheVoltage(0)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className='flex justify-center items-center'
                                            style={{
                                                minHeight: '25px',
                                                width: '100%',
                                            }}
                                        >
                                            <Divider style={{ margin: 0, fontWeight: 'bold' }} orientation='left' >المتسعة</Divider>
                                        </div>
                                        <div
                                            className='flex flex-col justify-around items-center'
                                            style={{
                                                minHeight: '60px',
                                                width: '100%',
                                            }}
                                        >
                                            {/* <InputNumber
                                                disabled={Run || currentStep == 1}
                                                size='small'
                                                addonBefore={'السعة'}
                                                addonAfter={'F'}
                                                min={0.05}
                                                max={0.20}
                                                defaultValue={0.05}
                                                // value={theCapacity}
                                                step={0.01}
                                                // onChange={(e) => {
                                                //     if (e) {
                                                //         setTheCapacity(e)
                                                //     } else {
                                                //         setTheCapacity(0.05)
                                                //     }
                                                // }}
                                            /> */}
                                            <Checkbox
                                                disabled={currentStep == 0}
                                                defaultChecked={theInsulator}
                                                checked={theInsulator}
                                                onChange={(s) => {
                                                    setTheInsulator(s.target.checked)
                                                    if (Run) {
                                                        if (s.target.checked == true) {
                                                            startCct2Running(2)
                                                        } else {
                                                            startCct2Running(1)
                                                        }
                                                    }
                                                }}
                                            >
                                                اضافة عازل
                                            </Checkbox>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    ) : null
                }
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
                        onEdgesDelete={onDeleteEdge}
                        onSelectionChange={(s) => setSelectedItem(s)}
                    >
                        <Controls style={{ display: 'flex', flexDirection: 'column-reverse', borderColor: 'rgba(0,0,0,0.4)', borderWidth: '1px', borderRadius: '4px' }} >
                            <ControlButton
                                onClick={() => setShowInstructions(true)}
                            >
                                <GrNotes />
                            </ControlButton>
                            {
                                SelectedItem.edges.length > 0 || SelectedItem.nodes.length > 0 ? (
                                    <ControlButton
                                        onClick={() => {
                                            if (SelectedItem.nodes.length > 0) {
                                                setNodes((nds) => nds.filter((n) => n.id !== SelectedItem.nodes[0].id));
                                                onDeleteNode(SelectedItem.nodes)
                                            }
                                            if (SelectedItem.edges.length > 0) {
                                                setEdges((eds) => eds.filter((e) => e.id !== SelectedItem.edges[0].id));
                                                onDeleteEdge();
                                            }
                                        }}
                                    >
                                        <BsFillTrashFill />
                                    </ControlButton>
                                ) : null
                            }
                        </Controls >
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </>
    )
}

export default Workspace1;