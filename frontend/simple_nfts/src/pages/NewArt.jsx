import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import Layout from "../components/Layout/Layout";
import Toolbar from "../components/UI/Toolbar";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import Image from "../components/UI/Image";
import api from "../api/index";

const NewArt = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState();
    const [inputs, setInputs] = useState();
    const [error, setError] = useState();
    const [publicAddress, setPublicAddress] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));

        if (name === 'uri') {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file);
        console.log(publicAddress.length);
        let formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('price', inputs.price);
        formData.append('uri', 'xxx');
        formData.append('image', file);
        formData.append('owner', publicAddress);
        api.simpleClient.createArt(formData)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        setPublicAddress(sessionStorage.getItem('public_address'));
    }, []);

    return (
        <Layout>
            <Toolbar>
                <Button onClick={() => navigate('/self')}>Back</Button>
            </Toolbar>
            <div className="flex flex-row mt-5">
                <div className="mt-10 ml-10 w-96 h-96 border-2 rounded-md shadow-md shadow-gray-500 bg-white">
                    <Image src={file} alt="preview" />
                </div>
                <Form onSubmit={handleSubmit}>
                    <Field
                        label="File"
                        type="file"
                        name="uri"
                        required="required"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <Field
                        label="Title"
                        type="text"
                        name="title"
                        value={inputs && inputs.title ? inputs.title : ''}
                        required="required"
                        onChange={handleChange}
                    />
                    <Field
                        label="Price"
                        type="number"
                        name="price"
                        value={inputs && inputs.price ? inputs.price : ''}
                        required="required"
                        onChange={handleChange}
                    />
                    <div className="p-5 flex justify-center">
                        <Button type="Submit">Save and Close</Button>
                    </div>
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                </Form>
            </div>
        </Layout>
    );
}

export default NewArt;