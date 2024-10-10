import { Button, Col, Empty, Row, Space, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ServiceChoosing.module.scss";
import { DeleteOutlined } from "@ant-design/icons";
import ServiceModal from "../ServiceModal";

const ServiceChoosing = ({ formBooking, setFormBooking }) => {
  const [openModalChooseStylist, setOpenModalChooseStylist] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveService = (data) => {
    const newServices = formBooking.selectedServices.filter(
      (service) => service.name !== data.name
    );
    setFormBooking((prev) => ({
      ...prev,
      selectedServices: newServices,
    }));
  };

  const handleChooseServices = (services) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedServices: services,
    }));
  };
  const dataSource = formBooking.selectedServices.map((service, index) => ({
    key: index,
    name: service.name,
    price: service.price,
  }));
  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <>
          <Tag color="green" key={name}>
            {name.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleRemoveService(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const newTotalPrice = formBooking.selectedServices.reduce(
      (sum, service) => sum + (service.price || 0),
      0
    );
    setTotalPrice(newTotalPrice);
  }, [formBooking.selectedServices]);
  return (
    <>
      <Typography.Title level={4}>STEP 2: Choose Your Service</Typography.Title>

      {formBooking.selectedServices.length > 0 ? (
        <Table
          bordered="1"
          className={styles.serviceTable}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      ) : (
        <Empty
          description={
            <>
              <Typography.Text>Không có dịch vụ nào!</Typography.Text>
            </>
          }
        />
      )}

      <Row>
        <Col span={11}>
          <Button
            className={styles.chooseServicebtn}
            type="primary"
            onClick={() => setOpenModalChooseStylist(true)}
          >
            Choose a Service
          </Button>
        </Col>
        <Col span={13}>
          <Typography.Title level={5} style={{ color: "red" }}>
            {totalPrice !== 0 && totalPrice && `Total price: $${totalPrice}`}
          </Typography.Title>
        </Col>
      </Row>
      <ServiceModal
        selectedServices={formBooking.selectedServices}
        openModal={openModalChooseStylist}
        setOpenModal={setOpenModalChooseStylist}
        handleChooseServices={handleChooseServices}
      />
    </>
  );
};

export default ServiceChoosing;
