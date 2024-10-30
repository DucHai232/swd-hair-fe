import React from "react";
import style from "./Stylists.module.scss";
import cutHair from "../../../share/assets/BoyHair.jpg";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Stylists = () => {
  const DataCard = [
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img1: cutHair,
      img2: cutHair,
      img3: cutHair,
      title: "Haircut Services",
      time: "50 minutes",
      decription: "Includes haircut and post-cut styling services",
    },
  ];
  return (
    <>
      <div>
        <p className={style.p}> OUR STYLISTS</p>
        <div>
          <SearchOutlined size={30} />
        </div>
      </div>

      <Row>
        <div className={style.cardBox}>
          {DataCard.map((data, index) => (
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
                  <img className={style.img} src={data.img1} />
                  <div className={style.content}>
                    <p className={style.heading}>{data.title}</p>
                    <p className={style.para}>99 Lê Văn Việt, HCM</p>
                  </div>
                  <button className={style.button}>Booking Now!</button>
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
