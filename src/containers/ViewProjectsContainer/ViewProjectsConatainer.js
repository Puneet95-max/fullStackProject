import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';

function ViewProjectsContainer() {
    const { GetProjectDetails, ProjectDetailsData } = useContext(ProjectDetailsContext);

    useEffect(() => {
        GetProjectDetails();
    }, []);

    const renderFixedProjectTable = () => {
        let serialNumber = 0; 

        return (
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200">ID</th>
                        <th className="px-4 py-2 bg-gray-200">Project Name</th>
                        <th className="px-4 py-2 bg-gray-200">Client Name</th>
                        <th className="px-4 py-2 bg-gray-200">Description</th>
                        <th className="px-4 py-2 bg-gray-200">Status</th>
                        <th className="px-4 py-2 bg-gray-200">Start Date</th>
                        <th className="px-4 py-2 bg-gray-200">End Date</th>
                        <th className="px-4 py-2 bg-gray-200">Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Fixed' && (
                            project.milestones.map((milestone, idx) => (
                                <tr key={`${index}_${idx}`} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{idx === 0 ? ++serialNumber : ''}</td>
                                    <td className="px-4 py-2">{idx === 0 ? project.project_name : ''}</td>
                                    <td className="px-4 py-2">{idx === 0 ? project.client_name : ''}</td>
                                    <td className="px-4 py-2">{milestone.description}</td>
                                    <td className="px-4 py-2">{milestone.status}</td>
                                    <td className="px-4 py-2">{format(new Date(milestone.start_date), 'dd-MM-yyyy')}</td>
                                    <td className="px-4 py-2">{format(new Date(milestone.end_date), 'dd-MM-yyyy')}</td>
                                    <td className="px-4 py-2">{idx === 0 ? project.created_at : ''}</td>
                                </tr>
                            ))
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
                        <th className="px-4 py-2 bg-gray-200">ID</th>
                        <th className="px-4 py-2 bg-gray-200">Project Name</th>
                        <th className="px-4 py-2 bg-gray-200">Client Name</th>
                        <th className="px-4 py-2 bg-gray-200">Start Date</th>
                        <th className="px-4 py-2 bg-gray-200">End Date</th>
                        <th className="px-4 py-2 bg-gray-200">Hourly Limit</th>
                        <th className="px-4 py-2 bg-gray-200">Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectDetailsData && ProjectDetailsData.map((project, index) => (
                        project.project_type === 'Hourly' && (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-2">{++serialNumber}</td>
                                <td className="px-4 py-2">{project.project_name}</td>
                                <td className="px-4 py-2">{project.client_name}</td>
                                <td className="px-4 py-2">{format(new Date(project.hourly_start_time), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">{format(new Date(project.hourly_end_time), 'dd-MM-yyyy')}</td>
                                <td className="px-4 py-2">{project.hourly_project_limit}</td>
                                <td className="px-4 py-2">{project.created_at}</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
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
        </main>
    );
}

export default ViewProjectsContainer;
