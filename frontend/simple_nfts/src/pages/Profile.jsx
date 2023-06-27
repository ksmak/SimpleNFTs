import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import SuccessMessage from "../components/UI/SuccesMessage";
import api from "../api/index";

const Profile = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        api.simpleClient.setProfile(inputs)
            .then(resp => {
                setSuccess(resp.data.result);
            })
            .catch(err => {
                setError(err.data.result);
            })

    };

    useEffect(() => {
        api.simpleClient.getProfile()
            .then(resp => {
                console.log(resp);
                setInputs(resp.data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Field
                    label="First name"
                    type="text"
                    name="first_name"
                    value={inputs && inputs.first_name ? inputs.first_name : null}
                    required="required"
                    onChange={handleChange}
                />
                <Field
                    label="Last name"
                    type="text"
                    name="last_name"
                    value={inputs && inputs.last_name ? inputs.last_name : null}
                    required="required"
                    onChange={handleChange}
                />
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Save</Button>
                    <Button onClick={() => navigate('/')}>Close</Button>
                </div>
                <ErrorMessage>
                    {error}
                </ErrorMessage>
                <SuccessMessage>
                    {success}
                </SuccessMessage>
            </Form>
        </Layout>
    );
}

export default Profile;