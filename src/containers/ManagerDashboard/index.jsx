import ManagerLayout from "../../components/ManagerLayout/ManagerLayout"
import DashboardDetail from "./DashboardDetail"
import StylistManage from "./StylistManage"
import ServiceManage from "./ServiceManage"

const ManagerDashboard = (props) => {
  const { menuItem } = props
  return (
    <>
      {menuItem == 'details' && <ManagerLayout Component={DashboardDetail} menuItem={menuItem}/>}
      {menuItem == 'services' && <ManagerLayout Component={ServiceManage} menuItem={menuItem}/>}
      {menuItem == 'stylist' && <ManagerLayout Component={StylistManage} menuItem={menuItem}/>}
    </>
  )
}

export default ManagerDashboard