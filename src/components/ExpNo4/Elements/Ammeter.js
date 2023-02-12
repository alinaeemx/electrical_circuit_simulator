/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import ammeterImg from "../../../assets/images/ammeter.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png"; 

function Ammeter({
    id,
    // isConnectable
    data
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const { numberAmmeter } = data
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
    }, [id, updateNodeInternals, numberAmmeter]);

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
                    id="aS"
                    style={{ height: 6, width: 6, background: 'red', borderColor: 'red', marginLeft: 21.2, marginBottom: 17 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="aT"
                    style={{ height: 6, width: 6, background: 'blue', borderColor: 'blue', marginLeft: -21.2, marginBottom: 17 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" w-20 h-20  " >
                    <div className="absolute text-center"
                        style={{
                            width: " 54px",
                            height: "30px", 
                            borderRadius: "5px",
                            right: "13px",
                            top: "6px",
                        }}
                    >
                        <span className="text-xs text-center">
                            {numberAmmeter} A
                        </span>
                    </div>
                    <img
                        src={ammeterImg}
                        alt="Overlay Image"
                    // style={{
                    //     position: "absolute",
                    //     top: 0,
                    //     left: 0,
                    //     right: 0,
                    //     bottom: 0
                    // }}
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Ammeter);

