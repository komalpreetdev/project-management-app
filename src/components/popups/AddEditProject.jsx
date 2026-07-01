import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const AddEditProject = ({ show, setShow, addData, editData, editIndex, projectListData, setProjectListData }) => {

    const [name, setName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [date, setDate] = useState('');


    const projectFormHandler = (e) => {

        e.preventDefault();

        if (editData) {

            const updateList = projectListData.map((item, index) => 
                 index === editIndex ?
                    { name, projectName, date }
                    :
                    item

            );

            setProjectListData(updateList);
        }
        else {
            addData({ name, projectName, date });
        }

        setShow(false);



        setName('');
        setProjectName('');
        setDate('');
    }

    useEffect(() => {

        if (editData) {
            setName(editData.name);
            setProjectName(editData.projectName);
            setDate(editData.date);
        }
        else{
            setName('');
            setProjectName('');
            setDate('');
        }
    }, [editData,show]);

    return (
        <>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <form onSubmit={projectFormHandler}>
                    <Modal.Body>

                        <label className='pb-2'>Name :</label>
                        <input value={name} onChange={(event) => setName(event.target.value)} type="text" className='form-control' placeholder='enter name' required /><br />

                        <label className='pb-2'>Project Name :</label>
                        <input value={projectName} onChange={(event) => setProjectName(event.target.value)} type="text" className='form-control' placeholder='projectName' required /><br />

                        <label className='pb-2'>Created Date :</label>
                        <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className='form-control' required /><br />


                    </Modal.Body>

                    <Modal.Footer>

                        <Button type="submit" variant="primary" >
                           {editData ? "Update" : "Add"}
                        </Button>

                        

                    </Modal.Footer>
                </form>
            </Modal>

        </>
    )
}

export default AddEditProject;
