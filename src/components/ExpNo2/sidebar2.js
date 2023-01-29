import React from 'react';
import ResistorIco from '../../assets/images/resistor.png'
import LampIco from '../../assets/images/lamp.png'
import battery from '../../assets/images/battery.png';
import dSwitch from '../../assets/images/openKey2.png';
import galvanometerIco from '../../assets/images/galvanometer.png';
import capacitor from '../../assets/images/capacity/0.png';
import { ExpSB2store } from '../../store';


export const ExpSB2 = () => {
    // let sidebarElement = 'w-14 h-14 rounded-lg border-2 border-gray-200 '
    let sidebarElement = 'w-14 h-14 flex justify-center items-center  '
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('data', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { Capacitor, Resistor, Lamp, DSwitch, DCSource, Galvanometer } = ExpSB2store();

    return (
        <>
            <div draggable={!DSwitch} onDragStart={(event) => {
                onDragStart(event, 'DSwitch')
            }} className={DSwitch ? `cursor-not-allowed opacity-50 ${sidebarElement} ` : sidebarElement} >
                <img  alt='' draggable={false} src={dSwitch} />
            </div>

            <div draggable={!Capacitor} onDragStart={(event) => {
                onDragStart(event, 'Capacitor')
            }} className={Capacitor ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement} >
                <img style={{ height: 50, width: 100 }} alt='' draggable={false} src={capacitor} />
            </div>

            <div draggable={!DCSource} onDragStart={(event) => {
                onDragStart(event, 'DCSource')
            }} className={DCSource ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement} >
                <img alt='' draggable={false} src={battery} />
            </div>

            <div draggable={!Resistor} onDragStart={(event) => {
                onDragStart(event, 'Resistor')
            }} className={Resistor ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement} >
                <img alt='' draggable={false} src={ResistorIco} />
            </div>

            <div draggable={!Lamp} onDragStart={(event) => {
                onDragStart(event, 'Lamp')
            }} className={Lamp ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement} >
                <img style={{ height: 60, width: 40 }} alt='' draggable={false} src={LampIco} />
            </div>

            <div draggable={!Galvanometer} onDragStart={(event) => {
                onDragStart(event, 'Galvanometer')
            }} className={Galvanometer ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement} >
                <img alt='' draggable={false} src={galvanometerIco} />
            </div>
        </>
    )
}