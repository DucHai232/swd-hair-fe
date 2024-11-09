import { useState } from "react";
import { Table, Button, Modal, Tag } from "antd";
import { useGetStylistVerifyQuery } from "../../../services/hairsalon.service";

const StylistPerform = () => {
  const { data: stylists, isLoading } = useGetStylistVerifyQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState([]);

  const showFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Define the columns for the stylist table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Appointments",
      dataIndex: "numberAppointments",
      key: "appointments",
    },
    {
      title: "Revenue ($)",
      dataIndex: "revenueStylist",
      key: "revenue",
      render: (revenue) => `$${revenue}`, // Format as currency
    },
    {
      title: "Avg. Feedback Rating",
      dataIndex: "avgFeedback",
      key: "avgFeedbackRating",
      render: (rating) => (
        <Tag color={rating >= 4.5 ? "green" : "orange"}>{rating} / 5</Tag>
      ),
    },
    {
      title: "Performance Rating",
      dataIndex: "performanceRating",
      key: "performanceRating",
      render: (rating) => (
        <Tag color={rating === "Excellent" ? "green" : "orange"}>{rating}</Tag>
      ),
    },
    {
      title: "View Feedback",
      key: "viewFeedback",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showFeedbackModal(record.feedbacks)}
        >
          View Feedback
        </Button>
      ),
    },
  ];

  // Define the columns for the feedback modal table
  const feedbackColumns = [
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Tag color={rating >= 4.5 ? "green" : "orange"}>{rating} / 5</Tag>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={stylists?.data}
        rowKey="stylistId"
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />

      <Modal
        title="Feedback Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Table
          columns={feedbackColumns}
          dataSource={selectedFeedback}
          rowKey={(record) => record.comment}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default StylistPerform;
