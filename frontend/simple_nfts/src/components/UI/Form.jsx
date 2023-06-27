const Form = ({ children, ...props }) => {
    return (
        <form {...props} className="mt-5 mr-auto ml-auto w-2/4 rounded-md bg-white shadow-md shadow-gray-500 pt-10">
            {children}
        </form>
    );
}

export default Form;