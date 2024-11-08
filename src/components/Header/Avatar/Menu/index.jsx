import style from "./Menu.module.scss";
import { Avatar, Button, Col, Row } from "antd";
import no_avatar from "../../../../share/assets/no_avatar.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../../../feature/authentication";
import { useMemo } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sử dụng useMemo để tránh việc lặp lại khi render
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const handleLogOut = () => {
    navigate("/login");
    dispatch(signout());
  };

  const dataProfile = [
    { title: "Điểm thưởng", value: user?.loyaltyPoints || 0 },
    { title: "Thông tin cá nhân", value: "", url: "/info-profile" },
    { title: "Lịch hẹn của bạn", value: "", url: "/list-appointment" },
  ];

  const renderProfileItem = (item) => {
    const isPoint = item.title === "Điểm thành viên";
    return (
      <Row style={{ margin: "10px 0px" }} key={item.title}>
        <Col
          span={20}
          className={`${style.profileItem} ${
            isPoint ? style.pointItem : style.linkItem
          }`}
          onClick={() => !isPoint && navigate(item.url || "/")}
        >
          {item.title}
        </Col>
        <Col span={4} style={{ textAlign: "right", fontWeight: "bold" }}>
          {item.value}
        </Col>
      </Row>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.nameBox}>
        <Avatar
          size={50}
          src={user?.avatar || no_avatar}
          className={style.avatar}
          shape="square"
        />
        <p className={style.name}>{user?.name}</p>
      </div>
      {dataProfile.map(renderProfileItem)}
      <Button onClick={handleLogOut}>Đăng xuất</Button>
    </div>
  );
};

export default Menu;
