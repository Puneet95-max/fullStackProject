"use client"
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';


function ViewProjectsContainer() {

    const { GetProjectDetails, ProjectDetailsData } = useContext(ProjectDetailsContext);

    useEffect(() => {
        if (!ProjectDetailsData) {
            GetProjectDetails();
        }
    }, []);

    const { fData, hData } = useContext(ProjectDetailsContext);

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Fixed Type Project</h2>
                {fData ? (
                    <div className="bg-white p-4 rounded shadow">
                        <div className="mb-4">
                            <span className="font-semibold">Project Name:</span> {fData.project_name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Client Name:</span> {fData.client_name}
                        </div>
                        <div>
                            <span className="font-semibold">Project Details:</span>
                            {fData.project_details.map((item, index) => (
                                <div key={index} className="bg-gray-100 p-2 rounded mt-2">
                                    <div><span className="font-semibold">Description:</span> {item.description}</div>
                                    <div><span className="font-semibold">Start Date:</span> {format(item.startDate, 'dd-MM-yyyy')}</div>
                                    <div><span className="font-semibold">End Date:</span> {format(item.endDate, 'dd-MM-yyyy')}</div>
                                    <div><span className="font-semibold">Status:</span> {item.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded shadow">There are currently no fixed type projects</div>
                )}
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Hourly Type Project</h2>
                {hData ? (
                    <div className="bg-white p-4 rounded shadow">
                        <div className="mb-4">
                            <span className="font-semibold">Project Name:</span> {hData.project_name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Client Name:</span> {hData.client_name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Start Date:</span> {format(hData.startDate, 'dd-MM-yyyy')}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">End Date:</span> {format(hData.endDate, 'dd-MM-yyyy')}
                        </div>
                        <div>
                            <span className="font-semibold">Hourly Limit:</span> {hData.hourlyLimit}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded shadow">There is currently no hourly type project</div>
                )}
            </section>
        </main>
    );
}

export default ViewProjectsContainer;
