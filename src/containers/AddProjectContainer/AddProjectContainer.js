import React, { useContext, useEffect, useState } from 'react';
import DropDownComponent from '@/components/DropDownComponent/DropDownComponent';
import ProjectTypeFixedComponent from '@/components/ProjectTypeFixedComponet/ProjectTypeFixedComponent';
import ProjectTypeHourlyComponent from '@/components/ProjectTypeHourlyComponent/ProjectTypeHourlyComponent';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';
import { StaffDetailsContext } from '@/contexts/StaffDetailsContext';

function AddProjectContainer() {

    const { projectTypeDetails,
        GetProjectTypeDetails,
        GetManagersDetails,
        managersDetails,
    } = useContext(ProjectDetailsContext);

    const { GetStaffAPI, StaffData } = useContext(StaffDetailsContext);

    useEffect(() => {
        GetProjectTypeDetails();
        GetManagersDetails();
        GetStaffAPI();
    }, [])

    const [projectType, setProjectType] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [clientName, setClientName] = useState("");
    const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [TeamLeads, setTeamLeads] = useState([]);

    const handleProjectTypeChange = (data) => {
        setProjectType(data);
    };

    const handleManagerChange = (data) => {
        setManagers(data);
    }

    const handleTeamLeadChange = (data) => {
        setTeamLeads(data);
    }

    const handleEmpployeeChange = (data) => {
        setEmployees(data);
    }

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    }

    const handleClientNameChange = (e) => {
        setClientName(e.target.value);
    }


    const FilterManagerData = StaffData && StaffData.filter(person => person.designation === "Manager")
        .map((person) => ({
            id: person.id,
            name: `${person.name} - ${person.position}`
        }))

    const FilterEmployeeData = StaffData && StaffData.filter(person => person.designation === "Employee")
        .map((person) => ({
            id: person.id,
            name: `${person.name} - ${person.position}`
        }))

    const FilterTeamLeaderData = StaffData && StaffData.filter(person => person.designation === "Team Lead")
        .map((person) => ({
            id: person.id,
            name: `${person.name} - ${person.position}`
        }))

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
                <label className="block mb-2">Select Managers</label>
                <DropDownComponent options={FilterManagerData} setType={handleManagerChange} multi={true} />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Select Team Leaders</label>
                <DropDownComponent options={FilterTeamLeaderData} setType={handleTeamLeadChange} multi={true} />
            </div>


            <div className="mb-4">
                <label className="block mb-2">Select Employees</label>
                <DropDownComponent options={FilterEmployeeData} setType={handleEmpployeeChange} multi={true} />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Project Type</label>
                <DropDownComponent options={projectTypeDetails} setType={handleProjectTypeChange} multi={false} />
            </div>



            {projectType === "Fixed" && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Fixed Project Details</h2>
                    <ProjectTypeFixedComponent
                        Pname={projectName}
                        Cname={clientName}
                        manager={managers}
                        Ptype={projectType}
                        teamLeads={TeamLeads}
                        employees={employees}
                    />
                </div>
            )}

            {projectType === "Hourly" && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Hourly Project Details</h2>
                    <ProjectTypeHourlyComponent
                        Pname={projectName}
                        Cname={clientName}
                        manager={managers}
                        Ptype={projectType}
                        teamLeads={TeamLeads}
                        employees={employees}
                    />
                </div>
            )}
        </main>
    );
}

export default AddProjectContainer;
