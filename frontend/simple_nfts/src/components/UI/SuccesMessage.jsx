const SuccessMessage = ({ children }) => {
    return (
        <div className="p-1 text-center text-green-500">
            {children}
        </div>
    );
}

export default SuccessMessage;