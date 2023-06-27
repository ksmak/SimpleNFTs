const Image = ({ ...props }) => {
    return (
        <img {...props} className="w-full h-full object-fill" alt="preview" />
    );
}

export default Image;