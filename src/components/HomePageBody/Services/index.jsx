import React from "react";
import style from "./Services.module.scss";
import { Card, Row, Col } from "antd"; // Sử dụng Row và Col để sắp xếp các thẻ
const { Meta } = Card;

const cardData = [
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Asia Street vibes",
    description: "www.twitter.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "America Street culture",
    description: "www.facebook.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
];

const Services = () => {
  return (
    <Row className={style.container} gutter={[16, 16]}>
      {cardData.map((card, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            hoverable
            className={style.card}
            cover={<img alt={card.title} src={card.imgSrc} />}
          >
            <Meta title={card.title} description={card.description} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Services;
