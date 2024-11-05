import { useEffect, useState } from "react";
import style from "./Services.module.scss";
import { Row, Col, Spin } from "antd";
import { getServices } from "../../../services/service.service";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await getServices();
      setServices(response.data.services.slice(0, 3));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadServices();
  }, []);
  return (
    <>
      <p className={style.p}>SERVICES</p>
      <Spin spinning={isLoading}>
        <Row className={style.container}>
          <Col span={3} />
          {services.map((data, index) => (
            <Col span={6} key={index}>
              <div className={style.card}>
                <div className={style.cardDetail}>
                  <img className={style.img} src={data.image} />
                  <p className={style.p1}>{data.name}</p>
                  <p className={style.p2}>
                    ĐIỂM TÍCH LŨY: {data.loyaltyPoints}
                  </p>
                </div>
                <button className={style.button}>More info</button>
              </div>
            </Col>
          ))}
          <Col span={3} />
        </Row>
      </Spin>
    </>
  );
};

export default Services;
