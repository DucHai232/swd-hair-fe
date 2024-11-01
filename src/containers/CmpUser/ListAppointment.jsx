import { Button, Col, Input, message, Row, Spin, Table, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "./CmpUser.scss";
import { useNavigate } from "react-router-dom";
import { getAppointmentByUser } from "../../services/appointment.service";
import { convertToDateString } from "../../utils/util";
import { paymentService } from "../../services/payment.service";
const ListAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      key: "customerPhone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian đặt",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Ngày thực hiện",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
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
            <Button onClick={() => handlePaymentOrder(data)}>Thanh toán</Button>
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
    </Content>
  );
};

export default ListAppointment;
