import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import MyFilesPage from './pages/MyFilesPage';
import { MetamaskProvider } from './contexts/MetamaskContext';
import PrivateRoute from './PrivateRoute';

import FileDetailsPage from './pages/FileDetailsPage';
function App() {
	return (
		<MetamaskProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route
							path="/files"
							element={
								<PrivateRoute>
									<MyFilesPage />
								</PrivateRoute>
							}
						/>

						<Route path="*" element={<Navigate to="/" replace />} />
					</Route>
					<Route
						path="/files/:id"
						element={
							<PrivateRoute>
								<FileDetailsPage />
							</PrivateRoute>
						}
					></Route>
				</Routes>
			</Router>
		</MetamaskProvider>
	);
}

export default App;
