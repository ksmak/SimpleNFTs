import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button"
import Form from "../components/UI/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { getUser, login, getPublicAddress } from '../api/metamask/index';
import Web3 from "web3";

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const publicAddress = await getPublicAddress();
        getUser(publicAddress)
            .then(resp => {
                console.log(resp);
                sessionStorage.setItem('username', resp.data.user.username);
                sessionStorage.setItem('public_address', Web3.utils.toChecksumAddress(publicAddress));
                login(resp.data.nonce, resp.data.public_address)
                    .then(resp => {
                        console.log(resp);
                        sessionStorage.setItem('access', resp.data.access);
                        sessionStorage.setItem('refresh', resp.data.refresh);
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err);
                        setError('Error!');
                    })
            })
            .catch(err => {
                console.log(err);
                setError('Error!');
            });

    }
    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Connect Metamask</Button>
                </div>
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            </Form>
        </Layout>
    );
};

export default SignIn;