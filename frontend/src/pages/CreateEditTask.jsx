import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import TaskForm from '../components/TaskForm';

export default function CreateEditTask(){
  const { id } = useParams();
  const nav = useNavigate();
  const [initial,setInitial] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(()=>{
    if(id){
      API.get(`/tasks/${id}`)
        .then(res=> setInitial(res.data))
        .finally(()=> setLoading(false));
    }
  },[id]);

  const submit = async (data)=>{
    try{
      if(id){
        await API.put(`/tasks/${id}`, data);
      }else{
        await API.post('/tasks', data);
      }
      nav('/');
    }catch(err){
      alert('Error saving');
    }
  };

  return (
    <div className="app-shell">
      <div className="task-form-shell">
        <h2>{id ? 'Update Task' : 'Create a New Task'}</h2>
        <p style={{marginTop:0, color:'#475569'}}>
          {id ? 'Adjust the details and keep everyone in sync.' : 'Capture a new idea, requirement or reminder in seconds.'}
        </p>
        {loading ? <p>Loading...</p> : <TaskForm initial={initial} onSubmit={submit} onCancel={()=> nav(-1)} />}
      </div>
    </div>
  );
}
