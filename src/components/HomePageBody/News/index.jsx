import React from "react";
import style from "./News.module.scss";
import { Col, Row } from "antd";
import cutHair from "../../../share/assets/HairCutService.jpg";
import Card from "./Card/index";

const Trending = () => {
  const DataCard = [
    {
      img: cutHair,
      title: "Fake News",
      description: "Includes haircut and post-cut styling services, Our services include perming, straightening, colorin",
    },
    {
      img: cutHair,
      title: " Fake News",
      description:
        "Our services include perming, straightening, coloring, hair restoration,.",
    },
    {
      img: cutHair,
      title: "Fake News",
      description:
        "We also offer services such as ear cleaning, facial hair shaving.",
    },
    {
      img: cutHair,
      title: "Fake News",
      description:
        "We also offer services such as ear cleaning, facial hair shaving.",
    },
    {
      img: cutHair,
      title: "Fake News",
      description:
        "We also offer services such as ear cleaning, facial hair shaving.",
    },
  ];
  return (
    <div className={style.container}>
      <p className={style.p}>NEWS</p>
      <Row className={style.newsBox}>
        <Col span={12} className={style.mainNews}>
          <Card DataCard={DataCard[0]} />
        </Col>
        <Col span={12} className={style.subNewsBox}>
          {DataCard.slice(1).map((data, index) => (
            <div className={style.subNews} key={index}>
              <Card DataCard={data} />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Trending;
