import React, { useState, useRef, useEffect } from "react";
import style from "./Avatar.module.scss";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null); // Tham chiếu đến component Menu

  const toggleMenu = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan tỏa ra ngoài
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
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup event listener khi component unmount hoặc menu đóng
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
          onClick={toggleMenu} // Bấm vào avatar sẽ bật/tắt menu
        >
          U
        </Avatar>
        {isMenuVisible && (
          <div className={style.MenuBox} ref={menuRef} onClick={(e) => e.stopPropagation()}>
            {/* Menu sẽ không bị đóng khi nhấp vào bên trong */}
            <Menu/>
            {/* Thêm các thẻ p hoặc phần tử khác bên trong menu */}
          </div>
        )}
        <p className={style.Point}>| 0 Point</p>
      </div>
    </div>
  );
};

export default Index;
