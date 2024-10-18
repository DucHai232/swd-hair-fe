import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../containers/Authenticate/ForgotPassword";
import Login from "../containers/Authenticate/Login";
import Register from "../containers/Authenticate/Register";
import UserProfile from "../containers/Authenticate/UserProfile";
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

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route path="/" element={<Home />} />
        <Route path="service" element={<Services />} />
        <Route path="stylist" element={<Stylists />} />
        <Route
          path="/user-profile"
          element={
            <PrivateRoleBasedRoute
              path="/user-profile"
              Component={UserProfile}
              requiredRoles={[
                "admin",
                "staff",
                "customer",
                "stylist",
                "manager",
              ]}
            />
          }
        />
        <Route
          path="/appointment-booking"
          element={
            <PrivateRoleBasedRoute
              path="/appointment-booking"
              Component={AppointmentBooking}
              requiredRoles={["stylist", "customer", "manager", "admin"]}
            />
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
