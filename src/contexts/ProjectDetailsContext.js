"use client"
import { createContext, use, useState } from "react";

const initialState = {
    fData: null,
    hData: null,
    setFData: () => { },
    GetProjectDetails: () => { },
    setHData: () => { },
    ProjectDetailsData:null,
}

export const ProjectDetailsContext = createContext(initialState);

export default function ProjectDetailsContextProvider({ children }) {

    const [fData, setFData] = useState(initialState.fData);
    const [hData, setHData] = useState(initialState.hData);

    const [ProjectDetailsData , setProjectDetailsData] = useState(initialState.ProjectDetailsData)

    const GetProjectDetails = async () => {
        const url = 'http://127.0.0.1:8000/api/details/'; // Replace with your actual API endpoint

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProjectDetailsData(data);
            return data;
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    return (
        <ProjectDetailsContext.Provider
            value={{
                fData,
                hData,
                setFData,
                setHData,
                GetProjectDetails,
                ProjectDetailsData,
            }}
        >
            {children}
        </ProjectDetailsContext.Provider>
    )
}