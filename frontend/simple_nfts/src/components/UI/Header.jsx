import { Link } from 'react-router-dom'
import Logo from './Logo';

const Header = () => {
    return (
        <div className="h-20 bg-sky-700 text-white flex flex-row items-center">
            <div className="ml-10 flex flex-row items-center justify-center">
                <Logo />
                <div className="text-3xl">
                    Simple NFTs
                </div>
            </div>
            <nav className="grow flex flex-row items-center justify-center text-xl">
                <Link className="p-5" to="/">Home</Link>
                <Link className="p-5" to="/self">Your arts</Link>
                <Link className="p-5" to="/signin">Sign In</Link>
                <Link className="p-5" to="/signup">Sign Up</Link>
            </nav>
            <div className="mr-10">
                <div className="text-center">ksmakov@gmail.com</div>
                <div className="flex flex-row items-center justify-between">
                    <Link to="/profile">profile</Link>
                    <Link to="/logout">logout</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;