import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
        };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const apiUrl = "http://localhost:5000";

const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
  };

  useEffect(()=>{
    loadUser();
  }, []);

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (name, mobileNo, username, password) => {
    try{
      const res = await axios.post(`${apiUrl}/api/auth/register`, { name, mobileNo, username, password });
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      loadUser();
    } catch(err){
      console.error(err.message);
    }
  };

  const loadUser = async() => {
    if (localStorage.token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
        },
      };
      try {
        const res = await axios.get(`${apiUrl}/api/auth/user`, config);
        dispatch({ type: 'USER_LOADED', payload: res.data });
      } catch (err) {
        console.error(err.message);
        dispatch({type: 'AUTH_ERROR'});
      }
    }
  };

  const login = async (username, password) => {
    try{
      const res = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      loadUser();
    } catch(err){
      console.error(err.message);
      dispatch({type: 'AUTH_ERROR'});
    }
  };


  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
