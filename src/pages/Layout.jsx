import React from 'react';
import LoginHeader from '../components/LoginHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function Layout() {
	return (
		<div className=" w-full">
			<div className="min-h-[100vh]">
				<LoginHeader />
				<main className="container m-auto w-full px-4 lg:max-w-[1440px]">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
