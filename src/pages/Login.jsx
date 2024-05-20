import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import api from "../axios/api";
import Swal from '../utils/sweetAlert';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await api.post('/auth/login', {
                username: values.username,
                password: values.password,
            });

            Swal.fire({
                title: 'Success',
                text: 'Successfull to login',
                icon: 'success',
                timer: 1000, // time in milliseconds
                timerProgressBar: true
              });

            localStorage.setItem('token', response.data.token)
            setTimeout(()=> {
                navigate('/');
            }, 1000)
              
        } catch (error) {
            Swal.fire({
                title: 'Failed',
                text: error.response.data.message,
                icon: 'error',
                timer: 1000, // time in milliseconds
                timerProgressBar: true
              });
        }
    };
    return (
        <Row justify="center" align='middle' style={{minHeight: '100vh'}}>
            <Col span={6}>
                <Card bordered={false} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)'}}>
                    <Title>Login</Title>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
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
                                Log in
                            </Button>
                            Or <Link to="/register">register now!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
