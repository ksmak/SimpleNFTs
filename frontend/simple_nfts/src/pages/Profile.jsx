import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import Error from "../components/UI/Error";

const Profile = () => {
    const [userId, setUserId] = useState();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            id: userId,
            token: token,
            user: user
        }

        const response = await fetch(`${process.env.FRONTEND_HOST}/api/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            setError('Error! Profile not saved.');
        }
    };

    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <Field 
                    fieldtype="email"
                    fieldname="email"
                    labelname="Email"
                    value={user && user.email ? user.email : null}
                />
                <Field 
                    fieldtype="text"
                    fieldname="first_name"
                    labelname="First name"
                    value={user && user.first_name ? user.first_name : null}
                />
                <Field 
                    fieldtype="text"
                    fieldname="last_name"
                    labelname="Last name"
                    value={user && user.last_name ? user.last_name : null}
                />
                <div className="p-5 flex justify-center">
                    <Button type="Submit">Save</Button>
                </div>
                <Error>
                    {error}
                </Error>
            </Form>
        </Layout>
    );
}

export default Profile;