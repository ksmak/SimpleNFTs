import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Field from "../components/UI/Field";
import Form from "../components/UI/Form";
import Layout from "../components/Layout/Layout";
import Toolbar from "../components/UI/Toolbar";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import Image from "../components/UI/Image";
import api from "../api/index";
import { getWeb3, getContract } from "../api/contract/index";
import Modal from "../components/UI/Modal";
import SuccessMessage from "../components/UI/SuccesMessage";
import { setArtItem, addArtItem, deleteArtItem } from "../components/slices/simpleArtsSlice";
import Web3 from "web3";
import axios from "axios";

const Art = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { isNew, item } = state;

    const [file, setFile] = useState();
    const [inputs, setInputs] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [publicAddress, setPublicAddress] = useState();
    const [modalError, setModalError] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalResale, setModalResale] = useState(false);
    const [modalCancelSale, setModalCancelSale] = useState(false);
    const [modalRemove, setModalRemove] = useState(false);
    const [author, setAuthor] = useState('');
    const [owner, setOwner] = useState('');

    const handleChange = (e) => {
        setError(null);
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleChangeFile = (e) => {
        setInputs(values => ({ ...values, [e.target.name]: e.target.files[0] }));
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSave = async () => {
        //upload image
        let formData = new FormData();
        if (inputs.image_url) {
            formData.append('image', inputs.image_url, inputs.image_url.name);
        }
        const result = await api.simpleClient.createArt(formData);

        //create nft
        const web3 = await getWeb3();
        const contract = await getContract(web3);
        contract.methods.createArt(
            `${result.data.image}`,
            web3.utils.toWei(inputs.price, 'ether'),
            inputs.title,
            inputs.description).send({ from: publicAddress })
            .then(receipt => {
                if (parseInt(receipt.status) === 1) {
                    addArtItem(inputs);
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Error! Not send transaction!");
            });
    }

    const handleBuyArt = async () => {
        setModalConfirm(false);

        const web3 = await getWeb3();
        const contract = await getContract(web3);
        await contract.methods.sendMoney(publicAddress).send({
            from: publicAddress,
            value: Web3.utils.toWei(inputs.price, 'ether')
        })
            .then(receipt => {
                const params = {
                    buyer: publicAddress,
                    tokenId: parseInt(item.id),
                    markup: 0
                }

                api.simpleClient.buyArt(params)
                    .then(resp => {
                        if (resp.status !== 200) {
                            setError(resp.response.data.error);
                            setModalError(true);
                            return;
                        }
                        let new_inputs = { ...inputs };
                        new_inputs.status = 1;
                        new_inputs.owner = publicAddress;
                        setArtItem(new_inputs);
                        setSuccess('Congratulations! You bought this art.');
                        setModalSuccess(true);
                    })
                    .catch(err => {
                        setError(err.message);
                        setModalError(true);
                    })
            })
            .catch((error) => {
                setError('Error! Error transaction.')
                setModalError(true)
            });
    }

    const handleSuccess = () => {
        setModalSuccess(false);
        navigate('/');
    }

    const handleResaleArt = async () => {
        //resale nft
        const web3 = await getWeb3();
        const contract = await getContract(web3);
        contract.methods.resaleArt(
            item.id,
            Web3.utils.toWei(inputs.price, 'ether'),
        ).send({ from: publicAddress })
            .then(receipt => {
                if (parseInt(receipt.status) === 1) {
                    setArtItem(inputs);
                    setModalResale(false);
                    setSuccess('This art is put up for sale.');
                    setModalSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Error! Not send transaction!");
            });
    }

    const handleCancelSale = async () => {
        //cancel sale nft
        const web3 = await getWeb3();
        const contract = await getContract(web3);
        contract.methods.cancelArt(
            item.id
        ).send({ from: publicAddress })
            .then(receipt => {
                if (parseInt(receipt.status) === 1) {
                    let new_inputs = { ...inputs };
                    new_inputs.status = 1;
                    setArtItem(new_inputs);
                    setModalCancelSale(false);
                    setSuccess('This art has been cancelled for sale.');
                    setModalSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Error! Not send transaction!");
                setModalError(true);
            });
    }

    const handleRemove = async () => {
        //cancel sale nft
        const web3 = await getWeb3();
        const contract = await getContract(web3);
        contract.methods.removeArt(
            item.id
        ).send({ from: publicAddress })
            .then(receipt => {
                if (parseInt(receipt.status) === 1) {
                    deleteArtItem(inputs);
                    setModalRemove(false);
                    setSuccess('This art was destroyed.');
                    setModalSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Error! Not send transaction!");
                setModalError(true);
            });
    }

    const formatDateTime = (num) => {
        let dt = (new Date(num * 1000)).toLocaleDateString("ru-RU");
        let tm = (new Date(num * 1000)).toLocaleTimeString("ru-RU");
        return dt + ' ' + tm;
    }

    useEffect(() => {
        setPublicAddress(sessionStorage.getItem('public_address'));
    }, [])

    useEffect(() => {
        if (item) {
            let obj = {};
            obj['id'] = parseInt(item.id);
            obj['status'] = parseInt(item.status);
            obj['title'] = item.title;
            obj['description'] = item.description;
            obj['author'] = item.author;
            obj['owner'] = item.owner;
            obj['price'] = Web3.utils.fromWei(parseInt(item.price), 'ether');
            setFile(item.uri);
            obj['image_uri'] = item.uri;
            if (item.date_of_creation) {
                obj['date_of_creation'] = formatDateTime(parseInt(item.date_of_creation));
            }
            if (item.date_of_change) {
                obj['date_of_change'] = formatDateTime(parseInt(item.date_of_change));
            }
            setInputs(obj);
        }

        if (item && item.author) {
            axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `${process.env.REACT_APP_HOST_API}/api/users/get_by_address?address=${item.author}`,
            })
                .then(resp => {
                    if (resp.status === 200) {
                        setAuthor(resp.data.result.full_name);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (item && item.owner) {
            axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `${process.env.REACT_APP_HOST_API}/api/users/get_by_address?address=${item.owner}`,
            })
                .then(resp => {
                    if (resp.status === 200) {
                        setOwner(resp.data.result.full_name);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [item])


    return (
        <Layout>
            <Modal visible={modalError} setVisible={setModalError}>
                <div className="w-48">
                    <div className="text-red-500 text-center">Error!</div>
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                    <div className="text-center">
                        <Button onClick={() => setModalError(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={modalSuccess} setVisible={setModalSuccess}>
                <div className="w-48">
                    <SuccessMessage>
                        {success}
                    </SuccessMessage>
                    <div className="text-center">
                        <Button onClick={handleSuccess}>Close</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={modalConfirm} setVisible={setModalConfirm}>
                <div className="w-48">
                    <div className="text-blue-700 text-center">Do you really want to buy this art?</div>
                    <div className="text-center">
                        <Button onClick={handleBuyArt}>Yes</Button>
                        <Button onClick={() => setModalConfirm(false)}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={modalResale} setVisible={setModalResale}>
                <div className="w-96">
                    <Field
                        label="New Price (ETH)"
                        type="number"
                        name="price"
                        value={inputs && inputs.price ? inputs.price : ''}
                        required="required"
                        onChange={handleChange}
                    />
                    <div className="text-center">
                        <Button onClick={handleResaleArt}>OK</Button>
                        <Button onClick={() => setModalResale(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={modalCancelSale} setVisible={setModalCancelSale}>
                <div className="w-48">
                    <div className="text-red-700 text-center">Do you really want to cancel the sale of this art?</div>
                    <div className="text-center">
                        <Button onClick={handleCancelSale}>Yes</Button>
                        <Button onClick={() => setModalCancelSale(false)}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={modalRemove} setVisible={setModalRemove}>
                <div className="w-48">
                    <div className="text-red-700 text-center">Do you really want to delete this art?</div>
                    <div className="text-center">
                        <Button onClick={handleRemove}>Yes</Button>
                        <Button onClick={() => setModalRemove(false)}>No</Button>
                    </div>
                </div>
            </Modal>
            <Toolbar>
                <div className="self-end">
                    {!isNew && publicAddress && item && item.owner === publicAddress && parseInt(item.status) !== 0 ? <Button onClick={() => setModalResale(true)}>Ressale art</Button> : ""}
                    {!isNew && publicAddress && item && item.owner === publicAddress && parseInt(item.status) !== 0 ? <Button onClick={() => setModalRemove(true)}>Remove art</Button> : ""}
                    {!isNew && publicAddress && item && item.owner !== publicAddress ? <Button onClick={() => setModalConfirm(true)}>By this art</Button> : ""}
                    {isNew && publicAddress ? <Button onClick={handleSave}>Save and Close</Button> : ""}
                    {!isNew && publicAddress && item && item.owner === publicAddress && parseInt(item.status) === 0 ? <Button onClick={() => setModalCancelSale(true)}>Cancel the sale</Button> : ""}
                    <Button onClick={() => navigate('/')}>Close</Button>
                </div>
            </Toolbar>
            <div className="ml-5 flex flex-row">
                <div className="mt-5 w-1/3 border-2 rounded-md shadow-md shadow-gray-500 bg-white">
                    <a href={file}><Image src={file} alt="preview" /></a>
                </div>
                <Form>
                    {inputs && inputs.status !== 0
                        ? <div className="text-xl text-red-600 text-center underline">
                            Not on sale
                        </div>
                        : null
                    }
                    <Field
                        label="Token ID"
                        type="text"
                        name="id"
                        value={inputs && inputs.id ? inputs.id : ''}
                        disabled="disabled"
                    />
                    {isNew
                        ? <Field
                            label="File"
                            type="file"
                            name="image_url"
                            required="required"
                            accept="image/*"
                            onChange={handleChangeFile}
                        />
                        : null
                    }
                    <Field
                        label="Title"
                        type="text"
                        name="title"
                        value={inputs && inputs.title ? inputs.title : ''}
                        required="required"
                        onChange={handleChange}
                        disabled={!isNew}
                    />
                    <Field
                        label="Description"
                        type="text"
                        name="description"
                        value={inputs && inputs.description ? inputs.description : ''}
                        required="required"
                        onChange={handleChange}
                        disabled={!isNew}
                    />
                    <Field
                        label="Price (ETH)"
                        type="number"
                        name="price"
                        value={inputs && inputs.price ? inputs.price : ''}
                        required="required"
                        onChange={handleChange}
                        disabled={!isNew}
                    />
                    <Field
                        label="Date of creation"
                        type="text"
                        name="date_of_creation"
                        value={inputs && inputs.date_of_creation ? inputs.date_of_creation : ''}
                        required="required"
                        onChange={handleChange}
                        disabled="disabled"
                    />
                    <Field
                        label="Date of change"
                        type="text"
                        name="date_of_creation"
                        value={inputs && inputs.date_of_change ? inputs.date_of_change : ''}
                        required="required"
                        onChange={handleChange}
                        disabled="disabled"
                    />
                    <Field
                        label="Author"
                        type="text"
                        name="author"
                        value={author}
                        disabled="disabled"
                    />
                    <Field
                        label="Owner"
                        type="text"
                        name="author"
                        value={owner}
                        disabled="disabled"
                    />
                </Form>
            </div>
        </Layout >
    );
}

export default Art;