import { Navigate } from 'react-router-dom';

const PrivateRoleBasedRoute = (props) => {
	// eslint-disable-next-line react/prop-types
	const { path, Component, requiredRoles } = props;
	//Should replace by get user role (from storage, redux store or anything...) localStorage || cookies
	const userRole = 'Customer';

	//Check user role with route's required roles
	// eslint-disable-next-line react/prop-types
	const canAccessWithRoles = requiredRoles.includes(userRole);

	//Should replace by get logged in status
	//const isAuthenticated = true;

	//Send navigate state, included last path
	const routingState = {
		requestedPath: path
	};
	return canAccessWithRoles ? <Component /> : <Navigate to='/login' state={routingState} />;
};

export default PrivateRoleBasedRoute;
