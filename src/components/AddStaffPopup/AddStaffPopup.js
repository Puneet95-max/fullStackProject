import React, { useState } from 'react';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';

function AddStaffPopup({ isOpen, onClose, onSave, designationOptions, positionOptions }) {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [position, setPosition] = useState('');

    const handleSave = () => {
        const data = { name, designation, position };
        onSave(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/2">
                <h2 className="text-xl mb-4">Add New Staff</h2>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Enter name'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Designation</label>
                    <DropDownComponent options={designationOptions} setType={setDesignation} multi={false} />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Position</label>
                    <DropDownComponent options={positionOptions} setType={setPosition} multi={false} />
                </div>
                <div className='flex justify-end space-x-4'>
                    <button onClick={onClose} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'>Cancel</button>
                    <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddStaffPopup;
