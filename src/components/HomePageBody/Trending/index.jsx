import React from "react";
import style from "./Trending.module.scss";
import { Card, Carousel} from "antd";
import img from "../../../share/assets/boyhair.jpg";

const Trending = () => {
  const DataCard = [
    {
      title: "Haircut Services",
      decription: "Includes haircut and post-cut styling services",
    },
    {
      title: " Advanced Hair Styling Services",
      decription:
        "Our services include perming, straightening, coloring, hair restoration, styling, hair treatment, extensions, and bleaching.",
    },
    {
      title: "Other Services",
      decription:
        "We also offer services such as ear cleaning, facial hair shaving, relaxing massages, and beard shaving.",
    },
  ];
  return (
    <div className={style.container}>
      <p className={style.p}>HOT TRENDS SERVICE</p>
      <Carousel className={style.carousel} autoplay>
        {DataCard.map((data) => (
          <div className={style.card}>
            <img className={style.img} src={img}/>
            <h1 className={style.title}>Hot Service</h1>
            <p className={style.description}>dich vu goi uon nhuom</p>
            <p></p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Trending;
