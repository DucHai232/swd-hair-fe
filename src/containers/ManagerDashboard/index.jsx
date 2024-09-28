import ManagerLayout from "../../components/ManagerLayout"
import DashboardDetail from "./DashboardDetail"
import StylistManage from "./StylistManage"
import ServiceManage from "./ServiceManage"
import StylistPerform from "./StylistPerform"
import StaffManage from "./StaffManage"

const ManagerDashboard = (props) => {
  const { menuItem } = props
  return (
    <>
      {menuItem == 'details' && <ManagerLayout Component={DashboardDetail} menuItem={menuItem}/>}
      {menuItem == 'services' && <ManagerLayout Component={ServiceManage} menuItem={menuItem}/>}
      {menuItem == 'stylist' && <ManagerLayout Component={StylistManage} menuItem={menuItem}/>}
      {menuItem == 'stylistPerform' && <ManagerLayout Component={StylistPerform} menuItem={menuItem}/>}
      {menuItem == 'staff' && <ManagerLayout Component={StaffManage} menuItem={menuItem}/>}
    </>
  )
}

export default ManagerDashboard