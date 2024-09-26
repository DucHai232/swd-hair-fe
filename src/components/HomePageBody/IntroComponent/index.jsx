import React, { useState } from "react";
import style from "./IntroComponent.module.scss";
import girlHair from "../../../share/assets/GirlHair.jpg";
import boyHair from "../../../share/assets/BoyHair.jpg";
import ModernHair from "../../../share/assets/ModernHair.jpg";
import ManIcon from "../../../share/assets/Man.png";
import WomanIcon from "../../../share/assets/Woman.png";
import Mordern from "../../../share/assets/Mordern.png";
import { Col, Row } from "antd";

const IntroComponent = () => {
  const [currentImage, setCurrentImage] = useState(girlHair);
  const [colorCircle, setColorCircle] = useState("#ff0000");

  const imgSlider = (imgSrc) => {
    setCurrentImage(imgSrc);
  };

  const changeCircleColor = (color) => {
    setColorCircle(color);
  };

  const introContent = [
    {
      img: boyHair,
      imgIcon: ManIcon,
      color: "#00ff00",
      Title: "Diverse styles",
      TitleSpan: "defining",
      Span:"your unique edge",
      Description: "We offer services for gentlemen to define their style and express their unique identity with a wide range of diverse haircuts and styles.",
    },
    {
      img: girlHair,
      imgIcon: WomanIcon,
      color: "#ff0000",
      Title: "It's not just about hair",
      TitleSpan: "it's ",
      Span:"a lifestyle",
      Description: "We understand that hairstyling is not just about beauty, but also a way to relax and showcase the elegance and allure of every lady.",
    },
    {
      img: ModernHair,
      imgIcon: Mordern,
      color: "#0000ff",
      Title: "It's more than just a hair salon",
      TitleSpan: " it's a perfect harmony",
      Span:"harmony",
      Description: "Hairstyling isn’t just about looking good; it's a blend of relaxation and youthful energy. At our salon, we offer a variety of services tailored to all ages.",
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
            It's not just a barbershop
            <br />
            it's a reflection of your{" "}
            <span className={style.span}> style and personality</span>
          </h2>
          <p className={style.p}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
            ratione consequuntur sapiente facere repellendus, sequi praesentium
            quisquam quia dolorum eveniet earum veritatis! Sint debitis modi
            facilis excepturi animi fuga optio?
          </p>
          <button className={style.button}>Learn more</button>
        </Col>
        <Col span={12} className={style.imgBox}>
          <img className={style.img} src={currentImage} alt="Hair Style" />
        </Col>
      </Row>

      <ul className={style.thumb}>
        {introContent.map((data, index) => (
          <li key={index} className={style.thumbLi}>
            <img
              className={style.imgIcon}
              src={data.imgIcon}
              style={{ width: "100px", height: "100px" }}
              onClick={() => {
                imgSlider(data.img);
                changeCircleColor(data.color);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default IntroComponent;
