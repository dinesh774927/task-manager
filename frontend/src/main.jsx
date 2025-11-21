import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEditTask from './pages/CreateEditTask';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='task/new' element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
            <Route path='task/:id/edit' element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
