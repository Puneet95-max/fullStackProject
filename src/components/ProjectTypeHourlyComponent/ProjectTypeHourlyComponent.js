import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';
import { format } from 'date-fns';

const ProjectTypeHourlyComponent = ({ Pname, Cname, Ptype, manager, teamLeads, employees, hourlyProjectLimit,
    hourlyStartTime, hourlyEndTime }) => {

    const [startDate, setStartDate] = useState(hourlyStartTime || null);
    const [endDate, setEndDate] = useState(hourlyEndTime || null);
    const [hourlyLimit, setHourlyLimit] = useState(hourlyProjectLimit || " ");

    const { hData, setHData, CreateProject , UpdateProjectAPI , editProject } = useContext(ProjectDetailsContext);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleHourlyLimitChange = (event) => {
        setHourlyLimit(event.target.value);
    };

    const handleSave = () => {
        const data = {
            project_name: Pname,
            client_name: Cname,
            hourly_start_time: format(startDate, 'yyyy-MM-dd'),
            hourly_end_time: format(endDate, 'yyyy-MM-dd'),
            hourly_project_limit: parseInt(hourlyLimit),
            managers: manager,
            project_type: Ptype,
            milestones: [],
            employee: employees,
            team_lead: teamLeads,
        };
    
        if (editProject) {
            // Call update API if editProject exists
            UpdateProjectAPI(editProject.id, data);
        } else {
            // Call create API if editProject does not exist
            CreateProject(data);
        }
    };
    
    return (
        <div className="container mx-auto p-6 border-2">
            <h2 className="text-lg font-semibold mb-4">Project Type: Hourly</h2>
            <div className="mb-4">
                <label className="block mb-2">Hourly Limit:</label>
                <input
                    type="number"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    placeholder="Enter hourly limit"
                    value={hourlyLimit}
                    onChange={handleHourlyLimitChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Select Start Date:</label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select start date"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Select End Date:</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select end date"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default ProjectTypeHourlyComponent;
