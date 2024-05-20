import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import api from "../axios/api";
import Swal from '../utils/sweetAlert';
import { useNavigate } from 'react-router-dom';
import { createStudent } from "../axios/createStudent";


const AddStudent = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const responseData = await createStudent({
                nama: values.nama,
                jurusan: values.jurusan,
                umur: values.age,
            });

            console.log(responseData)

            Swal.fire({
                title: 'Success',
                text: 'Successfull create new student',
                icon: 'success',
                timer: 1000, // time in milliseconds
                timerProgressBar: true
              });

            setTimeout(()=> {
                navigate('/');
            }, 1000)
              
        } catch (error) {
            console.log(error)
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
            <Col span={8}>
                <Card bordered={false} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)'}}>
                    <Title level={2}>Add New Student</Title>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="nama"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Name"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="jurusan"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Jurusan!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Jurusan"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Age!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="number"
                                placeholder="Age"
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
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default AddStudent;
