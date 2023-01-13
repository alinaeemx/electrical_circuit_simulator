import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="pageContainer" >
            <div style={{ height: '100%', width: '100%', background: 'red' }} >
                <Button type='primary' onClick={() => {
                    navigate('/ex1')
                }} >Next</Button>
            </div>
        </div>
    )
}