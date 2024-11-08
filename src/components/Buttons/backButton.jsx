import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./backButton.module.scss";

const BackButton = ({
  path = "/",
  label = "Trang chủ",
  className = styles["back-button"],
  style,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      type="link"
      icon={<LeftOutlined />}
      onClick={() => navigate(path)}
      className={className}
      style={style}
    >
      {label}
    </Button>
  );
};

export default BackButton;
