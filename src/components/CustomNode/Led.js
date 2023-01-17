  
import   './style/led.css'
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection'; 
 
import styles from './style/style.module.css';
import switchCueArrow from "../../assets/images/switchCueArrow.png";
import { Image } from 'antd';
 
function Led({
    id,
    // isConnectable
}) { 
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
                <Handle style={{ marginTop:20 ,marginRight:12 }} className="z-50 " type="source" position="right" />
                <Handle style={{ marginTop:0 }} className=" z-50 " type="target" position="right" />
                <div className="light rotate-90">
                    <div className="bulb">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div> 
            </div>
        </>
    );
}
export default memo(Led);
