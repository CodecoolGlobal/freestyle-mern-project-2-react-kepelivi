import { Link, Outlet } from "react-router-dom";

export default function NavBar({ loggedUser }) {
    return (
        <>
            <h1 className='title'>Gotta fetch() 'Em All</h1>
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
                    <Link to='logout'>
                        <button onClick={() => {document.body.style.backgroundColor = '#FFFAFA'}}>Logout</button>
                    </Link> :
                    <Link to='login'>
                        <button>Login</button>
                    </Link>}
            </div>
            <Outlet />
        </>
    );
}