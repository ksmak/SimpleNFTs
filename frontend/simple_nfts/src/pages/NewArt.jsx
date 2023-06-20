import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import Layout from "../components/Layout/Layout";
import Toolbar from "../components/UI/Toolbar";
import Button from "../components/UI/Button";
import Error from "../components/UI/Error";
import Image from "../components/UI/Image";
import SmallButton from "../components/UI/SmallButton";

const NewArt = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState();
    const [error, setError] = useState();

    const handleSumbit = (e) => {
        e.preventDefault();
    }

    return (
        <Layout>
            <Toolbar>
                <Button onClick={() => navigate('/self')}>Back</Button>
            </Toolbar>
            <div className="flex flex-row mt-5">
                <div className="ml-28 mt-10">
                    <div className=" w-96 h-96 border-2 rounded-md shadow-md shadow-gray-500 bg-white">
                        <Image href={inputs && inputs.uri ? inputs.uri : null} alt={inputs && inputs.title ? inputs.title : null} />
                    </div>
                    <div className="mt-3 text-center">
                        <SmallButton>Upload File</SmallButton>
                    </div>
                </div>
                <Form onSumbit={handleSumbit}>
                    <Field
                        fieldtype="text"
                        fieldname="title"
                        labelname="Title"
                        value={inputs && inputs.title ? inputs.title : null}
                    />
                    <Field
                        fieldtype="number"
                        fieldname="price"
                        labelname="Price"
                        value={inputs && inputs.price ? inputs.price : null}
                    />
                    <div className="p-5 flex justify-center">
                        <Button type="Submit">Save</Button>
                    </div>
                    <Error>{error}</Error>
                </Form>
            </div>
        </Layout>
    );
}

export default NewArt;