import React from "react";
import style from "./Header.module.scss";
import Avatar from "../Header/Avatar/index";
import Logo from "../../assets/HairSalonLogoShop.png";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <Row className={style.container}>
        <Col span={8}>
          <Link to="/">
            <div className={style.Logo}>
              <img className={style.img} src={Logo} alt="Logo" />
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <ul className={style.ul}>
            <li className={style.li}>Servives</li>
            <li className={style.li}>Stylist</li>
            <li className={style.li}>Contact Us</li>
            <li className={style.li}>About Us</li>
            <li className={style.li}>Policies & Terms</li>
            <li className={style.li}>FAQS</li>
          </ul>
        </Col>
        <Col span={8}>
          <Avatar />
        </Col>
      </Row>
    </>
  );
};

export default index;
