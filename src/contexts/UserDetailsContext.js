"use client"
import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const initialState = {
    setGetUserReportdata: () => { },
    loginAPI: (data) => { },
    setUserData: () => { },
    GetUserDailyReports: (id) => { },
    CreateDailyReport: (data, id) => { },
    setUserRoleData: (id) => { },
    GetUserRoleAPI:(id) => { },
    userData: null,
    getUserReportdata: null,
    userRoleData: null,
}

export const UserDetailContext = createContext(initialState);

export default function UserDetailsContextProvider({ children }) {

    const router = useRouter();
    const [userData, setUserData] = useState(initialState.userData);
    const [getUserReportdata, setGetUserReportdata] = useState(initialState.getUserReportdata);
    const [userRoleData, setUserRoleData] = useState(initialState.userRoleData);

    const loginAPI = async (data) => {
        const url = 'http://127.0.0.1:8000/api/login/'
        try {
            const response = await axios.post(url, data);
            if (response.status === 200) {
                setUserData(response.data)

                const userData = {
                    token: response.data.token,
                    user: response.data.user
                };

                const user_id = response.data.user.id;
                sessionStorage.clear();
                sessionStorage.setItem('userData', JSON.stringify(userData));

                router.push('/admin-console/view-projects')
            } else {
                alert("user not logined")
            }

        } catch (error) {
            throw error;
        }
    };

    const GetUserDailyReports = async (id) => {
        const url = `http://127.0.0.1:8000/api/report/${id}/`
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setGetUserReportdata(response.data);
                router.push('/view-reports')
            }
        } catch (error) {
            throw error;
        }
    };

    const CreateDailyReport = async (id, data) => {
        const url = `http://127.0.0.1:8000/api/report/${id}/`
        try {
            const response = await axios.post(url, data);
            if (response.status === 201) {
                alert("report created successfully");
            } else {
                alert("error")
            }
        } catch (error) {
            throw error;
        }
    };

    const GetUserRoleAPI = async (id) => {
        const url = `http://127.0.0.1:8000/api/roles/${id}/`
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setUserRoleData(response.data);
            }
        } catch (error) {
            throw error;
        }
    };


    return (
        <UserDetailContext.Provider value={{
            loginAPI,
            GetUserDailyReports,
            CreateDailyReport,
            GetUserRoleAPI,
            userData,
            getUserReportdata,
            userRoleData,
        }}>
            {children}
        </UserDetailContext.Provider>
    )
}