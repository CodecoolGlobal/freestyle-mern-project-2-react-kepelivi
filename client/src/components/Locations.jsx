import { useState, useEffect } from 'react';
import Encounter from './Encounter';
import Battle from './Battle';
import { fetchData } from '../api.js';

export default function Locations({ loggedUser, url }) {
    const [locations, setLocations] = useState(undefined);
    const [selectedLocation, setSelectedLocation] = useState(undefined);
    const [selectedOwnPokemon, setSelectedOwnPokemon] = useState(undefined);
    const [selectedOpponentPokemon, setSelectedOpponentPokemon] = useState(undefined);
    const locationsURL = 'https://pokeapi.co/api/v2/location';
    const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';

    const handleLocationClick = async (url) => {
        setSelectedLocation(await fetchData(url));
    }

    /*const fetchLocations = async (locationsURL) => {
        setLocations((await fetchData(locationsURL)).results);
        console.log("locations: ", locations);
    }*/

    const handleBack = () => {
        setSelectedLocation(undefined);
        setSelectedOwnPokemon(undefined);
    }

    const handleBeginBattle = (opponent, own) => {
        setSelectedOpponentPokemon(opponent);
        setSelectedOwnPokemon(own);
    }

    const catchPokemon = (pokemon) => {
        loggedUser.pokemons.push(pokemonURL + pokemon.name);
        console.log("loggedUser: ", loggedUser);
        fetchData(url, loggedUser["_id"], "PATCH", loggedUser);
    }

    useEffect(() => {
        if (loggedUser) {
            fetchData(locationsURL).then(data => setLocations(data.results));
        }
    }, [loggedUser]);

    const renderLocations = () => {
        if (!loggedUser) {
            return (
                <>
                    <h1>Please login or register to see the locations.</h1>
                </>
            );
        }

        if (selectedOwnPokemon) {
            return (
                <Battle selectedOpponentPokemon={selectedOpponentPokemon} selectedOwnPokemon={selectedOwnPokemon} handleBack={handleBack} catchPokemon={catchPokemon} />
            );
        }

        if (selectedLocation) {
            return (
                <Encounter selectedLocation={selectedLocation} fetchData={fetchData} handleBack={handleBack} userPokemonsURL={loggedUser.pokemons} handleBeginBattle={handleBeginBattle} />
            );
        }

        return (
            <div className="locations">
                <h2>Choose a location for battle, and catch more Pokemons!</h2>
                {locations ? (
                    <>
                        {locations.map((location) => (
                            <button key={location.name} onClick={() => handleLocationClick(location.url)} >{location.name}</button>
                        ))}
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }

    return renderLocations();
}