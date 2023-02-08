import React from "react"
import { Button } from 'antd';
import bgCover from "../assets/bg-cover.jpg";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
const styles = {
    background: `url(${bgCover}) no-repeat center center`,
    backgroundSize: 'cover',
    height: '100vh',
};
// const { Paragraph } = Typography;

function About() {
    const navigate = useNavigate();
    return (

        <>

            <div style={styles} className="flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen ">
            </div>
            <div style={{ position: 'absolute', top: 215, left: 0, display: 'flex', justifyContent: 'start', alignItems: 'center', background: 'rgba(0,0,0,0.4)', width: '100%', paddingLeft: 40 }}>
                <img src={logo} alt="" height={150} width={150} />
                <div>
                    <span className="font-semibold" style={{ fontSize: '70px' }} >E</span>
                    <span className="font-medium" style={{ fontSize: '55px' }} >lectrical</span>
                    <span className="font-semibold" style={{ fontSize: '70px' }} >C</span>
                    <span className="font-medium" style={{ fontSize: '55px' }} >ircuit</span>
                    <span className="font-semibold" style={{ fontSize: '70px' }} >S</span>
                    <span className="font-medium" style={{ fontSize: '55px' }} >imulator</span>
                </div>
            </div>
            <div className="absolute top-60 right-20 bottom-20 left-20 flex flex-col justify-around items-center p-4">
                <Button
                    type="default"
                    style={{ width: "150px", height: "40px", fontSize: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center',background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)' }}
                    onClick={() => navigate("/home")}
                >
                    Start
                </Button>
            </div>
            <div className="absolute bottom-28 left-24">

            </div>


        </>
    )
}

export default About