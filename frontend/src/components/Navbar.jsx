
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = ()=>{
    logout();
    nav('/login');
  };

  const initials = user?.username?.charAt(0)?.toUpperCase() || 'T';
  const isAdmin = user?.role === 'admin';

  
return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">{initials}</Link>
        <div>
          <Link to="/">Task Manager</Link>
        </div>
      </div>
      <div className="navbar__actions">
        {user ? (
          <>
            <div className={`navbar__user ${isAdmin ? 'navbar__user--admin' : ''}`}>
              <span className="navbar__user-name">
                {user.username}
               <span className={` ${isAdmin ? 'navbar__badge' : 'navbar__badge__user'}`}>{user.role}</span>
              </span>
              
            </div>
            <button className="navbar__btn outline" onClick={handleLogout}>
              <span className="material-icon">logout</span>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__btn outline">
              <span className="material-icon">login</span>
              Login
            </Link>
            <Link to="/register" className="navbar__btn solid">
              <span className="material-icon">person_add</span>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
