const ErrorMessage = ({ children }) => {
    return (
        <div className="p-1 text-center text-red-500">
            {children}
        </div>
    );
}

export default ErrorMessage;