import Image from '../assets/logo3.jpg';

function Home() {
	return (
		<div className="flex justify-center items-center flex-col">
			<img src={Image} className="w-[500px]" alt="metamask" />
		</div>
	);
}

export default Home;
