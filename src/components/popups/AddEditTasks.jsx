import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ProjectContext } from '../context/ProjectContext';

const AddEditPopup = ({ show, setShow, taskData, editTaskData, editTaskIndex, taskListData, setTaskListData }) => {

    const { projectListData } = useContext(ProjectContext);

    const [projectName, setProjectName] = useState('');
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const taskFormHandler = (e) => {
        e.preventDefault();

        if (editTaskData) {
            const updateList = taskListData.map((item) => 
                item.id=== editTaskData.id ?
                    {...item, projectName, task, status, date } :
                    item
            );

            setTaskListData(updateList);

        }

        else {
            taskData({ id: Date.now(), projectName, task, status, date });
        }

        setShow(false);



        setProjectName('');
        setTask('');
        setStatus('');
        setDate('');



    }

    useEffect(() => {

        if (editTaskData) {
            setProjectName(editTaskData.projectName);
            setTask(editTaskData.task);
            setStatus(editTaskData.status);
            setDate(editTaskData.date);
        }

        else {

            setProjectName('');
            setTask('');
            setStatus('');
            setDate('');


        }

    }, [editTaskData, show]);

   
    return (
        <>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <form onSubmit={taskFormHandler}>
                    <Modal.Body>

                        <label className='pb-2'>Project :</label>
                        <select value={projectName} onChange={(event) => setProjectName(event.target.value)} type="text" className='form-control' required>
                            <option value="">Select Your Project</option>
                            {
                                projectListData.map((item) => {
                                    return (
                                        <option key={item.id}>{item.projectName}</option>
                                    )
                                })


                            }

                        </select>
                        <br />

                        <label className='pb-2'>Task :</label>
                        <input value={task} onChange={(event) => setTask(event.target.value)} type="text" className='form-control' placeholder='Add your task' required/><br />


                        <label className='pb-2'>Status :</label>
                        <select value={status} onChange={(event) => setStatus(event.target.value)} type="text" className='form-control' required>
                            <option value="">Select Status</option>
                            <option>Todo</option>
                            <option>Progress</option>
                            <option>Done</option>
                        </select><br />

                        <label className='pb-2'>Created Date :</label>
                        <input  value={date} onChange={(event) => setDate(event.target.value)} type="date" className='form-control' required /><br />


                    </Modal.Body>

                    <Modal.Footer>

                        <Button type="submit" variant="danger" onClick={() => setShow(false)}>
                            Close
                        </Button>

                        <Button type="submit" variant="primary" >
                            {
                            editTaskData ? "update" : "Save"
                            }
                        </Button>



                    </Modal.Footer>
                </form>
            </Modal>

        </>
    )
}

export default AddEditPopup;
