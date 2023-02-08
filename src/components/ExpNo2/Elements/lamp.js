
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import '../../../style/led.css'
import { Image } from 'antd';

function Lamp({
    id,
    data
    // isConnectable
}) {
    const { onLed } = data
    const [led, setLed] = useState('bulb1')
    useEffect(() => {
        let first = true
        if (first) {
            if (onLed === 'on') {
                setLed('bulb')
            }
            else {
                setLed('bulb1')
            }
        }
        return () => {
            first = false
        }
    }, [onLed])



    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(90);
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
                        marginTop: 30
                    }}
                    className={`nodrag ${styles.rotateHandle}`}

                >
                    <Image preview={false} src={switchCueArrow} />
                </div>
                <div>
                    <Handle
                        id="lT"
                        type="target"
                        position="right"
                        style={{
                            background: 'blue',
                            zIndex: 50, 
                            marginTop:-8,
                            marginRight:7,
                        }}
                    />
                    <Handle
                        id="lS"
                        type="source"
                        position="right"
                        style={{
                            background: 'red',
                            zIndex: 50,
                            marginRight:-3,
                        }}
                    />
                    <div className="light rotate-90 scale-50">
                        <div className={led}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default memo(Lamp);
