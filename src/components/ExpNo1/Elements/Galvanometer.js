/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import galvanometerImg from "../../../assets/images/GalvanometerIco.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../CustomNode/style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { GalvanometerIco } from "../../../assets/svgIcons";

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
                    id="gS"
                    style={{ height: 6, width: 6, background: 'red', borderColor: 'red', marginLeft: 21.2, marginBottom: 17 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="gT"
                    style={{ height: 6, width: 6, background: 'blue', borderColor: 'blue', marginLeft: -21.2, marginBottom: 17 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" w-20 h-20  " >
                    <GalvanometerIco />
                    <img
                        src={galvanometerImg}
                        alt="Overlay Image"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Galvanometer);

