const Toolbar = ({ children, ...props }) => {
    return (
        <div {...props} className="border-blue-200 border-b-2 p-3 flex flex-col">
            {children}
        </div>
    );
}

export default Toolbar;