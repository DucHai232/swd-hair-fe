import { useState, useEffect } from "react";
import { Table, Tag, Space, message } from "antd";
import moment from "moment";
import styles from "./AppointmentManage.module.scss";
import {
  getAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../../services/appointment.service";

const AppointmentManage = () => {
  const [data, setData] = useState([]);

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
    { title: "Stylist ID", dataIndex: "stylist", key: "stylist" },
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
  ];

  return (
    <div className={styles.appointmentTable}>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />
    </div>
  );
};

export default AppointmentManage;
