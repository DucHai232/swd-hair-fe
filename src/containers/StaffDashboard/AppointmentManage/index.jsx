import { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  message,
  Button,
  Modal,
  Row,
  Col,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "./AppointmentManage.module.scss";
import { FaStar } from "react-icons/fa6";
import {
  getAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../../services/appointment.service";

const AppointmentManage = () => {
  const [data, setData] = useState([]);
  const [openViewFeedback, setOpenViewFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);
  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      const appointments = response.data;

      const formattedAppointments = appointments.map((appointment) => ({
        key: appointment._id,
        customer: appointment.customerName,
        stylist: appointment.stylistId,
        service: appointment.services[0]?.name || "N/A",
        appointmentDate: moment(appointment.appointmentDate).format(
          "YYYY-MM-DD"
        ),
        appointmentTime: appointment.appointmentTime,
        visitCount: appointment.visitCount,
        status: appointment.status,
        createdAt: moment(appointment.createdAt).format("YYYY-MM-DD"),
        totalPrice: appointment.totalPrice,
        isPayment: appointment.isPayment,
        feedbacks: appointment.feedbacks,
      }));

      setData(formattedAppointments);
    } catch (error) {
      message.error("Failed to fetch appointments: " + error.message);
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Approve appointment
  const handleApprove = async (appointmentId) => {
    try {
      await approveAppointment(appointmentId);
      message.success("Appointment approved successfully!");
      fetchAppointments(); // Reload appointments
    } catch (error) {
      message.error("Failed to approve appointment: " + error.message);
      console.error("Error approving appointment:", error);
    }
  };

  // Reject appointment
  const handleReject = async (appointmentId) => {
    try {
      await rejectAppointment(appointmentId);
      message.success("Appointment rejected successfully!");
      fetchAppointments(); // Reload appointments
    } catch (error) {
      message.error("Failed to reject appointment: " + error.message);
      console.error("Error rejecting appointment:", error);
    }
  };

  // Complete appointment
  const handleComplete = async (appointmentId) => {
    try {
      await completeAppointment(appointmentId);
      message.success("Appointment marked as completed successfully!");
      fetchAppointments(); // Reload appointments
    } catch (error) {
      message.error(
        "Failed to mark appointment as completed: " + error.message
      );
      console.error("Error completing appointment:", error);
    }
  };

  // Render status tag
  const renderStatus = (status) => (
    <Tag
      color={
        status === "Completed"
          ? "green"
          : status === "Approved"
          ? "orange"
          : status === "Pending"
          ? "blue"
          : status === "Rejected"
          ? "red"
          : "gray"
      }
    >
      {status}
    </Tag>
  );

  // Action column render
  const renderActions = (record) => (
    <Space size="middle">
      {record.status === "Pending" && (
        <>
          <a onClick={() => handleApprove(record.key)}>Approve</a>
          <a onClick={() => handleReject(record.key)}>Reject</a>
        </>
      )}
      {record.status === "Approved" && (
        <a onClick={() => handleComplete(record.key)}>Complete</a>
      )}
    </Space>
  );

  const columns = [
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Service", dataIndex: "service", key: "service" },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    { title: "Visit Count", dataIndex: "visitCount", key: "visitCount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Action", key: "action", render: renderActions },
    {
      title: "Xem đánh giá",
      key: "viewReview",
      render: (_, data) => (
        <Button
          onClick={() => {
            setOpenViewFeedback(true);
            setFeedback(data.feedbacks);
          }}
        >
          Xem đánh giá
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className={styles.appointmentTable}>
        <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />
      </div>
      <Modal
        open={openViewFeedback}
        onCancel={() => setOpenViewFeedback(false)}
        width={"50%"}
        footer={null}
      >
        <h1>Xem đánh giá</h1>
        {feedback.length === 0 && <p>Chưa có đánh giá nào</p>}
        {feedback?.map((item, index) => {
          return (
            <Row
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col span={2}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Col>
              <Col span={22}>
                <p>
                  {Array(item?.rating)
                    .fill()
                    .map((_, index) => (
                      <FaStar key={index} color="orange" />
                    ))}
                </p>
                <p>{item.comment}</p>
              </Col>
            </Row>
          );
        })}
      </Modal>
    </>
  );
};

export default AppointmentManage;
