import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ArtList from "../components/UI/ArtList";
import Toolbar from "../components/UI/Toolbar";
import ArtForm from "../components/UI/ArtForm";
import Button from "../components/UI/Button";

const Self = () => {
    const navigate = useNavigate();
    const [art, setArt] = useState(null);
    const arts = [
        { status: 1, uri: 'http://127.0.0.1:8000/media/1.png', owner: '0xpublic_address1', price: 1000000000000000000, date_of_creation: '19.06.2023 00:01:01', title: 'Art 1' },
        { status: 1, uri: 'http://127.0.0.1:8000/media/2.png', owner: '0xpublic_address2', price: 1000000000000000000, date_of_creation: '19.06.2023 00:01:01', title: 'Art 2' },
        { status: 1, uri: 'http://127.0.0.1:8000/media/3.png', owner: '0xpublic_address3', price: 1000000000000000000, date_of_creation: '19.06.2023 00:01:01', title: 'Art 3' },
        { status: 1, uri: 'http://127.0.0.1:8000/media/4.png', owner: '0xpublic_address4', price: 1000000000000000000, date_of_creation: '19.06.2023 00:01:01', title: 'Art 4' },
        { status: 1, uri: 'http://127.0.0.1:8000/media/5.png', owner: '0xpublic_address5', price: 1000000000000000000, date_of_creation: '19.06.2023 00:01:01', title: 'Art 5' },
    ];
    return (
        <Layout>
            {
                art === null
                    ? <div>
                        <Toolbar>
                            <Button onClick={() => navigate('/new')}>Create new Art</Button>
                        </Toolbar>
                        <ArtList items={arts} setItem={(art) => setArt(art)} />
                    </div>
                    : <div>
                        <Toolbar>
                            <Button onClick={() => setArt(null)}>Back</Button>
                        </Toolbar>
                        <ArtForm item={art} />
                    </div>
            }
        </Layout>
    );
};

export default Self;