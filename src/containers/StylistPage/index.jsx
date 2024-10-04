import StylistLayout from "../../components/StylistLayout"
import AppointmentList from "./AppointmentList"
import Calendar from "./Calendar"


const StylistPage = (props) => {
  const { menuItem } = props
  return (
    <>
      {menuItem == 'stylist-appointment' && <StylistLayout Component={AppointmentList} menuItem={menuItem}/>}
      {menuItem == 'stylist-calendar' && <StylistLayout Component={Calendar} menuItem={menuItem}/>}
    </>
  )
}

export default StylistPage