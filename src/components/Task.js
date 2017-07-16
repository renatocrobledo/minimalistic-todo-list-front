import React from 'react';

const Task = (props) => {
  if(!props.id) return null;

  const className = `task ${props.status}`;
  return (
    <h2 className={className} data-created-at={props.createdAt} key={props.id} data-status={props.status} data-value={props.text} onClick={(e)=>props.onClick(props.id, e)}>{props.text}</h2>
  );
};

export default Task;
