import React from 'react';

function Footer() {
	return (
		<div className=" cursor-pointer bg-gray-700 w-full min-h-[120px] mt-10 text-white text-3xl flex justify-center flex-col lg:flex-row items-center gap-y-5 lg:gap-x-10 py-5">
			<a
				href="https://github.com/mpozdal"
				target="_blank"
				rel="noreferrer"
			>
				<i className="fa-brands fa-github hover:text-gray-500 transition-all"></i>
			</a>
			<a
				href="https://www.linkedin.com/in/michał-pożdał-17a7b12a2/"
				target="_blank"
				rel="noreferrer"
			>
				<i className="fa-brands fa-linkedin hover:text-gray-500"></i>
			</a>
			<a
				rel="noreferrer"
				target="_blank"
				title="Check on etherscan.io"
				className="font-bold hover:text-gray-500 transition-all"
				href="https://sepolia.etherscan.io/address/0xaa6fbd2F8e09bb7C55D48E215E89BCC36aD99c5c"
			>
				<i className="fa-solid fa-sitemap "></i>
			</a>
		</div>
	);
}

export default Footer;
