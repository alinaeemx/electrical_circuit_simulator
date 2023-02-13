import React from 'react';
import singeSwitch from '../../assets/images/openKey.png';
import InductorIco from '../../assets/images/inductor.png';
import ACSourceIco from '../../assets/images/AC.png';
import AmmeterIco from '../../assets/images/ammeter.png';
import VoltmeterIco from '../../assets/images/voltmeter.png';
import { ExpSB3store } from '../../store';
import { Tooltip } from 'antd';


export const ExpSB3 = () => {
    let sidebarElement = 'w-14 h-14 flex flex-col justify-center items-center text-sm font-bold cursor-pointer '
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('data', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { SingeSwitch, Inductor, ACSource, Ammeter, Voltmeter } = ExpSB3store();

    return (
        <>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مفتاح مزدوج'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={SingeSwitch ? `cursor-not-allowed opacity-50 ${sidebarElement} ` : sidebarElement}
                >
                    <div draggable={!SingeSwitch} onDragStart={(event) => {
                        onDragStart(event, 'SingeSwitch')
                    }}>
                        <img style={{ transform: 'rotate(-90deg)' }} alt='' draggable={false} src={singeSwitch} />
                    </div>
                    <span className="mt-1" >Switch</span>
                </div>
            </Tooltip>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'ملف'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Inductor ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Inductor} onDragStart={(event) => {
                        onDragStart(event, 'Inductor')
                    }} >
                        <img alt='' draggable={false} src={InductorIco} />
                    </div>
                    <span className="mt-1" >Inductor</span>
                </div>
            </Tooltip>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'مذبذب كهربائي'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={ACSource ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!ACSource} onDragStart={(event) => {
                        onDragStart(event, 'ACSource')
                    }} >
                        <img alt='' draggable={false} src={ACSourceIco} />
                    </div>
                    <span className="mt-1" >ACSource</span>
                </div>
            </Tooltip>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'اميتير'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Ammeter ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Ammeter} onDragStart={(event) => {
                        onDragStart(event, 'Ammeter')
                    }} >
                        <img alt='' draggable={false} src={AmmeterIco} />
                    </div>
                    <span className="mt-1" >Ammeter</span>
                </div>
            </Tooltip>
            <Tooltip color={'rgba(0,0,0,0.5)'} placement='left' title={'فولتميتر'} >
                <div
                    style={{ marginBottom: '30px', marginTop: '30px' }}
                    className={Voltmeter ? `cursor-not-allowed opacity-50 ${sidebarElement}` : sidebarElement}
                >
                    <div draggable={!Voltmeter} onDragStart={(event) => {
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