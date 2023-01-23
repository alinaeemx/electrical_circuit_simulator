
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import styles from '../../CustomNode/style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import '../../CustomNode/style/led.css'
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
                    }}
                    className={`nodrag ${styles.rotateHandle}`}
                >
                    <Image preview={false} src={switchCueArrow} />
                </div>
                <div className=" w-44 flex items-center justify-center">
                    <Handle id="lT" style={{ marginTop: -15, marginRight: 25, background: 'blue' }} className="z-50 " type="target" position="right" />
                    <Handle id="lS" style={{ marginTop: 0, background: 'red' }} className=" z-50 " type="source" position="right" />
                    <div className="light rotate-90">
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
