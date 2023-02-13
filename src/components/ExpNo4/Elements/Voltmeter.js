/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import VoltmeterImg from "../../../assets/images/voltmeter.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { GalvanometerIco } from "../../../assets/svgIcons";

function Voltmeter({
    id,
    // isConnectable
    data
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const { volta, isCloseSwitch } = data
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
    }, [id, updateNodeInternals, volta]);

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
                    style={{ height: 6, width: 6, background: 'red', borderColor: 'red', marginLeft: 21.2, marginBottom: 17 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="vT"
                    style={{ height: 6, width: 6, background: 'blue', borderColor: 'blue', marginLeft: -21.2, marginBottom: 17 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" w-20 h-20  " >
                    <div className="absolute text-center flex flex-col items-center justify-center gap-0"
                        style={{
                            width: " 54px",
                            height: "34px",
                            borderRadius: "5px",
                            right: "13px",
                            top: "11px",
                            background: '#fff'
                        }}
                    >
                        <span className="text-xs text-center">
                            {isCloseSwitch ? parseFloat(volta).toFixed(2) : 0.0.toFixed(2)} V
                        </span>
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