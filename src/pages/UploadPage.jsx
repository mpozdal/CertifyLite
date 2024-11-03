import React, { useContext, useState } from 'react';
import { FileInput, Label } from 'flowbite-react';
import FileDetails from '../components/FileDetails';
import { storeFileHash, calculateHash } from '../FileLogic';
import { MetamaskContext } from '../contexts/MetamaskContext';
import Upload from '../components/Upload';
function UploadPage() {
	const { accountNumber, contract } = useContext(MetamaskContext);
	const [selectedFile, setSelectedFile] = useState(null);
	const [name, setName] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
		setName(e.target.files[0].name);
	};

	const handleUploadFile = async () => {
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
	};

	return (
		<div className="flex justify-center items-center  flex-col">
			<Upload
				selectedFile={selectedFile}
				handleFileChange={handleFileChange}
			/>
			<input />

			<button
				className={
					'bg-blue-500 w-full mt-2 lg:w-[50%] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full'
				}
				disabled={selectedFile === null}
				onClick={handleUploadFile}
			>
				Upload
			</button>
		</div>
	);
}

export default UploadPage;
