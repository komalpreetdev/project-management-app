import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaTimes } from 'react-icons/fa'
import AddEditProject from '../popups/AddEditProject';
import Swal from 'sweetalert2';
import { ProjectContext } from '../context/ProjectContext';

const ProjectListing = () => {

    const [show, setShow] = useState(false);

    const {projectListData,setProjectListData} = useContext(ProjectContext);


    const [editData, setEditData] = useState(null);

    const [editIndex, setEditIndex] = useState(null);


    const addData = (item) => {
        setProjectListData([...projectListData, item]);
    }

    const deleteHandler = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                setProjectListData(projectListData.filter(prev => prev !== item));
                

                Swal.fire(
                    "Deleted!",
                    "Your project has been deleted.",
                    "success"
                );
                return;
            }
        });
    }

    const editHandler = (item,index) => {
        setEditData(item);
        setEditIndex(index);
        setShow(true);
    }

    const addProject =()=>{
        setEditData(null);  
        setEditIndex(null);
        setShow(true);

    }
   
    return (
        <>
            <AddEditProject show={show} setShow={setShow} addData={addData} editData={editData} editIndex={editIndex}  projectListData={projectListData} setProjectListData={setProjectListData}/>

            <div className='listingSection'>
                <div className='d-flex justify-content-end mb-3'>
                    <button onClick={addProject} className='btn btn-sm btn-danger d-flex items-center gap-1'><FaPlus />Create Project</button>

                </div>
                <div className='rounded table-responsive border'>
                    <table className='table table-bordered rounded mb-0'>
                        <thead>
                            <tr className='table-primary'>
                                <th>Name</th>
                                <th>Project Name</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                projectListData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td className='w-50'>{item.projectName}</td>
                                            <td>{item.date}</td>
                                            <td><div className='flex actions'>
                                                <FaEdit onClick={() => editHandler(item,index)} /><FaTimes onClick={() => deleteHandler(item)} />
                                            </div>
                                            </td>
                                        </tr>

                                    )

                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProjectListing;
