"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ProfileContainer() {
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                setUserDetails(parsedUserData.user);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleLogout = async () => {
        sessionStorage.clear(); // Clear all sessionStorage
        try {
            await router.replace('/login');
            window.location.reload();
        } catch (error) {
            console.error('Failed to redirect to login:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-1/2 lg:w-1/3">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your Profile</h2>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
                {userDetails ? (
                    <div>
                        <div className="mb-4">
                            <p className="text-gray-700 font-semibold">Email:</p>
                            <p className="text-gray-800">{userDetails.username}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 font-semibold">Role:</p>
                            <p className="text-gray-800">{userDetails.role.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold">Permissions:</p>
                            <ul className="list-disc ml-4">
                                {userDetails.role.permissions.map(permission => (
                                    <li key={permission.id} className="text-gray-800">
                                        {permission.action} - {permission.subject}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700">Loading user details...</p>
                )}
            </div>
        </div>
    );
}

export default ProfileContainer;
