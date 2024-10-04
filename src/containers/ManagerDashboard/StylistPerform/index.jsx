import React, { useState } from 'react';
import { Table, Button, Modal, Tag } from 'antd';

const stylistsData = [
  {
    _id: '1',
    username: 'stylist1',
    name: 'Stylist 1',
    appointments: 50,
    revenue: 5000,
    avgFeedbackRating: 4.65,
    performanceRating: 'Excellent',
    feedback: [
      {
        customer: 'John Doe',
        rating: 4.8,
        comment: 'Great service!',
        date: '2024-09-20T12:34:56Z',
      },
      {
        customer: 'Jane Smith',
        rating: 4.5,
        comment: 'Loved the haircut!',
        date: '2024-09-19T11:22:33Z',
      },
    ],
  },
  {
    _id: '2',
    username: 'stylist2',
    name: 'Stylist 2',
    appointments: 30,
    revenue: 3000,
    avgFeedbackRating: 4.3,
    performanceRating: 'Good',
    feedback: [
      {
        customer: 'Alice Johnson',
        rating: 4.3,
        comment: 'Good but could be better.',
        date: '2024-09-18T10:11:22Z',
      },
    ],
  },
  // Add more stylists and feedback here
];

const StylistPerform = () => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Appointments',
      dataIndex: 'appointments',
      key: 'appointments',
    },
    {
      title: 'Revenue ($)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `$${revenue}`, // Format as currency
    },
    {
      title: 'Avg. Feedback Rating',
      dataIndex: 'avgFeedbackRating',
      key: 'avgFeedbackRating',
      render: (rating) => (
        <Tag color={rating >= 4.5 ? 'green' : 'orange'}>
          {rating} / 5
        </Tag>
      ),
    },
    {
      title: 'Performance Rating',
      dataIndex: 'performanceRating',
      key: 'performanceRating',
      render: (rating) => (
        <Tag color={rating === 'Excellent' ? 'green' : 'orange'}>
          {rating}
        </Tag>
      ),
    },
    {
      title: 'View Feedback',
      key: 'viewFeedback',
      render: (_, record) => (
        <Button type="primary" onClick={() => showFeedbackModal(record.feedback)}>
          View Feedback
        </Button>
      ),
    },
  ];

  // Define the columns for the feedback modal table
  const feedbackColumns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color={rating >= 4.5 ? 'green' : 'orange'}>
          {rating} / 5
        </Tag>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={stylistsData}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
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
          rowKey={(record) => record.customer}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default StylistPerform;
