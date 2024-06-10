import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';

function ViewProjectsContainer() {
    const { GetProjectDetails, ProjectDetailsData } = useContext(ProjectDetailsContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        GetProjectDetails();
    }, []);

    const handleViewStaff = (project) => {
        setSelectedProject(project);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProject(null);
    };

    const renderFixedProjectTable = () => {
        let serialNumber = 0;

        // Find the maximum number of milestones any project has
        const maxMilestones = ProjectDetailsData && Math.max(...ProjectDetailsData.map(project => project.milestones.length), 0);

        return (
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200">Serial No</th>
                        <th className="px-4 py-2 bg-gray-200">Project ID</th>
                        <th className="px-4 py-2 bg-gray-200">Project Name</th>
                        <th className="px-4 py-2 bg-gray-200">Client Name</th>
                        {[...Array(maxMilestones)].map((_, idx) => (
                            <th key={idx} className="px-4 py-2 bg-gray-200">Milestone {idx + 1}</th>
                        ))}
                        <th className="px-4 py-2 bg-gray-200">Created Date</th>
                        <th className="px-4 py-2 bg-gray-200">View Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Fixed' && (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-2">{++serialNumber}</td>
                                <td className="px-4 py-2">{project.id}</td>
                                <td className="px-4 py-2">{project.project_name}</td>
                                <td className="px-4 py-2">{project.client_name}</td>
                                {project.milestones.map((milestone, idx) => (
                                    <td key={idx} className="px-4 py-2">
                                        <div>Description: {milestone.description}</div>
                                        <div>Status: {milestone.status}</div>
                                        <div>Start: {format(new Date(milestone.start_date), 'dd-MM-yyyy')}</div>
                                        <div>End: {format(new Date(milestone.end_date), 'dd-MM-yyyy')}</div>
                                    </td>
                                ))}
                                {/* Fill remaining milestone columns if less than max */}
                                {[...Array(maxMilestones - project.milestones.length)].map((_, idx) => (
                                    <td key={`empty_${idx}`} className="px-4 py-2">-</td>
                                ))}
                                <td className="px-4 py-2">{format(new Date(project.created_at), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewStaff(project)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View Staff
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        );
    };

    const renderHourlyProjectTable = () => {
        let serialNumber = 0;

        return (
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200">Serial No</th>
                        <th className="px-4 py-2 bg-gray-200">Project ID</th>
                        <th className="px-4 py-2 bg-gray-200">Project Name</th>
                        <th className="px-4 py-2 bg-gray-200">Client Name</th>
                        <th className="px-4 py-2 bg-gray-200">Start Date</th>
                        <th className="px-4 py-2 bg-gray-200">End Date</th>
                        <th className="px-4 py-2 bg-gray-200">Hourly Limit</th>
                        <th className="px-4 py-2 bg-gray-200">Created Date</th>
                        <th className="px-4 py-2 bg-gray-200">View Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Hourly' && (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-2">{++serialNumber}</td>
                                <td className="px-4 py-2">{project.id}</td>
                                <td className="px-4 py-2">{project.project_name}</td>
                                <td className="px-4 py-2">{project.client_name}</td>
                                <td className="px-4 py-2">{format(new Date(project.hourly_start_time), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">{format(new Date(project.hourly_end_time), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">{project.hourly_project_limit}</td>
                                <td className="px-4 py-2">{format(new Date(project.created_at), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewStaff(project)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View Staff
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        );
    };

    const renderStaffPopup = () => {
        if (!selectedProject) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                    <h3 className="text-xl font-bold mb-4">Staff Details</h3>
                    <p><strong>Managers:</strong> {selectedProject.managers.map(manager => manager.name).join(', ')}</p>
                    <p><strong>Team Leads:</strong> {selectedProject.team_lead.map(lead => lead.name).join(', ')}</p>
                    <p><strong>Employees:</strong> {selectedProject.employee.map(emp => emp.name).join(', ')}</p>
                    <button
                        onClick={closePopup}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Fixed Type Projects</h2>
                {renderFixedProjectTable()}
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Hourly Type Projects</h2>
                {renderHourlyProjectTable()}
            </section>
            {isPopupOpen && renderStaffPopup()}
        </main>
    );
}

export default ViewProjectsContainer;
