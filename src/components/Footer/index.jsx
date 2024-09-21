import { Col, Row } from "antd";
import React from "react";
import styles from "./Footer.module.scss";

const index = () => {
  return (
    <>
      <div span={24} className={styles.bg}>
        <Row>About us</Row>
        <Row>Contact</Row>
        <Row>Phone</Row>
        <Row>Email</Row>
      </div>
      <div className={styles.FooterTitle}>
        © 2015 Công Ty Cổ Phần FEHairHarmony
      </div>
    </>
  );
};

export default index;
