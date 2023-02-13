/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import VoltmeterImg from "../../../assets/images/voltmeter.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import '../../../style/seven_segment.css';
import { Display } from "react-7-segment-display";

function Voltmeter({
    id,
    // isConnectable
    data
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const { numberVoltmeter } = data
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
    }, [id, updateNodeInternals, numberVoltmeter]);

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
                <Handle
                    id="vS"
                    style={{ height: 8, width: 8, background: 'red', borderColor: 'red', marginLeft: 5, marginBottom:-8.5 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="vT"
                    style={{ height: 8, width: 8, background: 'blue', borderColor: 'blue', marginLeft: -5, marginBottom: -8.5 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" w-20 h-20  " >
                    <div className="absolute text-center flex justify-center items-center"
                        style={{
                            width: " 54px",
                            height: "30px",
                            borderRadius: "5px",
                            right: "13px",
                            top: "20px",
                            background: 'white',
                        }}
                    >
                        <Display height={20} count={4} skew  backgroundColor='white' value="" />
                    </div>
                    <img
                        src={VoltmeterImg}
                        alt="Overlay Image"
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Voltmeter);