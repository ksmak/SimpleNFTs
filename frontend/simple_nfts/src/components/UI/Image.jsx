const Image = ({ ...props }) => {
    return (
        <img {...props} className="w-full h-full object-contain" alt="preview" />
    );
}

export default Image;