import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
function useMetamask() {
	const [isConnected, setIsConnected] = useState(false);
	const [accountNumber, setAccountNumber] = useState(null);
	const [ethBalance, setEthBalance] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	const navigate = useNavigate();

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

				const account = userAccount[0];
				setAccountNumber(account);
				let ethBalance2 = await web3.eth.getBalance(account);
				setEthBalance(web3.utils.fromWei(ethBalance2, 'ether'));
				setIsConnected(true);
				setIsVisible(true);
				navigate('/myfiles');
			}
		} catch (err) {
			console.log(err);
		}
	};
	const onDisconnect = () => {
		setIsConnected(false);
		setIsVisible(false);
		navigate('/');
	};
	const data = {
		isConnected: isConnected,
		onConnect: onConnect,
		onDisconnect: onDisconnect,
		accountNumber: accountNumber,
		ethBalance: ethBalance,
		isVisible: isVisible,
	};
	return data;
}

export default useMetamask;
