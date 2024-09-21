import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './ServiceManage.module.scss'; // Import your styles

const ServiceManage = () => {
  const [services, setServices] = useState([
    { key: 1, name: 'Haircut', price: 25 },
    { key: 2, name: 'Hair Coloring', price: 50 },
    { key: 3, name: 'Shaving', price: 15 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form] = Form.useForm();

  const showModal = (service = null) => {
    setCurrentService(service);
    if (service) {
      form.setFieldsValue(service);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setServices(services.filter((service) => service.key !== key));
  };

  const handleFinish = (values) => {
    if (currentService) {
      // Update existing service
      setServices(services.map(service => 
        service.key === currentService.key ? { ...service, ...values } : service
      ));
    } else {
      // Add new service
      setServices([
        ...services,
        {
          key: services.length + 1,
          ...values,
        },
      ]);
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)} 
            style={{ marginRight: 8 }} 
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)} 
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.serviceManageContainer}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Add Service
      </Button>
      <Table columns={columns} dataSource={services} style={{ marginTop: 16 }} />

      <Modal
        title={currentService ? 'Edit Service' : 'Add Service'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            label="Service Name"
            name="name"
            rules={[{ required: true, message: 'Please input the service name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentService ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManage;
