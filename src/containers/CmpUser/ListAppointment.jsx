import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Spin,
  Table,
  Tag,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "./CmpUser.scss";
import { useNavigate } from "react-router-dom";
import {
  createFeedback,
  getAppointmentByUser,
  rejectAppointment,
} from "../../services/appointment.service";
import { convertToDateString } from "../../utils/util";
import { paymentService } from "../../services/payment.service";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa6";
const ListAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState({
    rating: 0,
    comment: "",
  });
  const [feedbackData, setFeedbackData] = useState(null);
  const navigate = useNavigate();
  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await getAppointmentByUser();

      const convertData = response.map((item) => {
        let moneyVoucher = 0;
        if (item.voucherId) {
          if (item.voucherId.discountType === "percent") {
            moneyVoucher = Math.min(
              (item.totalPrice * item.voucherId.discountPercent) / 100,
              item.voucherId.maxPriceDiscount
            );
          } else if (item.voucherId.discountType === "money") {
            moneyVoucher = item.voucherId.discountMoney;
          }
        }
        return {
          appointmentTime: item.appointmentTime,
          appointmentDate: convertToDateString(item.appointmentDate),
          customerPhone: item.customerPhone,
          pinCode: item.pinCode,
          totalPrice: item.totalPrice,
          stylistName: item.stylistId.name,
          stylistId: item.stylistId._id,
          customerName: item.customerName,
          nameBook: item.customerId.name,
          status: item.status,
          isPayment: item.isPayment,
          appointmentId: item._id,
          moneyVoucher,
        };
      });
      setAppointments(convertData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadAppointments();
  }, []);

  const onSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filteredAppointments = appointments.filter(
      (item) =>
        item.pinCode?.toLowerCase().includes(searchValue) ||
        item.customerName?.toLowerCase().includes(searchValue) ||
        item.nameBook?.toLowerCase().includes(searchValue) ||
        item.customerPhone?.toLowerCase().includes(searchValue)
    );
    if (value === "") {
      loadAppointments();
    } else {
      setAppointments(filteredAppointments);
    }
  };
  const handlePaymentOrder = async (booking) => {
    try {
      const newPayment = {
        amount: booking.totalPrice - booking.moneyVoucher,
        appointmentId: booking.appointmentId,
      };
      const response = await paymentService.createPayment(newPayment);
      const paymentUrl = response?.result?.order_url;
      window.location.href = paymentUrl;
    } catch (error) {
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };
  const handleRejectOrder = (booking) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn muốn hủy lịch hẹn này?",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        const appointmentDateTimeStr = `${booking.appointmentDate} ${booking.appointmentTime}`;
        const appointmentDateTime = dayjs(
          appointmentDateTimeStr,
          "YYYY-MM-DD HH:mm"
        );
        const currentTime = dayjs();
        if (appointmentDateTime.diff(currentTime, "hour") < 1) {
          message.error("Hủy lịch hẹn trước 1 giờ.");
          return;
        }
        try {
          await rejectAppointment(booking.appointmentId);
          await loadAppointments();
          message.success("Hủy lịch hẹn thành công");
        } catch (error) {
          message.error(
            error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
          );
        }
      },
      onCancel: () => {
        console.log("Người dùng đã hủy bỏ việc áp dụng voucher");
      },
    });
  };
  const handleFeedback = async () => {
    console.log(feedbackData);
    const payload = {
      stylistId: feedbackData.stylistId,
      appointmentId: feedbackData.appointmentId,
      rating: formFeedback.rating,
      comment: formFeedback.comment,
    };
    try {
      await createFeedback(payload);
      setFeedbackModal(false);
      message.success("Cảm ơn bạn đã lựa chọn chúng tôi");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };
  const columns = [
    {
      title: "Mã lịch hẹn",
      dataIndex: "pinCode",
      key: "pinCode",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      title: "Người đặt lịch hẹn",
      dataIndex: "nameBook",
      key: "nameBook",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày thực hiện",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (_, data) => (
        <span>
          {data.appointmentDate} {data.appointmentTime}
        </span>
      ),
    },
    {
      title: "Nhân viên thực hiện",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "Tiền dịch vụ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => (
        <p style={{ color: "green", fontWeight: "bold" }}>
          {text.toLocaleString()}đ
        </p>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "moneyVoucher",
      key: "moneyVoucher",
      render: (text) => (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {text.toLocaleString()}đ
        </p>
      ),
    },
    {
      title: "Trạng thái lịch hẹn",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          {" "}
          <Tag
            color={
              status === "Pending"
                ? "orange"
                : status === "Approved"
                ? "green"
                : status === "Rejected"
                ? "red"
                : "blue"
            }
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Thanh toán",
      key: "isPayment",
      dataIndex: "isPayment",
      render: (_, data) => (
        <>
          {data.isPayment ? (
            <Tag color="green">Đã thanh toán</Tag>
          ) : (
            data.status !== "Rejected" && (
              <Button onClick={() => handlePaymentOrder(data)}>
                Thanh toán
              </Button>
            )
          )}
        </>
      ),
    },
    {
      title: "Hủy lịch hẹn",
      key: "book",
      dataIndex: "book",
      render: (_, data) => (
        <>
          {data.status !== "Approved" &&
            data.status !== "Rejected" &&
            data.status !== "Completed" && (
              <Button
                variant="filled"
                danger
                onClick={() => handleRejectOrder(data)}
              >
                Hủy lịch
              </Button>
            )}
        </>
      ),
    },
    {
      title: "Đánh giá dịch vụ",
      key: "feedback",
      dataIndex: "feedback",
      render: (_, data) => (
        <>
          {data.status === "Completed" && (
            <Button
              variant="filled"
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              onClick={() => {
                setFeedbackModal(true);
                setFeedbackData(data);
              }}
            >
              Đánh giá
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <Content className="content-layout">
      <Row
        gutter={[12, 12]}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <Col>
          <LeftOutlined style={{ fontSize: "24px" }} />
        </Col>
        <Col>
          <span style={{ fontSize: "30px" }}>Danh sách lịch hẹn của bạn</span>
        </Col>
      </Row>
      <Row>
        <Input.Search
          placeholder="Tìm kiếm theo tên, mã lịch hẹn,..."
          onSearch={onSearch}
          style={{
            width: 400,
            marginBottom: "12px",
          }}
        />
      </Row>
      <Spin spinning={isLoading}>
        <Row style={{ width: "100%" }}>
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={appointments}
          />
        </Row>
      </Spin>
      <Modal
        title="Đánh giá dịch vụ"
        visible={feedbackModal}
        onCancel={() => setFeedbackModal(false)}
        footer={null}
      >
        <p>Chào bạn, vui lòng đánh giá dịch vụ của bạn tại đây:</p>
        <Input.TextArea
          placeholder="Bạn mô tả chất lượng dịch vụ của bạn"
          rows={4}
          onChange={(e) =>
            setFormFeedback((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
        <p>Đánh giá chất lượng dịch vụ:</p>
        <Row>
          {[1, 2, 3, 4, 5].map((item) => (
            <Col key={item}>
              <Button
                onClick={() =>
                  setFormFeedback((prev) => ({ ...prev, rating: item }))
                }
              >
                <FaStar
                  color={item <= formFeedback.rating ? "orange" : "black"}
                />
              </Button>
            </Col>
          ))}
        </Row>
        <Button
          type="primary"
          style={{ marginTop: "12px" }}
          onClick={() => handleFeedback()}
        >
          Gửi
        </Button>
      </Modal>
    </Content>
  );
};

export default ListAppointment;
