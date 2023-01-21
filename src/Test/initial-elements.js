import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
    // {
    //     id: '1',
    //     // type: 'output',
    //     data: {
    //         label: 'Buttery',
    //     },
    //     className: 'circle',
    //     style: {
    //         background: '#2B6CB0',
    //         color: 'white',
    //     },
    //     position: { x: 20, y: 20 },
    //     sourcePosition: Position.Top,
    //     targetPosition: Position.Bottom,
    // },
    // {
    //     id: '2',
    //     // type: 'output',
    //     data: {
    //         label: 'Capacity',
    //     },
    //     // className: 'circle',
    //     style: {
    //         background: '#2B6CB0',
    //         color: 'white',
    //     },
    //     position: { x: 120, y: 20 },
    //     sourcePosition: Position.Bottom,
    //     targetPosition: Position.Top,
    // },
    // {
    //     id: '3',
    //     // type: 'output',
    //     data: {
    //         label: 'Buttery',
    //     },
    //     className: 'circle',
    //     style: {
    //         background: '#2B0',
    //         color: 'white',
    //     },
    //     position: { x: 320, y: 20 },
    //     sourcePosition: Position.Top,
    //     targetPosition: Position.Bottom,
    // },
    //   {
    //     id: '1',
    //     type: 'input',
    //     data: {
    //       label: 'Input Node',
    //     },
    //     position: { x: 250, y: 0 },
    //   },
    //   {
    //     id: '2',
    //     data: {
    //       label: 'Default Node',
    //     },
    //     position: { x: 100, y: 100 },
    //   },
    //   {
    //     id: '3',
    //     type: 'output',
    //     data: {
    //       label: 'Output Node',
    //     },
    //     position: { x: 400, y: 100 },
    //   },
    {
        id: 'led1',
        type: 'Led',
        position: { x: 100, y: 200 },
        data: {
            name: 'led',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    {
        id: 'led2',
        type: 'Led',
        position: { x: 200, y: 10 },
        data: {
            name: 'led',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    {
        id: 'battery1',
        type: 'Battery',
        position: { x: 300, y: 200 },
        data: {
            name: 'battery',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },

    {
        id: 'capacity1',
        type: 'Capacity',
        position: { x: 400, y: 100 },
        data: {
            name: 'capacity',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    {
        id: 'voltage1',
        type: 'Voltage',
        position: { x: 500, y: 100 },
        data: {
            name: 'voltage',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    {
        id: 'switch1',
        type: 'SwitchKey',
        position: { x: 520, y: 400 },
        data: {
            name: 'switch',
            id: 1
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },

    {
        id: 'switch12',
        type: 'SwitchKey',
        position: { x: 500, y: 400 },
        data: {
            name: 'switch',
            id: 1
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    
    {
        id: 'switch2',
        type: 'SwitchDoubleKey',
        position: { x: 300, y: 500 },
        data: {
            name: 'switch',
            id: 2
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    {
        id: 'gelva1',
        type: 'Galvanometer',
        position: { x: 600, y: 200 },
        data: {
            name: 'galvanometer',
            //   selects: {
            //     'handle-0': 'smoothstep',
            //     'handle-1': 'smoothstep',
            //   },
        },
    },
    //   {
    //     id: '5',
    //     type: 'output',
    //     data: {
    //       label: 'custom style',
    //     },
    //     className: 'circle',
    //     style: {
    //       background: '#2B6CB0',
    //       color: 'white',
    //     },
    //     position: { x: 400, y: 200 },
    //     sourcePosition: Position.Right,
    //     targetPosition: Position.Left,
    //   },
    //   {
    //     id: '6',
    //     type: 'output',
    //     style: {
    //       background: '#63B3ED',
    //       color: 'white',
    //       width: 100,
    //     },
    //     data: {
    //       label: 'Node',
    //     },
    //     position: { x: 400, y: 325 },
    //     sourcePosition: Position.Right,
    //     targetPosition: Position.Left,
    //   },
    //   {
    //     id: '7',
    //     type: 'default',
    //     className: 'annotation',
    //     data: {
    //       label: (
    //         <>
    //           On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
    //           <strong>MiniMap</strong>. This is also just a node 🥳
    //         </>
    //       ),
    //     },
    //     draggable: false,
    //     selectable: false,
    //     position: { x: 150, y: 400 },
    //   },
];

export const edges = [
    // {
    //     id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: {
    //         strokeWidth: 6,
    //         stroke: '#FF0072',
    //     },
    // },
    // {
    //     id: 'e2-3', source: '2', target: '1', type: 'smoothstep', animated: true, style: {
    //         strokeWidth: 6,
    //         stroke: '#FF0072',
    //     },
    // },
    // {
    //     id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true, style: {
    //         strokeWidth: 6,
    //         stroke: '#FF0',
    //     },
    // },
    // {
    //     id: 'e3-2', source: '3', target: '2', type: 'smoothstep', animated: true, style: {
    //         strokeWidth: 6,
    //         stroke: '#FF0',
    //     },
    // },
    //   { id: 'e1-3', source: '1', target: '3', animated: true,style: {  strokeWidth: 6,
    //     stroke: '#FF0072', }, },
    //   {
    //     id: 'e4-5',
    //     source: '4',
    //     target: '5',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-0',
    //     data: {
    //       selectIndex: 0,
    //     },
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //     },
    //   },
    //   {
    //     id: 'e4-6',
    //     source: '4',
    //     target: '6',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-1',
    //     data: {
    //       selectIndex: 1,
    //     },
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //     },
    //   },
];
