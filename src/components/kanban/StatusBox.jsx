import React, { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { DndContext } from '@dnd-kit/core';
import DroppableColumn from './Droppable';

const StatusBox = () => {

  const { taskListData, setTaskListData } = useContext(ProjectContext);

    const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const updated = taskListData.map((task) =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    );

    setTaskListData(updated);
  };


  const todo = taskListData.filter(t => t.status === "Todo");
  const progress = taskListData.filter(t => t.status === "Progress");
  const done = taskListData.filter(t => t.status === "Done");

  useEffect(() => {
    const stored = localStorage.getItem("taskListData");

    if (stored) {
      setTaskListData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskListData", JSON.stringify(taskListData));
  }, [taskListData]);

  return (
    <div className='kanban-Section'>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="row">


          <div className="col-md-4 col">
            <DroppableColumn id="Todo" title="Todo" tasks={todo} />
          </div>


          <div className="col-md-4 col">
            <DroppableColumn id="Progress" title="Progress" tasks={progress} />
          </div>


          <div className="col-md-4 col">
            <DroppableColumn id="Done" title="Done" tasks={done} />
          </div>

        </div>
      </DndContext>
    </div>
  )
}

export default StatusBox;
