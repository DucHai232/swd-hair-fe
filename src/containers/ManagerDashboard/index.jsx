import ManagerLayout from "../../components/ManagerLayout/ManagerLayout"
import DashboardDetail from "./DashboardDetail"
import EmployeeManage from "./EmployeeManage"
import ServiceManage from "./ServiceManage"

const ManagerDashboard = (props) => {
  const { menuItem } = props
  return (
    <>
      {menuItem == 'details' && <ManagerLayout Component={DashboardDetail} menuItem={menuItem}/>}
      {menuItem == 'services' && <ManagerLayout Component={ServiceManage} menuItem={menuItem}/>}
      {menuItem == 'employee' && <ManagerLayout Component={EmployeeManage} menuItem={menuItem}/>}
    </>
  )
}

export default ManagerDashboard