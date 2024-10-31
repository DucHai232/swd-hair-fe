import { useState, useEffect } from "react";
import { Table, Tag, DatePicker, Button, message, Space } from "antd";
import moment from "moment";
import styles from "./AppointmentPerDayManage.module.scss";
import {
  getAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../../services/appointment.service";

const AppointmentPerDayManage = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [noData, setNoData] = useState(false); // State to track if there is no data

  // Fetch appointments for the selected date from the API
  const fetchAppointments = async (date) => {
    try {
      const response = await getAppointments(); // Assuming this gets all appointments
      const appointments = response.data;

      // Log the fetched appointments
      console.log("Fetched Appointments:", appointments);

      // Filter appointments for the selected date
      const formattedAppointments = appointments
        .filter((appointment) => {
          const appointmentDate = moment(appointment.appointmentDate);
          console.log(
            "Checking appointment date:",
            appointmentDate.format("YYYY-MM-DD"),
            "against selected date:",
            date.format("YYYY-MM-DD")
          );
          return appointmentDate.isSame(date, "day");
        })
        .map((appointment) => ({
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

      // Check if there are no appointments for the selected date
      setNoData(formattedAppointments.length === 0);
    } catch (error) {
      message.error("Failed to fetch appointments: " + error.message);
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedDate); // Fetch appointments for the initially selected date
  }, [selectedDate]);

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

  // Handle status updates
  const handleStatusUpdate = async (appointmentId, action) => {
    try {
      if (action === "approve") {
        await approveAppointment(appointmentId);
        message.success("Appointment approved successfully!");
      } else if (action === "reject") {
        await rejectAppointment(appointmentId);
        message.success("Appointment rejected successfully!");
      } else if (action === "complete") {
        await completeAppointment(appointmentId);
        message.success("Appointment marked as completed successfully!");
      }
      fetchAppointments(selectedDate); // Reload appointments for the selected date
    } catch (error) {
      message.error("Failed to update appointment status: " + error.message);
      console.error("Error updating appointment status:", error);
    }
  };

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
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          {record.status === "Pending" && (
            <>
              <a onClick={() => handleStatusUpdate(record.key, "approve")}>
                Approve
              </a>
              <a onClick={() => handleStatusUpdate(record.key, "reject")}>
                Reject
              </a>
            </>
          )}
          {record.status === "Approved" && (
            <a onClick={() => handleStatusUpdate(record.key, "complete")}>
              Complete
            </a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.appointmentTable}>
      <h2>Manage Appointments for {selectedDate.format("YYYY-MM-DD")}</h2>
      <DatePicker
        value={selectedDate}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date);
            fetchAppointments(date); // Fetch appointments for the new selected date
          }
        }}
        style={{ marginBottom: 20 }}
      />
      <Button
        type="primary"
        onClick={() => fetchAppointments(selectedDate)} // Fetch appointments for the selected date
      >
        Reload
      </Button>
      {noData ? (
        <div style={{ marginTop: 20, color: "red" }}>
          No data available for this date.
        </div>
      ) : (
        <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />
      )}
    </div>
  );
};

export default AppointmentPerDayManage;
