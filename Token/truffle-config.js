const HDWalletProvider = require('@truffle/hdwallet-provider');

let mnemonicPhrase = "<<ETH WALLET SEED PHRASE>>";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    //Ropsten Testnet Deployment Settings
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl: "https://mainnet.infura.io/v3/f9285b64fbec4270946119d82a50dd26",
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
      network_id: '3',
      skipDryRun: true
    }
    //End Ropsten
  },
  contracts_directory: './Netherite/contracts/',
  contracts_build_directory: './Netherite/abis/', //Smart contracts compile into the src/abis folder so that the react app can import it and use it.
  compilers: {
    solc: {
      version: "0.8.4",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
