import { useContext } from 'react';
import Image from '../assets/logo3.jpg';
import { MetamaskContext } from '../contexts/MetamaskContext';
function Home() {
	const { accountNumber } = useContext(MetamaskContext);
	return (
		<div className="flex justify-center items-center flex-col">
			<h1>Your account: {accountNumber}</h1>
			<img src={Image} className="w-[500px]" alt="metamask" />
		</div>
	);
}

export default Home;
