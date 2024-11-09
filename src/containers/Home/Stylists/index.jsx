import { useEffect, useState } from "react";
import style from "./Stylists.module.scss";
import { Row, Col, Spin } from "antd";
import { getStylists } from "../../../services/stylist.service";
import { useNavigate } from "react-router-dom";

const Stylists = () => {
  const [stylists, setStylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadStylists = async () => {
    try {
      setIsLoading(true);
      const response = await getStylists();
      setStylists(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadStylists();
  }, []);
  return (
    <>
      <div>
        <p className={style.p}>Các Thợ Cắt Của Chúng Tôi</p>
      </div>
      <Spin spinning={isLoading}>
        <Row>
          <div className={style.cardBox}>
            {stylists.map((data, index) => (
              <Col
                className={style.container}
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={8}
              >
                <div className={style.cardBorder}>
                  <div className={style.card}>
                    <img className={style.img} src={data.avatar} />
                    <div className={style.content}>
                      <p className={style.heading}>{data.name}</p>
                      <p className={style.para}>Chuyên môn: {data.Expertise}</p>
                    </div>
                    <button
                      className={style.button}
                      onClick={() => navigate("/appointment-booking")}
                    >
                      Đặt lịch ngay!
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </div>
        </Row>
      </Spin>
    </>
  );
};

export default Stylists;
