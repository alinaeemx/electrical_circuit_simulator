import { Typography } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { TITLE_HEADER } from '../../../../constants/constants';
import { Default } from '../../../UI/Responsive';
import { AvatarLogo } from './../../AvatarLogo';
 

const { Title } = Typography;
export const TitleSidebar = ({ collapsed }) => {
  return (
    <Default>
      <div  style={ {
      background: 'transparent'
  }} className={`logo flex z-10 items-center ${collapsed ? 'justify-center' : 'justify-start'} shadow h-16 `}>
        <div className="flex items-center "> 
          <AvatarLogo />
          {
            !collapsed &&
            <Link to='/'>
              <Title
                level={5}
                className='pt-2 mr-3 animate__animated animate__slideInDown' >
                {TITLE_HEADER}
              </Title>
            </Link>
          }
        </div>
      </div>
    </Default>
  )
}
