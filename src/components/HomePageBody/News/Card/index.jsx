import style from "./Card.module.scss";

const Card = ({ DataCard: { img, title, description } }) => (
  <div className={style.card}>
    <img className={style.img} src={img} alt={title} />
    <div className={style.content}>
      <h1 className={style.h1}>{title}</h1>
      <p className={style.p}>{description}</p>
    </div>
  </div>
);

export default Card;
