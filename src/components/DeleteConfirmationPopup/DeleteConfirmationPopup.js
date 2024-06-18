import React from 'react';

function DeleteConfirmationPopup({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4">Are you sure you want to delete this project?</h2>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationPopup;
