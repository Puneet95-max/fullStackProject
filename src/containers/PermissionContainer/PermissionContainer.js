"use client"
import React, { useContext, useEffect, useState } from 'react';
import { RolesAndPermissionContext } from '@/contexts/RolesAndPermissioContext';

const PermissionContainer = () => {
    const { rolesData, GetRolesAndPermissionDataAPI } = useContext(RolesAndPermissionContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newPermissions, setNewPermissions] = useState([{ action: '', subject: '' }]);
    const [selectedRoleName, setSelectedRoleName] = useState('');

    const { CreatePermissionsAPI } = useContext(RolesAndPermissionContext);

    useEffect(() => {
        // Fetch roles and permissions data when component mounts
        GetRolesAndPermissionDataAPI();
    }, []);

    const handleAddNewClick = (roleName) => {
        setSelectedRoleName(roleName);
        setIsPopupOpen(true);
    };

    const handleSaveClick = () => {
        // Format the data to include the role's name and new permissions
        const data = {
            name: selectedRoleName,
            permissions: newPermissions
        };

        if (selectedRoleName === 'admin') {
            CreatePermissionsAPI(1, data)
        } else if (selectedRoleName === 'manager') {
            CreatePermissionsAPI(2, data)
        } else {
            CreatePermissionsAPI(3, data)
        }
        // Handle the save action here
        // CreatePermissionsAPI()


        // Close the popup after saving
        setIsPopupOpen(false);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPermissions = [...newPermissions];
        updatedPermissions[index][name] = value;
        setNewPermissions(updatedPermissions);
    };

    const handleAddMoreClick = () => {
        setNewPermissions([...newPermissions, { action: '', subject: '' }]);
    };

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            const role = parsedUserData.user.role.name;
            setUserRole(role);
        }
    }, []);


    return (
        <main className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Roles and Permissions</h1>
            {rolesData && rolesData.map(role => (
                <div key={role.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Role: {role.name}</h2>
                    <div className="mb-2">
                        <h3 className="font-semibold mb-1">Permissions:</h3>
                        <ul className="list-disc pl-4">
                            {role.permissions.map(permission => (
                                <li key={permission.id}>
                                    {permission.action} - {permission.subject}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {
                      (userRole === 'admin' || userRole === 'manager') && <div className="flex justify-end">
                            <button
                                onClick={() => handleAddNewClick(role.name)}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Add New
                            </button>
                            {/* <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                                Delete
                            </button> */}
                        </div>
                    }
                </div>
            ))}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-3xl h-3/4 overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Add New Permission</h2>
                        {newPermissions.map((permission, index) => (
                            <div key={index} className="mb-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Action</label>
                                    <select
                                        name="action"
                                        value={permission.action}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    >
                                        <option value="">Select action</option>
                                        <option value="create">Create</option>
                                        <option value="delete">Delete</option>
                                        <option value="edit">Edit</option>
                                        <option value="read">Read</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={permission.subject}
                                        onChange={(e) => handleInputChange(index, e)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between mb-4">
                            <button
                                onClick={handleAddMoreClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Add More
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default PermissionContainer;
