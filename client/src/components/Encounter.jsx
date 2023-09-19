import { useState, useEffect } from 'react';

const Encounter = ({ selectedLocation, fetchData, handleBack, userPokemonsURL, handleBeginBattle }) => {
    const [areas, setAreas] = useState(null);
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [ownPokemonsData, setOwnPokemonsData] = useState(null);

    const selectArea = async (location) => {
        location.areas.length !== 0 ?
            setAreas(await fetchData(location.areas[Math.floor(Math.random() * location.areas.length)].url)) :
            setAreas(null);
    }

    const selectOpponentPokemon = async (area) => {
        if (area !== null) {
            let random = Math.floor(Math.random() * area.pokemon_encounters.length);
            setOpponentPokemon(await fetchData(area.pokemon_encounters[random].pokemon.url));
        } else {
            setOpponentPokemon(null);
        }
    }

    const fetchOwnPokemons = async (pokemonsURL) => {
        if (pokemonsURL !== null) {
            const ownPokemonsData = [];
            for (let pokemonURL of pokemonsURL) {
                ownPokemonsData.push(await fetchData(pokemonURL));
            }
            setOwnPokemonsData(ownPokemonsData);
        }
    }

    useEffect(() => {
        selectArea(selectedLocation);
        fetchOwnPokemons(userPokemonsURL);
    }, []);

    useEffect(() => {
        selectOpponentPokemon(areas);
    }, [areas]);

    return (
        <>
            {opponentPokemon !== null ?
                <div className='encounter'>
                    <h1>Choose your pokemon!</h1>
                    <div className="opponent">
                        <h2>Opponent</h2>
                        <h3>{opponentPokemon.name.charAt(0).toUpperCase() + opponentPokemon.name.slice(1)}</h3>
                        <div>{opponentPokemon.stats[0].stat.name.toUpperCase()}: {opponentPokemon.stats[0].base_stat}</div>
                        <div>{opponentPokemon.stats[1].stat.name.toUpperCase()}: {opponentPokemon.stats[1].base_stat}</div>
                        <div>{opponentPokemon.stats[2].stat.name.toUpperCase()}: {opponentPokemon.stats[2].base_stat}</div>
                        <img src={opponentPokemon.sprites.front_default} alt='pokemon' />
                    </div>
                    <div className='ownpokemons'>
                        <h2>Own pokemons</h2>
                        {ownPokemonsData !== null ? ownPokemonsData.map(pokemon => (
                            <div key={pokemon.name} className='ownpokemon'>
                                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                                <div>{pokemon.stats[0].stat.name.toUpperCase()}: {pokemon.stats[0].base_stat}</div>
                                <div>{pokemon.stats[1].stat.name.toUpperCase()}: {pokemon.stats[1].base_stat}</div>
                                <div>{pokemon.stats[2].stat.name.toUpperCase()}: {pokemon.stats[2].base_stat}</div>
                                <img src={pokemon.sprites.front_default} onClick={() => handleBeginBattle(opponentPokemon, pokemon)} alt='pokemon' />
                            </div>
                        )) : null}
                    </div>
                </div> :
                <div className='nopokemon'>{"Looks like this location do not have any pokemon."}</div>}
            <button onClick={handleBack}>Back to locations</button>
        </>
    );
}

export default Encounter;