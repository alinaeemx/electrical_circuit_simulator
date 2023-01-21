import { Image } from "antd";
import { GlobalStore } from "../../store";
import galva from "../../assets/images/gelva1.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from './style/style.module.css';
import switchCueArrow from "../../assets/images/switchCueArrow.png";
import { GalvanometerIco } from "../../assets/svgIcons";

function Galvanometer({
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

    const { volt } = GlobalStore();
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
                <div style={{ position: "relative",height:"200px" ,width:"170px" }} >
                    {/* <div className="h-12 w-12" > */}

                    <GalvanometerIco />
                    {/* </div> */}
                    <img
                        src={galva}
                        alt="Overlay Image"
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "16px"
                        }}
                        width={170}
                        height={200}
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Galvanometer);

