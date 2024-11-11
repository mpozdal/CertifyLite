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

		setHashes([]);
		try {
			let hashesArr;
			if (myFiles)
				hashesArr = await getUserFiles(accountNumber, contract);
			else hashesArr = await getAllFiles(contract);
			setHashes(sortByTimestamp(hashesArr, asc));
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		setHashes([]);
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
		setHashes([]);
		setHashes(sortByTimestamp(hashes, !asc));
	};

	const handleShowFiles = async () => {
		setMyFiles(!myFiles);
		setIsLoading(true);
		setHashes([]);
		try {
			let hashesArr;
			if (myFiles) hashesArr = await getAllFiles(contract);
			else hashesArr = await getUserFiles(accountNumber, contract);
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
		<div className="flex flex-col items-center justify-center   p-4">
			{isLoading && (
				<Loader response={response} setIsLoading={setIsLoading} />
			)}

			<div className="w-full flex flex-col lg:flex-row justify-between items-center mb-4 sticky">
				<div className="flex flex-col lg:flex-row justify-start  items-center gap-3 text-xl ">
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
				<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg mb-10">
					<thead className="">
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

							<th className="py-2 px-2 sm:px-4 border-b text-center border-gray-300  hidden md:table-cell">
								Versions
							</th>

							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
								Details
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredFiles?.map((item, index) => (
							<tr
								key={index}
								className="hover:bg-gray-50 min-h-[70px]"
							>
								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
									{Number(item?.fileId)}
								</td>
								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
									{item?.fileName}
								</td>

								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
									{new Date(
										Number(item.timestamp) * 1000
									).toLocaleString()}
								</td>

								<td className="text-center  py-2 px-2 sm:px-4 border-b  border-gray-300 text-sm sm:text-base hidden md:table-cell">
									{Number(item?.version)}
								</td>

								<td className=" text-center   border-b border-gray-300 table-cell  flex-col justify-center lg:flex-row">
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
										className="bg-blue-500 w-[50px] lg:w-[100px] text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-md hover:bg-blue-600"
									>
										<i className="fa-solid fa-circle-info text-md"></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MyFilesPage;
