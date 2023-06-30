import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button"
import Form from "../components/UI/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { getUser, login, getPublicAddress } from '../api/metamask/index';
import Web3 from "web3";
import Modal from "../components/UI/Modal";
import { setCookie } from "../utils/cookie_helper";

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [modalError, setModalError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const publicAddress = await getPublicAddress();
        getUser(publicAddress)
            .then(resp => {
                sessionStorage.setItem('username', resp.data.user.username);
                sessionStorage.setItem('public_address', Web3.utils.toChecksumAddress(publicAddress));
                login(resp.data.nonce, resp.data.public_address)
                    .then(resp => {
                        setCookie('access_token', resp.data.access, process.env.REACT_APP_ACCESS_TOKEN_LIFETIME);
                        setCookie('refresh_token', resp.data.refresh, process.env.REACT_APP_REFRESH_TOKEN_LIFETIME);
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err);
                        setError('Error!');
                        setModalError(true);
                    })
            })
            .catch(err => {
                console.log(err);
                setError('Error!');
                setModalError(true);
            });

    }
    return (
        <Layout>
            <Modal visible={modalError} setVisible={setModalError}>
                <div className="w-96">
                    <div className="text-red-500 text-center">Error!</div>
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                    <div className="text-center">
                        <Button onClick={() => setModalError(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
            <Form onSubmit={handleSubmit}>
                <div className="flex justify-center p-5">
                    <Button type="Submit">Connect Metamask</Button>
                </div>
            </Form>
        </Layout>
    );
};

export default SignIn;