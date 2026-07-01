import React, { useContext } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ProjectContext } from '../context/ProjectContext';

const BarCharts = () => {

    const { taskListData } = useContext(ProjectContext);

    const unfiltered = [...new Set(taskListData.map(task => task.projectName))];

    const barData = unfiltered.map(project => {
        const count = taskListData.filter(t => t.projectName === project).length;
        return {
            name: project,
            tasks: count
        }
    });

    const hasdata = barData.length > 0;
    const nodata = [{ name: "no data", tasks: 1 }];
    return (
        <BarChart width={500} height={300} data={hasdata ? barData : nodata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
            <Bar dataKey="tasks" fill={hasdata ? "#8884d8" : "#d3d3d3"} label={{ fill: "#fff" }} />
        </BarChart>
    )
}

export default BarCharts
