import { useEffect, useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  ScissorOutlined,
  ShoppingOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import styles from './ManagerLayout.module.scss';
import { useFirstLogin } from '../../../hook/useFirstLogin';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstLogin, signout } from '../../../feature/authentication';
import DashboardDetail from '../DashboardDetail';
import ServiceManage from '../ServiceManage';
import StylistManage from '../StylistManage';
import StylistPerform from '../StylistPerform';
import StaffManage from '../StaffManage';
import { useNavigate } from 'react-router-dom';
import { setSidebarItem } from '../../../feature/manager';


const { Sider, Content } = Layout;

const ManagerLayout = () => {
  const navigate = useNavigate()
  const sidebarItem = useSelector((state) => state.rootReducer.manager.sidebarItem)
  const [collapsed, setCollapsed] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const dispatch = useDispatch()
  const { username, isFirstLogin } = useFirstLogin()
  const showModal = () => {
    setConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleSidebarChange = (e) => {
    dispatch(setSidebarItem(e.key))
  }
  const handleLogout = () => {
    setConfirmModalOpen(false);
    dispatch(signout())
    navigate('/login')
  }
  useEffect(() => {
    if (isFirstLogin) {
      toast.success(`Welcome ${username}`);
      dispatch(setFirstLogin(false));
    }
  }, [dispatch, isFirstLogin, username]);
  return (
    <>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} className={styles.sidebar}>
          <div className={styles.logo}>
            {collapsed ? 'Salon' : 'Hair Salon'}
          </div>
          <Menu theme="dark" defaultSelectedKeys={sidebarItem} mode="inline">
            <Menu.Item key="details" icon={<HomeOutlined />} onClick={handleSidebarChange}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="services" icon={<ShoppingOutlined />} onClick={handleSidebarChange}>
              Services Management
            </Menu.Item>
            <Menu.Item key="stylist" icon={<ScissorOutlined />} onClick={handleSidebarChange}>
              Stylist Management
            </Menu.Item>
            <Menu.Item key="stylistPerform" icon={<TrophyOutlined />} onClick={handleSidebarChange}>
              Stylist Performance
            </Menu.Item>
            <Menu.Item key="staff" icon={<TeamOutlined />} onClick={handleSidebarChange}>
              Staff Management
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />} onClick={handleSidebarChange}>
              Settings
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={showModal}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '24px' }}>
            {sidebarItem == 'details' && <DashboardDetail />}
            {sidebarItem == 'services' && <ServiceManage />}
            {sidebarItem == 'stylist' && <StylistManage />}
            {sidebarItem == 'stylistPerform' && <StylistPerform />}
            {sidebarItem == 'staff' && <StaffManage />}
          </Content>
        </Layout>
      </Layout>
      {confirmModalOpen && <Modal title="Are you sure to Log Out" open={confirmModalOpen} onOk={handleLogout} onCancel={handleCancel}/>}
      <ToastContainer />
    </>
  );
};

export default ManagerLayout;
