import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import MyFilesPage from './pages/MyFilesPage';

import useMetamask from './hooks/useMetamask';
function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/upload" element={<UploadPage />} />
						<Route path="/myfiles" element={<MyFilesPage />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
