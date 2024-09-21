import React from "react";
import style from "./Avatar.module.scss";
import { Avatar } from "antd";

const index = () => {
  return (
    <div className={style.Container}>
      <button className={style.Button}>Redeem</button>
      <div className={style.AvatarUsername}>
        <Avatar size={30} className={style.Avatar} shape="square">
          U
        </Avatar>
        <p className={style.Point}>| 0 Point</p>
      </div>
    </div>
  );
};

export default index;
