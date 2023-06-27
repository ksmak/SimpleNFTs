const SmallImage = ({ ...props }) => {
    return (
        <img {...props} className="w-56 h-56 my-1 border-2" alt="preview" />
    );
}

export default SmallImage;