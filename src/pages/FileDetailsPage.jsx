import { useEffect, useContext, useState } from 'react';
import { MetamaskContext } from '../contexts/MetamaskContext';
import {
	checkAuthenticity,
	calculateHash,
	addNewVersion,
	getAllVersions,
} from '../FileLogic';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import Loader from '../components/Loader';
function FileDetailsPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { contract, accountNumber } = useContext(MetamaskContext);
	const [file, setFile] = useState({});
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState('');
	const [name, setName] = useState('');
	const [options, setOptions] = useState([]);

	const { fileID } = location.state || {};

	const handleVerifyFile = async () => {
		setIsLoading(true);
		setResponse('');
		let calculatedHash = await calculateHash(selectedFile);
		await checkAuthenticity(
			file?.fileId,
			calculatedHash,
			file?.version,
			contract
		).then((res) => {
			setResponse(res);
		});
	};
	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
		setName(e.target.files[0].name);
	};
	const uploadNewVersion = async () => {
		setResponse('uploading');
		setIsLoading(true);
		try {
			if (selectedFile) {
				const hash = await calculateHash(selectedFile);
				if (hash && accountNumber && contract && name) {
					addNewVersion(
						accountNumber,
						hash,
						contract,
						name,
						Number(file?.baseFileId)
					);
					setSelectedFile(null);
				} else alert('something went wrong..');
			}
			setIsLoading(false);
			setResponse('');
		} catch (err) {
			console.log(err);
		}
	};
	const handleOpenUplaodModal = () => {
		setResponse('upload/verify');
		setIsLoading(true);
	};
	const handleGetFile = async () => {
		await getAllVersions(fileID, contract).then((res) => {
			console.log(res);
			setFiles(res);
			setFile(res[res.length - 1]);
			setOptions(
				res.map((file) => ({
					value: Number(file.version),
					label: 'Version ' + Number(file.version),
				}))
			);
			setTimeout(() => setIsLoading(false), 600);
		});

		// const options2 = temp.map((file) => ({
		// 	value: Number(file.version),
		// 	label: 'Version ' + Number(file.version),
		// }));

		// setOptions(options2);
		//setFiles(temp);
		//setFile(temp[temp.length - 1]);
	};

	useEffect(() => {
		setIsLoading(true);
		setResponse('loading');
		handleGetFile();
		// eslint-disable-next-line
	}, []);
	console.log(files);

	const [selectedOption, setSelectedOption] = useState(
		options[files.length - 1]
	);
	const handleChange = (option) => {
		setSelectedOption(option);
		setFile(files[option.value - 1]);
	};

	return (
		<>
			{isLoading && (
				<Loader
					response={response}
					setIsLoading={setIsLoading}
					selectedFile={selectedFile}
					handleFileChange={handleFileChange}
					uploadNewVersion={uploadNewVersion}
					handleVerifyFile={handleVerifyFile}
				/>
			)}

			<div className="min-h-[100vh] flex flex-col items-center justify-around   p-4">
				<div className="flex text-3xl items-start  ">
					<button
						onClick={() => navigate(`/files`)}
						className="absolute left-5 top-5 flex items-center bg-red-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-red-600"
					>
						<i className="fa-solid fa-angle-left text-xl"></i>Go
						back
					</button>
				</div>

				<div className="flex flex-col items-center p-6 w-full ">
					<div className="bg-white shadow-md rounded-lg p-6 w-full  lg:w-[50%] ">
						<div className="flex flex-row w-full justify-between">
							<h2 className="text-2xl font-bold mb-6 text-blue-500 text-start">
								{file?.fileName}
							</h2>
							{options.length > 0 && (
								<Select
									options={options}
									placeholder="Version..."
									className="w-[200px]"
									defaultValue={options[files.length - 1]}
									value={selectedOption}
									onChange={handleChange}
								/>
							)}
						</div>

						<div className="mb-4">
							<button
								className="font-semibold text-lg hover:text-gray-500 transition-all"
								onClick={handleOpenUplaodModal}
							>
								<i className="fa-solid fa-upload"></i>{' '}
								&nbsp;Upload | Verify
							</button>
						</div>
						<div className="mb-4">
							<h3 className="font-semibold text-lg">Hash:</h3>
							<p className="text-gray-700 break-all">
								{file?.fileHash}
							</p>
						</div>
						<div className="mb-4">
							<h3 className="font-semibold text-lg">Uploader:</h3>
							<p className="text-gray-700 break-all">
								{file?.uploader}
							</p>
						</div>

						<div className="mb-4">
							<h3 className="font-semibold text-lg">Date:</h3>
							<p className="text-gray-700">
								{new Date(
									Number(file?.timestamp) * 1000
								).toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				{/* <div className="w-full lg:w-[50%] flex flex-row justify-between">
					<Upload
						selectedFile={selectedFile}
						handleFileChange={handleFileChange}
					/>
					<div className=" ">
						<button
							onClick={uploadNewVersion}
							disabled={selectedFile === null}
							className="mt-3 cursor-pointer bg-green-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-green-600"
						>
							Upload new version
						</button>
						<button
							onClick={handleVerifyFile}
							disabled={selectedFile === null}
							className="mt-3 cursor-pointer bg-blue-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
						>
							Check authenticity
						</button>
					</div> 
				</div>*/}
			</div>
		</>
	);
}

export default FileDetailsPage;
