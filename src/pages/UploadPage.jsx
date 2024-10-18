import React, { useContext, useState } from 'react';
import { FileInput, Label } from 'flowbite-react';
import FileDetails from '../components/FileDetails';
import { storeFileHash, verifyFileHash } from '../FileLogic';
import { MetamaskContext } from '../contexts/MetamaskContext';
function UploadPage() {
	const { accountNumber, contract } = useContext(MetamaskContext);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};
	const removeSelectedFile = () => {
		if (selectedFile !== null) {
			setSelectedFile(null);
		}
	};
	const calculateHash = async () => {
		const arrayBuffer = await selectedFile.arrayBuffer(); // Zamienia plik na ArrayBuffer
		const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
		const hashHex = Array.prototype.map
			.call(new Uint8Array(hashBuffer), (x) =>
				('00' + x.toString(16)).slice(-2)
			)
			.join('');
		return '0x' + hashHex;
	};
	const handleUploadFile = async () => {
		try {
			if (selectedFile) {
				const hash = await calculateHash();
				if (hash && accountNumber && contract)
					storeFileHash(accountNumber, hash, contract);
				else alert('something went wrong..');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex justify-center items-center  flex-col">
			<Label
				htmlFor="dropzone-file"
				className="flex h-64 w-full lg:w-[50%] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500  hover:bg-gray-100 "
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<svg
						className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span>{' '}
						or drag and drop
					</p>
				</div>
				<FileInput
					id="dropzone-file"
					className="hidden"
					onChange={handleFileChange}
				/>
			</Label>
			<FileDetails
				data={selectedFile}
				removeSelectedFile={removeSelectedFile}
			/>

			<button
				className={
					'bg-blue-500 w-full lg:w-[50%] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full'
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
