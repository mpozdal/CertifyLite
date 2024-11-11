import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MetamaskContext } from '../contexts/MetamaskContext';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import Loader from './Loader';

function LoginHeader() {
	const navigate = useNavigate();
	const { isConnected, onConnect, ethBalance, onDisconnect, accountNumber } =
		useContext(MetamaskContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

			<header className="container m-auto w-full px-4 h-[10vh] lg:px-0 lg:max-w-[1440px]  ">
				<div className="flex justify-between items-center py-3 h-[10vh]">
					<NavLink to="/">
						<div className="w-[50%] font-extrabold text-3xl text-blue-500 ">
							<b>CertifyLite</b>
						</div>
					</NavLink>
					{isConnected && (
						<span className="flex md:hidden">
							<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
								{isMenuOpen ? (
									<i class="fa-solid fa-x"></i>
								) : (
									<i class="fa-solid fa-bars"></i>
								)}
							</button>
						</span>
					)}

					{isConnected && (
						<button
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(accountNumber);
								alert(
									'Account number copied: ' + accountNumber
								);
							}}
							className="fixed right-3 bottom-3  rounded-md bg-green-500 px-4 py-2 text-white transition "
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
						<div className="fixed right-3 bottom-3  rounded-md bg-red-500 px-4 py-2 text-white transition ">
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
						<div className="flex row w-[100%] justify-end">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
								onClick={handleLogin}
							>
								Login with Metamask
							</button>
						</div>
					)}
					{isConnected && isMenuOpen && (
						<main className=" absolute top-[10vh] left-0 w-[100vw] h-[50vh] shadow-md bg-white z-10 overflow-hidden flex flex-col justify-around items-center">
							<ul
								className=" text-2xl flex flex-col w-full items-center justify-cente "
								onClick={() => setIsMenuOpen(false)}
							>
								<li>
									<NavLink to="/" activeClassName="active">
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/files"
										activeClassName="active"
									>
										Files
									</NavLink>
								</li>
							</ul>

							<button
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
								onClick={handleLogout}
							>
								Logout
							</button>
							<h2 className="font-bold ">
								Balance: {parseFloat(ethBalance).toFixed(10)}{' '}
								ETH &nbsp;
							</h2>
						</main>
					)}

					{isConnected && (
						<span className="hidden md:flex w-full  items-center justify-center">
							<ul className=" flex flex-row w-full items-center justify-center ml-14 space-x-12 ">
								<li>
									<NavLink to="/" activeClassName="active">
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/files"
										activeClassName="active"
									>
										Files
									</NavLink>
								</li>
							</ul>
							<div className="flex row items-center w-[50%] justify-end">
								<h2 className=" text-sm font-bold">
									Balance: {parseFloat(ethBalance).toFixed(6)}{' '}
									ETH &nbsp;
								</h2>
								<button
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						</span>
					)}
				</div>
			</header>
		</>
	);
}

export default LoginHeader;
