import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input } from 'antd';
import { useGetAllStaffQuery } from '../../../services/hairsalon.service';

const StaffManage = () => {
  const { data, isLoading } = useGetAllStaffQuery();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Update dataSource when API data is loaded
  useEffect(() => {
    if (data && data.staffs) {
      const formattedStaffs = data.staffs.map((staff) => ({
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        phoneNumber: staff.phone,
        appointmentsCompleted: staff.approvedAppointmentsCount,
        hireDate: staff.createdAt,
      }));
      setDataSource(formattedStaffs);
    }
  }, [data]);

  // Handle opening the edit modal
  const handleEdit = (record) => {
    setEditingStaff(record);
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStaff(null);
  };

  // Handle saving the edited data
  const handleSave = (values) => {
    setDataSource((prevData) =>
      prevData.map((staff) =>
        staff._id === editingStaff._id ? { ...staff, ...values } : staff
      )
    );
    handleCancel();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Hire Date",
      dataIndex: "hireDate",
      key: "hireDate",
      render: (hireDate) => new Date(hireDate).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
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
      <h2>Staff Management</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />

      {/* Modal for editing staff details */}
      <Modal
        title="Edit Staff"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={editingStaff}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the staff name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
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

export default StaffManage;
