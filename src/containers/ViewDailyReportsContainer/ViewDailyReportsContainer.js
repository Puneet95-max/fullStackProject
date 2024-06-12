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
                                <div className="mb-4 text-gray-500 text-sm">
                                    <span className="font-medium text-blue-600">Date:</span> {date}
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {groupedReports[date].map((report) => (
                                        <div key={report.id} className="p-4 border-b last:border-0">
                                            <div className="text-2xl font-bold mb-2 text-blue-700">Project: {report.project_name}</div>
                                            <div className="text-xl font-semibold mb-2">Task: {report.task}</div>
                                            <div className="text-gray-700 mb-4">Description: {report.description}</div>
                                            <div className={`mb-2 ${report.status === 'Complete' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                <span className="font-medium">Status:</span> {report.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
