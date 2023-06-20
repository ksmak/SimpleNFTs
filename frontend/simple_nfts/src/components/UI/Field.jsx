const Field = ({fieldtype, fieldname, labelname, value}) => {
    return (
        <div className="p-5 flex justify-between">
            <label className="mr-2" htmlFor={fieldname}>{labelname}</label>
            <input className="w-3/4 p-1 border-2 rounded-md focus:border-sky-300" type={fieldtype} name={fieldname} id={fieldname} value={value} />
        </div>
    );
}

export default Field;