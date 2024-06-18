import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '@/contexts/UserDetailsContext';

function ViewAllReportContainer() {
    const { GetAllUsersReportData, allUsersReportData } = useContext(UserDetailContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        GetAllUsersReportData();
    }, []);

    const handleButtonClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <main className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">All Users Report</h1>
            {allUsersReportData && allUsersReportData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">ID</th>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">User</th>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">Project Name</th>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">Status</th>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">Report Submitted</th>
                                <th className="py-2 px-4 border-b bg-gray-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsersReportData.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center">{task.id}</td>
                                    <td className="py-2 px-4 border-b text-center">{task.user.username}</td>
                                    <td className="py-2 px-4 border-b text-center">{task.project_name}</td>
                                    <td className="py-2 px-4 border-b text-center">{task.status}</td>
                                    <td className="py-2 px-4 border-b text-center">{task.created_at}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            onClick={() => handleButtonClick(task)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No report data available.</p>
            )}

            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
                        <div className="space-y-2">
                            <p><strong>User:</strong> {selectedTask.user.username}</p>
                            <p><strong>Project Name:</strong> {selectedTask.project_name}</p>
                            <p><strong>Task:</strong> {selectedTask.task}</p>
                            <p><strong>Description:</strong> {selectedTask.description}</p>
                            <p><strong>Status:</strong> {selectedTask.status}</p>
                            <p><strong>Report Submitted:</strong> {selectedTask.created_at}</p>
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ViewAllReportContainer;
