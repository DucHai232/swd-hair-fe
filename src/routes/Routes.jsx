import { Navigate, Route, Routes} from "react-router-dom";
import ForgotPassword from "../containers/Authenticate/ForgotPassword";
import Login from "../containers/Authenticate/Login";
import Register from "../containers/Authenticate/Register";
import UserProfile from "../containers/Authenticate/UserProfile";
import DisconnectPage from "../containers/DisconnectPage";
import LayoutHome from "../containers/Home/layout"
import Home from "../containers/Home";
import Services from "../containers/Home/Services";
import Stylists from "../containers/Home/Stylists"
import ManagerDashboard from "../containers/ManagerDashboard";
import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import StylistPage from "../containers/StylistPage";
import AppointmentBooking from "../containers/AppointmentBooking";

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route path="/" element={<Home />} />
        <Route path="service" element={<Services />} />
        <Route path="stylist" element={<Stylists />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/disconnect" element={<DisconnectPage />} />
      <Route
        path="/user-profile"
        element={
          <PrivateRoleBasedRoute
            path="/user-profile"
            Component={UserProfile}
            requiredRoles={["admin", "staff", "customer", "stylist", "manager"]}
          />
        }
      />
      <Route
        path="/manager-dashboard"
        element={
          <PrivateRoleBasedRoute
            path="/manager-dashboard"
            Component={ManagerDashboard}
            requiredRoles={["manager"]}
            menu="details"
          />
        }
      />
      <Route
        path="/manager-services"
        element={
          <PrivateRoleBasedRoute
            path="/manager-services"
            Component={ManagerDashboard}
            requiredRoles={["manager"]}
            menu="services"
          />
        }
      />
      <Route
        path="/manager-stylist"
        element={
          <PrivateRoleBasedRoute
            path="/manager-stylist"
            Component={ManagerDashboard}
            requiredRoles={["manager"]}
            menu="stylist"
          />
        }
      />
      <Route
        path="/manager-stylist-performance"
        element={
          <PrivateRoleBasedRoute
            path="/manager-stylist-performance"
            Component={ManagerDashboard}
            requiredRoles={["manager"]}
            menu="stylistPerform"
          />
        }
      />
      <Route
        path="/manager-staff"
        element={
          <PrivateRoleBasedRoute
            path="/manager-staff"
            Component={ManagerDashboard}
            requiredRoles={["manager"]}
            menu="staff"
          />
        }
      />
      <Route
        path="/stylist-appointment"
        element={
          <PrivateRoleBasedRoute
            path="/stylist-appointment"
            Component={StylistPage}
            requiredRoles={["stylist"]}
            menu="stylist-appointment"
          />
        }
      />
      <Route
        path="/stylist-calendar"
        element={
          <PrivateRoleBasedRoute
            path="/stylist-calendar"
            Component={StylistPage}
            requiredRoles={["stylist"]}
            menu="stylist-calendar"
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
