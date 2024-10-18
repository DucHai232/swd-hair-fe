import StaffLayout from "../../components/StaffLayout";
import SDashboardDetail from "./SDashboardDetail";
import AppointmentManage from "./AppointmentManage";
import FeedbackManage from "./FeedbackManage";
import StylistManage from "./StylistManage";

const StaffDashboard = (props) => {
  const { menuItem } = props;
  return (
    <>
      {menuItem == "details" && (
        <StaffLayout Component={SDashboardDetail} menuItem={menuItem} />
      )}
      {menuItem == "appointments" && (
        <StaffLayout Component={AppointmentManage} menuItem={menuItem} />
      )}
      {menuItem == "feedback" && (
        <StaffLayout Component={FeedbackManage} menuItem={menuItem} />
      )}
      {menuItem == "stylist" && (
        <StaffLayout Component={StylistManage} menuItem={menuItem} />
      )}
    </>
  );
};

export default StaffDashboard;
