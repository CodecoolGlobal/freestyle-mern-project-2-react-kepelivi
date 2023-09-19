import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from '../api.js';

export default function Register({ url }) {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await fetchData(url, undefined, 'POST', { userName, userPassword, userEmail });
        navigate('/');
    }

    return (
        <>
            <form className='register' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' onChange={e => setUserName(e.target.value)} value={userName} required />
                <label>Password</label>
                <input type='password' onChange={e => setUserPassword(e.target.value)} value={userPassword} required />
                <label>Email</label>
                <input type='email' onChange={e => setUserEmail(e.target.value)} value={userEmail} required />
                <button type='submit'>Register</button>
            </form>
        </>
    );
}