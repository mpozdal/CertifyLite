function Home() {
	return (
		<>
			<div className="flex min-h-[90vh]  text-3xl lg:text-6xl text-blue-500 font-extrabold items-center text-center lg:items-start flex-col justify-around ">
				<div className="flex w-full  text-3xl xl:text-6xl text-blue-500 font-extrabold items-center text-center lg:items-start flex-col justify-center ">
					<p className="">Verify Files </p>
					<p className="text-black text-5xl  xl:text-7xl font-extrabold self-center">
						Blockchain{' '}
						<i className="fa-solid fa-sitemap self-center text-blue-500 "></i>{' '}
						Ensures It.
					</p>
					<p className=" self-center lg:self-end">
						Confirm Authenticity
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;
