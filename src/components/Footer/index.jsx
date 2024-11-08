import { Row, Col, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const footerLinks = [
  {
    title: "Liên kết nhanh",
    links: [
      { name: "Về chúng tôi", url: "/about" },
      { name: "Mua sắm", url: "/shopping" },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { name: "Giờ phục vụ:", isText: true },
      { name: "8:00 sáng - 9:00 tối", isText: true },
      { name: "Nhuộm tóc", url: "/services/coloring" },
      { name: "Tạo kiểu", url: "/services/styling" },
      { name: "Bảng giá", url: "/pricing" },
    ],
  },
  {
    title: "Quy định",
    links: [
      { name: "Điều khoản dịch vụ", url: "/terms" },
      { name: "Chính sách bảo mật", url: "/privacy-policy" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { name: "Điện thoại:", isText: true },
      { name: "(+84) 766 710 603", isText: true },
      { name: "Email:", isText: true },
      { name: "contact@hairharmony.com", isText: true },
    ],
  },
];

const BookingBox = () => (
  <div className={styles.bookingBox}>
    <h3 className={styles.bookingTitle}>
      Đặt lịch nhanh chóng trong 30 giây!!
    </h3>
    <p>Thanh toán sau khi cắt và dễ dàng hủy lịch khi cần.</p>
    <Button type="primary" className={styles.bookingButton}>
      ĐẶT NGAY
    </Button>
  </div>
);

const FooterColumn = ({ title, links, isContact }) => (
  <div className={styles.footerColumn}>
    <h3 className={styles.footerTitle}>{title}</h3>
    <ul className={styles.footerLinks}>
      {links.map((link, index) => (
        <li key={index} className={styles.footerLinkItem}>
          {link.isText ? (
            <span className={styles.footerText}>{link.name}</span>
          ) : (
            <Link to={link.url} className={styles.footerLink}>
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
    {isContact && (
      <div className={styles.socialIcons}>
        <span className={styles.icon}>
          <FacebookOutlined />
        </span>
        <span className={styles.icon}>
          <InstagramOutlined />
        </span>
        <span className={styles.icon}>
          <YoutubeOutlined />
        </span>
      </div>
    )}
  </div>
);

const Footer = () => (
  <footer className={styles.footerContainer}>
    <Row justify="space-around" className={styles.footerContent}>
      <Col xs={24} sm={24} md={8}>
        <BookingBox />
      </Col>
      <Col xs={24} sm={24} md={16}>
        <Row justify="space-between">
          {footerLinks.map((column, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <FooterColumn
                title={column.title}
                links={column.links}
                isContact={column.title === "Liên hệ"}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <p className={styles.footerCopyright}>
      © 2024 HairHarmony | Nguyễn Xiển - Phước Thiện, Long Thạnh Mỹ, Thủ Đức |
      All rights reserved
    </p>
  </footer>
);

export default Footer;
