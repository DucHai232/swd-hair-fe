import { useState, useEffect } from "react";
import { Table, Tag, DatePicker, message, Space } from "antd";
import moment from "moment";
import styles from "./AppointmentPerDayManage.module.scss";
import {
  getAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../../services/appointment.service";
import { getAllStylists } from "../../../services/stylist.service"; // Correct import

const AppointmentPerDayManage = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [noData, setNoData] = useState(false);
  const [stylists, setStylists] = useState([]); // State để lưu danh sách stylist

  // Fetch appointments for the selected date from the API
  const fetchAppointments = async (date) => {
    try {
      const response = await getAppointments(); // Giả sử đây lấy tất cả các cuộc hẹn
      const appointments = response.data;

      // Log the fetched appointments
      console.log("Fetched Appointments:", appointments);

      // Filter appointments for the selected date
      const formattedAppointments = appointments
        .filter((appointment) => {
          const appointmentDate = moment(appointment.appointmentDate);
          return appointmentDate.isSame(date, "day");
        })
        .map((appointment) => ({
          key: appointment._id,
          customer: appointment.customerName,
          stylistId: appointment.stylistId,
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

      // Sort the appointments by appointmentTime (ascending order)
      const sortedAppointments = formattedAppointments.sort((a, b) => {
        const timeA = moment(a.appointmentTime, "HH:mm");
        const timeB = moment(b.appointmentTime, "HH:mm");
        return timeA.isBefore(timeB) ? -1 : timeA.isAfter(timeB) ? 1 : 0;
      });

      setData(sortedAppointments); // Set sorted data

      // Check if there are no appointments for the selected date
      setNoData(sortedAppointments.length === 0);
    } catch (error) {
      message.error("Failed to fetch appointments: " + error.message);
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch stylists data
  const fetchStylists = async () => {
    try {
      const response = await getAllStylists(); // Lấy danh sách stylist từ API
      setStylists(response.data); // Cập nhật danh sách stylist vào state
    } catch (error) {
      message.error("Failed to fetch stylists: " + error.message);
      console.error("Error fetching stylists:", error);
    }
  };

  // Fetch appointments and stylists on initial render
  useEffect(() => {
    fetchAppointments(selectedDate); // Fetch appointments for the selected date
    fetchStylists(); // Fetch all stylists
  }, [selectedDate]);

  // Hàm lấy tên của stylist từ ID
  const getStylistName = (stylistId) => {
    const stylist = stylists.find((stylist) => stylist.stylistId === stylistId);
    return stylist ? stylist.name : "Unknown"; // Trả về tên stylist nếu tìm thấy, nếu không trả về "Unknown"
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
    {
      title: "Stylist Name", // Hiển thị tên stylist thay vì stylistId
      dataIndex: "stylistName",
      key: "stylist",
      render: (text, record) => getStylistName(record.stylistId), // Gọi hàm lấy tên stylist
    },
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
            setSelectedDate(date); // Update selected date
            fetchAppointments(date); // Fetch appointments for the new selected date immediately
          }
        }}
        style={{ marginBottom: 20 }}
      />

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
