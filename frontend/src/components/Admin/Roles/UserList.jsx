import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './UserList.css';

function UserList() {

    const [users, setUsers] = useState([]);
    const apiUrl = "http://192.168.31.112:5000";
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async() =>{
            if(localStorage.token){
                const config = {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.token}`
                    }
                }
                try{
                    const res = await axios.get(`${apiUrl}/api/admin/users`, config);
                    setUsers(res.data);
                }catch(err){
                    console.error(err);
                }
            }
        }
        fetchUsers();
    }, [])

    const handleGoBack = () => {
        navigate('/admin');
    }

  return (
    <div className='userList-container'>
        <h1 className='container-heading'>User List</h1>
        <ul className='user-list-ul'>
            <hr />
            <div className='user-list-heading'>
                <div>S.No.</div>
                <div className='user-list-heading-name'>Name</div>
                <div>Role</div>
            </div>
            <hr />
            {
            users.map((user, key) => (
                <li key={user._id} className='user-list-div'>
                    <Link to={`/admin/update-role/${user._id}`} className='user-list'>
                        <div className='user-list-num'>{key+1}</div>
                        <div className='user-list-name'>{user.name}</div>
                        <div className='user-list-role'>{user.role}</div>
                    </Link>
                </li>
            ))}
        </ul>
        <div className="userList-goBack-div">
            <button onClick={handleGoBack} className="userList-goBack-btn">Go Back</button>
        </div>
    </div>
  )
}

export default UserList
