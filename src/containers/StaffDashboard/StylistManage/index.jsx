import { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";
import styles from "./StylistManage.module.scss";
import moment from "moment";
import { getAllStylists } from "../../../services/stylist.service";

const StylistManage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await getAllStylists();
        const stylists = response.data;
        const formattedStylists = stylists.map((stylist) => ({
          key: stylist.stylistId,
          name: stylist.name,
          email: stylist.email,
          avatar: stylist.avatar,
          phone: stylist.phone,
          numberAppointments: stylist.numberAppointments,
          numberExperiences: stylist.numberExperiences,
          expertise: stylist.expertise,
          createdAt: moment(stylist.createdAt).format("YYYY-MM-DD"),
        }));
        setData(formattedStylists);
      } catch (error) {
        message.error("Failed to fetch stylists: " + error.message);
        console.error("Error fetching stylists:", error);
      }
    };

    fetchStylists();
  }, []);

  const showModal = (record = null) => {
    setIsModalVisible(true);
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({ ...record });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Expertise",
      dataIndex: "expertise",
      key: "expertise",
    },
    {
      title: "Experience",
      dataIndex: "numberExperiences",
      key: "numberExperiences",
    },
    {
      title: "Number of Appointments",
      dataIndex: "numberAppointments",
      key: "numberAppointments",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input stylist email!" }]}
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
            name="expertise"
            label="Expertise"
            rules={[{ required: true, message: "Please input expertise!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberExperiences"
            label="Experience"
            rules={[{ required: true, message: "Please input experience!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberAppointments"
            label="Number of Appointments"
            rules={[
              {
                required: true,
                message: "Please input number of appointments!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StylistManage;
