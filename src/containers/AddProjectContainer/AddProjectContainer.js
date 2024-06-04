import React, { useState } from 'react';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';
import ProjectTypeFixedComponent from '@/components/ProjectTypeFixedComponet/ProjectTypeFixedComponent';
import ViewProjectsConatainer from '../ViewProjectsContainer/ViewProjectsConatainer';
import ProjectTypeHourlyComponent from '@/components/ProjectTypeHourlyComponent/ProjectTypeHourlyComponent';

function AddProjectContainer() {

    const ProjectTypeOptions = [
        { value: 'Fixed', label: 'Fixed', id: 1 },
        { value: 'Hourly', label: 'Hourly', id: 2 },
    ];

    const [projectTypeId, setProjectTypeId] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [clientName, setClientName] = useState("");

    const handleIdChange = (id) => {
        setProjectTypeId(id);
    };

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    }

    const handleClientNameChange = (e) => {
        setClientName(e.target.value)
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-4">
                <label className="block mb-2">Project Name</label>
                <input type="text"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    onChange={handleProjectNameChange}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Client Name</label>
                <input type="text"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    onChange={handleClientNameChange}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Project Type</label>
                <DropDownComponent options={ProjectTypeOptions} setId={handleIdChange} />
            </div>

            {projectTypeId === 1 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Fixed Project Details</h2>
                    <ProjectTypeFixedComponent
                        Pname={projectName}
                        Cname={clientName}
                    />
                </div>
            )}

            {projectTypeId === 2 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Hourly Project Details</h2>
                    <ProjectTypeHourlyComponent
                        Pname={projectName}
                        Cname={clientName}
                    />
                </div>
            )}
        </main>
    );
}

export default AddProjectContainer;
