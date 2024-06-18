"use client"
import React, { useContext, useEffect } from 'react';
import { UserDetailContext } from '@/contexts/UserDetailsContext';
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';

function ViewDailyReportsContainer() {
    const { getUserReportdata, GetUserDailyReports } = useContext(UserDetailContext);
    
    useEffect(() => {
        // Retrieve user data from session storage
        const userData = sessionStorage.getItem('userData');
        if (userData) {
          // Parse user data to get the user ID
          const parsedUserData = JSON.parse(userData);
          const userID = parsedUserData.user.id;
          GetUserDailyReports(userID);
        }
      }, []);
    
    // Group reports by date
    const groupReportsByDate = (reports) => {
        return reports.reduce((acc, report) => {
            (acc[report.date] = acc[report.date] || []).push(report);
            return acc;
        }, {});
    };

    const groupedReports = getUserReportdata ? groupReportsByDate(getUserReportdata) : {};

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            {getUserReportdata ? (
                <div>
                    <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Daily Reports</h1>
                    {Object.keys(groupedReports).map((date) => (
                        <div key={date} className="mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 px-4 text-left text-blue-600 font-medium">Date: {date}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedReports[date].map((report) => (
                                            <tr key={report.id} className="border-b">
                                                <td className="py-4 px-6 text-blue-700 font-semibold">Project: {report.project_name}</td>
                                                <td className="py-4 px-6 text-blue-700 font-semibold">Task: {report.task}</td>
                                                <td className="py-4 px-6 text-gray-700">Description: {report.description}</td>
                                                <td className={`py-4 px-6 ${report.status === 'Complete' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    Status: {report.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <LoaderComponent />
                </div>
            )}
        </main>
    );
}

export default ViewDailyReportsContainer;
