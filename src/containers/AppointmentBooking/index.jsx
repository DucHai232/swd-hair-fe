import { Button, Timeline, Form, message, Modal } from "antd";
import styles from "./AppointmentBooking.module.scss"; // Import SCSS module
import ServiceChoosing from "./ServiceChoosing";
import StylistChoosing from "./StylistChoosing";
import DateTimeChoosing from "./DateTimeChoosing";
import UserInfo from "./UserInfo";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  ScissorOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createBookingAppointment } from "../../services/appointment.service";
import { useState } from "react";
import PaymentBooking from "./PaymentBooking";

const AppointmentBooking = () => {
  const [form] = Form.useForm();
  const [formBooking, setFormBooking] = useState({
    customerName: "",
    customerPhone: "",
    selectedServices: [],
    selectedStylist: {},
    selectedDay: "",
    selectedSlot: "",
  });
  const [isPayment, setIsPayment] = useState(false);
  const [responseAppointment, setResponseAppoinment] = useState({});
  const handleBooking = async () => {
    const {
      customerName,
      customerPhone,
      selectedServices,
      selectedStylist,
      selectedDay,
      selectedSlot,
    } = formBooking;
    if (!customerName || !customerPhone) {
      message.warning("Vui lòng điền thông tin của bạn");
      return;
    }
    if (selectedServices.length === 0) {
      message.warning("Vui lòng chọn dịch vụ bạn muốn");
      return;
    }
    if (!selectedStylist) {
      message.warning("Vui lòng chọn thợ cắt tóc bạn muốn");
      return;
    }

    if (!selectedDay || !selectedSlot) {
      message.warning("Vui lòng chọn ngày giờ bạn muốn");
      return;
    }

    const payload = {
      customerName: customerName,
      customerPhone: customerPhone,
      stylistId: selectedStylist._id,
      services: selectedServices?.map((service) => ({
        name: service.name,
        price: service.price,
      })),
      appointmentDate: selectedDay,
      appointmentTime: selectedSlot,
    };
    Modal.confirm({
      title: "Xác nhận đặt lịch",
      content: (
        <div>
          <p>
            <strong>Tên khách hàng:</strong> {customerName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> +84{customerPhone}
          </p>
          <p>
            <strong>Dịch vụ đã chọn:</strong>{" "}
            {selectedServices.map((service) => service.name).join(", ")}
          </p>
          <p>
            <strong>Thợ cắt tóc:</strong> {selectedStylist.name}
          </p>
          <p>
            <strong>Ngày hẹn:</strong> {selectedDay}
          </p>
          <p>
            <strong>Thời gian hẹn:</strong> {selectedSlot}
          </p>
        </div>
      ),
      onOk: async () => {
        try {
          const response = await createBookingAppointment(payload);
          message.success("Đặt lịch thành công");
          setFormBooking({
            customerName: "",
            customerPhone: "",
            selectedServices: [],
            selectedStylist: {},
            selectedDay: "",
            selectedSlot: "",
          });
          setResponseAppoinment(response?.data?.data);
          setIsPayment(true);
        } catch (error) {
          setIsPayment(false);
          message.error(error.response.data.message || "Đặt lịch thất bại");
        }
      },
      onCancel() {
        setIsPayment(false);
      },
    });
  };
  return (
    <>
      <div className={styles.container}>
        {isPayment ? (
          <PaymentBooking
            responseAppointment={responseAppointment}
            setIsPayment={setIsPayment}
          />
        ) : (
          <>
            <h2 className={styles.heading}>Book an Appointment</h2>
            <Form
              form={form}
              onFinish={handleBooking}
              layout="inline"
              className={styles.form}
            >
              <Timeline
                className={styles.timeline}
                items={[
                  {
                    color:
                      formBooking.customerName == "" ||
                      formBooking.customerPhone == ""
                        ? "red"
                        : "green",
                    dot:
                      formBooking.customerName == "" ||
                      formBooking.customerPhone == "" ? (
                        <ExclamationCircleOutlined
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <CheckCircleOutlined style={{ fontSize: "16px" }} />
                      ),
                    children: (
                      <UserInfo
                        formBooking={formBooking}
                        setFormBooking={setFormBooking}
                      />
                    ),
                  },
                  {
                    color:
                      formBooking.selectedServices.length === 0
                        ? "red"
                        : "green",
                    dot:
                      formBooking.selectedServices.length === 0 ? (
                        <ExclamationCircleOutlined
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <ScissorOutlined style={{ fontSize: "16px" }} />
                      ),
                    children: (
                      <ServiceChoosing
                        formBooking={formBooking}
                        setFormBooking={setFormBooking}
                      />
                    ),
                  },
                  {
                    color:
                      Object.keys(formBooking.selectedStylist).length === 0
                        ? "red"
                        : "green",
                    dot:
                      Object.keys(formBooking.selectedStylist).length === 0 ? (
                        <ExclamationCircleOutlined
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <UserOutlined style={{ fontSize: "16px" }} />
                      ),
                    children: (
                      <StylistChoosing
                        formBooking={formBooking}
                        setFormBooking={setFormBooking}
                      />
                    ),
                  },
                  {
                    color: formBooking.selectedSlot === "" ? "red" : "green",
                    dot:
                      formBooking.selectedSlot === "" ? (
                        <ExclamationCircleOutlined
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <ClockCircleOutlined style={{ fontSize: "16px" }} />
                      ),
                    children:
                      Object.keys(formBooking.selectedStylist).length === 0 ? (
                        <></>
                      ) : (
                        <DateTimeChoosing
                          formBooking={formBooking}
                          setFormBooking={setFormBooking}
                        />
                      ),
                  },
                  {
                    dot: <CalendarOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <Button type="primary" onClick={() => handleBooking()}>
                        Book Appointment
                      </Button>
                    ),
                  },
                ]}
              />
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default AppointmentBooking;
