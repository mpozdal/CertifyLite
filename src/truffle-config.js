const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		sepolia: {
			provider: () =>
				new HDWalletProvider(
					'2270bd9b989e123b8888e2f2edb3f5242d40ffa334454cf2e9ecd7574b048ab9',
					'https://sepolia.infura.io/v3/3a19fbfcf0074dfe94be0462861764bf'
				),
			network_id: 11155111, // ID sieci Sepolia
			gas: 5000000, // Maksymalny limit gazu
			gasPrice: 10000000000,
		},
	},
	compilers: {
		solc: {
			version: '0.8.0', // Używana wersja Solidity
		},
	},
};
