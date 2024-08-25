import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UpdateRole.css';

function UpdateRole() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const apiUrl = "http://localhost:5000";
    useEffect(() => {
        const fetchUser = async() => {
            if(localStorage.token){
                const config = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`,
                    },
                }
                try{
                    const res = await axios.get(`${apiUrl}/api/admin/user/${id}`, config);
                    setUser(res.data);
                    setRole(res.data.role);
                }catch(err){
                    console.error(err);
            }
            }
            else{
                console.log("No token!");
            }
        }
        fetchUser();
    }, [id]);

    const handleRoleChange = async(e) => {
        e.preventDefault();
        if(localStorage.token){
            const config={
                headers: {
                    'Authorization' : `Bearer ${localStorage.token}`,
                }
            }
            const body = { role };
            try{
                const res = await axios.put(`${apiUrl}/api/admin/update-role/${id}`, body, config);
                console.log(res.data.msg);
                navigate('/admin/update-role');
            }catch(err){
                console.error(err);
            }
        }
    }


  return (
    <div className='updateRole-container'>
        <h1>Update Role for "{user?.name}"</h1>
        <form onSubmit={handleRoleChange} className='updateRole-form'>
            <label className='form-label'>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Guest">Guest</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>
            </label>
            <button type='submit' className='updateRole-btn'>Update Role</button>
        </form>
    </div>
  )
}

export default UpdateRole
