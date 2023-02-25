/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import ammeterImg from "../../../assets/images/ammeter.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { Display } from "react-7-segment-display";
import { ExpSB3store } from "../../../store";

function Ammeter({
    id,
    // isConnectable
    data
}) {
    const { Run, switchStatus, theCurrent } = ExpSB3store();
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    // const {  } = data
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
    }, [id, updateNodeInternals, theCurrent]);

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
                    style={{ height: 10, width: 10, background: 'red', borderColor: 'red', marginLeft: 24.5, marginBottom: 11 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="aT"
                    style={{ height: 10, width: 10, background: 'blue', borderColor: 'blue', marginLeft: -24.5, marginBottom: 11 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" w-20 h-20" >
                    <div className="absolute flex justify-center items-center"
                        style={{
                            height: "35.3px",
                            right: "9px",
                            top: "9px",
                            background: '#E3E3E3',
                            padding: '3.8px'
                        }}
                    >
                        <div style={{ marginRight: '1px' }} >
                            <Display
                                color="black"
                                skew
                                height={22}
                                count={2}
                                value={
                                    Run === true && switchStatus === true
                                        ?
                                        `${parseInt(theCurrent)}`
                                        : null
                                } />
                        </div>
                        <div style={{ position: 'absolute', bottom: '2px', color: 'red', filter: 'opacity(0.3) grayscale(0.7)' }} >.</div>
                        <div style={{ marginLeft: '1px' }} >
                            <Display
                                color="black"
                                skew
                                height={22}
                                count={2}
                                value={
                                    Run === true && switchStatus === true
                                        ?
                                        `${(theCurrent).toFixed(2).split('.')[1]}`
                                        : null
                                } />
                        </div>
                    </div>
                    <img
                        src={ammeterImg}
                        alt="Overlay Image"
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Ammeter);

