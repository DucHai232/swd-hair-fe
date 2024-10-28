import { useState } from "react";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";
import styles from "./StylistManage.module.scss";
import moment from "moment";

// Dummy Data
const initialData = [
  {
    key: "1",
    name: "Anna Smith",
    specialization: "Haircut",
    phone: "123-456-7890",
    experience: "5 years",
    createdAt: "2024-09-30",
  },
  {
    key: "2",
    name: "Tom Brown",
    specialization: "Hair Coloring",
    phone: "098-765-4321",
    experience: "3 years",
    createdAt: "2024-09-28",
  },
];

const StylistManage = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Show modal to add/edit stylist
  const showModal = (record = null) => {
    setIsModalVisible(true);
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({ ...record });
    } else {
      form.resetFields();
    }
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  // Handle form submission
  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = { ...values };
      if (editingRecord) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...newData } : item
          )
        );
        message.success("Stylist updated successfully!");
      } else {
        const newStylist = {
          key: (data.length + 1).toString(),
          ...newData,
          createdAt: moment().format("YYYY-MM-DD"),
        };
        setData([...data, newStylist]);
        message.success("Stylist created successfully!");
      }
      handleCancel();
    });
  };

  // Delete stylist
  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Stylist deleted successfully!");
  };

  const columns = [
    {
      title: "Stylist Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Edit</a>
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.stylistTable}>
      <Button type="primary" onClick={() => showModal()}>
        Add Stylist
      </Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      <Modal
        title={editingRecord ? "Edit Stylist" : "Add Stylist"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Stylist Name"
            rules={[{ required: true, message: "Please input stylist name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="specialization"
            label="Specialization"
            rules={[
              { required: true, message: "Please input specialization!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="experience"
            label="Experience"
            rules={[{ required: true, message: "Please input experience!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StylistManage;
