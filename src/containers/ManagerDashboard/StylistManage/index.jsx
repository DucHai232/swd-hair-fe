import React from 'react';
import { Table, Tag } from 'antd';

const employeesData = [
  {
    _id: '66e657812287bd197205262a',
    username: 'sl1',
    name: 'stylist 1',
    email: 'sl1@gmail.com',
    role: ['stylist'],
    salary: 0,
    commissionRate: 0,
    totalSalary: 0,
    banned: false,
    createdAt: '2024-09-15T03:41:53.661Z',
    updatedAt: '2024-09-17T03:23:17.538Z',
    favoriteStylists: ['66e7a7056d6b95b778156f1f'],
  },
  // You can add more employees here
];

const StylistManage = () => {
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <>
          {role.map((r) => (
            <Tag color="blue" key={r}>
              {r.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Commission Rate',
      dataIndex: 'commissionRate',
      key: 'commissionRate',
    },
    {
      title: 'Total Salary',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt) => new Date(updatedAt).toLocaleString(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employeesData}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 5 }} // Optional: Adjust the pagination size
    />
  );
};

export default StylistManage;
