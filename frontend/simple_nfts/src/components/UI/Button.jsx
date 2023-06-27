const Button = ({ children, ...props }) => {
    return (
        <button {...props} className="text-white border-2 border-blue-600 rounded-md px-3 py-1 m-1 bg-blue-600 shadow shadow-gray-700 hover:bg-blue-700">
            {children}
        </button>
    );
}

export default Button;