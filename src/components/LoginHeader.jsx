import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Logo from '../assets/logo2.png';
function LoginHeader() {
	const [isConnected, setIsConnected] = useState(false);
	const [accountNumber, setAccountNumber] = useState(null);
	const [ethBalance, setEthBalance] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	const detectCurrentProvider = () => {
		let provider;
		if (window.ethereum) {
			provider = window.ethereum;
		} else if (window.web3) {
			provider = window.web3.currentProvider;
		} else {
			console.log(
				'Non-ethereum browser detected. Please install Metamask'
			);
		}
		return provider;
	};

	const onConnect = async () => {
		try {
			const currentProvider = detectCurrentProvider();
			if (currentProvider) {
				await currentProvider.request({
					method: 'eth_requestAccounts',
				});
				const web3 = new Web3(currentProvider);
				const userAccount = await web3.eth.getAccounts();
				console.log(userAccount);
				const account = userAccount[0];
				setAccountNumber(account);
				let ethBalance2 = await web3.eth.getBalance(account);
				setEthBalance(web3.utils.fromWei(ethBalance2, 'ether'));
				setIsConnected(true);
				setIsVisible(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	// useEffect(() => {
	// 	if (isVisible) {
	// 		const timer = setTimeout(() => {
	// 			setIsVisible(false); // Po 5 sekundach ukryj komponent
	// 		}, 3000);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [isConnected]);

	const onDisconnect = () => {
		setIsConnected(false);
		setIsVisible(false);
	};
	return (
		<header className="container m-auto w-full px-4  lg:max-w-[1440px]">
			<div className="flex justify-between items-center py-3">
				<img src={Logo} alt="logo" className="h-[30px]" />
				{isVisible && (
					<div className="fixed right-3 bottom-3 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition ">
						<div className="flex items-center space-x-2">
							<span className="text-xl">
								<i class="fa-solid fa-plug"></i>
							</span>
							<p className="font-bold">You are connected!</p>
						</div>
					</div>
				)}
				{!isVisible && (
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
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
						onClick={onConnect}
					>
						Login with Metamask
					</button>
				)}
				{isConnected && (
					<>
						<div className="flex row items-center">
							<h2 className=" font-bold">
								Balance: {ethBalance} ETH &nbsp;
							</h2>
							<button
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
								onClick={onDisconnect}
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
