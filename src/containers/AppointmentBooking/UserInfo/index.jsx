import { Col, Input, Row, Typography } from "antd";
import styles from "./UserInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerName } from "../../../feature/appointment";
import { setCustomerPhone } from "../../../feature/appointment";

const UserInfo = ({ formBooking, setFormBooking }) => {
  // const dispatch = useDispatch();
  // const customerName = useSelector((state) => state.appointment.customerName);
  // const customerPhone = useSelector((state) => state.appointment.customerPhone);
  // const submitName = (e) => {
  //   // console.log(e);
  //   dispatch(setCustomerName(e.target.value));
  // };
  // const submitPhone = (e) => {
  //   dispatch(setCustomerPhone(e.target.value));
  // };
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
