const SmallImage = ({...props}) => {
    return (
        <img {...props} className="w-full h-full object-cover w-56 h-60 my-1" />
    );
}

export default SmallImage;