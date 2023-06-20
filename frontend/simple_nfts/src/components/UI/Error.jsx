const Error = ({error}) => {
    return (
        <div className="p-5 flex justify-between text-red-500">
            {error}
        </div>
    );
}

export default Error;