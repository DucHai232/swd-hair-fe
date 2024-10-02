import React from "react";
import style from "./Logo.module.scss";
import Logo from "../../../share/assets/HairSalonLogoShop.png";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  return (
    <div className={style.Logo} onClick={() => navigate("/")}>
      <img className={style.img} src={Logo} alt="Logo" />
    </div>
  );
};

export default index;
