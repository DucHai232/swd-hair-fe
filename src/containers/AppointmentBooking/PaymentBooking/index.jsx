import { Button, Col, Result, Row, Typography } from "antd";
import { useState } from "react";

const PaymentBooking = ({ responseAppointment, setIsPayment }) => {
  return (
    <>
      <Result
        status="success"
        title="Bạn đã đặt lịch thành công!"
        subTitle="Có rất nhiều sự lựa chọn nhưng bạn đã chọn chúng tôi. Cảm ơn bạn"
        extra={[
          <>
            <Row justify={"center"}>
              <Typography.Title level={5}>
                Mã đặt lịch: {responseAppointment.pinCode}
              </Typography.Title>
            </Row>
            <Row gutter={[12, 12]} justify={"center"}>
              <Col>
                <Button type="primary">Thanh toán</Button>
              </Col>
              <Col>
                <Button key="buy" onClick={() => setIsPayment(false)}>
                  Đặt lịch mới
                </Button>
              </Col>
            </Row>
            ,
          </>,
        ]}
      />
    </>
  );
};

export default PaymentBooking;
