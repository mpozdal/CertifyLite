import { useEffect, useContext, useState } from 'react';
import { MetamaskContext } from '../contexts/MetamaskContext';
import { getFile, checkAuthenticity, calculateHash } from '../FileLogic';
import Upload from '../components/Upload';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function FileDetailsPage() {
	const navigate = useNavigate();
	const { contract } = useContext(MetamaskContext);
	const [file, setFile] = useState({});
	const [selectedFile, setSelectedFile] = useState(null);
	const { id } = useParams();
	const handleGetFile = async () => {
		const temp = await getFile(id, contract);
		setFile(temp);
		console.log(temp);
	};
	const handleVerifyFile = async () => {
		let calculatedHash = await calculateHash(selectedFile);
		const temp = await checkAuthenticity(calculatedHash, contract);
		console.log(temp);
	};
	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};
	useEffect(() => {
		handleGetFile();
	}, []);

	return (
		<div className="h-[100vh] flex flex-col items-center justify-around   p-4">
			<div className="flex text-3xl items-start bg-gray-100">
				<button
					onClick={() => navigate(`/myfiles`)}
					className="bg-red-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-red-600"
				>
					Go back
				</button>
			</div>
			<div>
				<b>Hash: </b>
				{file.fileHash}
			</div>
			<div>
				<b>Uploader: </b>
				{file.uploader}
			</div>
			<div>
				<b>File name: </b>
				{file.fileName}
			</div>
			<div>
				<b>Date: </b>
				{new Date(Number(file.timestamp) * 1000).toLocaleString()}
			</div>
			<Upload
				selectedFile={selectedFile}
				handleFileChange={handleFileChange}
			/>
			<button
				onClick={handleVerifyFile}
				className="bg-blue-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
			>
				Check authenticity
			</button>
		</div>
	);
}

export default FileDetailsPage;
