import React from 'react'
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ item }) => {
  

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
  transform: transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined
};

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className='taskLabel' style={style}>
      <h6>{item.projectName}</h6>
      <p className='mb-0'>{item.task}</p>
    </div>
  );
};

export default Draggable;