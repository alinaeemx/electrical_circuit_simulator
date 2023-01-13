import React, { useState } from "react";
import {
  Layout,
  BackTop,
} from "antd";
import { Navbar } from './navbar/index';
import { Sidebar } from "./sidebar/index";
import { BreadcrumbCom } from "./breadcrumb";
// import { ThemeDrawer } from "./themeDrawer";
import Draggable from "react-draggable";  
import { TITLE_FOOTER } from "../../constants/constants";
const { Footer, Content, } = Layout;
export const AppContainer = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout>
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content
          id="preview-content"
          className="overflow-y-auto overflow-x-hidden"
          style={{ height: 'calc(100vh - 8.2rem)' }}
        >

          <div className="preview mx-4 mt-4 mb-0"
          >
            <BreadcrumbCom />
            {children}
          </div>
        </Content>
        <Footer
          style={{
            // padding: '5px',
          }}
          className="h-16 text-center "
        >
          {/* {TITLE_FOOTER}  */}
          <div className="text-center flex justify-center items-center flex-col">
                    <div>
                    {TITLE_FOOTER} 
                    </div>
                    {/* <div className='primaryColor'>

                        by IT-DOTE
                    </div> */}

                </div>
        </Footer>

      </Layout>
      <Draggable
        axis="both"
        handle=".handle"
      >
        <div className="handle">
          {/* <ThemeDrawer /> */}
        </div>
      </Draggable>

      <BackTop

        style={{
          position: 'fixed',
          bottom: '0.5rem'
        }}
        className='flex items-center justify-center shadow-md
        z-50 rounded-full cursor-pointer
       border-collapse border w-10 h-10 iconTheme
       transition ease-in-out duration-200 transform hover:-translate-y-0 hover:scale-125
       '
        target={() => document.getElementById('preview-content')} >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
      </BackTop>
    </Layout>

  );
}

