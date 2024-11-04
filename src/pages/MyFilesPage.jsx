import { useEffect, useContext, useState } from 'react';
import { MetamaskContext } from '../contexts/MetamaskContext';
import { getUserFiles, getAllFiles } from '../FileLogic';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
function MyFilesPage() {
	const navigate = useNavigate();

	const { accountNumber, contract } = useContext(MetamaskContext);
	const [hashes, setHashes] = useState([]);
	const [query, setQuery] = useState('');
	const [asc, setAsc] = useState(true);

	const [myFiles, setMyFiles] = useState(true);
	const [response, setResponse] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleGetAllFiles = async () => {
		setResponse('loading2');
		setIsLoading(true);
		try {
			const hashesArr = await getUserFiles(accountNumber, contract);

			setHashes(sortByTimestamp(hashesArr, asc));
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		handleGetAllFiles();
		// eslint-disable-next-line
	}, []);

	const filteredFiles = hashes.filter((file) =>
		file.fileName.toLowerCase().includes(query.toLowerCase())
	);
	function sortByTimestamp(arr, order) {
		return arr.sort((a, b) => {
			const dateA = new Date(Number(a.timestamp)).getTime();
			const dateB = new Date(Number(b.timestamp)).getTime();

			if (order === true) {
				return dateA - dateB; // Ascending order
			} else {
				return dateB - dateA; // Descending order
			}
		});
	}

	const handleSort = () => {
		setAsc(!asc);
		setHashes(sortByTimestamp(hashes, !asc));
	};

	const handleShowFiles = async () => {
		setMyFiles(!myFiles);
		setIsLoading(true);

		try {
			const hashesArr = await getAllFiles(contract);
			setHashes(sortByTimestamp(hashesArr, asc));
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};

	const handleUpload = () => {
		setResponse('upload');
		setIsLoading(true);
	};
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100  p-4">
			{isLoading && (
				<Loader response={response} setIsLoading={setIsLoading} />
			)}
			{/* <h2 className="text-lg sm:text-2xl font-bold my-6 text-center">
				<b>My account:</b> {accountNumber}{' '}
				<a
					rel="noreferrer"
					target="_blank"
					href="https://sepolia.etherscan.io/address/0xFF946672522c41DF5F30d1c3DA652d16c74C6440"
					className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
				>
					<i className="fa-solid fa-sitemap"></i>
				</a>
			</h2> */}
			<div className="w-full flex flex-col lg:flex-row justify-between items-center mb-4">
				<div className="flex flex-col lg:flex-row justify-start  items-center gap-3 text-xl">
					<button
						onClick={handleShowFiles}
						title="Change"
						className="text-lg font-bold hover:text-gray-500 transition-all"
					>
						{myFiles ? (
							<>
								<i className="fa-solid fa-globe"></i>
								&nbsp;All files
							</>
						) : (
							<>
								<i className="fa-solid fa-user "></i>
								&nbsp;My files
							</>
						)}
					</button>
					<button
						className="text-lg font-bold hover:text-gray-500 transition-all"
						onClick={handleUpload}
					>
						<i className="fa-solid fa-upload"></i>
						&nbsp; Upload
					</button>
					<button
						onClick={handleGetAllFiles}
						title="Refresh"
						className="text-lg font-bold hover:text-gray-500 transition-all"
					>
						<i className="fa-solid fa-arrows-rotate"></i> Refresh
					</button>
				</div>

				<SearchBar query={query} setQuery={setQuery} />
			</div>

			<div className="overflow-x-auto w-full">
				<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
					<thead>
						<tr>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								ID
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Filename
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left flex items-center">
								<button onClick={() => handleSort()}>
									Date &nbsp;
									{asc ? (
										<i className="fa-solid fa-arrow-down-1-9"></i>
									) : (
										<i className="fa-solid fa-arrow-up-1-9"></i>
									)}
								</button>
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left hidden md:table-cell">
								Base file ID
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left hidden md:table-cell">
								Version
							</th>

							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
								Details
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredFiles?.map((item, index) => (
							<>
								<tr key={index} className="hover:bg-gray-50">
									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
										{Number(item?.fileId)}
									</td>
									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
										<a
											href="/#"
											data-tooltip-id="my-tooltip"
											data-tooltip-content={
												'File hash: ' + item?.fileHash
											}
										>
											<Tooltip id="my-tooltip" />
											{item?.fileName}
										</a>
									</td>

									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
										{new Date(
											Number(item.timestamp) * 1000
										).toLocaleString()}
									</td>
									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base hidden md:table-cell">
										{Number(item?.baseFileId)}
									</td>
									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base hidden md:table-cell">
										{Number(item?.version)}
									</td>

									<td className=" min-h-[50px] py-2  sm:px-4 border-b border-gray-300 text-center space-x-1 flex flex-col justify-center lg:flex-row">
										<button
											onClick={() =>
												navigate(
													`/files/${item?.fileHash}`,
													{
														state: {
															fileID: item?.baseFileId,
														},
													}
												)
											}
											className="bg-blue-500  text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-md hover:bg-blue-600"
										>
											<i className="fa-solid fa-circle-info"></i>
										</button>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MyFilesPage;
