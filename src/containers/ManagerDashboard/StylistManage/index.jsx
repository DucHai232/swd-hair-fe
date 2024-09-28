import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Space } from 'antd';

const employeesData = [
  {
    _id: '66e657812287bd197205262a',
    username: 'sl1',
    name: 'Stylist 1',
    email: 'sl1@gmail.com',
    phoneNumber: '0123456789',
    dateOfBirth: '1990-01-15',
    banned: false,
  },
  {
    _id: '66e657812287bd197205262b',
    username: 'sl2',
    name: 'Stylist 2',
    email: 'sl2@gmail.com',
    phoneNumber: '0987654321',
    dateOfBirth: '1988-05-20',
    banned: false,
  },
  {
    _id: '66e657812287bd197205262c',
    username: 'sl3',
    name: 'Stylist 3',
    email: 'sl3@gmail.com',
    phoneNumber: '0987654322',
    dateOfBirth: '1985-12-10',
    banned: false,
  },
];

const StylistManage = () => {
  const [dataSource, setDataSource] = useState(employeesData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState(null);

  // Handle opening the edit modal
  const handleEdit = (record) => {
    setEditingStylist(record);
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStylist(null);
  };

  // Handle saving the edited data
  const handleSave = (values) => {
    setDataSource((prevData) =>
      prevData.map((stylist) =>
        stylist._id === editingStylist._id ? { ...stylist, ...values } : stylist
      )
    );
    handleCancel();
  };

  // Define the columns of the table
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth) => new Date(dateOfBirth).toLocaleDateString(),
    },
    {
      title: 'Banned',
      dataIndex: 'banned',
      key: 'banned',
      render: (banned) => (
        <Tag color={banned ? 'red' : 'green'}>
          {banned ? 'Banned' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Stylist Management</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal for editing stylist details */}
      <Modal
        title="Edit Stylist"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={editingStylist}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the stylist name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please input the date of birth!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StylistManage;
