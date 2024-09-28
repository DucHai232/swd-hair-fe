
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoleBasedRoute  = (props) => {
	const { path, Component, requiredRoles, menu } = props;
	// Should replace by get user role (from storage, redux store or anything...) localStorage || cookies
	const userRole = useSelector((state) => state.user.role);
	// Check user role with route's required roles
	const canAccessWithRoles = requiredRoles.includes(userRole[0]);
	// Send navigate state, included last path
	const routingState = {
		requestedPath: path,
	};

	return canAccessWithRoles ? <Component menuItem={menu}/> : <Navigate to='/' state={routingState} />;
};


export default PrivateRoleBasedRoute;
