import React from 'react';
import battery from '../../assets/images/battery.png';
import singeSwitch from '../../assets/images/openKey.png';
import VoltmeterIco from '../../assets/images/fVoltmeter.png';
import capacitor from '../../assets/images/capacity/0.png';
import { ExpSB1store } from '../../store';
import { Tooltip } from 'antd';


export const ExpSB1 = () => {
    let sidebarElement = 'w-14 h-14 flex flex-col justify-center items-center text-sm font-bold cursor-pointer '
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('data', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { Capacitor, Voltmeter, SingeSwitch, DCSource, currentStep } = ExpSB1store();

    return (
        <>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مفتاح'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={currentStep === 1 || SingeSwitch === true ? `cursor-not-allowed opacity-50 ${sidebarElement} ` : sidebarElement}
                >
                    <div draggable={currentStep === 1 || SingeSwitch === true ? false : true} onDragStart={(event) => {
                        onDragStart(event, 'SingeSwitch')
                    }}>
                        <img style={{ transform: 'rotate(90deg)' }} alt='' draggable={false} src={singeSwitch} />
                    </div>
                    <span className="mt-1" >Switch</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'بطارية'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={currentStep === 1 || DCSource === true ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={currentStep === 1 || DCSource === true ? false : true} onDragStart={(event) => {
                        onDragStart(event, 'DCSource')
                    }} >
                        <img alt='' draggable={false} src={battery} />
                    </div>
                    <span className="mt-1" >Battery</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'متسعة'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Capacitor === true ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={Capacitor === true ? false : true} onDragStart={(event) => {
                        onDragStart(event, 'Capacitor')
                    }} >
                        <img alt='' draggable={false} src={capacitor} />
                    </div>
                    <span className="mt-1" >Capacitor</span>
                </div>
            </Tooltip>

            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'فولتميتر'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={currentStep === 0 || Voltmeter ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={currentStep === 0 || Voltmeter === true ? false : true} onDragStart={(event) => {
                        onDragStart(event, 'Voltmeter')
                    }} >
                        <img alt='' draggable={false} src={VoltmeterIco} />
                    </div>
                    <span className="mt-1" >Voltmeter</span>
                </div>
            </Tooltip>
        </>
    )
}