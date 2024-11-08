import { useEffect, useState } from "react";
import style from "./Services.module.scss";
import { Row, Col, Spin } from "antd";
import { getServices } from "../../../services/service.service";
import { useNavigate } from "react-router-dom";

// Service Card Component
const ServiceCard = ({ service }) => {
  const { id, name, loyaltyPoints, price, image } = service;
  const navigate = useNavigate();

  return (
    <div className={style.card} key={id}>
      <div className={style.cardDetail}>
        <p className={style.p1}>{name}</p>
        <p className={style.p2}>
          Điểm thưởng: <strong>{loyaltyPoints}</strong>
        </p>
        <p className={style.p2}>
          Giá: <strong>{price.toLocaleString()}đ</strong>
        </p>
        <div className={style.imgBox1}>
          <img className={style.img1} src={image} alt={name} />
        </div>
      </div>
      <button
        className={style.button}
        onClick={() => navigate("/appointment-booking")}
      >
        Xem thêm
      </button>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch services
  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <>
      <p className={style.p}>Các Dịch Vụ Của Chúng Tôi</p>
      <Spin spinning={isLoading}>
        <Row className={style.container}>
          <Col className={style.cardBox} span={24}>
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default Services;
