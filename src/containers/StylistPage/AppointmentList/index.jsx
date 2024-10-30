import { Table, Tag } from "antd";
import moment from "moment";
import { useScheduleStylistQuery } from "../../../services/hairsalon.service";

const StylistManage = () => {
  const { data: schedule, isLoading } = useScheduleStylistQuery();

  // Define columns to display the appointment data from API
  const columns = [
    {
      title: "Appointment Name",
      dataIndex: "appointmentName",
      key: "appointmentName",
    },
    {
      title: "Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Revenue ($)",
      dataIndex: "money",
      key: "money",
      render: (money) => `$${money.toLocaleString()}`, // Formats with commas
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={schedule?.data}
        rowKey={(record) => record._id} // Use unique ID from the data
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default StylistManage;
