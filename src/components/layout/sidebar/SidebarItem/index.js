import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  // // RollbackOutlined, 
  // FolderOutlined,
  // // ContainerOutlined,
  // TeamOutlined,
  // SolutionOutlined,
  // ReadOutlined,
  // ContactsOutlined,
  // DashboardOutlined,
  // SettingOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import { TitleSidebar } from './titleSidebar'; 
 
export const SidebarItem = ({ collapsed }) => {
 
  let location = useLocation().pathname.split('/')[1]
  const rootSubmenuKeys = ['dashboard', ];
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    let isStart = true
    if (isStart) {
      switch (location) {
        // *   define variable dashboard 
        case '':
          setOpenKeys(['dashboard'])
          break;
       
        default:
          setOpenKeys([])
          break;
      }
    }
    return () => isStart = false

  }, [location])

   
  return (
    <div>
      <TitleSidebar
        collapsed={collapsed}
      />
      <Menu 
      mode="inline"
        className='scrollbox finished'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        // defaultSelectedKeys={[`${location}`]}
        selectedKeys={[`${location}`]}
        style={{
          height: 'calc(100vh - 64px)',
        }}
        items={[
          // *   define variable dashboard 
          {
            key: "",
            icon: <HomeOutlined />,
            // label: dashboardTitle,
            label: <Link to={'/'}> {'home'}</Link>,

          }, 
        ]}
      />
    </div>
  );
};
