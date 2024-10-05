import React from 'react';
import LoginHeader from '../components/LoginHeader';
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className=" w-full">
			<LoginHeader />
			<main className="container m-auto w-full px-4  lg:max-w-[1440px]">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
