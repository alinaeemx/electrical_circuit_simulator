

import React from 'react'
import { Button, Card, Form, Modal, Radio, Space, Typography } from "antd";
import { SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Questions from '../ExpNo2/questions.json';
const TestPage2 = () => {

    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const confirm = (saveAnswersFunc) => {
        modal.confirm({
            direction: 'rtl',
            title: 'تنبيه',
            icon: <ExclamationCircleOutlined />,
            content: <div className='font-semibold' >هل تريد إنهاء الاختبار و عرض النتيجة ؟</div>,
            okText: 'تأكيد',
            cancelText: 'إلغاء',
            okButtonProps: { type: 'primary', danger: true },
            onOk: () => {
                saveAnswersFunc();
                navigate("/result2");
            }
        });
    };

    const handleFinish = async (choices) => {
        let resultArray = [];
        Questions.forEach((item, i) => {
            if (choices[`answer${i + 1}`] !== undefined) {
                item.userAnswerIdx = i;
                if (item.correctAnswerIdx === item.userAnswerIdx) {
                    item.status = true;
                } else {
                    item.status = false;
                }
            } else {
                item.userAnswerIdx = null;
                item.status = null;
            }
            resultArray.push(item);
        })
        confirm(() => localStorage.setItem('result2', JSON.stringify(resultArray)))
    };

    return (
        <>
            {contextHolder}
            <Form
                name="testPage"
                form={form}
                layout="vertical"
                onFinish={handleFinish}

            >
                <div>
                    {
                        Questions.map((item, i) => {
                            return (
                                <section
                                    className='animate__animated animate__slideInUp'
                                    key={i + 1}
                                    style={{ background: '#398AB9', paddingTop: 6, paddingRight: 6, borderRadius: 12, marginTop: 20 }}>
                                    <Card style={{ width: '80vw' }} bordered={false} title={`السؤال ${i + 1}`}>
                                        <Space direction="vertical">
                                            <Typography.Paragraph strong style={{ fontSize: 17 }} >
                                                {
                                                    item.question
                                                }
                                                ؟
                                            </Typography.Paragraph>
                                        </Space>
                                        <Form.Item
                                            name={`answer${i + 1}`}
                                        >
                                            <Radio.Group>
                                                <Space direction="vertical" >
                                                    {
                                                        item.answers.map((answer, j) => (
                                                            <Radio
                                                                key={j + 1}
                                                                value={answer}
                                                                style={{ fontSize: 17 }}
                                                            >
                                                                {answer}
                                                            </Radio>
                                                        ))
                                                    }
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Card>
                                </section>
                            )
                        })
                    }
                </div>
                {/* <FloatButton type='primary' icon={<SaveOutlined />} onClick={() => console.log('click')} /> */}
                <div className=' absolute left-0 right-0 bottom-16 ' >
                    <Button
                        size='large'
                        type='default'
                        shape='circle'
                        htmlType='submit'
                        className='text-white animate__animated animate__slideInLeft'
                        style={{
                            position: 'sticky',
                            backgroundColor: '#398AB9',
                            bottom: 0,
                            right: '95vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<SaveOutlined />}
                    />
                </div>
            </Form >
        </>
    )
}

export default TestPage2;