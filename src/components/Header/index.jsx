import style from "./Header.module.scss";
import Logo from "../Header/Logo/index";
import Navigation from "../../components/Header/Navigation/index";
import Avatar from "../Header/Avatar/AvatarCustomer/index";
import ButtonLogin from "../../components/Header/Avatar/ButtonLogin/index";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.rootReducer.user.isLoggedIn);
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");

  return (
    <Row className={style.container} gutter={16}>
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
