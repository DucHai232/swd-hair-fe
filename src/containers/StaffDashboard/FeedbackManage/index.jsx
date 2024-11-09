import { useState } from "react";
import { Table, Space, Modal, Form, Input, Rate, message } from "antd";
import moment from "moment";
import axios from "axios"; // Import axios for API calls
import styles from "./FeedbackManage.module.scss";

const FeedbackManage = () => {
  const [data, setData] = useState([]); // Xóa dữ liệu giả mạo
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
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newFeedback = {
        stylistId: values.stylistId,
        appointmentId: values.appointmentId,
        rating: values.rating,
        comment: values.feedback,
      };

      // Gửi dữ liệu đến API để tạo feedback
      const response = await axios.post("/create-feedback", newFeedback);
      if (response.status === 201) {
        // Thêm phản hồi mới vào dữ liệu
        setData([
          ...data,
          {
            ...newFeedback,
            key: response.data.id,
            createdAt: moment().format("YYYY-MM-DD"),
          },
        ]); // Giả sử API trả về ID của feedback
        message.success("Feedback created successfully!");
      }

      handleCancel();
    } catch (error) {
      message.error("Failed to create feedback: " + error.message);
      console.error("Error creating feedback:", error);
    }
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
      dataIndex: "comment", // Cập nhật tên trường
      key: "comment", // Cập nhật tên trường
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
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      <Modal
        title={editingRecord ? "Edit Feedback" : "Create Feedback"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="stylistId"
            label="Stylist ID" // Thêm trường Stylist ID
            rules={[{ required: true, message: "Please input stylist ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="appointmentId"
            label="Appointment ID" // Thêm trường Appointment ID
            rules={[
              { required: true, message: "Please input appointment ID!" },
            ]}
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
