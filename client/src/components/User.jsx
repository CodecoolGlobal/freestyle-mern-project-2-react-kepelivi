import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from '../api.js';

export default function User({ loggedUser, setLoggedUser, url }) {
    const [editedUserId, setEditedUserId] = useState(null);
    const [editedUserPassword, setEditedUserPassword] = useState('');
    const [userPokemons, setUserPokemons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPokemons = async () => {
            const fetchedPokemons = [];
            for (const pokemonUrl of loggedUser.pokemons) {
                const pokemonData = await fetchData(pokemonUrl);
                fetchedPokemons.push(pokemonData);
            }
            setUserPokemons(fetchedPokemons);
        }
        fetchUserPokemons();
    }, [loggedUser]);

    const handleEdit = (id, pass) => {
        setEditedUserPassword(pass);
        setEditedUserId(id);
    }

    const handleSaveEdit = async (id) => {
        await fetchData(url, id, 'PATCH', { password: editedUserPassword });
        const loggedUser = await fetchData(url, id, 'GET');
        setLoggedUser(loggedUser);
        setEditedUserId(null);
        setEditedUserPassword('');
    }

    const handleDelete = async id => {
        await fetchData(url, id, 'DELETE');
        setLoggedUser(undefined);
        navigate('/');
    }

    const handleRemovePokemon = async (id, name) => {
        const updatedPokemons = [...loggedUser.pokemons.filter(pokemon => !pokemon.includes(name))];
        await fetchData(url, id, 'PATCH', { pokemons: updatedPokemons });
        const refreshedloggedUser = await fetchData(url, id, 'GET');
        setLoggedUser(refreshedloggedUser);
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Username: </td>
                        <td>{loggedUser.name}</td>
                    </tr>
                    <tr>
                        <td>Password: </td>
                        <td>{editedUserId === loggedUser._id ?
                            <input type='password' value={editedUserPassword} onChange={e => setEditedUserPassword(e.target.value)} /> :
                            loggedUser.password.replace(/./g, '*')}</td>
                        <td>
                            {editedUserId === loggedUser._id ?
                                <button className='save' onClick={() => handleSaveEdit(loggedUser._id)}>Save</button>
                                :
                                <button className='edit' onClick={() => handleEdit(loggedUser._id, loggedUser.password)}>Edit</button>}
                        </td>
                        <td>
                            <div className="dark-theme" onClick={() => { document.body.style.backgroundColor = '#111111' }}>Dark</div>
                            <div className="light-theme" onClick={() => { document.body.style.backgroundColor = '#FFFAFA' }}>Light</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{loggedUser.email}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => { handleDelete(loggedUser._id); document.body.style.backgroundColor = '#FFFAFA' }}>Delete user</button>
            <h2>Pokemons:</h2>
            <div className='userpokemons'>
                {userPokemons.map(pokemon => (
                    <div className='userpokemon' key={pokemon.name}>
                        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                        <h3>HP: {pokemon.stats[0].base_stat}</h3>
                        <h3>ATTACK: {pokemon.stats[1].base_stat}</h3>
                        <h3>DEFENCE: {pokemon.stats[2].base_stat}</h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <button onClick={() => handleRemovePokemon(loggedUser._id, pokemon.name)}>Remove pokemon</button>
                    </div>
                ))}
            </div>
        </>
    );
}