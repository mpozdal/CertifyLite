import { createContext, useState } from 'react';
import Web3 from 'web3';
import FileRegistry from '../build/contracts/FileRegistry.json';
export const MetamaskContext = createContext();
export const MetamaskProvider = ({ children }) => {
	const [isConnected, setIsConnected] = useState(false);
	const [accountNumber, setAccountNumber] = useState(null);
	const [ethBalance, setEthBalance] = useState('');
	const [contract, setContract] = useState(null);

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
	// const checkMetamaskConnection = async () => {
	// 	try {
	// 		const currentProvider = detectCurrentProvider();
	// 		if (currentProvider) {
	// 			const web3 = new Web3(currentProvider);
	// 			const userAccount = await web3.eth.getAccounts();
	// 			const account = userAccount[0];
	// 			setAccountNumber(account);
	// 			let ethBalance2 = await web3.eth.getBalance(account);
	// 			setEthBalance(web3.utils.fromWei(ethBalance2, 'ether'));
	// 			setIsConnected(true);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const onConnect = async () => {
		try {
			const currentProvider = detectCurrentProvider();
			if (currentProvider) {
				await currentProvider.request({
					method: 'eth_requestAccounts',
				});
				const web3 = new Web3(currentProvider);
				const userAccount = await web3.eth.getAccounts();
				const account = userAccount[0];
				setAccountNumber(account);

				const networkId = await web3.eth.net.getId();
				const deployedNetwork = FileRegistry.networks[networkId];
				if (deployedNetwork) {
					const contractInstance = new web3.eth.Contract(
						FileRegistry.abi,
						deployedNetwork.address
					);
					setContract(contractInstance);
				} else {
					alert('Contract not deployed to detected network.');
				}

				let ethBalance2 = await web3.eth.getBalance(account);
				setEthBalance(web3.utils.fromWei(ethBalance2, 'ether'));
				setIsConnected(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onDisconnect = () => {
		setIsConnected(false);
		setAccountNumber(null);
	};

	return (
		<MetamaskContext.Provider
			value={{
				accountNumber,
				isConnected,
				onConnect,
				ethBalance,
				onDisconnect,
				contract,
			}}
		>
			{children}
		</MetamaskContext.Provider>
	);
};
