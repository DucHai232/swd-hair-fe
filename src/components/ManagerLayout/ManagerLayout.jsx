import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  ScissorOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import styles from './ManagerLayout.module.scss';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

const ManagerLayout = (props) => {
  const { Component, menuItem } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} className={styles.sidebar}>
        <div className={styles.logo}>
          {collapsed ? 'Salon' : 'Hair Salon'}
        </div>
        <Menu theme="dark" defaultSelectedKeys={menuItem} mode="inline">
          <Menu.Item key="details" icon={<HomeOutlined />}>
            <Link to='/manager-dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="services" icon={<ShoppingOutlined />}>
          <Link to='/manager-services'>Services Management</Link>
          </Menu.Item>
          <Menu.Item key="stylist" icon={<ScissorOutlined />}>
          <Link to='/manager-stylist'>Stylist Management</Link>
          </Menu.Item>
          <Menu.Item key="staff" icon={<TeamOutlined />}>
          <Link to='/manager-staff'>Staff Management</Link>
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

export default ManagerLayout;
