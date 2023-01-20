import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection'; 
 
import styles from './style/style.module.css';
import { Image } from 'antd'; 
import switchCueArrow from "../../assets/images/switchCueArrow.png";
import openKey from "../../assets/images/openKey.png";
import closeKey from "../../assets/images/closeKey.png";
  function SwitchKey({
  id, 
  isConnectable
}) {

  const [keyOpenClose, setKeyOpenClose] = useState(openKey);
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);  
  useEffect(() => {
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
  }, [id, updateNodeInternals]);

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
        <div
          style={{ width: "126px" }}
          className=" flex items-center justify-center switchKey "
          onClick={() => {
            if (keyOpenClose === openKey) {
              setKeyOpenClose(closeKey);
            } else {
              setKeyOpenClose(openKey);
            }

          }}
         
        >
          <Handle 
          style={{ 
            background:'blue'
         }}
           isConnectable={isConnectable}
          className="mt-1 z-50 " type="target" position="left" />
          <Handle  
          style={{ 
            background:'red'
         }}
            isConnectable={isConnectable}
            className="mt-1 z-50 " type="source" position="right" />
         
          <Image preview={false} src={keyOpenClose} className="" />
        </div>
      </div>
    </>
  );
}
 
export default memo(SwitchKey);
