"use client"
import { createContext, useState } from "react";
import axios from "axios";


const initialState = {

    rolesData: null,
    setRolesData: () => { },
    GetRolesAndPermissionDataAPI: () => { },
    CreatePermissionsAPI: (id) => { },
}

export const RolesAndPermissionContext = createContext(initialState);

export default function RolesAndPermissionContextProvider({ children }) {

    const [rolesData, setRolesData] = useState(initialState.rolesData);

    const GetRolesAndPermissionDataAPI = async () => {
        const url = 'http://127.0.0.1:8000/api/roles/';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setRolesData(response.data);
            }

        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const CreatePermissionsAPI = async (id , data) => {
        const url = `http://127.0.0.1:8000/api/update-role/${id}/`;

        try {
            const response = await axios.put(url, data);

            if (response.status === 200) {
                alert("permission added");
                window.location.reload();  // Refresh the screen
            }

        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    return (
        <RolesAndPermissionContext.Provider value={{
            rolesData,
            GetRolesAndPermissionDataAPI,
            CreatePermissionsAPI,   
        }}>
            {children}
        </RolesAndPermissionContext.Provider>
    )
}



