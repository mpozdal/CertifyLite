import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MetamaskContext } from './contexts/MetamaskContext';
const PrivateRoute = ({ children }) => {
	const { isConnected } = useContext(MetamaskContext);
	if (isConnected) return children;
	else return <Navigate to="/" />;
};

export default PrivateRoute;
