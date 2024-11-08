import style from "./Navigation.module.scss";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { name: "Dịch vụ", path: "/service" },
    { name: "Thợ cắt", path: "/stylist" },
    { name: "Đặt lịch", path: "/appointment-booking" },
  ];

  const navigate = useNavigate();

  return (
    <div className={style.container}>
      {navItems.map(({ name, path }, index) => (
        <button
          key={index}
          className={style.button}
          onClick={() => navigate(path)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
