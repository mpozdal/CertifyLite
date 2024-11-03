export const storeFileHash = async (
	accountNumber,
	fileHash,
	contract,
	name
) => {
	try {
		await contract.methods
			.addFile(fileHash, name)
			.send({ from: accountNumber });
	} catch (err) {
		console.log('Error while uploading data at blockchain!');
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

export const getUserFiles = async (accountNumber, contract) => {
	let hashes = [];
	if (contract && accountNumber) {
		try {
			await contract.methods
				.getUserFiles()
				.call({ from: accountNumber })
				.then((res) => {
					console.log(res);
					hashes = res;
				});
		} catch (err) {
			console.log(err);
		}
	}
	return hashes;
};

export const getAllFiles = async (contract) => {
	let hashes = [];
	if (contract) {
		try {
			await contract.methods
				.getAllFiles()
				.call()
				.then((res) => {
					hashes = res;
				});
		} catch (err) {
			console.log(err);
		}
	}
	return hashes;
};

export const getFile = async (fileID, contract) => {
	let file = {};
	if (contract) {
		try {
			await contract.methods
				.getFile(fileID)
				.call()
				.then((res) => {
					file = res;
				});
		} catch (err) {
			console.log(err);
		}
	}
	return file;
};

export const checkAuthenticity = async (hash, contract) => {
	let isLegit = false;
	if (contract) {
		try {
			await contract.methods
				.verifyFile(hash)
				.call()
				.then((res) => {
					isLegit = res;
				});
		} catch (err) {
			console.log(err);
		}
	}
	return isLegit;
};

export const calculateHash = async (selectedFile) => {
	const arrayBuffer = await selectedFile.arrayBuffer(); // Zamienia plik na ArrayBuffer
	const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
	const hashHex = Array.prototype.map
		.call(new Uint8Array(hashBuffer), (x) =>
			('00' + x.toString(16)).slice(-2)
		)
		.join('');
	return '0x' + hashHex;
};
