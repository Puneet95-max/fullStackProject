// Popup.js
import React from 'react';

function PopUpComponent({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <div>{children}</div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default PopUpComponent;



