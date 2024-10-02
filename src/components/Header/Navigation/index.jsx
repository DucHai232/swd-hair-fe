import React from "react";
import style from "./Navigation.module.scss";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navItems = [
    { name: "Hot", path: "/service" },
    { name: "Services", path: "/service" },
    { name: "Stylist", path: "/stylist" },
    { name: "Male", path: "/service" },
    { name: "Female", path: "/service" },
  ];
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.container}>
        {navItems.map((item, index) => (
          <button
            key={index}
            className={style.button}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default index;
