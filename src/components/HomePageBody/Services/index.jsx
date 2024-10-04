import React from "react";
import style from "./Services.module.scss";
import cutHair from "../../../share/assets/HairCutService.jpg";
import advanceService from "../../../share/assets/AdvanceService.jpg";
import ortherService from "../../../share/assets/OrderService.jpg";
import { Row, Col } from "antd";

const Services = () => {
  const DataCard = [
    {
      img: cutHair,
      title: "Haircut Services",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      img: advanceService,
      title: " Advanced Hair Styling Services",
      decription:
        "Our services include perming, straightening, coloring, hair restoration, styling, hair treatment, extensions, and bleaching.",
    },
    {
      img: ortherService,
      title: "Other Services",
      decription:
        "We also offer services such as ear cleaning, facial hair shaving, relaxing massages, and beard shaving.",
    },
  ];
  return (
    <>
      <p className={style.p}>SERVICES</p>
      <Row className={style.container}>
        <Col span={3} />
        {DataCard.map((data) => (
          <Col span={6}>
            <div className={style.card}>
              <div className={style.cardDetail}>
                <img className={style.img} src={data.img} />
                <p className={style.p1}>{data.title}</p>
                <p className={style.p2}>{data.decription}</p>
              </div>
              <button className={style.button}>More info</button>
            </div>
          </Col>
        ))}
        <Col span={3} />
      </Row>
    </>
  );
};

export default Services;
