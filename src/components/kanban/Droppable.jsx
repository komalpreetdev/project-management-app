import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import Draggable from './Draggable';

const DroppableColumn = ({ id, title, tasks }) => {
    

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className='statusBox' ref={setNodeRef}>
      <div className='status'>
        <h6 className='mb-0'>{title}</h6>
      </div>

      {
        tasks.map((item) => (
          <Draggable key={item.id} item={item} />
        ))
      }

    </div>
  );
};

export default DroppableColumn;