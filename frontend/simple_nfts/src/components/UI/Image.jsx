const Image = ({ ...props }) => {
    return (
        <img {...props} className="w-full h-full" alt="preview" />
    );
}

export default Image;