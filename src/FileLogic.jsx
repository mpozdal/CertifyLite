export const storeFileHash = async (accountNumber, fileHash, contract) => {
	console.log(fileHash);
	try {
		await contract.methods
			.storeFileHash(fileHash)
			.send({ from: accountNumber });
		console.log('success');
	} catch (err) {
		console.log(err);
	}
};
export const verifyFileHash = async (file, fileHash, contract) => {
	if (file && contract && fileHash) {
		try {
			const exists = await contract.methods
				.verifyFileHash(fileHash)
				.call();
			if (exists) {
				console.log(
					'File hash is already registered on the blockchain.'
				);
			} else {
				console.log('File hash is not registered.');
			}
		} catch (err) {
			console.error(err);
			console.log('Error verifying file hash.');
		}
	}
};

export const getUserHashes = async (accountNumber, contract) => {
	let hashes = [];
	if (contract && accountNumber) {
		try {
			await contract.methods
				.getUserHashes()
				.call({ from: accountNumber })
				.then((res) => {
					hashes = res;
				});
		} catch (err) {
			console.log(err);
		}
	}
	console.log(hashes);
	return hashes;
};
