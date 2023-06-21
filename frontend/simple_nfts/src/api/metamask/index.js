import axios from 'axios';

const BASE_API_URL = 'http://127.0.0.1:8000/metamask/'

const createUser = async (username) => {
    const publicAddress = await getPublicAddress();

    return axios.post(BASE_API_URL, {
        public_address: publicAddress,
        user: {
            username: username
        }
    });
}

const login = async (nonce, publicAddress) => {
    const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [nonce, publicAddress],
    });

    return axios.post(BASE_API_URL + 'login/' + publicAddress, { signature: sign });
}

const getUser = async (publicAddress) => {
    return axios.get(BASE_API_URL + publicAddress)
}

const getPublicAddress = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

export { getPublicAddress, createUser, login, getUser }