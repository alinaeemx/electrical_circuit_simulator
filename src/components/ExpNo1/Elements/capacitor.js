import { Image } from "antd";
// import capacitance from "../../assets/images/capacitance.png";
import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
////////////////////////////////////////////////////////////////
import rCap0 from "../../../assets/images/capacity/rightCap/0.png";
import rCap1 from "../../../assets/images/capacity/rightCap/1.png";
import rCap2 from "../../../assets/images/capacity/rightCap/2.png";
import rCap3 from "../../../assets/images/capacity/rightCap/3.png";
import rCap4 from "../../../assets/images/capacity/rightCap/4.png";
import rCap5 from "../../../assets/images/capacity/rightCap/5.png";
import rCap6 from "../../../assets/images/capacity/rightCap/6.png";
import rCap7 from "../../../assets/images/capacity/rightCap/7.png";
import rCap8 from "../../../assets/images/capacity/rightCap/8.png";
import rCap9 from "../../../assets/images/capacity/rightCap/9.png";
import rCap10 from "../../../assets/images/capacity/rightCap/10.png";
/////////////////////////////////////////////////////////////
import lCap0 from "../../../assets/images/capacity/leftCap/0.png";
import lCap1 from "../../../assets/images/capacity/leftCap/1.png";
import lCap2 from "../../../assets/images/capacity/leftCap/2.png";
import lCap3 from "../../../assets/images/capacity/leftCap/3.png";
import lCap4 from "../../../assets/images/capacity/leftCap/4.png";
import lCap5 from "../../../assets/images/capacity/leftCap/5.png";
import lCap6 from "../../../assets/images/capacity/leftCap/6.png";
import lCap7 from "../../../assets/images/capacity/leftCap/7.png";
import lCap8 from "../../../assets/images/capacity/leftCap/8.png";
import lCap9 from "../../../assets/images/capacity/leftCap/9.png";
import lCap10 from "../../../assets/images/capacity/leftCap/10.png";
///////////////////////////////////////////////////////////////
import insulator from '../../../assets/images/capacity/insulator.png';
import { ExpSB1store } from "../../../store";
const capacitance = [
    {
        right: rCap0,
        left: lCap0
    },
    {
        right: rCap1,
        left: lCap1
    },
    {
        right: rCap2,
        left: lCap2
    },
    {
        right: rCap3,
        left: lCap3
    },
    {
        right: rCap4,
        left: lCap4
    },
    {
        right: rCap5,
        left: lCap5
    },
    {
        right: rCap6,
        left: lCap6
    },
    {
        right: rCap7,
        left: lCap7
    },
    {
        right: rCap8,
        left: lCap8
    },
    {
        right: rCap9,
        left: lCap9
    },
    {
        right: rCap10,
        left: lCap10
    },
]
function Capacitor({ id, data }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const rotateControlRef = useRef(null);
    const { CapacityImgIdx, theInsulator, currentStep } = ExpSB1store();

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
                <div
                    style={{ width: "75px" }}
                    className=" flex items-center justify-center "
                >
                    <Handle
                        id='cS'
                        style={{ background: 'red', marginRight: '5.5px', borderColor: 'red', height: 7, width: 7 }}
                        className=" z-50 " type="source" position="right" />

                    <Handle
                        id="cT"
                        style={{ background: 'blue', marginLeft: '8.4px', marginTop: '0.2px', borderColor: 'blue', height: 7, width: 7 }}
                        className=" z-50 " type="target" position="left" />

                    <div className="absolute z-10 " >
                        <img alt="" src={capacitance[CapacityImgIdx].left} />
                    </div>
                    {
                        theInsulator && currentStep === 1 && (
                            <div className="absolute animate__animated animate__slideInDown " >
                                <img alt="" src={insulator} />
                            </div>
                        )
                    }
                    <div>
                        <img alt="" src={capacitance[CapacityImgIdx].right} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default memo(Capacitor);
