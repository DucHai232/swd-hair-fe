import React, { useState, useRef, useEffect } from "react";
import style from "./Avatar.module.scss";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null); // Tham chiếu đến component Menu

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Hàm xử lý đóng menu khi nhấp ra ngoài
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(false); // Đóng menu nếu nhấp ra ngoài
    }
  };

  useEffect(() => {
    // Thêm event listener khi menu mở
    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener khi component unmount hoặc menu đóng
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  return (
    <div className={style.Container}>
      <button onClick={() => navigate("/vouchers")} className={style.Button}>
        Redeem
      </button>
      <div className={style.AvatarUsername}>
        <Avatar
          size={30}
          className={style.Avatar}
          shape="square"
          onClick={toggleMenu}
        >
          U
        </Avatar>
        {isMenuVisible && (
          <div className={style.MenuBox} ref={menuRef}>
            <Menu/>
          </div>
        )}
        <p className={style.Point}>| 0 Point</p>
      </div>
    </div>
  );
};

export default Index;
