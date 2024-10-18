import { useEffect, useState } from "react";
import { Layout, Menu, Modal } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  ScissorOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styles from "./StaffLayout.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout, setFirstLogin } from "../../../feature/authentication";
import { toast, ToastContainer } from "react-toastify";
import { setSidebarItem } from "../../../feature/manager";
import { useFirstLogin } from "../../../hook/useFirstLogin";
import AppointmentManage from "../AppointmentManage";
import FeedbackManage from "../FeedbackManage";
import StylistManage from "../StylistManage";
import AppointmentPerDayManage from "../AppointmentPerDayManage";
import SDashboardDetail from "../SDashboardDetail";

const { Sider, Content } = Layout;


const StaffLayout = () => {
  const navigate = useNavigate();
  const sidebarItem = useSelector((state) => state.manager.sidebarItem);
  const [collapsed, setCollapsed] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { username, isFirstLogin } = useFirstLogin();

  const showModal = () => {
    setConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleSidebarChange = (e) => {
    dispatch(setSidebarItem(e.key));
  };

  const handleLogout = () => {
    setConfirmModalOpen(false);
    dispatch(signout());
    navigate("/login");
  };

  useEffect(() => {
    if (isFirstLogin) {
      toast.success(`Welcome ${username}`);
      dispatch(setFirstLogin(false));
    }
  }, [dispatch, isFirstLogin, username]);

  return (
    <>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          className={styles.sidebar}
        >
          <div className={styles.logo}>
            {collapsed ? "Salon" : "Hair Salon"}
          </div>
          <Menu theme="dark" selectedKeys={[sidebarItem]} mode="inline">
            <Menu.Item
              key="details"
              icon={<HomeOutlined />}
              onClick={handleSidebarChange}
            >
              <Link to="/staff-dashboard-detail">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="appointments"
              icon={<CalendarOutlined />}
              onClick={handleSidebarChange}
            >
              <Link to="/staff-appointments">Appointment Management</Link>
            </Menu.Item>
            <Menu.Item
              key="appointmentsPerDay"
              icon={<CalendarOutlined />}
              onClick={handleSidebarChange}
            >
              <Link to="/staff-appointments-per-day">
                Appointment Per Day Management
              </Link>
            </Menu.Item>
            <Menu.Item
              key="feedback"
              icon={<MessageOutlined />}
              onClick={handleSidebarChange}
            >
              <Link to="/staff-feedback">Feedback Management</Link>
            </Menu.Item>
            <Menu.Item
              key="stylist"
              icon={<ScissorOutlined />}
              onClick={handleSidebarChange}
            >
              <Link to="/staff-stylist">Stylist Management</Link>
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={showModal}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "24px" }}>
            {sidebarItem === "details" && <SDashboardDetail />}
            {sidebarItem === "appointments" && <AppointmentManage />}
            {sidebarItem === "appointmentsPerDay" && (
              <AppointmentPerDayManage />
            )}{" "}
            {sidebarItem === "feedback" && <FeedbackManage />}
            {sidebarItem === "stylist" && <StylistManage />}
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Confirm Logout"
        open={confirmModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default StaffLayout;
