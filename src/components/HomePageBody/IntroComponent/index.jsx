import React from "react";
import style from "./IntroComponent.module.scss";
import girlHair from "../../../share/assets/GirlHair.jpg";
import boyHair from "../../../share/assets/BoyHair.jpg";
import ModernlHair from "../../../share/assets/ModernHair.jpg";
import { Col, Row } from "antd";
import { SmileTwoTone } from "@ant-design/icons";

const IntroCoponent = () => {
  return (
    <>
    <div className={style.circle}></div>
      <Row className={style.container}>
        <Col span={12} className={style.textBox}>
          <h2 className={style.h2}>
            it is a memeber of barbar
            <br />
            it is<span className={style.span}> no</span>
          </h2>
          <p className={style.p}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
            ratione consequuntur sapiente facere repellendus, sequi praesentium
            quisquam quia dolorum eveniet earum veritatis! Sint debitis modi
            facilis excepturi animi fuga optio?
          </p>
          <button className={style.button}>learn more</button>
        </Col>
        <Col span={12} className={style.imgBox}>
          <img className={style.img} src={girlHair} />
        </Col>
      </Row>
      <ul className={style.thumb}>
        <li className={style.thumbLi}>
          <SmileTwoTone style={{ width: "100px", height: "100px" }} />
        </li>
        <li className={style.thumbLi}>
          <SmileTwoTone style={{ width: "100px", height: "100px" }} />
        </li>
        <li className={style.thumbLi}>
          <SmileTwoTone style={{ width: "100px", height: "100px" }} />
        </li>
      </ul>
    </>
  );
};

export default IntroCoponent;
