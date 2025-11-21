

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function TaskCard({task, onDelete, canDelete, canEdit}){
  const [removing, setRemoving] = useState(false);

  const statusClass = `status-${(task.status || 'pending').replace(/\s+/g,'-')}`;
  const handleDelete = ()=>{
    if(!canDelete) 
return;
    setRemoving(true);
    setTimeout(()=> onDelete(task.id), 280);
  };

  return (
    <div className={`task-card ${statusClass} ${removing ? 'removing' : ''}`}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
        <div>
          <h3>{task.title}</h3>
          <small>Created by {task.createdByName || task.createdBy}</small>
        </div>
        <span className="task-card-status">{task.status}</span>
      </div>
      {task.description && <p style={{margin:'12px 0 0'}}>{task.description}</p>}
      <div className="task-card-footer">
        {canEdit && (
          <Link to={`/task/${task.id}/edit`}>
            <span className="material-icon">edit</span>
            Edit
          </Link>
        )}
        {canDelete && (
          <button onClick={handleDelete}>
            <span className="material-icon">delete</span>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
