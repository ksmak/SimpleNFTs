import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import ArtList from "../components/UI/ArtList";
import Toolbar from "../components/UI/Toolbar";
import Button from "../components/UI/Button";
import { useFilterArts } from "../components/hooks/useFilterArts";
import { getWeb3, getContract } from '../api/contract/index';
import { setArts } from "../components/slices/simpleArtsSlice";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [publicAddress, setPublicAddress] = useState();
    const [filter, setFilter] = useState(null);

    const arts = useSelector(state => state.simpleArts.arts);
    const filterArts = useFilterArts(arts, filter);

    useEffect(() => {
        setPublicAddress(sessionStorage.getItem('public_address'));
        setUsername(sessionStorage.getItem('username'));

        const initWeb3 = async () => {
            const web3 = await getWeb3();
            const contract = await getContract(web3);
            await contract.methods.getAllArts().call({
                from: web3.utils.toChecksumAddress(process.env.REACT_APP_OWNER_ADDRESS)
            })
                .then(result => {
                    dispatch(setArts(result));
                })
                .catch(error => {
                    console.log(error);
                });

        }
        initWeb3();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout>
            {
                username
                    ? <Toolbar>
                        < div className="w-full flex flex-row items-center justify-between">
                            <div>
                                <span onClick={() => setFilter(null)} className={["text-xl mr-12 text-blue-900 hover: cursor-pointer", (filter === null ? "underline" : "")].join(' ')}>All</span>
                                <span onClick={() => setFilter(publicAddress)} className={["text-xl mr-12 text-blue-900 hover: cursor-pointer", (filter !== null ? "underline" : "")].join(' ')}>Your arts</span>
                            </div>
                            <Button onClick={() => navigate('/item', { state: { isNew: true } })}>Create new Art</Button>
                        </div>
                    </Toolbar >
                    : ""}
            <ArtList items={filterArts} />
        </Layout>
    );
};

export default Main;