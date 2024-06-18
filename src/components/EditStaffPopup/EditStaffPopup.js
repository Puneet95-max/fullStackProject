import React, { useState, useEffect } from 'react';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';

function EditStaffPopup({ isOpen, onClose, staffData, onSave , designationOptions, positionOptions  }) {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {
        if (staffData) {
            setName(staffData.name);
            setDesignation(staffData.designation);
            setPosition(staffData.position);
        }
    }, [staffData]);

    const handleSave = () => {
        onSave({ ...staffData, name, designation, position });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4">Edit Staff</h2>
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
                    <DropDownComponent options={designationOptions} setType={setDesignation} multi={false}  preselectedValues={designation}  />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Position</label>
                    <DropDownComponent options={positionOptions} setType={setPosition} multi={false}   preselectedValues={position}/>
                </div>
                <div className='flex justify-end space-x-4'>
                    <button onClick={onClose} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'>Cancel</button>
                    <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditStaffPopup;
