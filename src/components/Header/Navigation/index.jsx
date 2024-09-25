import React from "react";
import style from "./Navigation.module.scss";

const navItems = [
  "Hot",
  "Services",
  "Stylist",
  "Male",
  "Female",
];

const index = () => {
  return (
    <div>
      <div className={style.container}>
        {navItems.map((item, index) => (
          <button key={index} className={style.button}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default index;
