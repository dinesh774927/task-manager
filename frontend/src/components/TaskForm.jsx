

import React, { useEffect, useState } from 'react';


export default function TaskForm({initial, onSubmit, onCancel}){
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'pending');

  useEffect(()=>{
    if(initial){
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setStatus(initial.status || 'pending');
    }
  },[initial]);

  const handle = (e)=>{
    e.preventDefault();
    onSubmit({title,description,status});
  };


return (
    <form onSubmit={handle} className="task-form">
      <div className="task-form-field">
        <label>
          <span className="material-icon">title</span>
          Title *
        </label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Give your task a clear title" />
      </div>
      <div className="task-form-field">
        <label>
          <span className="material-icon">description</span>
          Description
        </label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Add more details, notes or acceptance criteria" />
      </div>
      <div className="task-form-field">
        <label>
          <span className="material-icon">flag</span>
          Status
        </label>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="task-form-actions">
        <button type="button" className="ghost" onClick={()=> onCancel ? onCancel() : window.history.back()}>
          <span className="material-icon">arrow_back</span>
          Back
        </button>
        <button type="submit">
          <span className="material-icon">save</span>
          Save Task
        </button>
      </div>
    </form>
  )
}
