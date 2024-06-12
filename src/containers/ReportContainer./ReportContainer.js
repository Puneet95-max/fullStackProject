import React, { useContext, useState } from 'react';
import { UserDetailContext } from '@/contexts/UserDetailsContext';
import Link from 'next/link'

function ReportContainer({ id }) {

    const { CreateDailyReport } = useContext(UserDetailContext)
    const [tasks, setTasks] = useState([{ project_name: '', task: '', description: '', status: '' }]);

    const handleTaskChange = (index, key, value) => {
        const newTasks = [...tasks];
        newTasks[index][key] = value;
        setTasks(newTasks);
    };

    const handleAddMore = () => {
        setTasks([...tasks, { project_name: '', task: '', description: '', status: '' }]);
    };

    const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleSave = () => {
        const data = {
            "tasks": tasks
        }
        CreateDailyReport(id, data);
    }

    return (
        <main className='h-screen px-6 py-4'>
            <div className='flex justify-between mb-4'>
                <Link href={'/view-reports'}>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>
                        All Reports
                    </button>
                </Link>

                <div className="flex items-center">
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>
                        Get Report by Date
                    </button>
                    <input type="date" className="ml-2 border border-gray-300 rounded-md p-1" />
                </div>
            </div>
            <div className='text-center font-bold text-3xl mb-8'>Daily Report</div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className='mb-6 border-2 border-black p-5'>
                        <label htmlFor={`project_name-${index}`} className='block mb-2 font-semibold'>Project Name:</label>
                        <input
                            type='text'
                            id={`project_name-${index}`}
                            value={task.project_name}
                            onChange={(e) => handleTaskChange(index, 'project_name', e.target.value)}
                            className='w-full border border-gray-300 rounded-md p-2'
                        />

                        <label htmlFor={`task-${index}`} className='block mt-4 mb-2 font-semibold'>Task:</label>
                        <input
                            type='text'
                            id={`task-${index}`}
                            value={task.task}
                            onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
                            className='w-full border border-gray-300 rounded-md p-2'
                        />

                        <label htmlFor={`description-${index}`} className='block mt-4 mb-2 font-semibold'>Description:</label>
                        <textarea
                            id={`description-${index}`}
                            value={task.description}
                            onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                            className='w-full border border-gray-300 rounded-md p-2'
                            placeholder='Enter task description...'
                            rows={5}
                        />

                        <label htmlFor={`status-${index}`} className='block mt-4 mb-2 font-semibold'>Status:</label>
                        <select
                            id={`status-${index}`}
                            value={task.status}
                            onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                            className={`w-full border border-gray-300 rounded-md p-2 ${task.status === 'Complete' ? 'bg-green-100' : task.status === 'Pending' ? 'bg-yellow-100' : ''}`}
                        >
                            <option value=''>Select Status</option>
                            <option value='Pending'>Pending</option>
                            <option value='Complete'>Complete</option>
                        </select>

                        <button onClick={() => handleDelete(index)} className='text-red-500 mt-2'>Delete</button>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mb-4'>
                <button onClick={handleAddMore} className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'>Add More</button>
            </div>

            <div className='flex justify-center'>
                <button onClick={handleSave} className='bg-green-500 text-white px-6 py-3 rounded-md shadow hover:bg-green-600'>Save</button>
            </div>
        </main>
    );
}

export default ReportContainer;
