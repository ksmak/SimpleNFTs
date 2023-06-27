import React from 'react';

const Modal = ({ children, visible, setVisible }) => {
    return (
        <div className={["fixed top-0 bottom-0 left-0 right-0 bg-white", (visible ? "flex justify-center items-center m-auto w-min h-min" : "hidden")].join(' ')} onClick={() => setVisible(false)}>
            <div className="p-10 bg-white border-2 border-blue-700 rounded min-w-min" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;