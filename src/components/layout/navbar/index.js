import React from 'react';
import { Layout } from 'antd';
import { AvatarLogo } from '../AvatarLogo';



export const Navbar = ({ collapsed, setCollapsed,headerTitle }) => {
  const { Header } = Layout;
  // const { Title } = Typography;


  return (
    <Header className="app-header shadow "
      style={{
        background: '#F1F1F2',
        paddingInline: 10,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:'1px'
      }}
    > 
        <AvatarLogo />
        <div className='font-bold text-xl' >{headerTitle}</div> 
        <div></div> 
    </Header>
  );
};


