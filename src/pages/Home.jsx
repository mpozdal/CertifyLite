import React from 'react';
import Image from '../assets/logo3.jpg';
import useMetamask from '../hooks/useMetamask';
function Home() {
	return (
		<div className="flex justify-center items-center flex-col">
			<img src={Image} className="w-[500px]" alt="metamask" />
			<h1 className="font-bold text-blue-500 text-3xl ">
				CONNECT WITH YOUR METAMASK WALLET
			</h1>
		</div>
	);
}

export default Home;
