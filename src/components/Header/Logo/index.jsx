import React from "react";
import style from "./Logo.module.scss";
import Logo from "../../../share/assets/HairSalonLogoShop.png";

const index = () => {
  return (
    <div className={style.Logo}>
      <img className={style.img} src={Logo} alt="Logo" />
    </div>
  );
};

export default index;
