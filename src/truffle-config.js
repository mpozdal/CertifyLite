const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
module.exports = {
	networks: {
		sepolia: {
			provider: () =>
				new HDWalletProvider(
					process.env.PRIVATE_KEY,
					process.env.INFURA_SEPOLIA_URL
				),
			network_id: 11155111, // ID sieci Sepolia
			gas: 4500000, // Opcjonalne: limit gazu
			gasPrice: 10000000000, // Opcjonalne: cena gazu (10 gwei)
			confirmations: 2, // Potwierdzenia przed zakończeniem transakcji
			timeoutBlocks: 200, // Liczba bloków, zanim transakcja wygaśnie
			skipDryRun: true,
		},
	},
	compilers: {
		solc: {
			version: '0.8.0', // Używana wersja Solidity
		},
	},
};
