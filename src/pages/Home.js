import { Card, Divider, } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import exp2 from '../assets/images/exp2.png'
import not from '../assets/not.png'
const { Meta } = Card;

const HomePage = () => {
  const navigate = useNavigate();

  const expList = [
    {
      title: 'المتسعات',
      experiments: [
        {
          title: 'التجربة الاولى',
          path: 'exp2',
          image:not
        },
        {
          title: 'شحن و تفريغ المتسعة',
          path: 'exp2',
          image: exp2
        },
        {
          title: 'التجربة الثالثة',
          path: 'exp2',
          image:not
        },
      ]
    },
    {
      title: 'التيار المتناوب',
      experiments: [
        {
          title: 'التجربة الرابعة',
          path: 'exp2',
          image:not
        },
        {
          title: 'التجربة الخامسة',
          path: 'exp2',
          image:not
        },
        {
          title: 'التجربة السادسة',
          path: 'exp2',
          image:not
        },
      ]
    },
    {
      title: 'الحث الكهرومغناطيسي',
      experiments: [
        {
          title: 'التجربة السابعة',
          path: 'exp2',
          image:not
        },
      ]
    }
  ]
  return (
    <div className='my-7 w-full ' >
      {
        expList.map((mainItem, i) => {
          return (
            <div key={i}>
              <Divider orientation='left' >{mainItem.title}</Divider>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-2 lg:gap-3 xl:gap-4 p-5 '>
                {
                  mainItem.experiments.map((item, j) => (
                    <Card
                      className='borderColor shadow'
                      hoverable
                      style={{ width: 300, height: 300 }}
                      cover={item.image && <img className='p-1' alt="" src={item.image} />}
                      key={j}
                      onClick={() => { navigate(item.path) }}>
                      <Divider />
                      <Meta title={item.title}  />
                    </Card>
                  )
                  )
                }
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
export default HomePage