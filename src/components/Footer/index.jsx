import { Row, Col, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styles from "./Footer.module.scss";

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Shopping", url: "/shopping" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        name: (
          <>
            Service hours: <br /> 8:30 am - 8:30 pm
          </>
        ),
        isText: true,
      },
      { name: "Hair Coloring", url: "/services/coloring" },
      { name: "Styling", url: "/services/styling" },
      { name: "Pricing", url: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", url: "/terms" },
      { name: "Privacy Policy", url: "/privacy-policy" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "Telephone: (+84)766710603", isText: true },
      { name: "Email: contact@hairharmony.com", isText: true },
    ],
  },
];

const BookingBox = () => (
  <div className={styles.bookingBox}>
    <h3 className={styles.bookingTitle}>
      Book an Appointment in just 30 seconds
    </h3>
    <p>Pay after cutting, no problem canceling</p>
    <Button type="primary" className={styles.bookingButton}>
      Book Now
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
            <a href={link.url} className={styles.footerLink}>
              {link.name}
            </a>
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

const Footer = () => {
  return (
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
                  isContact={column.title === "Contact Us"}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <p className={styles.footerCopyright}>
        © 2024 HairHarmony | Nguyen Xien - Phuoc Thien, Long Thanh My, Thu Duc |
        All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
