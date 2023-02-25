/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image } from "antd";
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { RadialGauge } from 'canvas-gauges';
import { HiMinus, HiPlus } from "react-icons/hi";
import styles from '../../../style/style.module.css';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import React, { useEffect, useState, useRef, memo } from 'react';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { ExpSB1store } from "../../../store";

function Voltmeter({ id, data }) {
    const rotateControlRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const updateNodeInternals = useUpdateNodeInternals();
    const { direction } = data;
    const { voltmeterValue } = ExpSB1store();

    useEffect(() => {
        const gauge = new RadialGauge({
            renderTo: 'gauge',
            width: 95,
            height: 95,
            ticksAngle: 180,
            startAngle: 90,
            title: 'Voltmeter',
            borders: false,
            valueBox: false,
            barWidth: "3%",
            colorPlate: '#F1F1F2',
            colorMajorTicks: '#263238',
            colorMinorTicks: '#546F7A',
            colorTitle: "#263238",
            colorNumbers: "#263238",
            highlights: { from: 0, to: 100, color: "#FFFFFF" },
            minValue: 0,
            maxValue: 100,
            minorTicks: 10,
            // minValue:-4,
            // maxValue:4,
            // majorTicks: [-4,-3,-2,-1,0,1,2,3,4],
            // minorTicks: 5,
        });
        gauge.value = voltmeterValue;
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
    }, [id, updateNodeInternals, direction, voltmeterValue]);

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
                    id="vS"
                    style={{ height: 10, width: 10, background: 'red', borderColor: '#F1F1F2', marginLeft: -30, marginBottom: 10 }}
                    className=" z-50 " type="source" position="bottom" />
                <Handle
                    id="vT"
                    style={{ height: 10, width: 10, background: 'blue', borderColor: '#F1F1F2', marginLeft: 30, marginBottom: 10 }}
                    className=" z-50 " type="target" position="bottom" />
                <div className=" flex flex-col justify-center items-center " style={{ height: 105, width: 110, borderRadius: '8px', background: '#546F7A' }} >
                    <canvas id="gauge" />
                    <div
                        style={{
                            background: '#546F7A',
                            height: '42px',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px'

                        }}
                    ></div>
                </div>
                <div
                    style={{
                        background: 'rgba(38, 50, 56, 0.20)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(0px)',
                        WebkitBackdropFilter: 'blur(0px)',
                        border: '1px solid rgba(38, 50, 56, 0.43)',
                        borderRadius: '8px 8px 0 0',
                        position: 'absolute',
                        bottom: 39,
                        top: 4,
                        right: 4,
                        left: 4,
                        zIndex: 110

                    }}
                ></div>
                <HiPlus style={{
                    position: 'absolute',
                    left: 17,
                    bottom: 20,
                    color: '#263238'
                }} />
                <HiMinus style={{
                    position: 'absolute',
                    right: 17,
                    bottom: 20,
                    color: '#263238'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 38,
                    right: 38,
                    height: 15,
                    borderRadius: 5,
                    background: "#F1F1F2",
                    fontSize: 7,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid rgba(38, 50, 56, 0.43)'

                }} >
                    <span>00.00 V</span>
                </div>
            </div>
        </>
    );
}

export default memo(Voltmeter);

