import { useEffect, useState } from "react";
import { paymentService } from "../../services/payment.service";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result, Spin } from "antd";
const ResultPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const appTransId = params.get("apptransid");

    if (appTransId) {
      const checkPaymentStatus = async () => {
        try {
          setLoading(true);
          const statusResponse = await paymentService.checkOrderStatus(
            appTransId
          );

          if (statusResponse.return_code === 1) {
            setPaymentStatus("success");
          } else if (statusResponse.return_code === -1) {
            setPaymentStatus("failed");
          } else if (statusResponse.return_code === 2) {
            setPaymentStatus("expired");
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
          setPaymentStatus("failed");
        } finally {
          setLoading(false);
        }
      };

      checkPaymentStatus();
    }
  }, [location]);
  return (
    <Spin spinning={isLoading}>
      {paymentStatus === "success" ? (
        <Result
          status="success"
          title="Thanh toán thành công"
          subTitle="Cảm ơn bạn đã đặt dịch vụ của chúng tôi. Lịch hẹn của bạn đang được xử lý."
          extra={[
            <Button type="primary" key="console" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>,
            <Button key="buy" onClick={() => navigate("/schedule-appointment")}>
              Xem lịch hẹn
            </Button>,
          ]}
        />
      ) : paymentStatus === "failed" ? (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle="Đã xảy ra sự cố khi xử lý thanh toán của bạn. Vui lòng thử lại."
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => navigate("/list-payment")}
            >
              Thanh toán lại
            </Button>,
          ]}
        />
      ) : paymentStatus === "expired" ? (
        <Result
          status="warning"
          title="Thanh toán đã hết hạn"
          subTitle="Phiên thanh toán của bạn đã hết hạn. Vui lòng thử lại."
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => navigate("/list-payment")}
            >
              Thanh toán lại
            </Button>,
          ]}
        />
      ) : null}
    </Spin>
  );
};

export default ResultPayment;
