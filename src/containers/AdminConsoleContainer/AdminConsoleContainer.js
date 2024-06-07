"use client"
import React, { useState, useContext, useEffect } from 'react';
import AddProjectContainer from '../AddProjectContainer/AddProjectContainer';
import ViewProjectsConatainer from '../ViewProjectsContainer/ViewProjectsConatainer';
import Link from 'next/link'

function AdminConsoleContainer({ id }) {
    const [selectedId, setSelectedId] = useState(id);

    return (
        <main className="h-screen w-full flex">
            {/* Sidebar */}
            <div className="w-1/6 h-full bg-blue-500 font-bold text-white py-10 fixed left-0 top-0 bottom-0 overflow-y-auto">
                <Link href={'/admin-console/add-project'}>
                    <div
                        className={`py-4 flex justify-center cursor-pointer ${selectedId === 1 ? 'bg-white text-blue-500' : ''
                            }`}
                        onClick={() => setSelectedId(1)}
                    >
                        Add Projects
                    </div>
                </Link>

                <Link href={'/admin-console/view-projects'}>
                    <div
                        className={`py-4 flex justify-center cursor-pointer ${selectedId === 2 ? 'bg-white text-blue-500' : ''
                            }`}
                        onClick={() => setSelectedId(2)}
                    >
                        List Projects
                    </div>
                </Link>

            </div>

            <div className="w-5/6 ml-auto overflow-y-auto p-8">
                {
                    selectedId === 1 &&
                    <AddProjectContainer />
                }
                {
                    selectedId === 2 &&
                    <ViewProjectsConatainer />
                }
            </div>
        </main>
    );
}

export default AdminConsoleContainer;
