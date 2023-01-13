import React from 'react';
import { CapacitorIco, DCSourceIco, DSwitchIco, LampIco } from '../../assets/svgIcons';

export const SecondExpSB = () => {
    let sidebarElement = 'w-14 h-14 rounded-lg border-2 border-gray-200 '
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('data', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <DSwitchIco />
            </div>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <CapacitorIco />
            </div>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <DCSourceIco />
            </div>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <LampIco />
            </div>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <LampIco />
            </div>
            <div draggable onDragStart={(event) => {
                onDragStart(event, 'input')
            }} className={sidebarElement} >
                <LampIco />
            </div>
        </>
    )
}