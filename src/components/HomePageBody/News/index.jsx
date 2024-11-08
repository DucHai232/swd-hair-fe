import style from "./News.module.scss";
import { Col, Row } from "antd";
import news from "../../../share/assets/news.jpg";
import news_1 from "../../../share/assets/news_1.jpg";
import news_2 from "../../../share/assets/news_2.jpg";
import news_3 from "../../../share/assets/news_3.jpg";
import news_4 from "../../../share/assets/news_4.jpg";
import Card from "./Card/index";

const Trending = () => {
  const DataCard = [
    {
      img: news,
      title: "Dịch Vụ Cắt Tóc & Tạo Kiểu",
      description:
        "Chúng tôi cung cấp đa dạng các dịch vụ cắt tóc và tạo kiểu để mang đến cho bạn vẻ ngoài hoàn hảo.",
    },
    {
      img: news_1,
      title: "Uốn Tóc",
      description:
        "Đạt được kết cấu tóc mong muốn với dịch vụ uốn và duỗi của chúng tôi.",
    },
    {
      img: news_2,
      title: "Chăm Sóc Tóc",
      description:
        "Chúng tôi cung cấp các sản phẩm chăm sóc tóc chất lượng cao cho mọi loại tóc.",
    },
    {
      img: news_3,
      title: "Phục Hồi Tóc",
      description:
        "Khám phá các dụng cụ phục hồi tóc cao cấp của chúng tôi, mang lại kết quả nhanh chóng.",
    },
    {
      img: news_4,
      title: "Dịch Vụ Nhuộm Tóc",
      description:
        "Biến đổi diện mạo của bạn với dịch vụ nhuộm tóc chuyên nghiệp của chúng tôi.",
    },
  ];

  return (
    <div className={style.container}>
      <p className={style.p}>TIN TỨC TRONG NGÀY</p>
      <Row className={style.newsBox}>
        <Col span={12} className={style.mainNews}>
          <Card DataCard={DataCard[0]} />
        </Col>
        <Col span={12} className={style.subNewsBox}>
          {DataCard.slice(1).map((data, index) => (
            <div key={index} className={style.subNews}>
              <Card DataCard={data} />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Trending;
