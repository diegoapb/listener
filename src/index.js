console.log('welcome to listener project 1')
const { providers, Contract, utils } = require("ethers");
require('dotenv').config();

const networks = {
    "BSC": {
        "MAINNET": {
            "RPC_URL": "",
            "TOKENS": []
        },
        "TESTNET": {
            "RPC_URL": "",
            "TOKENS": []
        }
    },
    "POLYGON": {
        "MAINNET": {
            "RPC_URL": "https://polygon-rpc.com",
            "TOKENS": [
                {
                    "symbol": "DLYCOP",
                    "address": "0x1659fFb2d40DfB1671Ac226A0D9Dcc95A774521A",
                    "decimals": 18
                }
            ]
        },
        "TESTNET": {
            "RPC_URL": "https://speedy-nodes-nyc.moralis.io/061be91989fa9cc165e11c44/polygon/mumbai",
            "TOKENS": [
                {
                    "symbol": "DLYCOP",
                    "address": "0x78761149bae210b0c3170c33800b13730ed89d96",
                    "decimals": 18
                }
            ]
        }
    }
}

const NETWORK = process.env.NETWORK;
const BLOCKCHAIN = process.env.BLOCKCHAIN;

const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function allowance(address owner, address spender) view returns (uint)",
    "function approve(address owner, uint amount)",
    "function transfer(address to, uint amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

(() => {

    const provider = new providers.JsonRpcProvider(networks[BLOCKCHAIN][NETWORK].RPC_URL);
    console.log(networks[BLOCKCHAIN][NETWORK].RPC_URL)

    const tokens = networks[BLOCKCHAIN][NETWORK].TOKENS;

    for (var i = 0; i < tokens.length; i++) {

        const contract = new Contract(tokens[i].address, abi, provider);

        contract.on("Transfer", async (from, to, amount, event) => {
            if (Number(utils.formatUnits(amount, 18))<101)
            console.log(from, to, Number(utils.formatUnits(amount, 18)))
        //     // console.log("si entro")
        });
    }
})();