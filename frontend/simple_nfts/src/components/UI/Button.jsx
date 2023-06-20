const Button = ({children, ...props}) => {
    return (
        <button {...props} className="text-white self-end border-2 border-sky-400 rounded-md p-1 px-5 text-2xl bg-sky-400 shadow shadow-gray-700 hover:bg-sky-500">
            {children}
        </button>
    );
}

export default Button;