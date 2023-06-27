const ArtItem = ({ children, ...props }) => {
    return (
        <div {...props} className="bg-white m-5 border-2 rounded-md shadow-md shadow-gray-500 w-60 h-80 flex flex-col items-center hover:border-gray-400 cursor-pointer">
            {children}
        </div>
    );
}

export default ArtItem;