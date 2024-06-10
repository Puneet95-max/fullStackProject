import React, { useContext, useState } from 'react';
import { StaffDetailsContext } from '@/contexts/StaffDetailsContext';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';

function AddStaffContainer() {
    const { AddStaffAPI } = useContext(StaffDetailsContext);

    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [position, setPosition] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleApi = () => {
        const data = {
            name: name,
            designation: designation,
            position: position,
        };

        AddStaffAPI(data);
    };

    const handleDesignationChange = (data) => {
        setDesignation(data);
    };

    const handlePositionChange = (data) => {
        setPosition(data);
    };

    const DesignationOptions = [
        { id: 1, name: "Manager" },
        { id: 2, name: "Employee" },
        { id: 4, name: "Team Lead" },
    ];

    const PositionOptions = [
        { id: 1, name: "Developer" },
        { id: 2, name: "Graphic Designer" },
        { id: 3, name: "SEO" },
        { id: 4, name: "Sr Developer" },
    ];

    return (
        <main className='container mx-auto mt-8'>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-2xl font-bold mb-6'>Add New Staff</h2>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Enter name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Designation</label>
                    <DropDownComponent options={DesignationOptions} setType={handleDesignationChange} multi={false} />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Position</label>
                    <DropDownComponent options={PositionOptions} setType={handlePositionChange} multi={false} />
                </div>

                <div className='flex justify-end'>
                    <button type='submit' onClick={handleApi} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Save
                    </button>
                </div>
            </div>
        </main>
    );
}

export default AddStaffContainer;
