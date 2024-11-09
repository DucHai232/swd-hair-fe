import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, DatePicker, Spin, Table } from "antd";
import { useDataDashboardMutation } from "../../../services/hairsalon.service";
import styles from "./DashboardDetail.module.scss";

const { RangePicker } = DatePicker;

const DashboardDetail = () => {
  const [loadDashboardData, { isLoading }] = useDataDashboardMutation();
  const [dashboardData, setDashboardData] = useState(null);
  const [dateRange, setDateRange] = useState({
    fromDate: null,
    toDate: null,
  });

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange({
        fromDate: dates[0].format("YYYY-MM-DD"),
        toDate: dates[1].format("YYYY-MM-DD"),
      });
    }
  };

  useEffect(() => {
    if (dateRange.fromDate && dateRange.toDate) {
      loadDashboardData(dateRange)
        .unwrap()
        .then((res) => {
          setDashboardData(res.data);
        })
        .catch((err) => console.error("Failed to fetch dashboard data:", err));
    }
  }, [dateRange, loadDashboardData]);

  // Define columns for revenue over time table
  const revenueColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Revenue",
      dataIndex: "value",
      key: "value",
      render: (value) => `${value} VND`, // Format revenue with currency
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div className={styles.dashboardContainer}>
        <Row gutter={16}>
          <Col span={8}>
            <RangePicker
              onChange={handleDateChange}
              className={styles.dateRangePicker}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "16px" }}>
          <Col span={6}>
            <Card title="Appointments">
              <Statistic
                title="Number of Appointments"
                value={dashboardData?.numberOfAppointments || 0}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="New Registrations">
              <Statistic
                title="Number of New Registrations"
                value={dashboardData?.numberOfNewRegistrations || 0}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Feedbacks">
              <Statistic
                title="Number of Feedbacks"
                value={dashboardData?.numberOfFeedbacks || 0}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Customers">
              <Statistic
                title="Total Customers"
                value={dashboardData?.totalCustomers || 0}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "16px" }}>
          <Col span={8}>
            <Card title="Revenue Analytics">
              <Statistic
                title="Total Revenue"
                value={dashboardData?.totalRevenue || 0}
                suffix="VND This Month"
              />
              <Statistic
                title="Average Per Service"
                value={Math.round(dashboardData?.averageRevenuePerService) || 0}
                suffix="VND"
                style={{ marginTop: "16px" }}
              />
            </Card>
          </Col>
          <Col span={16}>
            <Card title="Revenue Over Time">
              <Table
                columns={revenueColumns}
                dataSource={dashboardData?.revenueOverTime || []}
                rowKey="date"
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default DashboardDetail;
