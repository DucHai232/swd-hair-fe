import { useEffect, useState } from "react";
import style from "./Services.module.scss";

import { Row, Col } from "antd";
import { getServices } from "../../../services/service.service";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const loadServices = async () => {
    try {
      const response = await getServices();

      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadServices();
  }, []);
  return (
    <>
      <p className={style.p}>SERVICES</p>
      <Row className={style.container}>
        <Col className={style.cardBox} span={24}>
          {services.map((data, index) => (
            <div className={style.card} key={index}>
              <div className={style.cardDetail}>
                <p className={style.p1}>{data.name}</p>
                <p className={style.p2}>
                  Điểm thưởng: <strong>{data.loyaltyPoints}</strong>{" "}
                </p>
                <p className={style.p2}>
                  Giá: <strong>{data.price.toLocaleString()}đ</strong>
                </p>
                <div className={style.imgBox1}>
                  <img className={style.img1} src={data.image} />
                  <div className={style.imgBox2}>
                    <img className={style.img2} src={data.image} />
                    <img className={style.img2} src={data.image} />
                  </div>
                </div>
                <div className={style.timeToCut}>50 phút</div>
              </div>
              <button
                className={style.button}
                onClick={() => navigate("/appointment-booking")}
              >
                More info
              </button>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Services;
