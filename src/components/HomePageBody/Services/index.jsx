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
      <p className={style.p}>DỊCH VỤ</p>
      <Spin spinning={isLoading}>
        <Row className={style.container} gutter={[16, 16]}>
          {services.map((data, index) => (
            <Col span={8} key={index}>
              {" "}
              <div className={style.card}>
                <div className={style.cardDetail}>
                  <img className={style.img} src={data.image} alt={data.name} />{" "}
                  <p className={style.p1}>{data.name}</p>
                  <p className={style.p2}>
                    ĐIỂM TÍCH LŨY: {data.loyaltyPoints}
                  </p>
                </div>
                <button className={style.button}>Xem thêm</button>
              </div>
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default Services;
