import { useEffect, useState } from "react";
import style from "./Stylists.module.scss";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getStylists } from "../../../services/stylist.service";
import { useNavigate } from "react-router-dom";

const Stylists = () => {
  const [stylists, setStylists] = useState([]);
  const navigate = useNavigate();

  const loadStylists = async () => {
    try {
      const response = await getStylists();
      setStylists(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadStylists();
  }, []);
  return (
    <>
      <div>
        <p className={style.p}> OUR STYLISTS</p>
      </div>

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
                    Booking Now!
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </div>
      </Row>
    </>
  );
};

export default Stylists;
