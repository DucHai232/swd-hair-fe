import { useEffect } from "react";
import { Row, Col, Card, List, Statistic } from "antd";
import {
  XYChart,
  XYCursor,
  LineSeries,
  ValueAxis,
  DateAxis,
} from "@amcharts/amcharts4/charts";
import { create } from "@amcharts/amcharts4/core";
import styles from "./SDashboardDetail.module.scss";
const SDashboardDetail = () => {
  // Dummy data for demonstration
  const stylistData = [
    { name: "Alice", role: "Lead Stylist", totalAppointments: 120 },
    { name: "Bob", role: "Junior Stylist", totalAppointments: 80 },
  ];

  const topServices = [
    { service: "Haircut", count: 50 },
    { service: "Hair Coloring", count: 35 },
    { service: "Perming", count: 20 },
  ];

  useEffect(() => {
    // Create chart instance
    const chart = create("chartdiv", XYChart);

    // Create axes
    chart.xAxes.push(new DateAxis());
    chart.yAxes.push(new ValueAxis());

    // Create series
    const series = chart.series.push(new LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";

    // Sample data for chart
    series.data = [
      { date: new Date(2023, 8, 1), value: 50 },
      { date: new Date(2023, 8, 2), value: 65 },
      { date: new Date(2023, 8, 3), value: 80 },
      { date: new Date(2023, 8, 4), value: 100 },
      { date: new Date(2023, 8, 5), value: 120 },
    ];

    // Add cursor
    chart.cursor = new XYCursor();

    // Cleanup on unmount
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Row gutter={4} style={{ marginTop: "16px" }}>
        <Col span={8}>
          <Card title="Stylist Overview">
            <List
              dataSource={stylistData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`Role: ${item.role} - Appointments: ${item.totalAppointments}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Top Services">
            <List
              dataSource={topServices}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.service}
                    description={`Total Bookings: ${item.count}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Stylist Performance">
            <Statistic
              title="Total Appointments This Month"
              value={200}
              suffix="Appointments"
            />
            <Statistic
              title="Average per Stylist"
              value={100}
              suffix="Appointments"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card title="Appointments Over Time">
            <div id="chartdiv" style={{ height: "400px" }}></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SDashboardDetail;
