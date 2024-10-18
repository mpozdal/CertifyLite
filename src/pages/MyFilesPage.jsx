import { useEffect, useContext, useState } from 'react';
import { MetamaskContext } from '../contexts/MetamaskContext';
import { getUserHashes } from '../FileLogic';
function MyFilesPage() {
	const { accountNumber, contract, isConnected } =
		useContext(MetamaskContext);
	const [hashes, setHashes] = useState([]);

	const handleGetAllFiles = async () => {
		const hashesArr = await getUserHashes(accountNumber, contract);
		setHashes(hashesArr);
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
					href="https://sepolia.etherscan.io/address/0x0045Bd4dD6b3f4B0e5F3E26F11f91af455987646"
					className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
				>
					<i className="fa-solid fa-sitemap"></i>
				</a>
			</h2>

			<div className="overflow-x-auto w-full">
				<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
					<thead>
						<tr>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Hash
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-left">
								Filename
							</th>
							<th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{hashes.map((item, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
									{item.fileHash}
								</td>
								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
									{item.fileName}
								</td>
								<td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center space-x-2">
									<button
										onClick={() => ''}
										className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
									>
										Verify
									</button>

									<button
										onClick={() => {
											navigator.clipboard.writeText(
												item.fileHash
											);
											alert(
												'Hash copied: ' + item.fileHash
											);
										}}
										className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
									>
										<i className="fa-solid fa-copy"></i>
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
