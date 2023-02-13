import {
    Button, Checkbox, Dropdown, Image
    // , theme
} from "antd";
import inductorBack from "../../../assets/images/inductorBack.png";
import inductorFront from "../../../assets/images/inductorFront.png";
import megBack from "../../../assets/images/meg.png";
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';

import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { MoreOutlined } from "@ant-design/icons";


function Inductor({
    id,
    // isConnectable
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const [isMegaton, setIsMegaton] = useState(false);
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
    const items = [
        {
            label: <Checkbox defaultChecked={isMegaton} onChange={(e) => {
                setIsMegaton(e.target.checked);
                console.log(e.target.checked);
            }} > قلب حديد</Checkbox>,
            key: 'megaton',
        },
        // {
        //     label: <Checkbox defaultChecked={rotation > 0 ? true : false} onChange={(e) => {
        //         // setIsRotation90(e.target.checked);
        //         setRotation(e.target.checked ? 90 : 0)
        //         console.log(e.target.checked);
        //     }} >دوان 90 درجة</Checkbox>,
        //     key: 'rotation90',
        // },
    ];
    // const {
    //     token: { colorBgLayout, colorTextTertiary, colorPrimary },
    // } = theme.useToken();
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >

                <div className={`flex flex-row-reverse `}>
                    <Button
                        style={{
                            // color: colorPrimary,
                            fontSize: "16px",
                            marginBottom: "8px",
                            marginRight: "-7px"
                        }}
                        type="text"
                        shape="circle" icon={<MoreOutlined />} />
                </div>
            </Dropdown>
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
                <div
                    style={{ width: "50px" }}
                    className={` flex items-center justify-center `}
                >
                    <Handle
                    id="iS"
                    style={{
                        background: 'red',
                        // right: "9px"
                    }}
                        className="z-50 mr-1"
                        type="source"
                        position="right"
                    />

                    <Handle
                        id="iT"
                        style={{
                            background: 'blue',
                            left: "24px",
                            top: "18px"
                        }}
                        className=" z-50 " type="target" position="top" />
                    <div className="absolute">
                        <Image preview={false} src={inductorBack} className="" />
                    </div>
                    {
                        isMegaton &&
                        <div className="absolute  animate__animated  animate__fadeInRight">
                            <Image preview={false} src={megBack} className="" />
                        </div>
                    }

                    <Image style={{ marginTop: "-7px" }} preview={false} src={inductorFront} className="" />
                </div>
            </div>
        </>
    );
}
export default memo(Inductor);

