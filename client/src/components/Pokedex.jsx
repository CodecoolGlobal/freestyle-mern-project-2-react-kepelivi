import { useEffect, useState } from "react";

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [allPokemons, setAllPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPokemons = () => {
        fetch("http://localhost:9000/api/pokemons")
            .then((res) => res.json())
            .then((pokemonsData) => {
                setPokemons(pokemonsData);
                setAllPokemons(pokemonsData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    const updateSearch = (input) => {
        const filtered = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase()))
        setSearch(input);
        setPokemons(filtered);
    }

    const handleChange = (e) => {
        e.preventDefault();
        updateSearch(e.target.value);
    }

    const displayPokemon = (pokemon) => {
        return (
            <div className="pokemon" key={pokemon._id}>
                <img src={pokemon.pokemonIMG_front} alt="pokemon front"></img>
                <img src={pokemon.pokemonIMG_back} alt="pokemon back"></img>
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <p>HP: {pokemon.hp_stat}</p>
                <p>Attack: {pokemon.attack_stat}</p>
                <p>Defense: {pokemon.deffense_stat}</p>
            </div>
        )
    }

    return (
        <>
            <div className="pokedex">
                <h1>Pokédex</h1>
                <input className="searchbar" type="text" placeholder="Search a Pokemon" value={search}
                    onChange={handleChange} />
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="all-pokemons">
                        {pokemons ? pokemons.map(pokemon => displayPokemon(pokemon)) : null}
                    </div>
                )}
            </div>
        </>
    );
}
