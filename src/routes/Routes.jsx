import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../containers/Authenticate/ForgotPassword';
import Login from '../containers/Authenticate/login';
import Register from '../containers/Authenticate/Register';
import UserProfile from '../containers/Authenticate/UserProfile';
import PrivateRoleBasedRoute from './PrivateRoleBasedRoute';

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route
        path='/'
        element={<PrivateRoleBasedRoute path="/" Component={UserProfile} requiredRoles={['admin', 'staff', 'customer', 'stylist', 'manager']}/>}
      >
      </Route>
    </Routes>
  )
}

export default AppRoutes