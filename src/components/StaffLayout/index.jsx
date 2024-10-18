import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  // SettingOutlined,
  LogoutOutlined,
  ScissorOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styles from "./StaffLayout.module.scss";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

const StaffLayout = (props) => {
  const { Component, menuItem } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        className={styles.sidebar}
      >
        <div className={styles.logo}>{collapsed ? "Salon" : "Hair Salon"}</div>
        <Menu theme="dark" defaultSelectedKeys={[menuItem]} mode="inline">
          <Menu.Item key="details" icon={<HomeOutlined />}>
            <Link to="/staff-dashboard-detail">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <Link to="/staff-appointments">Appointment Management</Link>
          </Menu.Item>
          <Menu.Item key="feedback" icon={<MessageOutlined />}>
            <Link to="/staff-feedback">Feedback Management</Link>
          </Menu.Item>
          <Menu.Item key="stylist" icon={<ScissorOutlined />}>
            <Link to="/staff-stylist">Stylist Management</Link>
          </Menu.Item>
          {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item> */}
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Component />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
