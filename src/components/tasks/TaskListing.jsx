import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaTimes } from 'react-icons/fa'
import AddEditTasks from '../popups/AddEditTasks';
import Swal from 'sweetalert2';
import { ProjectContext } from '../context/ProjectContext';
const TaskListing = () => {

  const [show, setShow] = useState(false);

  const{taskListData,setTaskListData} = useContext(ProjectContext);

  const [editTaskData, setEditTaskData] = useState(null);

  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const [filterAllTasks, setFilterAllTasks] = useState([]);



  const taskData = (item) => {
    const updated = [...taskListData, item];

  setTaskListData(updated);
  setFilterAllTasks(updated); 
  }


  useEffect(() => {
    const taskData = localStorage.getItem("taskListData");
    if (taskData) {
      const parsedData = JSON.parse(taskData);

      setTaskListData(parsedData);
      setFilterAllTasks(parsedData);
    }
  }, []);

  const deleteTaskHandler = (item) => {
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

        setTaskListData(taskListData.filter(prev => prev.id !== item.id));
        Swal.fire(
          "Deleted!",
          "Your task has been deleted.",
          "success"
        );
        return item;
      }
    });
  }

  useEffect(() => {
    localStorage.setItem("taskListData", JSON.stringify(taskListData));
  }, [taskListData]);

  const editHandler = (item) => {
    setEditTaskData(item);
    setEditTaskIndex(item.id);
    setShow(true);
  }

  const addTask = () => {
    setEditTaskData(null);
    setEditTaskIndex(null);
    setShow(true);

  }

  const filter = (event) => {

    if (!event) {
      setTaskListData(filterAllTasks);
      return;
    }

    const filtered = filterAllTasks.filter((prev) =>
      prev.projectName
        .toLowerCase()
        .includes(event.toLowerCase())
    );
    setTaskListData(filtered);

  }

  return (

    <>

      <AddEditTasks show={show} setShow={setShow} taskData={taskData} editTaskData={editTaskData} editTaskIndex={editTaskIndex} taskListData={taskListData} setTaskListData={setTaskListData} />

      <div className='TaskListingSection listingSection'>
        <div className='d-flex justify-content-end mb-3'>

          <input onChange={(event) => filter(event.target.value)} className="border p-1 me-3 rounded" placeholder="search task..." type="text" />
          <button onClick={addTask} className='btn btn-sm btn-danger d-flex items-center gap-1'><FaPlus />Create Task</button>

        </div>
        <div className='rounded  border table-responsive'>
          <table className='table table-bordered rounded mb-0'>
            <thead>
              <tr className='table-primary'>

                <th>Project</th>
                <th>Task</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                taskListData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td >{item.projectName}</td>
                      <td className='w-50'>{item.task}</td>
                      <td>{item.status}</td>
                      <td>{item.date}</td>
                      <td><div className='flex actions'>
                        <FaEdit onClick={() => editHandler(item)} /><FaTimes onClick={() => deleteTaskHandler(item)} />
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

export default TaskListing
