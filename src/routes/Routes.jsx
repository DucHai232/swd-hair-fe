import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../containers/Authenticate/ForgotPassword';
import Login from '../containers/Authenticate/Login';
import Register from '../containers/Authenticate/Register';
import UserProfile from '../containers/Authenticate/UserProfile';
import DisconnectPage from '../containers/DisconnectPage';
import Home from '../containers/Home';
import ManagerDashboard from '../containers/ManagerDashboard';
import PrivateRoleBasedRoute from './PrivateRoleBasedRoute';

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/disconnect" element={<DisconnectPage />} />
      <Route
        path='/user-profile'
        element={<PrivateRoleBasedRoute path="/user-profile" Component={UserProfile} requiredRoles={['admin', 'staff', 'customer', 'stylist', 'manager']}/>}
      />
      <Route
        path='/manager-dashboard'
        element={<PrivateRoleBasedRoute path="/manager-dashboard" Component={ManagerDashboard} requiredRoles={['manager']} menu='details'/>}
      />
      <Route
        path='/manager-services'
        element={<PrivateRoleBasedRoute path="/manager-services" Component={ManagerDashboard} requiredRoles={['manager']} menu='services'/>}
      />
      <Route
        path='/manager-emp'
        element={<PrivateRoleBasedRoute path="/manager-emp" Component={ManagerDashboard} requiredRoles={['manager']} menu='employee'/>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes