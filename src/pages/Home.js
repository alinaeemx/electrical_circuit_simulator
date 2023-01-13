import { Button, Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

 
 
  const HomePage = () => {
    const navigate = useNavigate();
    const { Meta } = Card;
  return (
    <div className='flex gap-2'>
     {[1,2,3,4].map((item,index)=>( <Card
     key={index}
        hoverable
        onClick={()=>{ navigate('/ex1')}}
        style={{
          width: 240,
        }}
        // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>))}
    </div>
    // return (
    //     <div className="pageContainer" >
    //         <div style={{ height: '100%', width: '100%', background: 'red' }} >
    //             <Button type='primary' onClick={() => {
    //                 navigate('/ex1')
    //             }} >Next</Button>
    //         </div>
    //     </div>
    )
}
export default HomePage