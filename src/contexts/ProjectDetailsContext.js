"use client"
import { createContext, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'

const initialState = {
    fData: null,
    hData: null,
    ProjectDetailsData: null,
    managersDetails: null,
    projectTypeDetails: null,
    milstoneStatusData: null,
    editProject: null,
    setFData: () => { },
    GetProjectDetails: () => { },
    setHData: () => { },
    setManagersDetails: () => { },
    setProjeectTypeDetails: () => { },
    GetProjectTypeDetails: () => { },
    GetManagersDetails: () => { },
    setMilstoneStatusData: () => { },
    GetMilstoneOptionsData: () => { },
    CreateProject: (data) => { },
    DeleteProjectAPI: (id) => { },
    setEditProject: () => { },
    UpdateProjectAPI: (id) => { }
}

export const ProjectDetailsContext = createContext(initialState);

export default function ProjectDetailsContextProvider({ children }) {
    const router = useRouter();

    const [fData, setFData] = useState(initialState.fData);
    const [hData, setHData] = useState(initialState.hData);
    const [ProjectDetailsData, setProjectDetailsData] = useState(initialState.ProjectDetailsData);
    const [managersDetails, setManagersDetails] = useState(initialState.managersDetails);
    const [projectTypeDetails, setProjeectTypeDetails] = useState(initialState.projectTypeDetails);
    const [milstoneStatusData, setMilstoneStatusData] = useState(initialState.milstoneStatusData);
    const [editProject, setEditProject] = useState(initialState.editProject);

    const GetProjectDetails = async () => {
        const url = 'http://127.0.0.1:8000/api/details/';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            setProjectDetailsData(data);
            return data;
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const GetProjectTypeDetails = async () => {
        const url = 'http://127.0.0.1:8000/api/project-type/';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            setProjeectTypeDetails(data);
            return data;
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const GetManagersDetails = async () => {
        const url = 'http://127.0.0.1:8000/api/manager-details/';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            console.log(response)
            setManagersDetails(data);
            return data;
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const GetMilstoneOptionsData = async () => {
        const url = 'http://127.0.0.1:8000/api/status-type/';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            const formatedData = data.map(type => ({
                value: type.name,
                label: type.name,
                id: type.id
            }));

            setMilstoneStatusData(formatedData);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const CreateProject = async (data) => {
        const url = 'http://127.0.0.1:8000/api/details/';
        const newdata = data
        try {
            const response = await axios.post(url, newdata, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            if (response.status === 201) {
                alert(data.message);
                router.push('/view-projects')
            }
            return data
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    };

    const DeleteProjectAPI = async (id) => {
        const url = `http://127.0.0.1:8000/api/project/${id}`;
        try {
            const response = await axios.delete(url);

            const data = response.data;
            if (response.status === 204) {
                alert(data.message);
                window.location.reload();  // Refresh the screen\
            }
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    };

    const UpdateProjectAPI = async (id , data) => {
        const url = `http://127.0.0.1:8000/api/project/${id}/`;
        const x = data;
        try {
            const response = await axios.put(url , x);

            const data = response.data;
            if (response.status === 200) {
                alert(data.message);
                window.location.reload();  // Refresh the screen\
            }
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    }

    return (
        <ProjectDetailsContext.Provider
            value={{
                fData,
                hData,
                ProjectDetailsData,
                managersDetails,
                projectTypeDetails,
                milstoneStatusData,
                editProject,
                setFData,
                setHData,
                GetProjectDetails,
                GetProjectTypeDetails,
                GetManagersDetails,
                setMilstoneStatusData,
                GetMilstoneOptionsData,
                CreateProject,
                DeleteProjectAPI,
                setEditProject,
                UpdateProjectAPI,
            }}
        >
            {children}
        </ProjectDetailsContext.Provider>
    )
}