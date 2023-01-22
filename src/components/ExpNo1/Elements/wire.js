import React from 'react';
import { getSmoothStepPath } from 'reactflow';

export const CustomEdge = (props) => {
    console.log(props)
    const [edgePath] = getSmoothStepPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        sourcePosition: props.sourcePosition,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition,
    });

    return (
        <path
            id={props.id}
            style={props.style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={props.markerEnd}
        />
    );
}