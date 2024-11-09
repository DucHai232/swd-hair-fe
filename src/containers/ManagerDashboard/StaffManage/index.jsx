import { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useGetStaffQuery } from "../../../services/hairsalon.service";

const staffData = [
  {
    _id: "1",
    username: "staff1",
    name: "Staff 1",
    email: "staff1@example.com",
    phoneNumber: "123-456-7890",
    appointmentsCompleted: 50,
    hireDate: "2023-05-01T00:00:00Z",
  },
  {
    _id: "2",
    username: "staff2",
    name: "Staff 2",
    email: "staff2@example.com",
    phoneNumber: "123-456-7891",
    appointmentsCompleted: 30,
    hireDate: "2023-06-15T00:00:00Z",
  },
  // Add more staff members here
];

const StaffManage = () => {
  const { data: staffs } = useGetStaffQuery();
  const [dataSource, setDataSource] = useState(staffData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

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
      title: "Appointments",
      dataIndex: "appointmentsCompleted",
      key: "appointmentsCompleted",
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
