import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import { Image } from 'antd';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import openKey1 from "../../../assets/images/openKey1.png";
import openKey2 from "../../../assets/images/openKey2.png";
import { ExpSB2store } from '../../../store';
function DSwitch({
    id,
    isConnectable,
    data
}) {
    const { Run, setRunError } = ExpSB2store();
    const { onRunningOpenKey1, onRunningOpenKey2 } = data
    const [keyOpenClose, setKeyOpenClose] = useState(openKey2);
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
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
    }, [id, updateNodeInternals, onRunningOpenKey1, onRunningOpenKey2]);

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
                <div
                    style={{ width: "50px" }}
                    className=" flex items-center justify-center switchKey "
                    onClick={() => {
                        if (Run) {
                            if (keyOpenClose === openKey1) {
                                setKeyOpenClose(openKey2);
                                onRunningOpenKey2()
                            } else {
                                setKeyOpenClose(openKey1);
                                onRunningOpenKey1()
                            }
                        } else {
                            setRunError(true)
                        }


                    }}

                >
                    <Handle
                        id='dsMiddle'
                        style={{
                            marginLeft: '5px',
                            background: 'blue'
                        }}
                        isConnectable={isConnectable} className="ml-1 z-50 " type="target" position="left" />
                    <Handle
                        id="dsTop"
                        style={{
                            marginTop: '-14px',
                            marginRight: '5.5px', background: 'red'
                        }}
                        isConnectable={isConnectable}
                        className=" z-50" type="source" position="right" />
                    <Handle
                        id="dsBottom"
                        style={{
                            marginTop: '14px',
                            marginRight: '5.5px',
                            background: 'red'
                        }}
                        isConnectable={isConnectable}
                        className="z-50 " type="source" position="right" />
                    <Image preview={false} src={keyOpenClose} />
                </div>
            </div>
        </>
    );
}
export default memo(DSwitch);