import { Card, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import exp1 from '../assets/images/exp1.png'
const { Meta } = Card;
const { Title } = Typography;


const HomePage = () => {
  const navigate = useNavigate();
  const list = [
    {
      title: 'التجربة الاولى',
      description: 'Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1',
      path: '/ex1',
      image: exp1
    },
    {
      title: 'Experiment 1',
      description: 'Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1',
      path: '/ex1'
    },
    {
      title: 'Experiment 1',
      description: 'Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1',
      path: '/ex1'
    },
    {
      title: 'Experiment 1',
      description: 'Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1',
      path: '/ex1'
    },
    {
      title: 'Experiment 1',
      description: 'Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1 Experiment 1',
      path: '/ex1'
    },
  ]
  return (<>
    <div
      style={{
        height: ' 21vh'
      }}
      className='flex justify-center items-end mx-4'>
      <Title level={2}>Experiments</Title>
    </div>
    <div className='flex justify-center items-center flex-col'>
      <div className='grid lg:grid-cols-4 xl:grid-cols-4 gap-4'>
        {list.map((item, index) => (<Card
          className='borderColor'
          hoverable
          style={{ width: 240 }}
          cover={item.image && <img className='p-1' alt="" src={item.image} />}
          key={index}
          // hoverable
          onClick={() => { navigate(item.path) }}


        >
          <Meta title={item.title} description={item.description} />
        </Card>))}
      </div>
    </div>


  </>)
}
export default HomePage