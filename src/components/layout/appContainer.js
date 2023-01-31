import { TITLE_FOOTER } from "../../constants/constants";
import React, { useState } from "react";
import { Navbar } from './navbar/index';
import Draggable from "react-draggable";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";

export const AppContainer = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { Footer, Content, } = Layout;
  const location = useLocation();
  const titles = {
    "/" : "التجارب",
    "/test2":"الإختبار",
    "/result2":"النتيجة"
  }

  return (
    <Layout>
      <Layout>
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          headerTitle={titles[location.pathname]}
        />
        <Content
          id="preview-content"
          className="overflow-y-auto overflow-x-hidden"
          style={{ height: 'calc(100vh - 8.2rem)', display: 'flex', justifyContent: 'center' }}
        >
          {children}
        </Content>
        <Footer className="h-16 text-center " >
          {TITLE_FOOTER}
        </Footer>
      </Layout>
      <Draggable
        axis="both"
        handle=".handle"
      >
        <div className="handle">
        </div>
      </Draggable>
    </Layout>

  );
}

