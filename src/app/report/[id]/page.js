"use client"
import AdminConsoleContainer from '@/containers/AdminConsoleContainer/AdminConsoleContainer'
import ReportContainer from '@/containers/ReportContainer./ReportContainer'
import React from 'react'

function Report({ params }) {
    return (
        <main>
            <AdminConsoleContainer UserId={params.id} id={4} />
        </main>
    )
}

export default Report