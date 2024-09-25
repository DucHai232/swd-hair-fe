import React from "react";
import style from "./Header.module.scss";
import Logo from "../Header/Logo/index";
import Navigation from "../../components/Header/Navigation/index";
import Avatar from "../Header/Avatar/AvatarCustomer/index";
import ButtonLogin from "../../components/Header/Avatar/ButtonLogin/index";
import { Col, Row } from "antd";

const Header = () => {
  return (
    <>
      <Row className={style.container}>
        <Col span={4}>
          <Logo />
        </Col>
        <Col span={16}>
          <Navigation />
        </Col>
        <Col span={4}>
          {/* <Avatar className={style.UserPoint} /> */}
          <ButtonLogin />
        </Col>
      </Row>
    </>
  );
};

export default Header;
