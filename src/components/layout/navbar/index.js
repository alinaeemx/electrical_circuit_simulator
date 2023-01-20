import React from 'react';
import { Layout } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { Mobile } from '../../UI/Responsive';
import { AvatarLogo } from '../AvatarLogo';


const { Header } = Layout;
export const Navbar = ({ collapsed, setCollapsed }) => {


  return (
    <Header className="app-header shadow"
      style={{
        background: 'transparent',
        paddingInline: 10
      }}
    > 
        <AvatarLogo /> 
    </Header>
  );
};


