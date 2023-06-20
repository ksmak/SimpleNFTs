const Toolbar = ({children, ...props}) => {
    return (
        <div {...props} className="border-sky-200 border-b-2 h-24 pr-20 py-5 flex flex-col">
            {children}
        </div>
    );
} 

export default Toolbar;