import { useState, useEffect } from "react";
import style from "./IntroComponent.module.scss";
import girl_hair from "../../../share/assets/girl_hair.jpg";
import man_hair from "../../../share/assets/man_hair.jpg";
import woman_hair from "../../../share/assets/woman_hair.jpg";

import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const IntroComponent = () => {
  const introContent = [
    {
      img: man_hair,
      color: "GreenYellow",
      title: "Phong cách độc đáo",
      titleSpan: "khẳng định",
      span: "Dấu ấn cá nhân của bạn",
      description:
        "Chúng tôi mang đến cho phái mạnh những kiểu tóc đa dạng, giúp bạn khẳng định phong cách và thể hiện cá tính riêng biệt qua mỗi đường cắt và tạo hình tóc.",
    },
    {
      img: girl_hair,
      color: "#ffc300",
      title: "Tóc không chỉ là vẻ đẹp",
      titleSpan: "mà là ",
      span: "Một phong cách sống tinh tế",
      description:
        "Chúng tôi hiểu rằng làm đẹp không chỉ là việc tạo ra vẻ ngoài, mà còn là quá trình thư giãn và khám phá sự quyến rũ tự nhiên của phái nữ, mang đến sự tự tin và thanh lịch.",
    },
    {
      img: woman_hair,
      color: "#df0e0e",
      title: "Nơi hội tụ",
      titleSpan: "sự hoàn hảo",
      span: "Và sự trẻ trung",
      description:
        "Salon của chúng tôi không chỉ đơn giản là làm tóc; đó là một không gian thư giãn, nơi bạn có thể tái tạo năng lượng, đồng thời trải nghiệm sự tươi mới và phong cách sống đầy sức sống.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const { img, color, title, titleSpan, span, description } =
    introContent[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % introContent.length);
    }, 5000); // Chuyển đổi mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <>
      <div className={style.circle} style={{ backgroundColor: color }}></div>

      <Row className={style.container}>
        <Col span={12} className={style.textBox}>
          <h2 className={style.h2}>
            {title} {titleSpan}
            <br />
            <span className={style.span}>{span}</span>
          </h2>
          <p className={style.p}>{description}</p>
          <Link to="/appointment-booking">
            <button className={style.button}>
              <span className={style.span1}>ĐẶT LỊCH NGAY!</span>
              <span className={style.span2}>Bắt đầu ngay nào!</span>
            </button>
          </Link>
        </Col>
        <Col span={12} className={style.imgBox}>
          <img className={style.img} src={img} alt="Hair Style" />
        </Col>
      </Row>
    </>
  );
};

export default IntroComponent;
