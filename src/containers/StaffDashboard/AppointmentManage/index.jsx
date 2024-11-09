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
  Input,
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
import { getAllStylists } from "../../../services/stylist.service"; // Correct import

const AppointmentManage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openViewFeedback, setOpenViewFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch appointments and stylists data
  const fetchAppointmentsAndStylists = async () => {
    try {
      // Fetch appointments
      const appointmentResponse = await getAppointments();
      const appointments = appointmentResponse.data;

      // Fetch stylists
      const stylistResponse = await getAllStylists();
      const stylistList = stylistResponse.data;

      // Format appointments with stylist name
      const formattedAppointments = appointments.map((appointment) => ({
        key: appointment._id,
        customer: appointment.customerName,
        stylistId: appointment.stylistId,
        stylistName: getStylistName(appointment.stylistId, stylistList), // Get stylist name
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

      // Sort appointments by date (descending order) and time
      const sortedAppointments = formattedAppointments.sort((a, b) => {
        const dateA = moment(a.appointmentDate + " " + a.appointmentTime);
        const dateB = moment(b.appointmentDate + " " + b.appointmentTime);
        return dateB.isBefore(dateA) ? -1 : dateA.isBefore(dateB) ? 1 : 0;
      });

      setData(sortedAppointments);
      setFilteredData(sortedAppointments); // Set initial filtered data to all appointments
    } catch (error) {
      message.error(
        "Failed to fetch appointments and stylists: " + error.message
      );
      console.error("Error fetching appointments or stylists:", error);
    }
  };

  // Fetch appointments and stylists on initial render
  useEffect(() => {
    fetchAppointmentsAndStylists();
  }, []);

  // Get stylist name by stylistId
  const getStylistName = (stylistId, stylistList) => {
    const stylist = stylistList.find(
      (stylist) => stylist.stylistId === stylistId
    );
    return stylist ? stylist.name : "Unknown";
  };

  // Handle search term change
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setFilteredData(data); // Show all appointments when search is cleared
    } else {
      // Filter appointments by stylist name
      const filteredAppointments = data.filter((appointment) =>
        appointment.stylistName.toLowerCase().includes(searchValue)
      );
      setFilteredData(filteredAppointments);
    }
  };

  // Approve appointment
  const handleApprove = async (appointmentId) => {
    try {
      await approveAppointment(appointmentId);
      message.success("Appointment approved successfully!");
      fetchAppointmentsAndStylists(); // Reload appointments and stylists
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
      fetchAppointmentsAndStylists(); // Reload appointments and stylists
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
      fetchAppointmentsAndStylists(); // Reload appointments and stylists
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

  // Column definitions
  const columns = [
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Stylist Name", dataIndex: "stylistName", key: "stylistName" },
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
    {
      title: "Visit Count",
      dataIndex: "visitCount",
      key: "visitCount",
      // Set column width for "Visit Count" to make it smaller
      width: 80,
    },
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
      title: "View Reviews",
      key: "viewReview",
      render: (_, data) => (
        <Button
          onClick={() => {
            setOpenViewFeedback(true);
            setFeedback(data.feedbacks);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className={styles.searchWrapper}>
        <Input
          placeholder="Search by Stylist name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.appointmentTable}>
        <Table
          columns={columns}
          dataSource={filteredData}
          style={{ marginTop: 20 }}
        />
      </div>
      <Modal
        open={openViewFeedback}
        onCancel={() => setOpenViewFeedback(false)}
        width={"50%"}
        footer={null}
      >
        <h1>View Reviews</h1>
        {feedback.length === 0 && <p>No reviews yet</p>}
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
