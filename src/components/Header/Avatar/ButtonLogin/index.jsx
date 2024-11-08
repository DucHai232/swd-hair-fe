import style from "./ButtonLogin.module.scss";

const ButtonLogin = ({ onClick }) => (
  <button onClick={onClick} className={style.button}>
    <span className={style.span1}>Đăng Nhập</span>
    <span className={style.span2}>Welcome to Harmony!</span>
  </button>
);

export default ButtonLogin;
