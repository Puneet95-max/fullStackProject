"use client"
import { createContext, useState } from "react";
import axios from "axios";

const initialState = {
    StaffData: null,
    AddStaffAPI: (data) => { },
    setStaffData: () => { },
    GetStaffAPI: () => { },
    DeleteStaffAPI: (id) => { },
    UpdateStaffAPI: () => { }
};

export const StaffDetailsContext = createContext(initialState);

export default function StaffDetailsContextProvider({ children }) {

    const [StaffData, setStaffData] = useState(initialState.StaffData);

    const AddStaffAPI = async (data) => {
        const url = 'http://127.0.0.1:8000/api/staff/';
        const newdata = data
        try {
            const response = await axios.post(url, newdata, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            if (response.status === 201) {
                window.location.reload();
            }
            return data
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    }

    const GetStaffAPI = async (data) => {
        const url = 'http://127.0.0.1:8000/api/staff/';
        const newdata = data
        try {
            const response = await axios.get(url, newdata, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            if (response.status === 200) {
                setStaffData(data);
            }
            return data
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    }

    const DeleteStaffAPI = async (id) => {
        const url = `http://127.0.0.1:8000/api/staff/${id}/`;
        try {
            const response = await axios.delete(url);

            const data = response.data;
            if (response.status === 204) {
                window.location.reload();
            }
            return data
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    }

    const UpdateStaffAPI = async (id , data) => {
        const url = `http://127.0.0.1:8000/api/staff/${id}/`;
        try {
            const response = await axios.put(url , data);
            if (response.status === 200) {
                window.location.reload();
            }
            return data
        } catch (error) {
            console.error('Error posting manager details:', error);
            throw error; // Re-throw the error to handle it outside of this function if needed
        }
    }

    return (
        <StaffDetailsContext.Provider value={{
            AddStaffAPI,
            GetStaffAPI,
            DeleteStaffAPI,
            UpdateStaffAPI,
            StaffData,
        }}>
            {children}
        </StaffDetailsContext.Provider>
    )
}

