import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../containers/Authenticate/Login";
import Register from "../containers/Authenticate/Register";
import DisconnectPage from "../containers/DisconnectPage";
import LayoutHome from "../containers/Home/layout";
import Home from "../containers/Home";
import Services from "../containers/Home/Services";
import Stylists from "../containers/Home/Stylists";
import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import AppointmentBooking from "../containers/AppointmentBooking";
import ManagerLayout from "../containers/ManagerDashboard/ManagerLayout";
import StylistLayout from "../containers/StylistPage/StylistLayout";
import StaffLayout from "../containers/StaffDashboard/StaffLayout";
import Vouchers from "../containers/Customer/Vouchers";
import ResultPayment from "../containers/ResultPayment/ResultPayment";
import ListAppointment from "../containers/CmpUser/ListAppointment";
import InfoUser from "../containers/CmpUser/InfoUser";
//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route path="/" element={<Home />} />
        <Route path="service" element={<Services />} />
        <Route path="stylist" element={<Stylists />} />
        <Route path="/vouchers" element={<Vouchers />} />

        <Route
          path="/appointment-booking"
          element={
            <PrivateRoleBasedRoute
              path="/appointment-booking"
              Component={AppointmentBooking}
              requiredRoles={["customer"]}
            />
          }
        />
      </Route>
      <Route path="/result-payment" element={<ResultPayment />} />
      <Route path="/list-appointment" element={<ListAppointment />} />
      <Route path="/info-profile" element={<InfoUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/disconnect" element={<DisconnectPage />} />

      <Route
        path="/manager-dashboard"
        element={
          <PrivateRoleBasedRoute
            path="/manager-dashboard"
            Component={ManagerLayout}
            requiredRoles={["manager"]}
          />
        }
      />
      <Route
        path="/stylist-appointment"
        element={
          <PrivateRoleBasedRoute
            path="/stylist-appointment"
            Component={StylistLayout}
            requiredRoles={["stylist"]}
          />
        }
      />
      <Route
        path="/staff-dashboard"
        element={
          <PrivateRoleBasedRoute
            path="/staff-dashboard"
            Component={StaffLayout}
            requiredRoles={["staff"]}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
