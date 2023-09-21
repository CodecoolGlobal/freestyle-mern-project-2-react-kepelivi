import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';

export default function NavBar({ loggedUser, setLoggedUser }) {
    const navigate = useNavigate();
    return (
        <>
            <div className='navbar'>
                <Link to='/'>
                    <button>Home</button>
                </Link>
                <Link to='pokedex'>
                    <button>Pokédex</button>
                </Link>
                <Link to='locations'>
                    <button>Locations</button>
                </Link>
                {loggedUser ?
                    <Link to='user'>
                        <button>{loggedUser.name}</button>
                    </Link> :
                    <Link to='register'>
                        <button>Register</button>
                    </Link>
                }
                {loggedUser ?
                    <button onClick={() => { document.body.style.backgroundColor = '#FFFAFA'; notification.success({ message: `${loggedUser.name} logged out` }); setLoggedUser(undefined); navigate('/') }}>Logout</button> :
                    <Link to='login'>
                        <button>Login</button>
                    </Link>}
            </div>
            <Outlet />
        </>
    );
}