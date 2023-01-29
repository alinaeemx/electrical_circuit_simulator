
import React from "react"
import { Typography } from 'antd';
import circuit from "../assets/circuit.gif";

const styles = {
    background: `url(${circuit}) no-repeat center center`,
    backgroundSize: 'cover',
    height: '100vh',
};



const { Title } = Typography;
function About() {
    return (

        <>

            <div style={styles} className="flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen ">
                <div className=" h-5/6 w-full m-20 bg-black opacity-60 flex items-center justify-center">


                </div>
            </div>

            {/* <div className='h-full w-full'> */}
            {/* </div> */}
        </>
    )
}

export default About