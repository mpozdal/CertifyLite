const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
module.exports = {
	networks: {
		sepolia: {
			provider: () =>
				new HDWalletProvider(
					'ca2fc0570c54d9d003b13c81c252663bdd01a7077050f2c4f4d382c371d7295c',
					'https://sepolia.infura.io/v3/3a19fbfcf0074dfe94be0462861764bf'
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
