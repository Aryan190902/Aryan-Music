import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminLesson.css';

function AdminLesson() {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate('/admin');
    }
    return (
      <div className='adminLesson-container'>
        <button onClick={handleGoBack} className='goBack-btn'>Go Back</button>
      </div>
    )
}

export default AdminLesson
