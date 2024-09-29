import React, { useState } from "react";
import style from "./IntroComponent.module.scss";
import girlHair from "../../../share/assets/GirlHair.jpg";
import boyHair from "../../../share/assets/BoyHair.jpg";
import ModernHair from "../../../share/assets/ModernHair.jpg";
import ManIcon from "../../../share/assets/Man.png";
import WomanIcon from "../../../share/assets/Woman.png";
import Mordern from "../../../share/assets/Mordern.png";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const IntroComponent = () => {
  const [currentImage, setCurrentImage] = useState(boyHair);
  const [colorCircle, setColorCircle] = useState("GreenYellow");
  const [title, setTitle] = useState("Diverse styles");
  const [titleSpan, setTitleSpan] = useState("defining");
  const [span, setSpan] = useState("your unique edge");
  const [description, setDescription] = useState(
    "We offer services for gentlemen to define their style and express their unique identity with a wide range of diverse haircuts and styles."
  );

  const imgSlider = (imgSrc) => {
    setCurrentImage(imgSrc);
  };
  const changeCircleColor = (color) => {
    setColorCircle(color);
  };
  const changeTitle = (title) => {
    setTitle(title);
  };
  const changeTitleSpan = (titleSpan) => {
    setTitleSpan(titleSpan);
  };
  const changeSpan = (span) => {
    setSpan(span);
  };
  const changeDescription = (description) => {
    setDescription(description);
  };

  const introContent = [
    {
      img: boyHair,
      imgIcon: ManIcon,
      color: "GreenYellow",
      Title: "Diverse styles",
      TitleSpan: "Defining",
      Span: "Your unique edge",
      Description:
        "We offer services for gentlemen to define their style and express their unique identity with a wide range of diverse haircuts and styles.",
    },
    {
      img: girlHair,
      imgIcon: WomanIcon,
      color: "#ffc300",
      Title: "It's not just about hair",
      TitleSpan: "It's ",
      Span: "A lifestyle",
      Description:
        "We understand that hairstyling is not just about beauty, but also a way to relax and showcase the elegance and allure of every lady.",
    },
    {
      img: ModernHair,
      imgIcon: Mordern,
      color: "#df0e0e",
      Title: "It's more than just a hair salon",
      TitleSpan: " It's a perfect",
      Span: "Harmony",
      Description:
        "Hairstyling isn’t just about looking good; it's a blend of relaxation and youthful energy. At our salon, we offer a variety of services tailored to all ages.",
    },
  ];

  return (
    <>
      <div
        className={style.circle}
        style={{ backgroundColor: colorCircle }}
      ></div>
    
      <Row className={style.container}>
        <Col span={12} className={style.textBox}>
          <h2 className={style.h2}>
            {title}
            {", "}
            {titleSpan}
            <br />
            <span className={style.span}> {span}</span>
          </h2>
          <p className={style.p}>{description}</p>
          <Link to='/appointment-booking'>
          <button className={style.button}>
          <span className={style.span1}>Discover now!</span>
            <span className={style.span2}>Let's go {"->"}</span>
          </button>
          </Link>
        </Col>
        <Col span={12} className={style.imgBox}>
          <img className={style.img} src={currentImage} alt="Hair Style" />
        </Col>
      </Row>

      <ul className={style.thumb}>
        {introContent.map((data) => (
          <li className={style.thumbLi}>
            <img
              className={style.imgIcon}
              src={data.imgIcon}
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                imgSlider(data.img);
                changeCircleColor(data.color);
                changeTitle(data.Title);
                changeTitleSpan(data.TitleSpan);
                changeSpan(data.Span);
                changeDescription(data.Description);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default IntroComponent;
