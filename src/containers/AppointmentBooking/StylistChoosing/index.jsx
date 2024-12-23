import { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";

import styles from "./StylistChoosing.module.scss";
import { getStylists } from "../../../services/stylist.service";

const StylistChoosing = ({ formBooking, setFormBooking }) => {
  const [stylists, setStylists] = useState([]);
  const loadStylist = async () => {
    try {
      const response = await getStylists();
      setStylists(response?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectStylist = (stylist) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedStylist: stylist,
    }));
  };
  useEffect(() => {
    loadStylist();
  }, []);
  return (
    <>
      <Typography.Title level={4}>
        BƯỚC 3: Chọn Thợ Cắt Của Bạn
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {stylists.map((stylist) => (
          <Col span={6} key={stylist._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={stylist.name}
                  src={stylist?.avatar}
                  style={{ height: "300px" }}
                />
              }
              onClick={() => handleSelectStylist(stylist)}
              className={`${
                formBooking.selectedStylist?._id === stylist._id
                  ? styles.selected
                  : ""
              }`}
            >
              <Card.Meta title={stylist.name} description="Bấm để chọn" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StylistChoosing;
