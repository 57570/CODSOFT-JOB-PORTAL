import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  const NavItems = [
    { path: "/jobs", title: "Search" },
    { path: "/add-job", title: "Post a Job" },
    { path: "/applied-jobs", title: "Applied jobs" },

  ];

  const userDataString = localStorage.getItem('auth');
  const name = userDataString ? JSON.parse(userDataString).user.name : null;

  return (
    <header className='header'>
      <NavLink to='/' className='logo'>Job Portal</NavLink>
      <nav>
        <ul className='nav-list'>
          {NavItems.map(({ path, title }) => (
            <li key={path} className='nav-item'>
              <NavLink to={path} activeClassName="active" className='nav-link'>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className='right-section'>
        <Link to="/my-jobs" className='my-jobs'>{userDataString ? "Posted jobs" : ""}</Link>

        <div className='user-info'>
          {userDataString ? (
            <>
              <span className='user-name'>{name}</span>
              <button className='logout' onClick={handleLogout}>Logout</button>

            </>
          ) : (
            <>
              <Link className='login' to="/login">Login</Link>
              <Link className='signup' to="/signup">Signup</Link>
              {/* <Link className='signup' to="/applied-jobs">Applied Jobs</Link> */}

            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
