const Image = ({...props}) => {
    return (
        <img {...props} className="w-full h-full object-cover" />
    );
}

export default Image;