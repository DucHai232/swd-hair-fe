import React from "react";
import style from "./Stylists.module.scss";
import cutHair from "../../../share/assets/BoyHair.jpg";
import { Row, Col } from "antd";

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
      <p className={style.p}>STYLISTS</p>
      <Row>
        <Col span={2} />
        <Col span={20} className={style.container}>
          <div className={style.cardBox}>
            {DataCard.map((data) => (
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
            ))}
          </div>
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
};

export default Stylists;
