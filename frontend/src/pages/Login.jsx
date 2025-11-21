import React, { useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ initialMode = 'login' }){
  const [mode,setMode] = useState(initialMode);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();
  const [error,setError] = useState(null);

  useEffect(()=> setMode(initialMode), [initialMode]);
  useEffect(()=>{
    setUsername('');
    setPassword('');
    setError(null);
  },[mode]);

  const isLogin = mode === 'login';

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const endpoint = isLogin ? '/login' : '/register';
      const res = await API.post(endpoint,{username,password});
      login(res.data.token,res.data.user);
      const redirectTo = location.state?.from?.pathname || '/';
      nav(redirectTo, { replace: true });
    }catch(err){
      setError(err.response?.data?.message || (isLogin ? 'Invalid credentials' : 'Registration failed'));
    }
  };

  const switchMode = ()=>{
    setMode(prev=> prev === 'login' ? 'register' : 'login');
  };

  const renderForm = ({heading, subheading, buttonLabel, icon, helperText, buttonIcon}) => (
    <>
      <div className="auth-card__header">
        <span className="material-icon auth-card__icon">{icon}</span>
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>
      <form onSubmit={submit} className="auth-form">
        <label>
          <span className="material-icon">person</span>
          Username
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter username" required/>
        </label>
        <label>
          <span className="material-icon">key</span>
          Password
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" type="password" required/>
        </label>
        {error && <p className="auth-form__error">{error}</p>}
        <button type="submit">
          <span className="material-icon">{buttonIcon}</span>
          {buttonLabel}
        </button>
      </form>
      <button type="button" className="auth-switch" onClick={switchMode}>
        {helperText}
      </button>
    </>
  );

  return (
    <div className="auth-screen">
      <div className="auth-stage">
        <div className={`auth-card-3d ${mode==='register' ? 'is-flipped' : ''}`}>
          <section className="auth-face auth-face--front">
            <div className="auth-card glow">
              {renderForm({
                heading: 'Welcome Back',
                subheading: 'Enter your credentials to access your workspace.',
                buttonLabel: 'Sign in',
                icon: 'lock',
                helperText: 'Need an account? Register now',
                buttonIcon: 'login'
              })}
            </div>
          </section>
          <section className="auth-face auth-face--back">
            <div className="auth-card glow">
              {renderForm({
                heading: 'Create an Account',
                subheading: 'Join the workspace to organize and share tasks.',
                buttonLabel: 'Create account',
                icon: 'lock',
                helperText: 'Already have an account? Sign in instead',
                buttonIcon: 'how_to_reg'
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
