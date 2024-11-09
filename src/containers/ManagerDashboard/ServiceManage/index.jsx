import { useState } from "react";
import { Table, Button, Modal, Form, Input, Radio } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./ServiceManage.module.scss";
import {
  useCreateServiceMutation,
  useDeleteSoftServiceMutation,
  useUpdateServiceMutation,
  useViewServiceQuery,
} from "../../../services/hairsalon.service";
import { axiosInstance } from "../../../services/api.service";

const ServiceManage = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const { data: serviceData, isLoading, refetch } = useViewServiceQuery();
  const [inactiveService] = useDeleteSoftServiceMutation();
  const [addService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form] = Form.useForm();

  // Show modal to add or edit service
  const showModal = (service = null) => {
    setCurrentService(service);
    if (service) {
      form.setFieldsValue(service);
      setImage(service.image); // Set the current image if editing
    } else {
      form.resetFields();
      setImage(null); // Clear image preview if adding new service
    }
    setIsModalVisible(true);
  };

  const handleUploadFile = (e) => {
    const localFile = e.target.files[0];
    if (localFile) {
      setFile(localFile);
      setImage(URL.createObjectURL(localFile));
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("img", file);
    try {
      const res = await axiosInstance.post("upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      return res.data.url; // Return the URL from the API response
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Handle form submission for adding or updating services
  const handleFinish = async (service) => {
    let imageUrl = image; // Use existing image URL if editing

    if (file) {
      imageUrl = await uploadImage(); // Upload new image if file is selected
      if (!imageUrl) {
        console.error("Failed to upload image");
        return;
      }
    }
    console.log(imageUrl);
    const servicePayload = {
      ...service,
      image: imageUrl,
      serviceId: currentService?._id, // Include serviceId if updating
    };

    if (currentService) {
      updateService(servicePayload)
        .unwrap()
        .then(() => refetch())
        .catch((err) => console.error("Failed to update service:", err));
    } else {
      addService(servicePayload)
        .unwrap()
        .then(() => refetch())
        .catch((err) => console.error("Failed to add service:", err));
    }

    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Loyalty Points",
      dataIndex: "loyaltyPoints",
      key: "loyaltyPoints",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Service" style={{ width: 50 }} />
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              inactiveService({ serviceId: record._id });
              refetch();
            }}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.serviceManageContainer}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
      >
        Add Service
      </Button>
      <Table
        columns={columns}
        dataSource={serviceData?.services || []}
        loading={isLoading}
        rowKey="_id"
        style={{ marginTop: 16 }}
      />

      <Modal
        title={currentService ? "Edit Service" : "Add Service"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            label="Service Name"
            name="name"
            rules={[
              { required: true, message: "Please input the service name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Loyalty Points"
            name="loyaltyPoints"
            rules={[
              { required: true, message: "Please input the Loyalty Points!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <input type="file" accept="image/*" onChange={handleUploadFile} />
            {image && <img src={image} width={100} alt="Service Preview" />}
          </Form.Item>

          <Form.Item
            label="Active"
            name="active"
            rules={[
              { required: true, message: "Please select the active status!" },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentService ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManage;
