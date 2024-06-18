import React, { useContext, useState, useEffect } from 'react';
import { StaffDetailsContext } from '@/contexts/StaffDetailsContext';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';
import EditStaffPopup from '@/components/EditStaffPopup/EditStaffPopup';
import DeleteConfirmationPopup from '@/components/DeleteConfirmationPopup/DeleteConfirmationPopup';
import AddStaffPopup from '@/components/AddStaffPopup/AddStaffPopup';

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

function AddStaffContainer() {
    const { AddStaffAPI, GetStaffAPI, StaffData, UpdateStaffAPI, DeleteStaffAPI } = useContext(StaffDetailsContext);

    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    const handleEdit = (staff) => {
        setSelectedStaff(staff);
        setIsEditPopupOpen(true);
    };

    const handleDelete = (staff) => {
        setSelectedStaff(staff);
        setIsDeletePopupOpen(true);
    };

    const confirmDelete = () => {
        if (selectedStaff) {
            DeleteStaffAPI(selectedStaff.id);
            setIsDeletePopupOpen(false);
            setSelectedStaff(null);
        }
    };

    const saveEdit = (staff) => {
        UpdateStaffAPI(staff.id, staff);
        setIsEditPopupOpen(false);
        setSelectedStaff(null);
    };

    const saveAdd = (staff) => {
        AddStaffAPI(staff);
        setIsAddPopupOpen(false);
    };

    useEffect(() => {
        GetStaffAPI();
    }, []);

    return (
        <main className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Staff List</h2>
            <div className='flex justify-end my-4'>
                <button
                    onClick={() => setIsAddPopupOpen(true)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition duration-300'
                >
                    Add Staff
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Designation</th>
                            <th className="py-3 px-6 text-left">Position</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {StaffData && StaffData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center">No staff data available</td>
                            </tr>
                        ) : (
                            StaffData && StaffData.map((staff, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{staff.name}</td>
                                    <td className="py-3 px-6">{staff.designation}</td>
                                    <td className="py-3 px-6">{staff.position}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() => handleEdit(staff)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(staff)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <EditStaffPopup
                isOpen={isEditPopupOpen}
                onClose={() => setIsEditPopupOpen(false)}
                staffData={selectedStaff}
                onSave={saveEdit}
                designationOptions={DesignationOptions}
                positionOptions={PositionOptions}
            />

            <DeleteConfirmationPopup
                isOpen={isDeletePopupOpen}
                onClose={() => setIsDeletePopupOpen(false)}
                onConfirm={confirmDelete}
            />

            <AddStaffPopup
                isOpen={isAddPopupOpen}
                onClose={() => setIsAddPopupOpen(false)}
                onSave={saveAdd}
                designationOptions={DesignationOptions}
                positionOptions={PositionOptions}
            />
        </main>
    );
}

export default AddStaffContainer;
