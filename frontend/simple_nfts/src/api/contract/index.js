import Web3 from 'web3';
import simpleNFTsContract from './abi/SimpleNFT.json';

const getWeb3 = async () => {
    return new Web3(window.ethereum);
}

const getContract = async (web3) => {
    let abi = simpleNFTsContract.abi;
    let address = process.env.REACT_APP_CONTRACT_ADDRESS;
    return await new web3.eth.Contract(abi, address);
}

export { getWeb3, getContract }