import React, { useEffect } from 'react';
import { Row, Col, Card, List, Statistic } from 'antd';
import { XYChart, XYCursor, LineSeries, ValueAxis, DateAxis } from '@amcharts/amcharts4/charts';
import { create } from '@amcharts/amcharts4/core';
import styles from './DashboardDetail.module.scss'; // SCSS for styling

const DashboardDetail = () => {
  // Dummy data for demonstration
  const appointments = [
    { name: 'John Doe', time: '10:00 AM', service: 'Haircut' },
    { name: 'Jane Smith', time: '11:00 AM', service: 'Hair Coloring' },
  ];
  
  const staff = [
    { name: 'Alice', role: 'Stylist' },
    { name: 'Bob', role: 'Barber' },
  ];
  
  const services = ['Haircut', 'Hair Coloring', 'Shaving', 'Facial'];

  const reviews = [
    { customer: 'John Doe', review: 'Great service!', rating: 5 },
    { customer: 'Jane Smith', review: 'Loved my new hair color!', rating: 4 },
    { customer: 'Jane Smith', review: 'Loved my new hair color!', rating: 5 },
  ];

  useEffect(() => {
    // Create chart instance
    const chart = create('chartdiv', XYChart);

    // Create axes
    chart.xAxes.push(new DateAxis());
    chart.yAxes.push(new ValueAxis());

    // Create series
    const series = chart.series.push(new LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';

    // Sample data for chart
    series.data = [
      { date: new Date(2023, 8, 1), value: 120 },
      { date: new Date(2023, 8, 2), value: 200 },
      { date: new Date(2023, 8, 3), value: 150 },
      { date: new Date(2023, 8, 4), value: 180 },
      { date: new Date(2023, 8, 5), value: 220 },
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
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Appointments Overview">
            <List
              dataSource={appointments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.name} - ${item.service}`}
                    description={`Time: ${item.time}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Staff Management">
            <List
              dataSource={staff}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`Role: ${item.role}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Services Overview">
            <List
              dataSource={services}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="Customer Reviews">
            <List
              dataSource={reviews}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.customer} - Rating: ${item.rating}/5`}
                    description={item.review}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue Analytics">
            <Statistic
              title="Total Revenue"
              value={4500}
              prefix="$"
              suffix="This Month"
            />
            <Statistic
              title="Average Per Service"
              value={150}
              prefix="$"
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="Revenue Over Time">
            <div id="chartdiv" style={{ height: '400px' }}></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardDetail;
