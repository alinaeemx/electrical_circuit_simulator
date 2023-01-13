import { Button, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoadingSpin } from '../components/UI/LoadingSpin';

const ErrorPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isInitiation = true
        if (isInitiation && loading) {
            // setTimeout(() => {
            setLoading(!loading)
            // }, 100);
        }
        return () => isInitiation = false
    }, [loading])
    if (loading)
        return <LoadingSpin />

    return (
        <div>
            <Result
                status="404"
                title={<span >404</span>}
                subTitle={<span  >عذراً، الصفحة المطلوبة غير موجودة!</span>}
                extra={<Button type="primary" onClick={() => {
                    navigate(-1);
                }}>الرجوع</Button>}
            />
        </div>
    )
}

export default ErrorPage