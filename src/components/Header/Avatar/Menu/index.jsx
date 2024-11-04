import style from "./Menu.module.scss";
import { Avatar, Button, Col, Row } from "antd";
import BoyHair from "../../../../share/assets/BoyHair.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../../../feature/authentication";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = () => {
    navigate("/login");
    dispatch(signout());
  };
  const dataProfile = [
    {
      title: "Point",
      value: user?.loyaltyPoints || 0,
    },
    {
      title: "Thông tin cá nhân",
      value: "",
      url: "/info-profile",
    },
    {
      title: "Lịch hẹn",
      value: "",
      url: "/list-appointment",
    },
  ];
  return (
    <div className={style.container}>
      <div className={style.nameBox}>
        <Avatar
          size={50}
          src={user.avatar || BoyHair}
          className={style.avatar}
          shape="square"
        />
        <p className={style.name}>{user?.name}</p>
      </div>
      {dataProfile.map((item, index) => (
        <Row style={{ margin: "10px 0px" }} key={index}>
          <Col
            span={20}
            style={{
              fontWeight: item.title === "Point" ? "bold" : "normal",
              cursor: item.title === "Point" ? "default" : "pointer",
              backgroundColor: item.title === "Point" ? "none" : "white",
              padding: item.title === "Point" ? "" : "10px 20px",
              borderRadius: item.title === "Point" ? "none" : "5px",
              border: item.title === "Point" ? "none" : "1px solid #ECECEC",
              boxShadow:
                item.title === "Point"
                  ? "none"
                  : "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate(item.url || "/")}
          >
            {item.title}
          </Col>
          <Col span={4} style={{ textAlign: "right", fontWeight: "bold" }}>
            {item.value}
          </Col>
        </Row>
      ))}
      <Button onClick={() => handleLogOut()}>LogOut</Button>
    </div>
  );
};

export default Menu;
