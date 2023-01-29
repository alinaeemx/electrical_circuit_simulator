

import React from 'react'
import { Card, FloatButton, Form, Radio, Space, Typography } from "antd";
import {SaveOutlined} from '@ant-design/icons';
 const TestPage2 = () => {

    const [form] = Form.useForm();
    const handleFinish = async () => { };
    const dataSource = [
        {
            question:
                `
                إن توهج المصباح في دائرة التفريغ يدل على مرور تيار كهربائي في الدائرة ما مصدر ذلك التيار
                `,
            answers: [
                {
                    answer: 'البطارية',
                },
                {
                    answer: 'الكلفانوميتر',
                },
                {
                    answer: 'المتسعة',
                },
                {
                    answer: 'المقاومة',
                },
            ]
        },
        {
            question: "How old are you?",
            answers: [
                {
                    answer: 24,
                },
                {
                    answer: 25,
                },
                {
                    answer: 26,
                },
                {
                    answer: 27,
                },
            ]
        },
        {
            question: "How old are you?",
            answers: [
                {
                    answer: 24,
                },
                {
                    answer: 25,
                },
                {
                    answer: 26,
                },
                {
                    answer: 27,
                },
            ]
        },
        {
            question: "How old are you?",
            answers: [
                {
                    answer: 24,
                },
                {
                    answer: 25,
                },
                {
                    answer: 26,
                },
                {
                    answer: 27,
                },
            ]
        },
        {
            question: "How old are you?",
            answers: [
                {
                    answer: 24,
                },
                {
                    answer: 25,
                },
                {
                    answer: 26,
                },
                {
                    answer: 27,
                },
            ]
        },
    ];

    return (
        <>
            <Form
                name="testPage"
                form={form}
                layout="vertical"
                onFinish={handleFinish}

            >
                <div>
                    {
                        dataSource.map((item, i) => {
                            return (
                                <section style={{ background: '#398AB9', paddingTop: 6, paddingRight: 6, borderRadius: 12, marginTop: 20 }}>
                                    <Card style={{width:'80vw'}} bordered={false} title={`السؤال ${i + 1}`}>
                                        <Form.Item
                                            key={i}
                                        >
                                            <Space direction="vertical">
                                                <Typography.Paragraph strong style={{ fontSize: 17 }} >
                                                    {
                                                        item.question
                                                    }
                                                    ؟
                                                </Typography.Paragraph>
                                            </Space>
                                        </Form.Item>
                                        <Form.Item
                                            key={i + 1}
                                        >
                                            <Radio.Group key={i + 2}>
                                                <Space direction="vertical" >
                                                    {
                                                        item.answers.map((subItem, j) => (
                                                            <Radio
                                                                key={j}
                                                                value={j}
                                                                style={{ fontSize: 17 }}
                                                            >
                                                                {subItem.answer}
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
            </Form >
            <FloatButton type='primary' icon={<SaveOutlined />} onClick={() => console.log('click')} />
        </>
    )
}

export default TestPage2;