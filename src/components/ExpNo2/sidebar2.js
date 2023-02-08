import React from 'react';
import ResistorIco from '../../assets/images/resistor.png'
import LampIco from '../../assets/images/lamp.png'
import battery from '../../assets/images/battery.png';
import dSwitch from '../../assets/images/openKey2.png';
import galvanometerIco from '../../assets/images/galvanometer.png';
import capacitor from '../../assets/images/capacity/0.png';
import { ExpSB2store } from '../../store';
import { Tooltip } from 'antd';


export const ExpSB2 = () => {
    let sidebarElement = 'w-14 h-14 flex flex-col justify-center items-center text-sm font-bold cursor-pointer '
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('data', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { Capacitor, Resistor, Lamp, DSwitch, DCSource, Galvanometer } = ExpSB2store();

    return (
        <>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مفتاح مزدوج'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={DSwitch ? `cursor-not-allowed opacity-50 ${sidebarElement} ` : sidebarElement}
                >
                    <div draggable={!DSwitch} onDragStart={(event) => {
                        onDragStart(event, 'DSwitch')
                    }}>
                        <img alt='' draggable={false} src={dSwitch} />
                    </div>
                    <span className="mt-1" >Switch</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'متسعة'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Capacitor ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Capacitor} onDragStart={(event) => {
                        onDragStart(event, 'Capacitor')
                    }} >
                        <img alt='' draggable={false} src={capacitor} />
                    </div>
                    <span className="mt-1" >Capacitor</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'بطارية'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={DCSource ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!DCSource} onDragStart={(event) => {
                        onDragStart(event, 'DCSource')
                    }} >
                        <img alt='' draggable={false} src={battery} />
                    </div>
                    <span className="mt-1" >Battery</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مقاومة'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Resistor ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Resistor} onDragStart={(event) => {
                        onDragStart(event, 'Resistor')
                    }} >
                        <img alt='' draggable={false} src={ResistorIco} />
                    </div>
                    <span className="mt-1" >Resistor</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مصباح'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Lamp ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Lamp} onDragStart={(event) => {
                        onDragStart(event, 'Lamp')
                    }} >
                        <img style={{ height: 80, width: 55 }} alt='' draggable={false} src={LampIco} />
                    </div>
                    <span className="mt-1" >Lamp</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'كلفانوميتر'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Galvanometer ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Galvanometer} onDragStart={(event) => {
                        onDragStart(event, 'Galvanometer')
                    }} >
                        <img alt='' draggable={false} src={galvanometerIco} />
                    </div>
                    <span className="mt-1" >Galvanometer</span>
                </div>
            </Tooltip>
        </>
    )
}