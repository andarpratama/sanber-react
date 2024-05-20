import React, { useEffect, useState } from "react";
import { Row, Table, Col, Space, Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { getStudents } from "../axios/getStudents";
import Swal from "../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../axios/deleteStudent";

const Home = () => {
    const [data, setData] = useState([]);
    const [isSuccessFetch, setIsSuccessFetch] = useState(false);
    const navigate = useNavigate();

    const onDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const responseData = await deleteStudent(id);
                    fetchData();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const fetchData = async () => {
        try {
            const responseData = await getStudents();
            if (responseData.success) {
                const dataWithKeys = responseData.data.map((item, index) => ({
                    ...item,
                    key: item.id || index.toString(),
                }));
                setData(dataWithKeys);
                setIsSuccessFetch(true);
            } else {
                setData([]);
                setIsSuccessFetch(false);

                Swal.fire({
                    title: "Failed",
                    text: responseData.response.data.message,
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2200);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "nama",
            key: "nama",
            render: (nama) => <span>{nama}</span>,
        },
        {
            title: "Jurusan",
            dataIndex: "jurusan",
            key: "jurusan",
        },
        {
            title: "Umur",
            dataIndex: "umur",
            key: "umur",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => onDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    console.log('url')
    console.log(import.meta.env.VITE_API_URL)

    return (
        <div>
            <Row justify="center">
                <Col span={12}>
                    <Flex align="center" justify="space-between">
                        <Title level={2}>Data Student</Title>
                        <Flex gap='large'>
                            <Button
                                type="primary"
                                onClick={() => navigate("/add-student")}
                            >
                                Add New
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => { localStorage.removeItem('token'); navigate("/login")}}
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Flex>

                    {isSuccessFetch && (
                        <Table columns={columns} dataSource={data} />
                    )}
                    {!isSuccessFetch && <span>No records from student</span>}
                </Col>
            </Row>
        </div>
    );
};

export default Home;
