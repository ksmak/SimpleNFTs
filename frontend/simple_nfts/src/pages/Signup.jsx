import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { createUser, getPublicAddress, getUser, login } from "../api/metamask";


const SignUp = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

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
                        console.log(resp);
                        sessionStorage.setItem('username', resp.data.user.username);
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
            <Form onSubmit={handleSubmit}>
                <Field
                    label="Username"
                    type="text"
                    name="username"
                    value={inputs && inputs.username ? inputs.username : null}
                    required="required"
                    onChange={handleChange}
                />
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Sign Up</Button>
                </div>
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            </Form>
        </Layout>
    );
};

export default SignUp;