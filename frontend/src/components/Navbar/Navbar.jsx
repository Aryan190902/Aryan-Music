import { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const handleLogout = async() => {
    await logout();
  }

    return (
      <div>
        <nav>
          <div className='navbar'>
            <div className='navbar-left'>
              <Link to="/">Logo</Link>
            </div>
            <div className='navbar-right'>
              <Link to="/">Home</Link>
              {/* <Link to="#">About Us</Link> */}
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
              {isAuthenticated ?(
                <div className='new-options'>
                  <Link to="#">Lessons</Link>
                  <Link to="#">Forum</Link>
                  <Link to="/updates">Updates</Link>
                   <div className='profile'>
                    <FaRegUserCircle id="profilePic"/>
                    <p className='profile-name'>{user?.user.username}</p>
                    <button onClick={handleLogout} className='logout-btn'>Logout</button>
                  </div>
                </div>
              ):
              (
                <Link to="/login">Signup/Login</Link>
              )}
              
            </div>

          </div>
        </nav>
      </div>
    )
}


export default Navbar;