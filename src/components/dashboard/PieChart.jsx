import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { ProjectContext } from '../context/ProjectContext';

const PieCharts = () => {

    const { taskListData } = useContext(ProjectContext);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];


    let todo = 0;
    let progress = 0;
    let done = 0;

    taskListData.forEach(t => {
        if (t.status === "Todo") {
            todo += 1;
        } else if (t.status === "Progress") {
            progress += 1;
        } else if (t.status === "Done") {
            done += 1;
        }
    });

    const hasData = todo > 0 || progress > 0 || done > 0 ;

    const pieData = hasData ?
    
    [
            { name: "Todo", value: todo },
            { name: "In Progress", value: progress },
            { name: "Done", value: done }


    ]
    :
    [ 
       { name: "No data", value: 1 }

    ];



    return (
        <PieChart width={300} height={300}>
            <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
            >

                {pieData.map((entry, index) => (

                    <Cell key={index} fill={hasData ? COLORS[index % COLORS.length] : "#d3d3d3" } />

                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )
}

export default PieCharts
