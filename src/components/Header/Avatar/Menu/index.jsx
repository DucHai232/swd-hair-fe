import React from "react";
import style from "./Menu.module.scss";
import { Avatar } from "antd";
import BoyHair from "../../../../share/assets/BoyHair.jpg";

const Menu = () => {
  return (
    <div className={style.container}>
      <div className={style.nameBox}>
        <Avatar
          size={50}
          src={BoyHair}
          className={style.avatar}
          shape="square"
        />
        <p className={style.name}>Trần Khai Minh Pháp</p>
      </div>
      <p>Số dư tài khoản</p>
      <p>Point</p>
      <p>Profile</p>
      <p>Apointment History</p>
      <p>LogOut</p>
    </div>
  );
};

export default Menu;
