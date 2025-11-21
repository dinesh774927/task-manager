import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import Spinner from '../components/Spinner';

const PAGE_SIZE = 10;

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const [search,setSearch] = useState('');
  const [statusFilter,setStatusFilter] = useState('all');

  const loadTasks = async (reset = false)=>{
    reset ? setLoading(true) : setLoadingMore(true);
    try{
      const offset = reset ? 0 : tasks.length;
      const res = await API.get('/tasks', { params: { limit: PAGE_SIZE, offset }});
      const fetched = res.data.tasks || [];
      const total = res.data.total ?? (offset + fetched.length);
      setTasks(prev=>{
        const base = reset ? [] : prev;
        const combined = [...base, ...fetched];
        setHasMore(combined.length < total);
        return combined;
      });
    }catch(err){
      console.error(err);
    }finally{
      reset ? setLoading(false) : setLoadingMore(false);
    }
  };

  useEffect(()=>{ loadTasks(true); },[]);

  const loadMore = ()=>{
    if(loadingMore || !hasMore) return;
    loadTasks(false);
  };

  const handleDelete = async (id)=>{
    if(!confirm('Delete task?')) return;
    try{
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t=>t.id !== id));
    }catch(err){
      alert('Error deleting');
    }
  };

  if(loading) return (
    <div style={{display:'flex',justifyContent:'center',marginTop:60}}>
      <Spinner size={64} />
    </div>
  );

  const filtered = tasks.filter(task=>{
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-shell">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>{user ? `Logged in as ${user.username} (${user.role})` : 'Not logged in'}</p>
      </div>
      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search by title or description"
          />
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {user && (
          <Link to="/task/new" className="new-task-btn">
            <span className="material-icon">add_circle</span>
            New Task
          </Link>
        )}
      </div>
      {filtered.length===0 ? <p>No tasks match your search.</p> : (
        <div className="task-grid">
          {filtered.map(task=>{
            const canEdit = user && user.id === task.createdBy;
            const canDelete = user && (user.role==='admin' || user.id===task.createdBy);
            return (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                canDelete={canDelete}
                canEdit={canEdit}
              />
            );
          })}
        </div>
      )}
      {user && (
        <div style={{marginTop:16}}>
          {hasMore ? (
            <button onClick={loadMore} disabled={loadingMore} className="load-more-btn">
              {loadingMore ? (
                <div style={{display:'flex',justifyContent:'center'}}>
                  <Spinner size={28} />
                </div>
              ) : 'Load more'}
            </button>
          ) : (
            <p style={{fontStyle:'italic'}}>You have reached the end of the list.</p>
          )}
        </div>
      )}
    </div>
  )
}
