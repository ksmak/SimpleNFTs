import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import Error from "../components/UI/Error";

const SignUp = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const isNotVerify = (inputs) => {
        if (inputs.email === null || inputs.email === '' || inputs.email === undefined) {
            setError("Error! Email cannot be empty.");
            return true
        }
        if (inputs.password === null || inputs.password === '' || inputs.password === undefined) {
            setError("Error! Password cannot be empty.");
            return true;
        }
        if (inputs.password !== inputs.repeat_password) {
            setError("Error! Passwords don't match");
            return true;
        }
        return false;
    }

    const registerUser = async (inputs) => {
        const response = await fetch(`${process.env.FRONTEND_HOST}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(inputs)
        });

        const result = await response.json();

        return [response, result];
    }

    const sendMail = async (data) => {
        const response = await fetch(`${process.env.FRONTEND_HOST}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response.ok;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isNotVerify(inputs)) {
            return;
        }

        const [reg_response, reg_result] = await registerUser(inputs);

        if (!reg_response.ok) {
            setError("Error! User is not registered.")
            return;
        }

        const activate_url = `${process.env.FRONTEND_HOST}/activate/${reg_result.result}`

        const data = {
            email: inputs.email,
            subject: `Please Verify Your Account for ${process.env.SITE_NAME}`,
            message: `Please follow the following link to activate your account: <a href='${activate_url}'>${activate_url}</a>`
        }

        const isSendingMail = await sendMail(data);

        if (!isSendingMail) {
            setError("Error sending email!");
            return;
        }

        navigate('/success');
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Field 
                    fieldtype="text"
                    fieldname="email"
                    labelname="Your Email"
                    value={inputs && inputs.email ? inputs.email : null}
                />
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Sign Up</Button>
                </div>
                <Error>
                    {error}
                </Error>
            </Form>
        </Layout>
    );
};

export default SignUp;