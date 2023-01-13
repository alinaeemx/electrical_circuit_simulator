import React from 'react';
import { Layout} from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'; 
import { Mobile } from '../../UI/Responsive';
import { AvatarLogo } from '../AvatarLogo';
  
 
const { Header } = Layout;
export const Navbar = ({ collapsed, setCollapsed }) => {
 

  return (
    <Header className="app-header shadow"
   style={ {
      background: 'transparent'
  }}
    >
      <div className="h-16 flex px-5 items-center justify-between"  >
        <div
          key='collapsed'
          className='cursor-pointer  transition ease-in-out duration-200 transform hover:-translate-y-0 hover:scale-125 '
        >
          {collapsed ?
            <AiOutlineMenuFold
              size={30}
              onClick={() => setCollapsed(!collapsed)}
            /> :
            <AiOutlineMenuUnfold
              size={30}
              onClick={() => setCollapsed(!collapsed)}
            />}
        </div>
        <Mobile>
          <div
            key='AvatarLogo'
            className="flex items-center justify-around ">
            <AvatarLogo />
          </div>
        </Mobile> 
      </div>
    </Header>
  );
};


