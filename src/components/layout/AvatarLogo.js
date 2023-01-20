import { Avatar } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'; 
import { TITLE_HEADER } from '../../constants/constants';
import battery from '../../assets/images/battery.png'
export const AvatarLogo = () => {
  return (
    <Link
      to='/'
    >
      <Avatar
        alt={TITLE_HEADER}
        src={battery}
        className='flex justify-center cursor-pointer'
        style={{ verticalAlign: 'middle', color: 'black' }}
        size={50} gap={2}>
        Logo
      </Avatar>
    </Link>

  )
}
