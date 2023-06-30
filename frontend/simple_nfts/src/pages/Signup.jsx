import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { createUser, getPublicAddress, getUser, login } from "../api/metamask";
import Web3 from "web3";
import Modal from "../components/UI/Modal";
import { setCookie } from "../utils/cookie_helper";


const SignUp = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
    const [modalError, setModalError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const publicAddress = await getPublicAddress();

        createUser(inputs.username)
            .then(resp => {
                console.log(resp);
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
                    })
            })
            .catch(err => {
                console.log(err);
                const publicAddressMessage = err.response?.data?.public_address ? err.response?.data?.public_address : [''];
                const usernameMessage = err.response?.data?.username ? err.response?.data?.username : [''];
                const message = publicAddressMessage.join(' ').concat(usernameMessage.join(' '));
                setError(message);
            })
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
                <Field
                    label="Username"
                    type="text"
                    name="username"
                    value={inputs && inputs.username ? inputs.username : ''}
                    required="required"
                    onChange={handleChange}
                />
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Sign Up</Button>
                </div>
            </Form>
        </Layout>
    );
};

export default SignUp;