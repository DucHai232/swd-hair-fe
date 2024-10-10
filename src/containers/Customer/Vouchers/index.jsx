import React from "react";
import { Row, Col, Button } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import styles from "./Vouchers.module.scss";

const Vouchers = () => {
  const point = 150000;
  const mockVouchers = [
    {
      _id: "voucher1",
      membership: 50000,
      discount: 10000,
      expire_date: "2024-12-31",
      amount: 100,
    },
    {
      _id: "voucher2",
      membership: 100000,
      discount: 20000,
      expire_date: "2024-11-30",
      amount: 50,
    },
    {
      _id: "voucher3",
      membership: 200000,
      discount: 50000,
      expire_date: "2024-10-15",
      amount: 30,
    },
    {
      _id: "voucher4",
      membership: 300000,
      discount: 70000,
      expire_date: "2024-12-01",
      amount: 10,
    },
    {
      _id: "voucher5",
      membership: 150000,
      discount: 25000,
      expire_date: "2024-09-25",
      amount: 80,
    },
    {
      _id: "voucher6",
      membership: 250000,
      discount: 60000,
      expire_date: "2024-10-31",
      amount: 25,
    },
  ];

  return (
    <>
      <Hero point={point} />
      <VoucherList vouchers={mockVouchers} point={point} />
    </>
  );
};

export default Vouchers;

const Hero = ({ point }) => {
  return (
    <>
      <section className={styles.heroSection}>
        <Row justify="center" align="middle" className={styles.heroContent}>
          {/* Column containing content */}
          <Col xs={24} md={12} className={styles.textContent}>
            <h1 className={styles.heroTitle}>
              Exchange Your Points for Vouchers and Gifts
            </h1>
            <p className={styles.heroDescription}>
              Use your loyalty points to redeem exclusive rewards and offers.
            </p>
            <div className={styles.pointsSection}>
              <p>
                Your Points:{" "}
                {Number(point).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <Button type="primary" size="large" icon={<GiftOutlined />}>
                Redeem Now
              </Button>
            </div>
          </Col>

          {/* Column containing image */}
          <Col xs={24} md={12} className={styles.imageContent}>
            <img
              src="https://via.placeholder.com/400"
              alt="Rewards"
              className={styles.heroImage}
            />
          </Col>
        </Row>
      </section>
    </>
  );
};

const VoucherList = ({ vouchers = [], point }) => {
  return (
    <>
      <section className={styles.voucherSection}>
        <Row gutter={[16, 16]} justify="center">
          {vouchers.length > 0 ? (
            vouchers.map((voucher, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={voucher._id}>
                <div className={styles.voucherCard}>
                  <div
                    className={`${styles.cardHeader} ${
                      Number(point) < voucher.membership
                        ? styles.bgRed
                        : styles.bgGreen
                    }`}
                  >
                    <h1 className={styles.voucherIndex}>{index + 1}</h1>
                    <p className={styles.voucherCode}>
                      VR{voucher._id.substring(voucher._id.length - 5)}
                    </p>
                    <p className={styles.voucherDiscount}>
                      Discount:{" "}
                      {Number(voucher.discount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <p className={styles.cardContent}>
                    Points required:{" "}
                    {Number(voucher.membership).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div className={styles.cardFooter}>
                    <p>
                      Expires:{" "}
                      {new Date(voucher.expire_date).toLocaleDateString()}
                    </p>
                    <p>Amount: {voucher.amount}</p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>No vouchers available</p>
          )}
        </Row>
      </section>
    </>
  );
};
