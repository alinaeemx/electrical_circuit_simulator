

import { Button, Dropdown, Image, Slider } from "antd";

import ACIcon from "../../../assets/images/AC.png";

import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from '../../../style/style.module.css';
import switchCueArrow from "../../../assets/images/switchCueArrow.png";
import { MoreOutlined } from "@ant-design/icons";
import SineWaves from 'sine-waves'


function ACSource({
    id,
    // isConnectable
    data
}) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    const { runProses, frequency } = data
    useEffect(() => {

        new SineWaves({
            el: document.getElementById('waves'),

            speed: 4,


            ease: 'Linear',

            wavesWidth: '100%',

            waves: [
                {
                    timeModifier: 2,
                    lineWidth: 1,
                    amplitude: 60,
                    wavelength: 40,
                    strokeStyle: 'rgba(2, 2, 2, 0.8)'
                }
            ],

            // Called on window resize

        });

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
    }, [id, updateNodeInternals, runProses, frequency]);
    const marks = {
        1.0: '1.0Hz',
        1.3: '1.3Hz',
        1.5: '1.5Hz',
        1.7: '1.7Hz',
        2.0: {
            style: {
                color: '#f50',
            },
            label: <strong>2.0Hz</strong>,
        },
    };
    const items = [
        {
            label:
                <div>
                    <span>التردد</span>
                    <Slider
                        style={{
                            width: 220
                        }}
                        defaultValue={frequency}
                        marks={marks}
                        step={0.01}
                        max={2.0}
                        min={1.0}
                        onAfterChange={(newFrequency) => {
                            runProses({ newFrequency })
                        }}
                    />
                </div>
            ,
            key: 'frequency',
        },
      
    ];




    return (
        <>

            <div className="h-32 w-40 rounded-md border-2 border-slate-600 bg-red-600 flex justify-center items-start">
                <canvas className="h-16 border-2 rounded-md border-slate-700"
                    style={{
                        zIndex: 999,
                        position: 'absolute',
                        marginTop: "5px",
                        width: "150px",
                       backgroundColor:"white",
                    }}
                    id="waves"></canvas>
                <div className="bg-white h-4 w-4">

                </div>
            </div>
        </>
    );
}
export default memo(ACSource);

