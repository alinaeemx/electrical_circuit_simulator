

import { Button, Dropdown, Image, Slider } from "antd";

import ACIcon from "../../../assets/images/AC.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { MoreOutlined } from "@ant-design/icons";

function ACSource({
    id,
    // isConnectable
    data
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const {runProses,frequency}=data 
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
    }, [id, updateNodeInternals,runProses,frequency]);
    const marks = {
        1.0: '1.0Hz',
        1.3: '1.3Hz',
        1.5: '1.5Hz',
        1.7: '1.7Hz',
        2.0: {
            style: {
                color: '#f50',
            },
            label: <strong>2.0Hz</strong>,
        },
    };
    const items = [
        {
            label:
                <div>
                    <span>التردد</span>
                    <Slider
                        style={{
                            width: 220
                        }}
                        defaultValue={frequency}
                        marks={marks}
                        step={0.01}
                        max={2.0}
                        min={1.0}
                        onAfterChange={(newFrequency) => {
                           runProses({newFrequency})
                        }}
                    />
                </div>
            ,
            key: 'frequency',
        },
        // {
        //     label: <Button type="text" onClick={() => {
        //         setRotation(90)
        //     }} >دوان 90 درجة</Button>,
        //     key: 'rotation90',
        // },
        // {
        //     label: <Button type="text" onClick={() => {
        //         setRotation(180)
        //     }} >دوان 180 درجة</Button>,
        //     key: 'rotation180',
        // },
        // {
        //     label: <Button type="text" onClick={() => {
        //         setRotation(270)
        //     }} >دوان 270 درجة</Button>,
        //     key: 'rotation270',
        // },
    ];
   

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']} 
            // }}
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
                    className=" flex items-center justify-center "
                >
                    <Handle
                        id="acT"
                        style={{ background: 'blue' }}
                        className=" z-50 " type="target" position="right" />
                    <Handle
                        id="acS"
                        style={{ background: 'red' }}
                        className=" z-50 " type="source" position="left" />
                    <Image preview={false} src={ACIcon} className="" />
                </div>
            </div>
        </>
    );
}
export default memo(ACSource);

