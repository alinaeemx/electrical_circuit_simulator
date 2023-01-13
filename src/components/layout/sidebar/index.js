import React from 'react';
import { Drawer, Layout, } from 'antd';
import { Default, Mobile } from '../../UI/Responsive';
 

import { SidebarItem } from './SidebarItem'; 
import { TITLE_HEADER } from './../../../constants/constants';

const { Sider } = Layout;
export const Sidebar = ({ collapsed, setCollapsed }) => {

    return (
        <div>
            <Mobile>
                <Drawer
                    title={TITLE_HEADER}
                    width={275}
                    placement="right"
                    closable
                    onClose={() => setCollapsed(!collapsed)}
                    visible={!collapsed}
                    className="nav-drawer"
                >
                    <SidebarItem
                        collapsed={collapsed}
                    />
                </Drawer>
            </Mobile>
            <Default>
                <Sider
                 style={ {
                    background: 'transparent'
                }}
                    className="h-screen" 
                    breakpoint="lg"
                    width={275}
                    collapsedWidth={65}
                    collapsed={collapsed}
                    onBreakpoint={broken => setCollapsed(broken)}
                    onCollapse={collapsed => setCollapsed(collapsed)}
                >
                    <SidebarItem
                        collapsed={collapsed}
                    />
                </Sider>
            </Default>
        </div>
    );
};
