import React from "react";
import style from "./ButtonLogin.module.scss";

const ButtonLogin = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className={style.button}>
        <span className={style.span1}>Login Now!</span>
        <span className={style.span2}>Welcome to Harmony</span>
      </button>
    </>
  );
};

export default ButtonLogin;
