import { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import moment from "moment";
import styles from "./AppointmentManage.module.scss";

const { Option } = Select;

const STATUS_OPTIONS = ["Pending", "Completed", "Cancelled"];
const COLOR_MAP = {
  Completed: "green",
  Pending: "blue",
  Cancelled: "red",
};

// Dummy Data
const initialData = [
  {
    key: "1",
    customer: "John Doe",
    stylist: "Anna Smith",
    service: "Haircut",
    appointmentDate: "2024-10-05",
    visitCount: 3,
    status: "Completed",
    createdAt: "2024-09-30",
  },
  {
    key: "2",
    customer: "Jane Roe",
    stylist: "Tom Brown",
    service: "Hair Coloring",
    appointmentDate: "2024-10-10",
    visitCount: 1,
    status: "Pending",
    createdAt: "2024-09-28",
  },
];

const AppointmentManage = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Show modal to add/edit appointment
  const showModal = (record = null) => {
    setIsModalVisible(true);
    setEditingRecord(record);
    record
      ? form.setFieldsValue({
          ...record,
          appointmentDate: moment(record.appointmentDate),
        })
      : form.resetFields();
  };

  // Close modal and reset form
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  // Handle form submit (add or update)
  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        ...values,
        appointmentDate: moment(values.appointmentDate).format("YYYY-MM-DD"),
      };
      if (editingRecord) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...newData } : item
          )
        );
        message.success("Appointment updated successfully!");
      } else {
        const newAppointment = {
          key: (data.length + 1).toString(),
          ...newData,
          createdAt: moment().format("YYYY-MM-DD"),
        };
        setData([...data, newAppointment]);
        message.success("Appointment created successfully!");
      }
      handleCancel();
    });
  };

  // Delete appointment
  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Appointment deleted successfully!");
  };

  // Render status tag
  const renderStatus = (status) => (
    <Tag color={COLOR_MAP[status]}>{status}</Tag>
  );

  // Action column render
  const renderActions = (record) => (
    <Space size="middle">
      <a onClick={() => showModal(record)}>Edit</a>
      <a onClick={() => handleDelete(record.key)}>Delete</a>
    </Space>
  );

  const columns = [
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Stylist Name", dataIndex: "stylist", key: "stylist" },
    { title: "Service", dataIndex: "service", key: "service" },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    { title: "Visit Count", dataIndex: "visitCount", key: "visitCount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    { title: "Action", key: "action", render: renderActions },
  ];

  return (
    <div className={styles.appointmentTable}>
      <Button type="primary" onClick={() => showModal()}>
        Create Appointment
      </Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      <Modal
        title={editingRecord ? "Edit Appointment" : "Create Appointment"}
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
            name="appointmentDate"
            label="Appointment Date"
            rules={[
              { required: true, message: "Please select appointment date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="visitCount"
            label="Visit Count"
            rules={[{ required: true, message: "Please input visit count!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select>
              {STATUS_OPTIONS.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentManage;
