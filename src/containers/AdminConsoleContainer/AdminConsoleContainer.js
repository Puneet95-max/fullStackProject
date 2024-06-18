"use client";
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { UserDetailContext } from '@/contexts/UserDetailsContext';
import { usePathname } from 'next/navigation';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import ViewAllReportContainer from '../ViewAllReportContainer/ViewAllReportContainer';
import ViewProjectsContainer from '../ViewProjectsContainer/ViewProjectsConatainer';


const AddProjectContainer = dynamic(() => import('../AddProjectContainer/AddProjectContainer'));
const AddStaffContainer = dynamic(() => import('../AddStaffContainer/AddStaffContainer'));
const ReportContainer = dynamic(() => import('../ReportContainer/ReportContainer'));
const RegisterUserContainer = dynamic(() => import('../RegisterUserContainer/RegisterUserContainer'));
const PermissionContainer = dynamic(() => import('../PermissionContainer/PermissionContainer'));

function AdminConsoleContainer() {
    const router = usePathname();
    const [userId, setUserID] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);

            const userID = parsedUserData.user.id;
            setUserID(userID);

            const role = parsedUserData.user.role.name;
            setUserRole(role);
        }
    }, []);

    const { userRoleData } = useContext(UserDetailContext);

    return (
        <main className="h-screen w-full flex">
            <div className="w-1/6 h-full bg-blue-500 font-bold text-white py-10 fixed left-0 top-0 bottom-0 overflow-y-auto">

                {(userRole === 'admin' || userRole === 'manager') &&
                    <Link href='/add-project' prefetch={false}>
                        <div className={`py-4 flex justify-center cursor-pointer ${router === '/add-project' ? 'bg-white text-blue-500' : ''}`}>
                            Add Projects
                        </div>
                    </Link>
                }

                {(userRole === 'admin' || userRole === 'manager') &&
                    <Link href='/add-staff' prefetch={false}>
                        <div className={`py-4 flex justify-center cursor-pointer ${router === '/add-staff' ? 'bg-white text-blue-500' : ''}`}>
                             Staff
                        </div>
                    </Link>
                }

                <Link href='/view-projects' prefetch={false}>
                    <div className={`py-4 flex justify-center cursor-pointer ${router === '/view-projects' ? 'bg-white text-blue-500' : ''}`}>
                        List Projects
                    </div>
                </Link>

                {(userRole === 'admin') ? 
                    <Link href='/view-all-reports' prefetch={false}>
                        <div className={`py-4 flex justify-center cursor-pointer ${router === '/view-all-reports' ? 'bg-white text-blue-500' : ''}`}>
                            View Reports
                        </div>
                    </Link> :
                    <Link href={`/report/${userId}`} prefetch={false}>
                        <div className={`py-4 flex justify-center cursor-pointer ${router === `/report/${userId}` ? 'bg-white text-blue-500' : ''}`}>
                            Send Report
                        </div>
                    </Link>
                }

                <Link href='/profile' prefetch={false}>
                    <div className={`py-4 flex justify-center cursor-pointer ${router === '/profile' ? 'bg-white text-blue-500' : ''}`}>
                        Profile
                    </div>
                </Link>

                {userRole === 'admin' && 
                    <Link href='/register-user' prefetch={false}>
                        <div className={`py-4 flex justify-center cursor-pointer ${router === '/register-user' ? 'bg-white text-blue-500' : ''}`}>
                            Register User
                        </div>
                    </Link>
                }

                <Link href='/user-permission' prefetch={false}>
                    <div className={`py-4 flex justify-center cursor-pointer ${router === '/user-permission' ? 'bg-white text-blue-500' : ''}`}>
                        Permissions
                    </div>
                </Link>
            </div>

            <div className="w-5/6 ml-auto overflow-y-auto p-8">
                {router === '/add-project' && <AddProjectContainer />}
                {router === '/view-projects' && <ViewProjectsContainer />}
                {router === '/add-staff' && <AddStaffContainer />}
                {router === `/report/${userId}` && <ReportContainer id={userId} />}
                {router === '/profile' && <ProfileContainer />}
                {router === '/register-user' && <RegisterUserContainer />}
                {router === '/user-permission' && <PermissionContainer />}
                {router === '/view-all-reports' && <ViewAllReportContainer />}
            </div>
        </main>
    );
}

export default AdminConsoleContainer;
