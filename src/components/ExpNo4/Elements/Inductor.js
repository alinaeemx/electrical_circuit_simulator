import { Checkbox, Divider, Image, Popover } from "antd";
import inductorBack from "../../../assets/images/inductorBack.png";
import inductorFront from "../../../assets/images/inductorFront.png";
import iron from "../../../assets/images/iron.png";
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { CloseOutlined } from '@ant-design/icons';
import styles from '../../../style/style.module.css';
import { AiFillSetting } from "react-icons/ai";
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { ExpSB4store } from "../../../store";


function Inductor({
    id,
    data
}) {
    const { setInductionFactor, inductionFactor, setTheCurrent } = ExpSB4store();
    const { equationFunc } = data
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }

        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on('drag', (evt) => {
            const dx = evt.x - 100;
            const dy = evt.y - 100;
            const rad = Math.atan2(dx, dy);
            const deg = rad * (180 / Math.PI);
            setRotation(180 - deg);
            updateNodeInternals(id);
        });

        selection.call(dragHandler);
    }, [id, updateNodeInternals]);

    return (
        <>
            <div
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
                className={styles.node}
            >
                <div
                    ref={rotateControlRef}
                    style={{
                        display: 'block',
                    }}
                    className={`nodrag ${styles.rotateHandle}`}
                >
                    <Image preview={false} src={switchCueArrow} />
                </div>
                <Popover
                    style={{ direction: 'ltr' }}
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
                    open={open}
                    onOpenChange={() => {
                        setOpen(true);
                    }}
                    placement="top"
                    content={() => {
                        return (
                            <div>
                                <Checkbox defaultChecked={inductionFactor === 2 ? true : false} onChange={(e) => {
                                    setInductionFactor(e.target.checked ? 2 : 1)
                                    if (e.target.checked) {
                                        setInductionFactor(2)
                                        let res = equationFunc({ L: 2 })
                                        setTheCurrent(res.theCurrent)
                                    } else {
                                        setInductionFactor(1)
                                        let res = equationFunc({ L: 1 })
                                        setTheCurrent(res.theCurrent)
                                    }
                                }} >
                                    قلب حديد
                                </Checkbox>
                            </div>
                        )
                    }} trigger="contextMenu">
                    <div
                        style={{ width: "100px" }}
                        className={` flex items-center justify-center `}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <Handle
                            id="iS"
                            style={{
                                background: 'red',
                                right: "3px",
                                top: '70.5px',
                                height: 10,
                                width: 10,
                                borderColor: 'red'
                            }}
                            className="z-50"
                            type="source"
                            position="right"
                        />

                        <Handle
                            id="iT"
                            style={{
                                background: 'blue',
                                left: "9px",
                                top: '70.5px',
                                height: 10,
                                width: 10,
                                borderColor: 'blue'
                            }}
                            className=" z-50 " type="target" position="left" />
                        <div className="absolute" >
                            <Image preview={false} src={inductorBack} />
                        </div>
                        {
                            inductionFactor === 2 &&
                            <div style={{ marginTop: -48 }} className="absolute  animate__animated  animate__fadeInRight">
                                <Image preview={false} src={iron} />
                            </div>
                        }
                        <div>
                            <Image preview={false} src={inductorFront} />
                        </div>
                    </div>
                </Popover>
            </div>
        </>
    );
}
export default memo(Inductor);