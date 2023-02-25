import { Handle, useUpdateNodeInternals } from 'reactflow';
import { CloseOutlined } from '@ant-design/icons';
import { HiMinus, HiPlus } from "react-icons/hi";
import React, { useEffect, memo } from 'react';
import { AiFillSetting } from "react-icons/ai";
import SineWaves from 'sine-waves';
import { Button, Divider, Form, InputNumber, Popover } from 'antd';
import { useState } from 'react';
import { ExpSB4store } from '../../../store';
import "../../../style/canvas.css"

function ACSource({ id, data }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [open, setOpen] = useState(false);
    const { equationFunc } = data
    const {
        setFrequency, frequency,
        setTheVoltage, theVoltage,
        setTheCurrent, Run
    } = ExpSB4store();
    const [form] = Form.useForm();
    const onConfirm = (values) => {
        if (values.frequency !== undefined && values.frequency !== null) {
            setFrequency(values.frequency)
        } else {
            setFrequency(1)
        }
        if (values.voltage !== undefined && values.voltage !== null) {
            setTheVoltage(values.voltage)
        } else {
            setTheVoltage(24)
        }
        let res = equationFunc({
            V: values.voltage,
            F: values.frequency
        })
        setTheCurrent(res.theCurrent)
    }

    const acSettings = () => {
        return (
            <div style={{ width: '200px' }} >
                <Form
                    form={form}
                    layout="vertical"
                    name="acSettings"
                    onFinish={onConfirm}
                >
                    <div>
                        <Form.Item
                            name="frequency"
                            label="التردد"
                        >
                            <InputNumber
                                disabled={Run}
                                min={0}
                                max={1000}
                                addonAfter={'Hz'}
                            />
                        </Form.Item>
                        <Form.Item
                            name="voltage"
                            label="الفولتية"
                        >
                            <InputNumber
                                disabled={Run}
                                min={0}
                                max={50}
                                addonAfter={'V'}
                            />
                        </Form.Item>
                    </div>
                    <Divider style={{ marginBottom: '10px' }} />
                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
                        <Button size='small' htmlType="submit" type='default' >حفظ</Button>
                    </div>
                </Form>
            </div>
        )
    }

    useEffect(() => {

        if (open) {
            form.setFieldsValue({
                frequency: frequency,
                voltage: theVoltage,
            })
        }

        new SineWaves({
            el: document.getElementById('waves'),
            speed: 4,
            ease: 'Linear',
            wavesWidth: '100%',
            waves: [
                {
                    timeModifier: 5,
                    lineWidth: 1,
                    amplitude: theVoltage,
                    wavelength: 1 / frequency,
                    strokeStyle: 'rgba(2, 2, 2, 0.8)'
                }
            ],
        });
    }, [id, updateNodeInternals, frequency, theVoltage, form, open]);


    return (
        <>
            <Popover
                open={open}
                onOpenChange={() => {
                    setOpen(true);
                }}
                placement="top"
                content={acSettings}
                // style={{ direction: 'rtl' }}
                title={() => (
                    <>
                        <div className="flex justify-between items-start">
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                <AiFillSetting />
                                <span style={{ marginRight: 5 }} >الاعدادات</span>
                            </div>
                            <div>
                                <CloseOutlined
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                        <Divider style={{ margin: 0 }} />
                    </>
                )}
                trigger="contextMenu"
            >
                <div
                    style={{
                        height: '100px',
                        width: '150px',
                        background: '#546F7A',
                        borderRadius: '5px',
                        borderWidth: '1.5px',
                        borderColor: '#263238',
                    }}
                >
                    <div
                        onContextMenu={(e) => e.preventDefault()}
                        style={{
                            position: 'absolute',
                            top: "4px",
                            bottom: '4px',
                            right: '4px',
                            left: '4px',
                            zIndex: 999,
                            // background: 'blue',
                        }}
                    >
                        <div
                            style={{
                                height: '65px',
                                backgroundColor: "white",
                                borderRadius: '3px',
                                borderWidth: '1.5px',
                                borderColor: '#263238',
                            }}
                        >
                            <canvas
                                style={{
                                    width: "100%",
                                    height: '100%',
                                }}
                                id="waves"></canvas>
                        </div>
                        <div
                            className=" flex  justify-around items-center "
                            style={{
                                marginTop: '2px',
                                height: '25px',
                            }}
                        >
                            <div className='h-full flex flex-col justify-around items-center ' >
                                <HiPlus color='#263238' />
                                <span className=' rounded-full' style={{ background: '#263238', height: '10px', width: '10px' }} ></span>
                            </div>
                            <div className='h-full flex justify-center items-center' >
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    background: '#CFD8DC',
                                    paddingLeft: '5px',
                                    paddingRight: '5px',
                                    borderRadius: '5px',
                                    borderWidth: '1.5px',
                                    borderColor: '#263238'

                                }} >OSCILLATOR</span>
                            </div>
                            <div className='h-full flex flex-col justify-around items-center ' >
                                <HiMinus color='#263238' />
                                <span className=' rounded-full' style={{ background: '#263238', height: '10px', width: '10px' }} ></span>
                            </div>

                        </div>
                    </div>
                    <Handle
                        id="acT"
                        style={{
                            background: 'blue',
                            borderColor: 'blue',
                            zIndex: 1000,
                            right: "12px",
                            top: '91px',
                            height: 10,
                            width: 10,
                        }}
                        type="target"
                        position="right"
                    />

                    <Handle
                        id="acS"
                        style={{
                            background: 'red',
                            borderColor: 'red',
                            zIndex: 1000,
                            left: "12px",
                            top: '91px',
                            height: 10,
                            width: 10,
                        }}
                        className=" z-50 "
                        type="source"
                        position="left"
                    />
                </div>
            </Popover>
        </>
    );
}
export default memo(ACSource);