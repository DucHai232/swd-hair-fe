import React from "react";
import style from "./Card.module.scss";

const Card = ({ DataCard }) => {
  return (
    <div className={style.card}>
      <img className={style.img} src={DataCard.img} alt={DataCard.title} />
      <div className={style.content}>
        <h1 className={style.h1}>{DataCard.title}</h1>
        <p className={style.p}>{DataCard.description}</p>
      </div>
    </div>
  );
};

export default Card;
