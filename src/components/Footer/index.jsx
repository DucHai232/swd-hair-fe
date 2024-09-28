import { Row, Col } from "antd";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import styles from "./Footer.module.scss";

export const footerLinks = [
  {
    title: "About Us",
    links: [
      { name: "Skin Care", url: "/" },
      { name: "Makeup", url: "/" },
      { name: "New Product", url: "/" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Home", url: "/" },
      { name: "Gift Vouchers", url: "/" },
      { name: "Shopping", url: "/" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Team", url: "/" },
      { name: "Delivery & Returns", url: "/" },
      { name: "FAQ", url: "/" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "Telephone: +123456789" },
      { name: "Email: contact@hairharmony.com" },
    ],
  },
];

const Footer = () => {
  const FooterColumn = ({ title, links, isContact }) => (
    <div className={isContact ? styles.contactColumn : styles.footerColumn}>
      <h3 className={styles.footerTitle}>{title}</h3>
      <ul className={styles.footerLinks}>
        {links.map((link, index) => (
          <li key={index} className={styles.footerLinkItem}>
            <span className={styles.footerLink}>{link.name}</span>
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
        </div>
      )}
    </div>
  );

  return (
    <footer className={styles.footerContainer}>
      <Row justify="space-around" className={styles.footerContent}>
        <Col span={12}>
          <Row justify="space-between">
            {footerLinks.map((column, index) => (
              <Col key={index} className={styles.footerColumnWrapper}>
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

      <div className={styles.footerTitle}>
        <p className={styles.footerCopyright}>
          © 2024 HairHarmony | All rights reserved | SOS Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
