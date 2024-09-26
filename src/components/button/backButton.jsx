import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

const BackButton = ({
  path,
  label = "Home",
  className = "back-button",
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
