import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState, 
  updateEdge,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
 
import 'reactflow/dist/style.css'; 
import { Button } from 'antd';
 
import { GlobalStore } from '../store'; 
import Battery from '../components/CustomNode/Battery'
import Led from '../components/CustomNode/Led'
import SwitchKey from '../components/CustomNode/SwitchKey'
import Capacity from '../components/CustomNode/Capacity'
import Voltage from '../components/CustomNode/Voltage'
import Galvanometer from '../components/CustomNode/Galvanometer'
import SwitchDoubleKey from './../components/CustomNode/SwitchDoubleKey';
import CustomConnectionLine from '../components/CustomNode/CustomConnectionLine';
const nodeTypes = { 
  Led,
  Battery,
  SwitchKey,
  Capacity,
  Voltage,
  SwitchDoubleKey,
  Galvanometer
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
let intervalID;
function start({ onHandled, time }) {
  intervalID = setInterval(onHandled, time);
}

// Function to stop setInterval call
function stop() {
  clearInterval(intervalID);
}
const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      // console.log(params);
      params.type = 'smoothstep'
      // params.animated = true
      params.style = {
        strokeWidth: 2,
        stroke: '#FF0072',
      }
      // console.log('eds', eds);
      const x = addEdge(params, eds)
      console.log('addEdge(params, eds)', x);
      return x
    })
  }, []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    // if (edge.sourceHandle) {
    //   const edgeType = nodes.find((node) => node.type === 'SwitchKey').data?.selects[edge.sourceHandle];
    //   edge.type = edgeType;
    // }

    return edge;
  });
  const [first, setfirst] = useState(false)
  const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: 'black' },
    type: 'smoothstep',
    markerEnd: {
      // type: MarkerType.ArrowClosed,
      // color: 'black',
      // type = 'smoothstep'
    },
  };
  const connectionLineStyle = {
    strokeWidth: 2,
    stroke: 'black',
    type: 'smoothstep',
  };
  const { setVolt } = GlobalStore();
 

  const onStart =
    () => {
      let body = document.querySelector('.bodyX');
      let open = body.classList.toggle('on');  
      if (open) {
        var x = 0
        start({
          onHandled: () => {
            x++
            setVolt(`${x}.00 v`)
            if (x === 5) {
              x = 0
            }
          },
          time: 1000,
        })
        edges.map(item => {
          // console.log(item);
          item.type = 'smoothstep'
          item.animated = true
          item.style = {
            strokeWidth: 6,
            stroke: '#FF0072',
          }
          return item
        })
        setEdges(edges);
        setfirst(i => !i)
        setTimeout(() => {
          setfirst(i => !i)
        }, 300);
      } else {
        stop()
        setVolt(`0.00 v`)
        edges.map(item => {
          // console.log(item);
          item.type = 'smoothstep'
          item.animated = false
          item.style = {
            strokeWidth: 3,
            stroke: '#FF0072',
          }
          return item
        })
        setEdges(edges);
        setfirst(i => !i)
        setTimeout(() => {
          setfirst(i => !i)
        }, 300);
      }



     
    }
    
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className='m-0 p-0'
      style={{ height: 'calc(100vh - 11.5rem)' }}
    >
      <Button
        loading={first}
        onClick={onStart}>Start</Button>


      <ReactFlow
      id='ES'
        className='bodyX'
        title='abas'
        connectionLineStyle={connectionLineStyle}
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}

        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow></div>
  );
};

export default OverviewFlow;