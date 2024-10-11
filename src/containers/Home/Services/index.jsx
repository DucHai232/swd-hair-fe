import React from "react";
import style from "./Services.module.scss";
import cutHair from "../../../share/assets/HairCutService.jpg";
import advanceService from "../../../share/assets/AdvanceService.jpg";
import ortherService from "../../../share/assets/OrderService.jpg";
import { Row, Col } from "antd";

const Services = () => {
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
      img1: advanceService,
      img2: advanceService,
      img3: advanceService,
      title: " Advanced Hair Styling Services",
      time: "50 minutes",
      decription: "xtensions, and bleaching.",
    },
    {
      img1: ortherService,
      img2: ortherService,
      img3: ortherService,
      title: "Other Services",
      time: "50 minutes",
      decription: " relaxing massages, and beard shaving.",
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
      img1: advanceService,
      img2: advanceService,
      img3: advanceService,
      title: " Advanced Hair Styling Services",
      time: "50 minutes",
      decription: "xtensions, and bleaching.",
    },
    {
      img1: ortherService,
      img2: ortherService,
      img3: ortherService,
      title: "Other Services",
      time: "50 minutes",
      decription: " relaxing massages, and beard shaving.",
    },
  ];
  return (
    <>
      <p className={style.p}>SERVICES</p>
      <Row className={style.container}>
        <Col className={style.cardBox} span={24}>
          {DataCard.map((data) => (
            <div className={style.card}>
              <div className={style.cardDetail}>
                <p className={style.p1}>{data.title}</p>
                <p className={style.p2}>Combo Cut</p>
                <p className={style.p3}>{data.decription}</p>
                <div className={style.imgBox1}>
                  <img className={style.img1} src={data.img1} />
                  <div className={style.imgBox2}>
                    <img className={style.img2} src={data.img2} />
                    <img className={style.img2} src={data.img3} />
                  </div>
                </div>
                <div className={style.timeToCut}>{data.time}</div>
              </div>
              <button className={style.button}>More info</button>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Services;
