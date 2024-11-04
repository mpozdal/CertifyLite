import { useContext, useState, useEffect } from 'react';
import { storeFileHash, calculateHash } from '../FileLogic';
import { MetamaskContext } from '../contexts/MetamaskContext';
import Upload from '../components/Upload';
import Loader from '../components/Loader';
function UploadPage() {
	const { accountNumber, contract } = useContext(MetamaskContext);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
		setName(e.target.files[0].name);
	};
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = 'unset');
	}, []);

	const handleUploadFile = async () => {
		setIsLoading(true);
		try {
			if (selectedFile) {
				const hash = await calculateHash(selectedFile);
				if (hash && accountNumber && contract && name) {
					storeFileHash(accountNumber, hash, contract, name);
					setSelectedFile(null);
				} else alert('something went wrong..');
			}
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && (
				<Loader response={'uploading'} setIsLoading={setIsLoading} />
			)}

			<div className="w-full flex justify-center items-center  flex-col">
				<Upload
					selectedFile={selectedFile}
					handleFileChange={handleFileChange}
				/>
				<input />

				<button
					className={
						'bg-blue-500 mt-2 w-full hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full'
					}
					disabled={selectedFile === null}
					onClick={handleUploadFile}
				>
					Upload
				</button>
			</div>
		</>
	);
}

export default UploadPage;
