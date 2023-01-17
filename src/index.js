import React from 'react'; 
import './index.css'; 
import arEG from "antd/lib/locale/ar_EG";
import "animate.css"; 
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { createRoot } from 'react-dom/client'; 
import App from './App'; 
console.log(theme);
const Index = () => { 
  return (
    <ConfigProvider
      direction="rtl"
      locale={arEG}
      csp={{ nonce: "YourNonceCode" }}

      theme={{
        token: { 
          colorPrimary: "#7f66d6",
          // // colorTextBase: "#ffeeee",
          // colorBgHeader: "#7f66d6",
          // algorithm: theme.darkAlgorithm,
          
        },
      }}

    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  );
};
// render(<Index />, document.getElementById("root"));
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Index />);
