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
    // {
    //   img: advanceService,
    //   title: " Advanced Hair Styling Services",
    //   time: "50 minutes",
    //   decription:
    //     "Our services include perming, straightening, coloring, hair restoration, styling, hair treatment, extensions, and bleaching.",
    // },
    // {
    //   img: ortherService,
    //   title: "Other Services",
    //   time: "50 minutes",
    //   decription:
    //     "We also offer services such as ear cleaning, facial hair shaving, relaxing massages, and beard shaving.",
    // },
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
                <p className={style.p1}>{data.title}</p>
                <p className={style.p2}>Combo Cut</p>
                <p className={style.p3}>{data.decription}</p>
                <div className={style.imgBox}>
                  <img className={style.img1} src={data.img1} />
                  <img className={style.img2} src={data.img2} />
                  <img className={style.img3} src={data.img3} />
                </div>
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
