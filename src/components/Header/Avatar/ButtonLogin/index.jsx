import React from "react";
import style from "./ButtonLogin.module.scss";

const ButtonLogin = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className={style.button}>
        Login Now!
      </button>
    </>
  );
};

export default ButtonLogin;
