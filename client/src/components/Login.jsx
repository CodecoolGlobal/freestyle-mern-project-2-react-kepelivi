import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from '../api.js';
import { notification } from 'antd';

notification.config({
  duration: 2,
  closeIcon: null
})

export default function Login({ url, setLoggedUser }) {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e, url) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password: userPassword })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const loggedUser = await res.json();
      setLoggedUser(loggedUser);
      notification.success({ message: `${loggedUser.name} logged in` });
      navigate('/');
    }
    catch (error) {
      notification.error({ message: 'User or password incorrect' });
    }
  }

  /*const loggedUser = await fetchData(`${url}/user`, undefined, 'POST', { name: userName, password: userPassword });*/
  //setLoggedUser(loggedUser);

  return (
    <>
      <form className='login' onSubmit={e => handleLogin(e, url)}>
        <label>Username</label>
        <input type='text' onChange={e => setUserName(e.target.value)} value={userName} required />
        <label>Password</label>
        <input type='password' onChange={e => setUserPassword(e.target.value)} value={userPassword} required />
        <button type='submit'>Login</button>
      </form>
    </>
  );
}