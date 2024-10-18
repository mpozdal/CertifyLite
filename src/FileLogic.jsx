export const storeFileHash = async (
	accountNumber,
	fileHash,
	contract,
	name,
	setStatus
) => {
	setStatus('Uploading data at blockchain..');
	try {
		await contract.methods
			.addRecord(fileHash, name)
			.send({ from: accountNumber });
		setStatus('Data uploaded at blockchain!');
	} catch (err) {
		setStatus('Error while uploading data at blockchain!');
	}
};
export const verifyFileHash = async (file, fileHash, contract, setStatus) => {
	if (file && contract && fileHash) {
		try {
			const exists = await contract.methods
				.verifyFileHash(fileHash)
				.call();
			if (exists) {
				setStatus('File hash is already registered on the blockchain.');
			} else {
				setStatus('File hash is not registered.');
			}
		} catch (err) {
			console.error(err);
			console.log('Error verifying file hash.');
		}
	}
};

export const getUserHashes = async (accountNumber, contract, setStatus) => {
	let hashes = [];
	if (contract && accountNumber) {
		try {
			await contract.methods
				.getUserFiles()
				.call({ from: accountNumber })
				.then((res) => {
					hashes = res;
				});
		} catch (err) {
			setStatus(err);
		}
	}
	return hashes;
};
