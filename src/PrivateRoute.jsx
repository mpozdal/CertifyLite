import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { MetamaskContext } from './contexts/MetamaskContext';
const PrivateRoute = ({ children }) => {
	const { isConnected } = useContext(MetamaskContext); // Pobieramy stan z MetaMaskContext
	return isConnected ? children : <Navigate to="/" />;
};

export default PrivateRoute;
