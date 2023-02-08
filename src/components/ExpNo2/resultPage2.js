

import React, { useEffect, useState } from 'react'
import { Button, Card, Tag, Typography } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ResultPage2 = () => {

    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const getAnswerStatus = (correctAnswerIdx, userAnswerIdx, state, answerText, answerIdx) => {
        if (state === true) {
            if (correctAnswerIdx === answerIdx) {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span className='ml-3' >{answerText}</span>
                        <Tag color={'green'} >إجابتك</Tag>
                    </li>
                )
            } else {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span>{answerText}</span>
                    </li>
                )
            }
        } else if (state === false) {
            if (correctAnswerIdx === answerIdx) {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span className='ml-3' >{answerText}</span>
                        <Tag color={'green'} >الإجابة الصحيحة</Tag>
                    </li>
                )
            } else if (userAnswerIdx === answerIdx) {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span className='ml-3' >{answerText}</span>
                        <Tag color={'red'} >إجابتك</Tag>
                    </li>
                )
            } else {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span>{answerText}</span>
                    </li>
                )
            }
        } else {
            if (correctAnswerIdx === answerIdx) {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span className='ml-3' >{answerText}</span>
                        <Tag color={'green'} >الإجابة الصحيحة</Tag>
                    </li>
                )
            } else {
                return (
                    <li key={answerIdx} className='my-1' >
                        <span>{answerText}</span>
                    </li>
                )
            }
        }
    }

    useEffect(() => {
        setResult(JSON.parse(localStorage.getItem('result2')));
    }, [])
    return (
        <>
            <div>
                {
                    result && result.map((item, i) => {
                        return (
                            <section
                                className='animate__animated animate__slideInUp'
                                key={i}
                                style={{ background: '#398AB9', paddingTop: 6, paddingRight: 6, borderRadius: 12, marginTop: 20 }}>
                                <Card style={{ width: '80vw', background:"#F1F1F2" }} bordered={false} title={
                                    <div >
                                        <span className='ml-3' >السؤال {i + 1}</span>
                                        {
                                            item.status === true ? (
                                                <Tag color={'green'} >إجابة صحيحة</Tag>
                                            ) : item.status === false ? (
                                                <Tag color={'red'} >إجابة خاطئة</Tag>
                                            ) : (
                                                <Tag color={'red'} >لا توجد إجابة</Tag>
                                            )
                                        }
                                    </div>
                                }>
                                    <div>
                                        <Typography.Paragraph strong style={{ fontSize: 17 }} >
                                            {item.question} ؟
                                        </Typography.Paragraph>
                                    </div>
                                    <div className='pr-7' >
                                        <ul style={{ listStyleType: 'disc', fontSize: 17 }} >
                                            {
                                                item.answers.map((answer, j) => getAnswerStatus(item.correctAnswerIdx, item.userAnswerIdx, item.status, answer, j))
                                            }
                                        </ul>
                                    </div>
                                </Card>
                            </section>
                        )
                    })
                }
            </div>
            <div className=' absolute left-0 right-0 bottom-10 ' >
                <Button
                    size='large'
                    type='primary'
                    shape='circle'
                    className='text-white animate__animated animate__slideInLeft '
                    style={{
                        position: 'sticky',
                        backgroundColor: 'rgba(139,61,255,0.8)',
                        bottom: 0,
                        right: '95vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    icon={<HomeOutlined />}
                    onClick={() => {
                        localStorage.removeItem('result2')
                        navigate("/home")
                    }}
                />
            </div>
        </>
    )
}

export default ResultPage2;