import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import StartDateAndEndDateComponent from '../StartDateAndEndDateComponent/StartDateAndEndDataComponent';
import { ProjectDetailsContext } from '@/contexts/ProjectDetailsContext';
import { format } from 'date-fns';

const ProjectTypeFixedComponent = ({ Pname, Cname, manager, Ptype, teamLeads, employees, milestones, editProject }) => {
  const [items, setItems] = useState(milestones || [{ description: '', start_date: null, end_date: null, status: '' }]);
  const {
    milstoneStatusData,
    GetMilstoneOptionsData,
    CreateProject,
    UpdateProjectAPI,
  } = useContext(ProjectDetailsContext);

  useEffect(() => {
    GetMilstoneOptionsData();
  }, []);

  const addMoreFields = () => {
    setItems([...items, { description: '', start_date: null, end_date: null, status: '' }]);
  };

  const handleDescriptionChange = (index, description) => {
    const newItems = [...items];
    newItems[index].description = description;
    setItems(newItems);
  };

  const handleStartDateChange = (index, date) => {
    const newItems = [...items];
    newItems[index].start_date = date ? format(date, 'yyyy-MM-dd') : null;
    setItems(newItems);
  };

  const handleEndDateChange = (index, date) => {
    const newItems = [...items];
    newItems[index].end_date = date ? format(date, 'yyyy-MM-dd') : null;
    setItems(newItems);
  };

  const handleStatusChange = (index, selectedOption) => {
    const newItems = [...items];
    newItems[index].status = selectedOption.value;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    const formattedItems = items.map(item => ({
      ...item,
      start_date: item.start_date ? format(new Date(item.start_date), 'yyyy-MM-dd') : null,
      end_date: item.end_date ? format(new Date(item.end_date), 'yyyy-MM-dd') : null,
    }));

    const data = {
      project_name: Pname,
      client_name: Cname,
      milestones: formattedItems,
      managers: manager,
      project_type: Ptype,
      employee: employees,
      team_lead: teamLeads,
    };

    if (editProject) {
      UpdateProjectAPI(editProject.id, data);
    } else {
      CreateProject(data);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded p-4 mb-4">
          <h2 className="text-lg font-semibold">Milestone {index + 1}</h2>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
          </div>
          <StartDateAndEndDateComponent
            startDate={item.start_date}
            endDate={item.end_date}
            handleStartDateChange={(date) => handleStartDateChange(index, date)}
            handleEndDateChange={(date) => handleEndDateChange(index, date)}
          />
          <div className="mb-4">
            <label className="block mt-5 py-2">Status:</label>
            <Select
              value={milstoneStatusData && milstoneStatusData.find((option) => option.value === item.status)}
              onChange={(selectedOption) => handleStatusChange(index, selectedOption)}
              options={milstoneStatusData}
              className="w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-end">
        <button onClick={addMoreFields} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4">
          Add More
        </button>
        <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </main>
  );
};

export default ProjectTypeFixedComponent;
