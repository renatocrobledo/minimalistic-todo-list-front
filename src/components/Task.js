import React from 'react';

const Task = (props) => {
  if(!props.id) return null;

  const className = `task ${props.status}`;
  return (
    <h2
      className={className}
      key={props.id}
      data-created-at={props.createdAt}
      data-status={props.status}
      data-value={props.text}
      onClick={(e)=>props.onClick(props.id, e)}
    >
        {props.text}
    </h2>
  );
};

export default Task;
