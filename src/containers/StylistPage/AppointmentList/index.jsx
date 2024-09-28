import React from 'react';
import { Table, Tag } from 'antd';

const AppointmentList = () => {
  // Dummy appointment data with a isFavorited field
  const appointments = [
    {
      _id: '1',
      customerId: { name: 'John Doe', isFavorited: true }, // Customer details with isFavorited flag
      stylistId: { name: 'Stylist 1' }, // Added stylist information
      service: 'Haircut',
      appointmentDate: '2024-09-25T10:30:00Z',
      status: 'Pending',
      visitCount: 1,
    },
    {
      _id: '2',
      customerId: { name: 'Jane Smith', isFavorited: false },
      stylistId: { name: 'Stylist 2' },
      service: 'Hair coloring',
      appointmentDate: '2024-09-26T13:00:00Z',
      status: 'Approved',
      visitCount: 2,
    },
    {
      _id: '3',
      customerId: { name: 'Alice Johnson', isFavorited: true },
      stylistId: { name: 'Stylist 1' },
      service: 'Haircut and Shave',
      appointmentDate: '2024-09-27T15:30:00Z',
      status: 'Completed',
      visitCount: 3,
    },
    {
      _id: '4',
      customerId: { name: 'Bob Brown', isFavorited: false },
      stylistId: { name: 'Stylist 3' },
      service: 'Beard Trim',
      appointmentDate: '2024-09-28T12:00:00Z',
      status: 'Rejected',
      visitCount: 1,
    },
  ];

  // Define columns for the table
  const columns = [
    {
      title: 'Customer',
      dataIndex: ['customerId', 'name'], // Accessing nested fields
      key: 'customer',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Stylist',
      dataIndex: ['stylistId', 'name'], // Accessing stylist information
      key: 'stylist',
    },
    {
      title: 'Is Favorited',
      dataIndex: ['customerId', 'isFavorited'], // Accessing the isFavorited flag
      key: 'isFavorited',
      render: (isFavorited) => (
        <Tag color={isFavorited ? 'green' : 'red'}>
          {isFavorited ? 'Favorite' : 'Not Favorite'}
        </Tag>
      ),
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (date) => new Date(date).toLocaleString(), // Formatting the date
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Pending':
            color = 'orange';
            break;
          case 'Approved':
            color = 'green';
            break;
          case 'Rejected':
            color = 'red';
            break;
          case 'Completed':
            color = 'blue';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Visit Count',
      dataIndex: 'visitCount',
      key: 'visitCount',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={appointments}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AppointmentList;
