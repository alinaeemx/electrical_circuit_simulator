import { Avatar } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'; 
import { TITLE_HEADER } from '../../constants/constants';
import logo from '../../assets/logo.svg'
export const AvatarLogo = () => {
  return (
    <Link
      to='/'
    >
      <Avatar
        alt={TITLE_HEADER}
        src={logo}
        // className='flex justify-center cursor-pointer'
        style={{ borderRadius:0 }}
        size={50} gap={2}>
        Logo
      </Avatar>
    </Link>

  )
}
