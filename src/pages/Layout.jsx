import React from 'react';
import LoginHeader from '../components/LoginHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function Layout() {
	return (
		<div className=" w-full">
			<div className="px-4">
				<LoginHeader />
				<main className="container m-auto w-full  px-4 lg:px-0 lg:max-w-[1440px]">
					<Outlet />
				</main>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="hidden md:flex fixed -bottom-0 left-0 -z-10"
			>
				<path
					fill="#3b82f6"
					fill-opacity="1"
					d="M0,320L48,298.7C96,277,192,235,288,202.7C384,171,480,149,576,170.7C672,192,768,256,864,266.7C960,277,1056,235,1152,208C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
				></path>
			</svg>
		</div>
	);
}

export default Layout;
