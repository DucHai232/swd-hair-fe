import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  SolutionOutlined ,
  SettingOutlined,
  LogoutOutlined,
  CalendarOutlined 
} from '@ant-design/icons';
import styles from './StylistLayout.module.scss';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

const StylistLayout = (props) => {
  const { Component, menuItem } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} className={styles.sidebar}>
        <div className={styles.logo}>
          {collapsed ? 'Salon' : 'Hair Salon'}
        </div>
        <Menu theme="dark" defaultSelectedKeys={menuItem} mode="inline">
          <Menu.Item key="stylist-appointment" icon={<SolutionOutlined />}>
            <Link to='/stylist-appointment'>Appointment List</Link>
          </Menu.Item>
          <Menu.Item key="stylist-calendar" icon={<CalendarOutlined />}>
          <Link to='/stylist-calendar'>Stylist Calendar</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Component/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StylistLayout;
