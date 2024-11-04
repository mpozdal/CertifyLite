import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetamaskContext } from '../contexts/MetamaskContext';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import Loader from './Loader';

function LoginHeader() {
	const navigate = useNavigate();
	const { isConnected, onConnect, ethBalance, onDisconnect, accountNumber } =
		useContext(MetamaskContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await onConnect().then(() => {
				navigate('/files');
			});
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};
	const handleLogout = async () => {
		await onDisconnect();
		if (!isConnected) navigate('/');
	};

	return (
		<>
			{isLoading && <Loader response="logging" />}

			<header className="container m-auto w-full px-4  lg:max-w-[1440px]">
				<div className="flex justify-between items-center py-3">
					<div className="w-[50%] font-extrabold text-3xl text-blue-500 ">
						CertifyLite
					</div>

					{isConnected && (
						<button
							onClick={() => {
								navigator.clipboard.writeText(accountNumber);
								alert(
									'Account number copied: ' + accountNumber
								);
							}}
							className="fixed right-3 bottom-3 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition "
						>
							<a
								href="/#"
								data-tooltip-id="my-tooltip"
								data-tooltip-content={
									'Your account: ' + accountNumber
								}
							>
								<Tooltip id="my-tooltip" />
								<div className="flex items-center space-x-2">
									<span className="text-xl">
										<i className="fa-solid fa-plug"></i>
									</span>
									<p className="font-bold">
										You are connected!
									</p>
								</div>
							</a>
						</button>
					)}
					{!isConnected && (
						<div className="fixed right-3 bottom-3 z-50 rounded-md bg-red-500 px-4 py-2 text-white transition ">
							<div className="flex items-center space-x-2">
								<span className="text-xl">
									<i className="fa-solid fa-plug-circle-xmark"></i>
								</span>
								<p className="font-bold">
									You are not connected!
								</p>
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
							{/* <ul className="flex row  ml-14 space-x-12">
								<li>
									<NavLink
										to="/files"
										activeClassName="active"
									>
										Files
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/upload"
										activeClassName="active"
									>
										Upload
									</NavLink>
								</li>
							</ul> */}
							<div className="flex row items-center w-[50%] justify-end">
								<h2 className=" font-bold">
									Balance:{' '}
									{parseFloat(ethBalance).toFixed(10)} ETH
									&nbsp;
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
		</>
	);
}

export default LoginHeader;
