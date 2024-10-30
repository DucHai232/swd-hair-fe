import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { useGetAllStylistQuery } from '../../../services/hairsalon.service';

const StylistManage = () => {
  const { data: stylists, isLoading, error } = useGetAllStylistQuery();
  const [form] = Form.useForm();

  // Define the columns for the table
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Salary', dataIndex: 'salary', key: 'salary' },
    { title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (image) => <img src={image} alt="Service" style={{ width: 50 }} /> },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Expertise', dataIndex: 'expertise', key: 'expertise' },
  ];

  return (
    <div>
      <h2>Stylist Management</h2>
      <Table
        columns={columns}
        dataSource={stylists?.data}
        rowKey="stylistId"
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />

    </div>
  );
};

export default StylistManage;
