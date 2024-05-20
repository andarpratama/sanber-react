import React from "react";
import { LockOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const Register = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
        <Row justify="center" align='middle' style={{minHeight: '100vh'}}>
            <Col span={6}>
                <Card bordered={false} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)'}}>
                    <Title>Register</Title>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="fullname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Fullname!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserAddOutlined className="site-form-item-icon" />
                                }
                                placeholder="Fullname"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                {
                                    min: 4,
                                    message: 'Password must be at least 4 characters long!',
                                  },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{marginBottom: 10}}
                                size="large"
                                block
                            >
                                Register
                            </Button>
                            Or <Link to="/login">Login now!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;
