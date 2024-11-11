export const storeFileHash = async (
	accountNumber,
	fileHash,
	contract,
	name
) => {
	let res;
	try {
		await contract.methods
			.addFile(fileHash, name, 0)
			.send({ from: accountNumber })
			.then((_res) => (res = _res));
	} catch (err) {
		console.log('Error while uploading data at blockchain!');
		res = err;
	}
	return res;
};
export const addNewVersion = async (
	accountNumber,
	fileHash,
	contract,
	name,
	baseFileId
) => {
	try {
		await contract.methods
			.addFile(fileHash, name, baseFileId)
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
				.getLatestFilesByUser(accountNumber)
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

export const getAllFiles = async (contract) => {
	let hashes = [];
	if (contract) {
		try {
			await contract.methods
				.getLatestFiles()
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

export const checkAuthenticity = async (fileId, hash, version, contract) => {
	let isLegit = false;
	if (contract) {
		try {
			await contract.methods
				.verifySpecificVersion(fileId, hash, version)
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

export const getAllVersions = async (baseFileID, contract) => {
	let hashes = [];
	if (contract) {
		try {
			await contract.methods
				.getFileVersions(baseFileID)
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
