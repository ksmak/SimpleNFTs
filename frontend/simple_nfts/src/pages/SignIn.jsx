import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button"
import Form from "../components/UI/Form";
import Error from "../components/UI/Error";

const SignIn = () => {
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Connect Metamask</Button>
                </div>
                <Error>
                    {error}
                </Error>
            </Form>
        </Layout>
    );
};

export default SignIn;