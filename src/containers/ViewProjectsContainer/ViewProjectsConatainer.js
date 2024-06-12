import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';
import PopUpComponent from '@/components/PopUpComponent/PopUpComponent';

function ViewProjectsContainer() {
    const { GetProjectDetails, ProjectDetailsData } = useContext(ProjectDetailsContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [isMilestonePopupOpen, setIsMilestonePopupOpen] = useState(false);

    useEffect(() => {
        GetProjectDetails();
    }, []);

    const handleViewStaff = (project) => {
        setSelectedProject(project);
        setIsPopupOpen(true);
    };

    const handleViewMilestones = (milestones) => {
        setSelectedMilestone(milestones);
        setIsMilestonePopupOpen(true);
    };

    const handleEditProject = (project) => {
        // Handle edit project logic here
        console.log('Edit project:', project);
    };

    const handleDeleteProject = (projectId) => {
        // Handle delete project logic here
        console.log('Delete project with id:', projectId);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProject(null);
    };

    const closeMilestonePopup = () => {
        setIsMilestonePopupOpen(false);
        setSelectedMilestone(null);
    };

    const renderFixedProjectTable = () => {
        let serialNumber = 0;

        return (
            <table className="w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 border">Serial No</th>
                        <th className="px-4 py-2 border">Project Name</th>
                        <th className="px-4 py-2 border">Client Name</th>
                        <th className="px-4 py-2 border">Created Date</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Fixed' && (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2 text-center">{++serialNumber}</td>
                                <td className="px-4 py-2">{project.project_name}</td>
                                <td className="px-4 py-2">{project.client_name}</td>
                                <td className="px-4 py-2">{format(new Date(project.created_at), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2 space-x-2 text-center">
                                    <button
                                        onClick={() => handleViewStaff(project)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        View Staff
                                    </button>
                                    <button
                                        onClick={() => handleViewMilestones(project.milestones)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        View Milestones
                                    </button>
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        Delete
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
            <table className="w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 border">Serial No</th>
                        <th className="px-4 py-2 border">Project Name</th>
                        <th className="px-4 py-2 border">Client Name</th>
                        <th className="px-4 py-2 border">Created Date</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Hourly' && (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2 text-center">{++serialNumber}</td>
                                <td className="px-4 py-2">{project.project_name}</td>
                                <td className="px-4 py-2">{project.client_name}</td>
                                <td className="px-4 py-2">{format(new Date(project.created_at), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2 space-x-2 text-center">
                                    <button
                                        onClick={() => handleViewStaff(project)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        View Staff
                                    </button>
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        );
    };

    const renderStaffDetails = () => (
        <>
            <p className="mb-2"><strong>Managers:</strong> {selectedProject.managers.map(manager => manager.name).join(', ')}</p>
            <p className="mb-2"><strong>Team Leads:</strong> {selectedProject.team_lead.map(lead => lead.name).join(', ')}</p>
            <p className="mb-2"><strong>Employees:</strong> {selectedProject.employee.map(emp => emp.name).join(', ')}</p>
        </>
    );

    const renderMilestoneDetails = () => (
        <table className="w-full table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                </tr>
            </thead>
            <tbody>
                {selectedMilestone.map((milestone, index) => (
                    <tr key={index} className="border-b">
                        <td className="px-4 py-2">{milestone.description}</td>
                        <td className="px-4 py-2">{milestone.status}</td>
                        <td className="px-4 py-2">{format(new Date(milestone.start_date), 'dd-MM-yyyy')}</td>
                        <td className="px-4 py-2">{format(new Date(milestone.end_date), 'dd-MM-yyyy')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Fixed Type Projects</h2>
                {renderFixedProjectTable()}
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Hourly Type Projects</h2>
                {renderHourlyProjectTable()}
            </section>
            <PopUpComponent
                isOpen={isPopupOpen}
                onClose={closePopup}
                title="Staff Details"
            >
                {selectedProject && renderStaffDetails()}
            </PopUpComponent>
            <PopUpComponent
                isOpen={isMilestonePopupOpen}
                onClose={closeMilestonePopup}
                title="Milestone Details"
            >
                {selectedMilestone && renderMilestoneDetails()}
            </PopUpComponent>
        </main>
    );
}

export default ViewProjectsContainer;
