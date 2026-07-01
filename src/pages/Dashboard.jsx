import React from 'react'
import StatsCard from '../components/dashboard/StatsCard'
import PieChart from '../components/dashboard/PieChart'
import BarChart from '../components/dashboard/BarChart'

const Dashboard = () => {
    return (
        <>
            <StatsCard />
            <div className='row mt-4 pt-4'>
                <div className='col-md-5'>
                    <PieChart />
                </div>

                <div className='col-md-7'>
                    <BarChart />
                </div>

            </div>



        </>
    )
}

export default Dashboard
