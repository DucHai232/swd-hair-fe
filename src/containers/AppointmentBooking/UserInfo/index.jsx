import { Col, Input, Row, Typography } from "antd";
import styles from "./UserInfo.module.scss";

const UserInfo = ({ formBooking, setFormBooking }) => {
  const handleChangeUser = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <Typography.Title level={4}>
        STEP 1: Enter Your Information
      </Typography.Title>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Typography.Text strong>
            Name <span style={{ color: "red" }}>*</span>:{" "}
          </Typography.Text>
          <Input
            className={styles.formitem}
            required
            name="customerName"
            value={formBooking.customerName}
            onChange={(e) => handleChangeUser(e)}
            placeholder="Enter your name"
          />
        </Col>
        <Col span={12}>
          <Typography.Text strong>
            Phone Number <span style={{ color: "red" }}>*</span>:{" "}
          </Typography.Text>
          <Input
            className={styles.formitem}
            name="customerPhone"
            value={formBooking.customerPhone}
            required
            type="number"
            inputmode="numeric"
            onChange={(e) => handleChangeUser(e)}
            placeholder="Enter your phone number"
          />
        </Col>
      </Row>
    </>
  );
};

export default UserInfo;
