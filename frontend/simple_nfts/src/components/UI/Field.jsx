const Field = ({ label, ...props }) => {
    const { id } = { ...props };
    return (
        <div className="p-3 flex justify-between">
            <label className="mr-2" htmlFor={id}>{label}</label>
            <input {...props} className="w-3/4 p-1 border-2 rounded-md focus:border-sky-300" />
        </div>
    );
}

export default Field;