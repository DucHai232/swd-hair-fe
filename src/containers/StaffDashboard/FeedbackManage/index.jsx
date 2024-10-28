import { useState } from "react";
import { Table, Space, Button, Modal, Form, Input, Rate, message } from "antd";
import moment from "moment";
import styles from "./FeedbackManage.module.scss";

// Dum Data
const initialData = [
  {
    key: "1",
    customer: "John Doe",
    stylist: "Anna Smith",
    service: "Haircut",
    rating: 4,
    feedback: "Great service!",
    createdAt: "2024-09-30",
  },
  {
    key: "2",
    customer: "Jane Roe",
    stylist: "Tom Brown",
    service: "Hair Coloring",
    rating: 5,
    feedback: "Loved the color!",
    createdAt: "2024-09-28",
  },
];

const FeedbackManage = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Show modal to add/edit feedback
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

  // Handle form when submitting
  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = { ...values };
      if (editingRecord) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...newData } : item
          )
        );
        message.success("Feedback updated successfully!");
      } else {
        const newFeedback = {
          key: (data.length + 1).toString(),
          ...newData,
          createdAt: moment().format("YYYY-MM-DD"),
        };
        setData([...data, newFeedback]);
        message.success("Feedback created successfully!");
      }
      handleCancel();
    });
  };

  // Delete feedback
  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Feedback deleted successfully!");
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Stylist Name",
      dataIndex: "stylist",
      key: "stylist",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
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
    <div className={styles.feedbackTable}>
      <Button type="primary" onClick={() => showModal()}>
        Create Feedback
      </Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      <Modal
        title={editingRecord ? "Edit Feedback" : "Create Feedback"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="customer"
            label="Customer Name"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stylist"
            label="Stylist Name"
            rules={[{ required: true, message: "Please input stylist name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please input service!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please give a rating!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: "Please leave your feedback!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackManage;
