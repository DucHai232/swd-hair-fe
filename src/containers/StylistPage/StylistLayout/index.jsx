import { useEffect, useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import {
  SolutionOutlined,
  SettingOutlined,
  LogoutOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import styles from './StylistLayout.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirstLogin } from '../../../hook/useFirstLogin';
import { toast, ToastContainer } from 'react-toastify';
import { setFirstLogin, signout } from '../../../feature/authentication';
import AppointmentList from '../AppointmentList';
import StylistCalendar from '../Calendar';
import { setSidebarItem } from '../../../feature/stylist';

const { Sider, Content } = Layout;

const StylistLayout = () => {
  const navigate = useNavigate()
  const sidebarItem = useSelector(state => state.rootReducer.stylist.sidebarItem)
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
            <Menu.Item key="stylist-appointment" icon={<SolutionOutlined />} onClick={handleSidebarChange}>
              Appointment List
            </Menu.Item>
            <Menu.Item key="stylist-calendar" icon={<CalendarOutlined />} onClick={handleSidebarChange}>
              Stylist Calendar
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={showModal}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '24px' }}>
            {sidebarItem == 'stylist-appointment' && <AppointmentList />}
            {sidebarItem == 'stylist-calendar' && <StylistCalendar />}
          </Content>
        </Layout>
      </Layout>
      {confirmModalOpen && <Modal title="Are you sure to Log Out" open={confirmModalOpen} onOk={handleLogout} onCancel={handleCancel} />}
      <ToastContainer />
    </>
  );
};

export default StylistLayout;
