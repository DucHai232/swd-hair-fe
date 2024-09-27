import React, { useState } from "react"; // Import useState
import style from "./Header.module.scss";
import Logo from "../Header/Logo/index";
import Navigation from "../../components/Header/Navigation/index";
import Avatar from "../Header/Avatar/AvatarCustomer/index";
import ButtonLogin from "../../components/Header/Avatar/ButtonLogin/index";
import { Col, Row } from "antd";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  return (
    <Row className={style.container}>
      <Col span={4}>
        <Logo />
      </Col>
      <Col span={16}>
        <Navigation />
      </Col>
      <Col span={4}>
        {isLoggedIn ? (
          <Avatar className={style.UserPoint} />
        ) : (
          <ButtonLogin onClick={handleLoginClick} />
        )}
      </Col>
    </Row>
  );
};

export default Header;
