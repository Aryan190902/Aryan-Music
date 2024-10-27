import React from 'react'
import './Admin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Admin({user}) {
  const navigate = useNavigate();
  if(!user || user.role !== 'Admin'){
    navigate('/');
  }


  return (
    <div className='admin-container'>
        <div className='admin-box'>
            <div className='admin-options'>
                <h1>Admin Options:</h1>
                <ul className='option-list'>
                    <li className='option-item'><Link to="/admin/shop" className='admin-link'>Shop</Link></li>
                    <li className='option-item'><Link to="/admin/update" className='admin-link'>Updates</Link></li>
                    <li className='option-item'><Link to="/admin/lesson" className='admin-link'>Lessons</Link></li>
                    <li className='option-item'><Link to="/admin/update-role" className='admin-link'>Change Role</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Admin
