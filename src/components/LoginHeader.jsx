import { useContext } from 'react';
import Logo from '../assets/logo2.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { MetamaskContext } from '../contexts/MetamaskContext';
function LoginHeader() {
	const navigate = useNavigate();
	const { isConnected, onConnect, ethBalance, onDisconnect } =
		useContext(MetamaskContext);

	const handleLogin = async () => {
		await onConnect().then(() => {
			if (isConnected) navigate('/allfiles');
		});
	};
	const handleLogout = async () => {
		await onDisconnect();
		if (!isConnected) navigate('/');
	};

	return (
		<header className="container m-auto w-full px-4  lg:max-w-[1440px]">
			<div className="flex justify-between items-center py-3">
				<div className="w-[20%]">
					<img src={Logo} alt="logo" className="h-[30px] " />
				</div>

				{isConnected && (
					<div className="fixed right-3 bottom-3 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition ">
						<div className="flex items-center space-x-2">
							<span className="text-xl">
								<i className="fa-solid fa-plug"></i>
							</span>
							<p className="font-bold">You are connected!</p>
						</div>
					</div>
				)}
				{!isConnected && (
					<div className="fixed right-3 bottom-3 z-50 rounded-md bg-red-500 px-4 py-2 text-white transition ">
						<div className="flex items-center space-x-2">
							<span className="text-xl">
								<i class="fa-solid fa-plug-circle-xmark"></i>
							</span>
							<p className="font-bold">You are not connected!</p>
						</div>
					</div>
				)}
				{!isConnected && (
					<div className="flex row w-[20%] justify-end">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
							onClick={handleLogin}
						>
							Login with Metamask
						</button>
					</div>
				)}
				{isConnected && (
					<>
						<ul className="flex row  ml-14 space-x-12">
							<li>
								<NavLink to="/" activeClassName="active">
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/myfiles" activeClassName="active">
									My files
								</NavLink>
							</li>
							<li>
								<NavLink to="/upload" activeClassName="active">
									Upload
								</NavLink>
							</li>
						</ul>
						<div className="flex row items-center w-[20%] justify-end">
							<h2 className=" font-bold">
								Balance: {ethBalance} ETH &nbsp;
							</h2>
							<button
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</>
				)}
			</div>
		</header>
	);
}

export default LoginHeader;
