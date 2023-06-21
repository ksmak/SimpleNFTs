import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        setInterval(
            navigate('/'),
            5000
        );
    });

    return (
        <Layout>
            <div className="mt-20 text-center font-medium text-2xl">User logout</div>
        </Layout>
    );
}

export default Logout;