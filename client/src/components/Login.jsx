import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from '../api.js';

export default function Login({ url, setLoggedUser }) {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const loggedUser = await fetchData(`${url}/${userName}/${userPassword}`, undefined, 'GET');
    setLoggedUser(loggedUser);
    navigate('/');
  }

  return (
    <>
      <form className='login' onSubmit={handleLogin}>
        <label>Username</label>
        <input type='text' onChange={e => setUserName(e.target.value)} value={userName} required />
        <label>Password</label>
        <input type='password' onChange={e => setUserPassword(e.target.value)} value={userPassword} required />
        <button type='submit'>Login</button>
      </form>
    </>
  );
}