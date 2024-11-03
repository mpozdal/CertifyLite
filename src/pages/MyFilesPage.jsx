import { useEffect, useContext, useState } from 'react';
import { MetamaskContext } from '../contexts/MetamaskContext';
import { getUserFiles, getAllFiles } from '../FileLogic';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
function MyFilesPage() {
	const navigate = useNavigate();

	const { accountNumber, contract, isConnected } =
		useContext(MetamaskContext);
	const [hashes, setHashes] = useState([]);
	const [modal, setModal] = useState(false);

	const handleGetAllFiles = async () => {
		const hashesArr = await getAllFiles(contract);
		setHashes(hashesArr);
		console.log(hashesArr);
	};
	useEffect(() => {
		handleGetAllFiles();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100  p-4">
			<h2 className="text-lg sm:text-2xl font-bold my-6 text-center">
				<b>My account:</b> {accountNumber}{' '}
				<a
					rel="noreferrer"
					target="_blank"
					href="https://sepolia.etherscan.io/address/0xFF946672522c41DF5F30d1c3DA652d16c74C6440"
					className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
				>
					<i className="fa-solid fa-sitemap"></i>
				</a>
			</h2>

			<div className="overflow-x-auto w-full">
				<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
					<thead>
						<tr>
							{/* <th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Hash
							</th> */}
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Filename
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Date
							</th>

							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{hashes?.map((item, index) => (
							<>
								<tr key={index} className="hover:bg-gray-50">
									{/* <td
									className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base 
								"
								>
									{item[0]?.fileHash}
								</td> */}

									<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
										<a
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

									<td className="py-2  sm:px-4 border-b border-gray-300 text-center space-x-1">
										<button
											onClick={() =>
												navigate(
													`/myfiles/${item?.fileId}`
												)
											}
											className="bg-blue-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
										>
											<i class="fa-solid fa-circle-info"></i>
										</button>

										<button
											onClick={() => {
												navigator.clipboard.writeText(
													item?.fileHash
												);
												alert(
													'Hash copied: ' +
														item?.fileHash
												);
											}}
											className="bg-blue-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
										>
											<i className="fa-solid fa-copy"></i>
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
