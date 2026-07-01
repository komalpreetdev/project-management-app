import React, { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'

const StatsCard = () => {

    const { taskListData, projectListData, setTaskListData } = useContext(ProjectContext);


    const taskLength = taskListData.length;

    const ProjectLength = projectListData.length;

    let Completed = 0;

    taskListData.filter(t =>
        t.status === "Done" ?
            Completed = Completed + 1 : null

    );





    useEffect(() => {
        const taskData = localStorage.getItem("taskListData");
        if (taskData) {
            const parsedData = JSON.parse(taskData);

            setTaskListData(parsedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("taskListData", JSON.stringify(taskListData));
    }, [taskListData]);

    return (
        <div className='stastSection'>
            <div className='row'>

                <div className='col col-md-4'>
                    <div className='innerStatBox' >
                        <h5>Total Tasks</h5>
                        <div className='statCounts'>
                            <p>{taskLength}</p>
                        </div>
                    </div>
                </div>

                <div className='col col-md-4'>
                    <div className='innerStatBox' >
                        <h5>Total Projects</h5>
                        <div className='statCounts'>
                            <p>{ProjectLength}</p>
                        </div>
                    </div>
                </div>

                <div className='col col-md-4'>
                    <div className='innerStatBox' >
                        <h5>Completed Tasks</h5>
                        <div className='statCounts'>
                            <p>{Completed}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
