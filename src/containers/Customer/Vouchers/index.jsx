import { Row, Col, Button } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import styles from "./Vouchers.module.scss";

const Vouchers = () => {
  const point = 147;
  const mockVouchers = [
    {
      _id: "voucher1",
      membership: 50,
      discount: 10000,
      expire_date: "2024-12-31",
      amount: 100,
    },
    {
      _id: "voucher2",
      membership: 100,
      discount: 20000,
      expire_date: "2024-11-30",
      amount: 50,
    },
    {
      _id: "voucher3",
      membership: 200,
      discount: 50000,
      expire_date: "2024-10-15",
      amount: 30,
    },
    {
      _id: "voucher4",
      membership: 300,
      discount: 70000,
      expire_date: "2024-12-01",
      amount: 10,
    },
    {
      _id: "voucher5",
      membership: 150,
      discount: 25000,
      expire_date: "2024-09-25",
      amount: 80,
    },
    {
      _id: "voucher6",
      membership: 250,
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
              Đổi điểm của bạn để nhận Voucher và Mã giảm giá{" "}
            </h1>
            <p className={styles.heroDescription}>
              Sử dụng điểm thưởng của bạn để đổi phần thưởng và ưu đãi độc
              quyền.{" "}
            </p>
            <div className={styles.pointsSection}>
              <p>Điểm thưởng của bạn: {Number(point)}</p>
              <Button type="primary" size="large" icon={<GiftOutlined />}>
                Đổi thưởng ngay!
              </Button>
            </div>
          </Col>

          {/* Column containing image */}
          <Col xs={24} md={12} className={styles.imageContent}>
            <img
              src="https://i.pinimg.com/564x/b3/cd/af/b3cdaf14fb0ee121e252e94fd8b4120d.jpg"
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
                      Giảm giá:{" "}
                      {Number(voucher.discount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <p className={styles.cardContent}>
                    Điểm cần để đổi: {Number(voucher.membership)}
                  </p>
                  <div className={styles.cardFooter}>
                    <p>
                      Ngày hết hạn:{" "}
                      {new Date(voucher.expire_date).toLocaleDateString()}
                    </p>
                    <p>Số lượng: {voucher.amount}</p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p>Không có phiếu giảm giá nào có sẵn</p>
          )}
        </Row>
      </section>
    </>
  );
};
