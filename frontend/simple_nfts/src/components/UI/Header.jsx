import { Link } from 'react-router-dom'
import Logo from './Logo';
import { useEffect, useState } from 'react';

const Header = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(sessionStorage.getItem('username'));
    }, []);

    return (
        <div className="h-20 bg-blue-800 text-white flex flex-row items-center">
            <div className="ml-10 flex flex-row items-center justify-center">
                <Logo />
            </div>
            <nav className="grow flex flex-row items-center justify-center text-xl">
                <Link className="p-5" to="/">Home</Link>
                <Link className="p-5" to="/signin">Sign In</Link>
                <Link className="p-5" to="/signup">Sign Up</Link>
            </nav>
            {username
                ? <div className='flex flex-row items-center'>
                    <div className='font-medium mr-10'>{username}</div>
                    <div className="self-end mr-3">
                        <Link className="underline mr-5" to="/profile">profile</Link>
                        <Link className="underline" to="/logout">logout</Link>
                    </div>
                </div>
                : null}
        </div>
    );
}

export default Header;