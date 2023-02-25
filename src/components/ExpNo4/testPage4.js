

import React from 'react'
import { Button, Card, Form, Modal, Radio, Space, Typography } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import Questions from '../ExpNo2/questions.json';
const TestPage2 = () => {

    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const confirm = (saveAnswersFunc, unAnsweredQuestions) => {
        modal.confirm({
            direction: 'rtl',
            title: 'تنبيه',
            icon: <ExclamationCircleOutlined />,
            content:
                <>
                    {
                        unAnsweredQuestions === 0 ?
                            <div className='font-semibold' >عند تأكيد هذا الاجراء سيتم انهاء الاختبار و الانتقال الى صفحة النتيجة</div> :
                            unAnsweredQuestions === 1 ?
                                <div className='font-semibold' >لديك سؤال لم تقم بالاجابة عليه و عند تأكيد هذا الاجراء سيتم إنهاء الاختبار و الانتقال الى صفحة النتيجة</div> :
                                unAnsweredQuestions === 2 ?
                                    <div className='font-semibold' >لديك سؤالين لم تقم بالاجابة عليهما و عند تأكيد هذا الاجراء سيتم إنهاء الاختبار و الانتقال الى صفحة النتيجة</div> :
                                    <div className='font-semibold' >لديك ({unAnsweredQuestions}) اسئلة لم تقم بالاجابة عليها و عند تأكيد هذا الاجراء سيتم إنهاء الاختبار و الانتقال الى صفحة النتيجة</div>
                    }
                </>,
            okText: 'تأكيد',
            cancelText: 'إلغاء',
            okButtonProps: { type: 'primary', danger: true },
            onOk: () => {
                saveAnswersFunc();
                navigate("/result2");
            },
            // bodyStyle: { background: '#F1F1F2', margin: 0 },
            // cancelButtonProps:{style:{background:'#F1F1F2'}},
        });
    };

    const handleFinish = async (choices) => {
        let unAnsweredQ = 0;
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
                unAnsweredQ = unAnsweredQ + 1;
                item.userAnswerIdx = null;
                item.status = null;
            }
            resultArray.push(item);
        })
        confirm(() => localStorage.setItem('result2', JSON.stringify(resultArray)), unAnsweredQ)
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
                                    <Card style={{ width: '80vw', background: "#F1F1F2" }} bordered={false} title={`السؤال ${i + 1}`}>
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
                <div className=' absolute left-0 right-0 bottom-10 ' >
                    <Button
                        size='large'
                        type='primary'
                        shape='circle'
                        htmlType='submit'
                        className='text-white animate__animated animate__slideInLeft'
                        style={{
                            position: 'sticky',
                            backgroundColor: 'rgba(139,61,255,0.8)',
                            bottom: 0,
                            right: '95vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<AiOutlineCheckCircle size={'large'} />}
                    />
                </div>
            </Form >
        </>
    )
}

export default TestPage2;