
import React from "react"
import { Button, Typography } from 'antd';
import circuit from "../assets/circuit.gif";
import logo from "../assets/logo.svg";
const styles = {
    background: `url(${circuit}) no-repeat center center`,
    backgroundSize: 'cover',
    height: '100vh',
};



const { Paragraph } = Typography;
function About() {
    return (

        <>

            <div style={styles} className="flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen ">
                <div className=" h-5/6 w-full m-20 bg-black opacity-60 flex items-center justify-center rounded-2xl">

                </div>
            </div>
            <div className="absolute top-20 right-20 bottom-20 left-20 flex flex-col justify-start items-center p-4">
                <img src={logo} alt="" height={150} width={150} />

            </div>
            <div className="absolute top-60 right-20 bottom-20 left-20 flex flex-col justify-around items-center p-4">
                <div className="pt-8">

                    <Paragraph className="text-white break-normal rtl whitespace-normal" style={{ color: '#ffffff', fontSize: '1em' }}>
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                    </Paragraph>
                    <Paragraph className="text-white break-normal rtl whitespace-normal" style={{ color: '#ffffff', fontSize: '1em' }}>
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                        ان هذا النص هو نص اثرائي مجرد حشو للكلام في هذه الصفحة الفيطية
                    </Paragraph>
                </div>
                <Button
                    style={{ color: "#fff",width:"150px",height:"40px",fontSize:'1.5em', display:'flex',justifyContent:'center',alignItems:'center' }}
                    //  icon={<ArrowLeftOutlined width={40}
                    //   />}
                    >
                    لنبدأ 
                </Button>
            </div>
            <div className="absolute bottom-28 left-24">

            </div>


        </>
    )
}

export default About