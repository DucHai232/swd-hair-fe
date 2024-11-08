import { useState, useRef, useEffect } from "react";
import style from "./Avatar.module.scss";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { UserOutlined } from "@ant-design/icons";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuVisible((prevState) => !prevState); // Dùng callback để tránh việc sử dụng trạng thái cũ
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    // Thêm sự kiện chỉ khi menu được mở
    if (isMenuVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup khi component unmount hoặc menu đóng
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuVisible]);

  return (
    <div className={style.Container}>
      <button onClick={() => navigate("/vouchers")} className={style.Button}>
        Đổi điểm
      </button>
      <div className={style.AvatarUsername}>
        <Avatar
          size={30}
          className={style.Avatar}
          shape="circle"
          onClick={toggleMenu}
          icon={<UserOutlined />}
        />
        {isMenuVisible && (
          <div className={style.MenuBox} ref={menuRef}>
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
