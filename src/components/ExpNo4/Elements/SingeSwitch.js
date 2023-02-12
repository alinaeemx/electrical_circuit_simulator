import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import { Image } from 'antd';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import openKey from "../../../assets/images/openKey.png";
import closeKey from "../../../assets/images/closeKey.png";
import { ExpSB3store } from '../../../store';
function SingeSwitch({
    id,
    isConnectable,
    data
}) {
    const { Run, setRunError } = ExpSB3store();
    const { onRunningOpenKey, onRunningCloseKey } = data
    const [keyOpenClose, setKeyOpenClose] = useState(openKey);
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(270);
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
    }, [id, updateNodeInternals, onRunningOpenKey, onRunningCloseKey]);

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
                            if (keyOpenClose === openKey) {
                                setKeyOpenClose(closeKey);
                                onRunningOpenKey()
                            } else {
                                setKeyOpenClose(openKey);
                                onRunningCloseKey()
                            }
                        } else {
                            setRunError(true)
                        }


                    }}

                >
                    <Handle
                        id='swT'
                        style={{ 
                            background: 'blue',
                            marginTop: '2px',
                        }}
                        isConnectable={isConnectable} className="z-50 " type="target" position="left" />
                    <Handle
                        id='swS'
                        style={{ 
                            marginTop: '2px',
                            background: 'red'
                        }}
                        isConnectable={isConnectable}
                        className=" z-50" type="source" position="right" />
                    
                    <Image preview={false} src={keyOpenClose} />
                </div>
            </div>
        </>
    );
}
export default memo(SingeSwitch);